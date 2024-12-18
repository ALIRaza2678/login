const express=require("express")
const router=express.Router();
const controller=require("../controller/user.controller")

router.post("/",controller.store)
router.post("/login",controller.login)
router.post("/otp",controller.generateOTP)
router.post("/verify",controller.verifyOTP)
router.get("/",controller.index)
router.get("/:id",controller.get)
router.delete("/:id",controller.destroy)
router.put("/:id",controller.update)

module.exports=router;