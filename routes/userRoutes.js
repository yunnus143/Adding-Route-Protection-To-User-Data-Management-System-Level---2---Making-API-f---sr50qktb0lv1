const express = require("express");

const {
    getAllUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userControllers");

const grantAccessTo = require("../middlewares/grantAccessTo");
const protectUserRoutes = require("../middlewares/protectRouteUser");
const protectAdminRoutes = require("../middlewares/protectRouteAdmin");

const router = express.Router();

router.get("/:id", protectUserRoutes, grantAccessTo(["user", "admin", "superadmin"]), getUserByID);
router.patch("/:id", protectUserRoutes, grantAccessTo(["user", "admin", "superadmin"]), updateUser);

router.post("/", grantAccessTo(["guest", "user", "admin", "superadmin"]), createUser);

// Add a middleware to protect admin routes to GET and DELETE Routes below
router.get("/", grantAccessTo(["admin", "superadmin"]), getAllUsers);
router.delete("/:id", grantAccessTo(['superadmin']), deleteUser);

module.exports = router;