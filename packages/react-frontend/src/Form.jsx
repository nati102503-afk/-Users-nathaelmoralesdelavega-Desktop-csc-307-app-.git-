import React, { useState } from "react";

function Form(props) {
  // Step 1: form state
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  // Step 2: handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setPerson(prevPerson => ({
      ...prevPerson,
      [name]: value
    }));
  }

  // Step 3: submit function
  function submitForm() {
    if (person.name && person.job) { // optional: prevent empty submissions
      props.handleSubmit(person);
      setPerson({ name: "", job: "" }); // reset form
    }
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={person.name}
        onChange={handleChange}
      />

      <label htmlFor="job">Job</label>
      <input
        type="text"
        id="job"
        name="job"
        value={person.job}
        onChange={handleChange}
      />

      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
