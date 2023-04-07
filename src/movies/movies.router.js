const router = require("express").Router({ mergeParams: true });
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reviewsRouter = require("../reviews/reviews.router");

router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);
router.use("/:movieId/reviews", reviewsRouter);
router.route("/:movieId").get(controller.listMovie).all(methodNotAllowed);
router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
