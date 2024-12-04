import { useState, ChangeEvent } from "react";
import axios from "axios";
import amplifyOutputs from "../../amplify_outputs.json"; // Adjust path if needed
import { CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: amplifyOutputs.auth.user_pool_id,
  ClientId: amplifyOutputs.auth.user_pool_client_id,
};

const userPool = new CognitoUserPool(poolData);

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [bucketType, setBucketType] = useState<"part" | "inventory">("part");
  const [loading, setLoading] = useState<boolean>(false);

  const bucketNameMap = {
    part: "test-parts-files-bucket",
    inventory: "test-inventory-files-bucket",
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFile(uploadedFile);
  };

  const handleUpload = async () => {
    if (!file || !bucketType) {
      alert("Please provide all fields");
      return;
    }

    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      alert("No current user logged in");
      return;
    }

    currentUser.getSession(async (err: Error | null, session: CognitoUserSession | null) => {
      if (err) {
        console.error("Error fetching session:", err);
        alert("Error fetching session");
        return;
      }

      if (!session) {
        alert("Session is null");
        return;
      }

      const jwtToken = session.getIdToken().getJwtToken();
      console.log(`Bearer ${jwtToken}`);

      try {
        setLoading(true);
        const formData = {
          bucket_name: bucketNameMap[bucketType],
          file_name: file.name,
          file: await convertFileToBase64(file),
        };

        const response = await axios.post(
          `https://hphhshrpva.execute-api.us-east-2.amazonaws.com/dev/aj-auth-test`,
          JSON.stringify(formData),
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        alert(JSON.parse(response.data.body).message);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      } finally {
        setLoading(false);
      }
    });
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="upload-card">
      <h2>Upload File to S3 Bucket</h2>
      <label className="dropdown-label">Select File Type</label>
      <select
        value={bucketType}
        onChange={(e) => setBucketType(e.target.value as "part" | "inventory")}
        className="dropdown"
      >
        <option value="part">Part</option>
        <option value="inventory">Inventory</option>
      </select>
      <input
        style={{ marginTop: "20px" }}
        type="file"
        className="file-input"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={loading} className="upload-button">
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default Upload;
