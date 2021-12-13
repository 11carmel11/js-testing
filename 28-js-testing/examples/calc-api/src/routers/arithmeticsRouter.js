const express = require('express');
const {add, sub, multiply, divide} = require("../services/arithmetics");
const router = express.Router();

router.get('/add', function(request, response) {
  const {a, b} = request.query;

  return response.json({
    result: add(a, b)
  })
})

router.get('/sub', function(request, response) {
  const {a, b} = request.query;

  return response.json({
    result: sub(a, b)
  })
})

router.get('/multiply', function(request, response) {
  const {a, b} = request.query;

  return response.json({
    result: multiply(a, b)
  })
})

router.get('/divide', function(request, response) {
  const {a, b} = request.query;

  return response.json({
    result: divide(a, b)
  })
})

module.exports = router;
