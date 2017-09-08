const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        Todo.findOrCreate({
            where: {
                title: req.body.title
            },
            defaults: {
                title: req.body.title
            }
        })
    },
    list(req, res) {
        Todo.findAll({}).then(function(todos) {
            res.json(todos);
        });
    },
    detail(req, res) {
        console.log(req.params)
        Todo.findById(req.params.todoId, {
          include: [{
            model: TodoItem,
            as: 'todoItems',
          }],
        }).then(todo => {
          if (!todo) {
            return res.status(404).send({
              message: 'Todo Not Found',
            });
          }
          return res.status(200).send(todo);
        }).catch(error => res.status(400).send(error));
    }
};