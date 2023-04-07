const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;

  const review = await service.read(reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  return next({ status: 404, message: `Review cannot be found.` });
}

async function listReviews(req, res, next) {
  const { movieId } = req.params;
  const listOutput = await service.listReviews(movieId);
  res.json({ data: listOutput });
}

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
  };
  await service.update(updatedReview);
  const reReadData = await service.read(res.locals.review.review_id);
  const output = await service.listReviews(reReadData.review_id, true);

  res.json({ data: output[0] });
}

async function destroy(req, res, next) {
  service
    .delete(res.locals.review.review_id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: asyncErrorBoundary(listReviews),
};
