const Router = require("express");
const mainController = require("../controllers/mainController");

const router = new Router();

router.get("/:id", mainController.getData);
router.post("/:id", mainController.setData);

module.exports = router;
