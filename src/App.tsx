import AppRouter from "../src/router/AppRouter"; 
import "bootstrap/dist/css/bootstrap.min.css";
//import { useAuthenticator } from "@aws-amplify/ui-react";

function App() {
  //const { user, signOut } = useAuthenticator();

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
