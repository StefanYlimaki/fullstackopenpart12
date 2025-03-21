const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {

  const value = await redis.getAsync('todoCount');
  const nextValue = value ? Number(value) + 1 : 1;
  await redis.setAsync('todoCount', nextValue);

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body;

  const todo = {
    text: body.text,
    done: body.done
  }

  Todo.findByIdAndUpdate(req.todo._id, todo, {
    new: true,
    runValidators: true,
    context: 'query'
  }).then((todo) => {
    if(todo){
      res.json(todo)
    } else {
      res.status(404).end()
    }
  })
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
