const { Router } = require("express");
const indexRouter = Router();
const { userRouter } =require("./user.routes");
const { noteRouter } = require("./note.routes");
const { authentication } = require("../middlewares/authenticate.middleware");

indexRouter.use("/user", userRouter);
indexRouter.use("/note",authentication, noteRouter);

module.exports = { indexRouter };
