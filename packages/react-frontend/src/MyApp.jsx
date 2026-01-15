import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([
    { name: "Charlie", job: "Janitor" },
    { name: "Mac", job: "Bouncer" },
    { name: "Dee", job: "Aspiring actress" },
    { name: "Dennis", job: "Bartender" }
  ]);

  // Remove function (already done)
  function removeCharacter(index) {
    const updated = characters.filter((_, i) => i !== index);
    setCharacters(updated);
  }

  // Step 7: add new character
  function addCharacter(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeCharacter}
      />
      <Form handleSubmit={addCharacter} />
    </div>
  );
}

export default MyApp;



