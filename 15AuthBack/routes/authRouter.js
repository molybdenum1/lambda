const Router = require("express");
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/auth');
const router = new Router();

router.get("/:id", authMiddleware, authController.getUsers );
router.post("/sign_up", authController.signUp);
router.post("/login", authController.login);
router.post("/refresh", authMiddleware, authController.refresh);

module.exports = router;
