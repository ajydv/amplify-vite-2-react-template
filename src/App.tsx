import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from '@aws-amplify/ui-react';
import axios from 'axios';

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  const {user, signOut } = useAuthenticator();

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id:string){
    client.models.Todo.delete({id});
  }

  const handlePost = async()=>{
    const body = { bucket_name: "demo-lambda-fun-bucket-2" };

    try {
      const response = await axios.post(
        //'https://rs189msoe1.execute-api.eu-north-1.amazonaws.com/test-demo-2',
        //'https://xuxtqe46q7gx3txdeeuxc5j6vq0upgxl.lambda-url.eu-north-1.on.aws/',
        'https://dqy8074x5d.execute-api.eu-north-1.amazonaws.com/dev',
        body,
        {
          headers: {
            allowOrigins: ["*"],
            allowMethods: ["OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
            allowHeaders: ["Content-Type"],
          }
        }
      );
      alert(`Response: ${JSON.stringify(response.data)}`);
    } catch (error) {
      console.error('Error making POST request:', error);
      alert('Error making POST request');
    }
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={()=>deleteTodo(todo.id)}>{todo.content}</li>
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
