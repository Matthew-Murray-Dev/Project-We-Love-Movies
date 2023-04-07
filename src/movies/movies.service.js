const knex = require("../db/connection");


function list(is_showing) {
  if (is_showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true }).groupBy("m.movie_id");
  } else {
    return knex("movies").select("*");
  }
}



function listMovie(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function listTheaters(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("*")
    .where({ movie_id: movieId });
}


module.exports = {
  list,
  listMovie,
  listTheaters,
 
};
