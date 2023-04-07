const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.listMovie(movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ status: 404, message: `Movie cannot be found.` });
  }



async function list(req, res, next) {
    // your solution here
  
    const { is_showing = false } = req.query;
    const listOutput = await service.list(is_showing)
    res.json({ data: listOutput });
  }

 
  async function listMovie(req, res, next) {
    
    const { movie } = res.locals;
    res.json({ data: movie });
  }

async function listTheaters(req,res,next){
    const { movieId } = req.params;
    const listOutput=await service.listTheaters(movieId)
    res.json({data:listOutput});
}



module.exports={list:asyncErrorBoundary(list),
listMovie:[asyncErrorBoundary(movieExists),listMovie],
listTheaters:asyncErrorBoundary(listTheaters),

}