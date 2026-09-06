const express = require("express");
const multer = require("multer");
const router = express.Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/projectController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Student adds project
router.post("/add", auth, upload.array("screenshots", 5), controller.addProject);

// Public - approved projects
router.get("/", controller.getAllApproved);

// Faculty - pending projects
router.get("/pending", auth, controller.getPending);

// Faculty - approve / reject
router.put("/status/:id", auth, controller.updateStatus);

module.exports = router;