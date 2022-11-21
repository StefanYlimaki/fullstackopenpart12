const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0
let value = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (req, res) => {
  console.log('statistics')
  const value = await redis.getAsync('todoCount')

  res.send({
    added_todos: value
  });

});

module.exports = router;
