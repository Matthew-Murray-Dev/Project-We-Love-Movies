const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    // your solution here
    
    const listOutput = await service.list()
    res.json({ data: listOutput });
  }

  module.exports={list:asyncErrorBoundary(list),}