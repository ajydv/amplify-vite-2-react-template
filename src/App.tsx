import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { CognitoUserPool, CognitoUserSession } from "amazon-cognito-identity-js";
import amplifyOutputs from "../amplify_outputs.json"; // Adjust path if needed
import axios from "axios";

const client = generateClient<Schema>();

const poolData = {
  UserPoolId: amplifyOutputs.auth.user_pool_id,
  ClientId: amplifyOutputs.auth.user_pool_client_id,
};

const userPool = new CognitoUserPool(poolData);

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  const handlePost = async () => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      alert("No current user logged in");
      return;
    }

    currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
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
      console.log(`jwtToken`,jwtToken)
      //const body = { bucket_name: "demo-lambda-fun-bucket-2" };
      const body = {
        bucket_name: "demo-lambda-fun-bucket-2",
        file_name: "student.json",
        table_name: "studentjson"
      };

      axios
        .post(
         // "https://ufuinaiqr3.execute-api.eu-north-1.amazonaws.com/dev",
          "https://gs2o3hn5mk.execute-api.eu-north-1.amazonaws.com/dev",
          //"https://7n9nuuquna.execute-api.eu-north-1.amazonaws.com/dev",
          body,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              allowOrigins: ["https://main.dk6x4ailvdh70.amplifyapp.com"],
              allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
              allowHeaders: ["Content-Type","X-Amz-Date","Authorization","X-Api-Key","X-Amz-Security-Token"],
            },
          }
        )
        .then((response) => {
          alert(`Response: ${JSON.stringify(response.data)}`);
        })
        .catch((error) => {
          console.error("Error making POST request:", error);
          alert("Error making POST request");
        });
    });
  };

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => deleteTodo(todo.id)}>
            {todo.content}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={handlePost}>Post Testing</button>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
