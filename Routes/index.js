let express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const PlantController = require("../Controllers/PlantController")
const SeedController = require("../Controllers/SeedController")
const CredentialController = require("../Controllers/Credentials");
const PlantCareController = require("../Controllers/PlantCareController")
const OrderController = require('../Controllers/OrderController')

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

router.post("/api/signup", CredentialController.Signup);

router.post("/api/login", CredentialController.Login);

//ANCHOR - PLANT ROUTES
router.post("/api/plants", PlantController.CreatePlant)
router.get("/api/plants", PlantController.GetPlants)
router.get("/api/plants/:id", PlantController.GetPlantById)

router.get("/api/similar/plants", PlantController.GetSimilarPlants)

//ANCHOR - SEED ROUTES
router.post("/api/seeds", SeedController.CreateSeed)
router.get("/api/seeds", SeedController.GetSeeds)
router.get("/api/seeds/:id", SeedController.GetSeedById)

//ANCHOR - PLANT CARE ROUTES
router.post("/api/tools", PlantCareController.CreateTool)
router.get("/api/tools", PlantCareController.GetTools)
router.get("/api/tools/:id", PlantCareController.GetToolsById)

router.post("/api/orders", OrderController.CreateOrder)
router.get("/api/orders", OrderController.GetOrders)
router.get("/api/orders/:id", OrderController.GetOrderById)
router.get("/api/user/orders/:id", OrderController.GetOrdersByUserId)

module.exports = router;
