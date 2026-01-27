import express from "express";
import cors from "cors"; // Step 2: enable CORS

const app = express();
const port = 8000;

// Middleware
app.use(cors()); // allow requests from any origin
app.use(express.json()); // parse JSON request bodies

// In-memory Users Data
const users = [
  { id: 1, name: "Charlie", job: "Janitor" },
  { id: 2, name: "Mac", job: "Bouncer" },
  { id: 3, name: "Dee", job: "Aspiring actress" },
  { id: 4, name: "Dennis", job: "Bartender" }
];

// Helper functions
const findUserById = (id) => users.find(user => user.id == id);

// Generate a unique ID for new users
function generateUniqueId() {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000); // random 0-999999
  } while (users.find(user => user.id === id));
  return id;
}

// Add a new user with generated ID
const addUser = (user) => {
  const newUser = { ...user, id: generateUniqueId() };
  users.push(newUser);
  return newUser;
};

// Delete user by ID
const deleteUserById = (id) => {
  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

// Routes

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all users (or filter by name/job)
app.get("/users", (req, res) => {
  const { name, job } = req.query;
  let filteredUsers = users;

  if (name !== undefined) filteredUsers = filteredUsers.filter(user => user.name === name);
  if (job !== undefined) filteredUsers = filteredUsers.filter(user => user.job === job);

  res.json(filteredUsers);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = findUserById(id);

  if (!user) {
    res.status(404).send("Resource not found.");
  } else {
    res.json(user);
  }
});

// Add new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).json(newUser); // 201 Created + return new user
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);

  if (success) {
    res.status(204).send(); // 204 No Content
  } else {
    res.status(404).send("Resource not found.");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
