import { Link } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

const Home = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <div>
      <h1>Welcome, {user?.signInDetails?.loginId}</h1>
      <nav>
        <Link to="/upload">Go to Upload</Link>
        <button onClick={signOut}>Sign out</button>
      </nav>
    </div>
  );
};

export default Home;
