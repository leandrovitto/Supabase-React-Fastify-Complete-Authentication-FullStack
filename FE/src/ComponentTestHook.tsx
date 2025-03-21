"use client";
import React, { useState } from "react";
import useFetch from "./hooks/useFetch";

const ComponentTestHook = () => {
  //const [data, setData] = useState(null);
  const [todoId, setTodoId] = useState(1);

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/" + todoId
  );

  /* const handleFetchAPI = () => {
    
  }; */

  return (
    <div>
      <pre>
        <code>{JSON.stringify(data, undefined, 2)}</code>
      </pre>
      {/*  <button onClick={() => handleFetchAPI()}>Fetch API</button> */}

      <button onClick={() => setTodoId(1)}>SET 1</button>
      <button onClick={() => setTodoId(2)}>SET 2</button>
      <button onClick={() => setTodoId(3)}>SET 3</button>
    </div>
  );
};

export default ComponentTestHook;
