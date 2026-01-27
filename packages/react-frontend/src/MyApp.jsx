import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// Helper functions for backend API calls
function fetchUsers() {
  return fetch("http://localhost:8000/users");
}

function postUser(person) {
  return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
}

function deleteUser(id) {
  return fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
  });
}

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json))
      .catch((error) => console.log(error));
  }, []);

  // Add new user
  function updateList(person) {
    postUser(person)
      .then((res) => res.json()) // get user with backend-generated ID
      .then((newUser) => setCharacters([...characters, newUser]))
      .catch((error) => console.log(error));
  }

  // Remove user
  function removeCharacter(index) {
    const userToDelete = characters[index];

    deleteUser(userToDelete.id)
      .then((res) => {
        if (res.status === 204) {
          const updated = characters.filter((_, i) => i !== index);
          setCharacters(updated);
        } else {
          console.log("Failed to delete user:", res.status);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;

