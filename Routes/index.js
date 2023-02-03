let express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const TodoController = require("../Controllers/TodoController");
const CredentialController = require("../Controllers/Credentials");

let verifyToken = (request, response, next) => {
    // Get the auth header value
    const bearerHeader = request.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // split at the space
      const bearer = bearerHeader.split(" ");
  
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      request.token = bearerToken;
      // Next middleware
  
      //STUB - If token is expired then also no API call will be accessible prompting for new login --> new token generation
      jwt.verify(request.token, "secretkey123", (err) => {
        if (err) {
          response.sendStatus(403);
          return;
        } else {
          next();
        }
      });
    } else {
      // Forbidden
      response.sendStatus(403);
    }
  };

router.post("/api/signup",  CredentialController.Signup);

router.post("/api/login", CredentialController.Login);

router.post("/api/todo", verifyToken, TodoController.AddTodo);

router.get("/api/todo", verifyToken, TodoController.getTodo);

router.delete("/api/todo:id", verifyToken, TodoController.DeleteTodo);

router.put("/api/todo", verifyToken, TodoController.EditTodo);
module.exports = router;
