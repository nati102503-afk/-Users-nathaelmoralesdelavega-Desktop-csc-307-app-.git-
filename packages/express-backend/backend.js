import express from "express";

const app = express();
const port = 8000;


// Middleware

app.use(express.json()); // allows parsing JSON request bodies


// In-memory Users Data

const users = [
  { id: 1, name: "Charlie", job: "Janitor" },
  { id: 2, name: "Mac", job: "Bouncer" },
  { id: 3, name: "Dee", job: "Aspiring actress" },
  { id: 4, name: "Dennis", job: "Bartender" }
];


// Root route

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// Helper functions

const findUserByName = (name) => users.filter(user => user.name === name);
const findUserById = (id) => users.find(user => user.id == id);
const addUser = (user) => {
  users.push(user);
  return user;
};
const deleteUserById = (id) => {
  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

//all users or filtered by name/job

app.get("/users", (req, res) => {
  const { name, job } = req.query;

  let filteredUsers = users;

  if (name !== undefined) {
    filteredUsers = filteredUsers.filter(user => user.name === name);
  }

  if (job !== undefined) {
    filteredUsers = filteredUsers.filter(user => user.job === job);
  }

  res.json(filteredUsers);
});

//user by ID

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);

  if (!user) {
    res.status(404).send("Resource not found.");
  } else {
    res.json(user);
  }
});

// add new user

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(200).send(); // 200 OK
});


//  delete user by ID

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);

  if (success) {
    res.status(200).send(`User with id ${id} deleted.`);
  } else {
    res.status(404).send("Resource not found.");
  }
});


// Start the server

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


