const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list() {
  return knex("reviews").select("*");
}
function read(review_Id) {
  return knex("reviews").select("*").where({ review_Id }).first();
}

const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
});

function listReviews(query_Id, reviewIdCheck = false) {
  const outputId = reviewIdCheck
    ? { "r.review_Id": query_Id }
    : { "r.movie_Id": query_Id };

  return knex("critics as c")
    .join("reviews as r", "c.critic_id", "r.critic_id")
    .select(
      "c.*",
      "r.*",
      "r.created_at as r_created_at",
      "r.updated_at as r_updated_at",
      "c.critic_id as c_critic_id"
    )
    .where(outputId)
    .then((data) => data.map((review) => addCritic(review)));
}

function update(updatedReview) {
  //your solution here
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

function destroy(review_id) {
  //your solution here
  return knex("reviews").where({ review_id }).del();
}

module.exports = { read, list, listReviews, update, delete: destroy };
