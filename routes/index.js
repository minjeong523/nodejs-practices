const router = require("express").Router();
const {
  boardController,
  userController,
  user2Controller,
  joinController,
} = require("../controller");

router.get("/api/board/all", boardController.FindAllBoard);
router.get("/api/board/one", boardController.FindOneBoard);
router.post("/api/board/create", boardController.CreateBoard);
router.post("/api/board/update", boardController.Updateboard);
router.post("/api/board/delete", boardController.Deleteboard);
router.post("/api/user/signup", userController.UserSignUp);
router.post("/api/user/signin", userController.UserSignIn);
router.post("/api/user2/signup", user2Controller.user2SignUp);
router.post("/api/user2/signin", user2Controller.user2SignIn);

router.post("/api/join/chk", joinController.ChkDuplicate);
router.post("/api/join/signup", joinController.SignUp);
router.post("/api/join/signin", joinController.SignIn);
router.post("/api/join/board/create", joinController.BoardCreate);
router.post("/api/join/board/update", joinController.BoardUpdate);
router.get("/api/join/board/list", joinController.BoardList);
module.exports = router;
