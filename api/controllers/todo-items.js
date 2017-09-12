const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        TodoItem.findOrCreate({
            where: {
                content: req.body.content,
                todoId: req.body.todoId,
            },
            defaults: {
                content: req.body.content,
                todoId: req.body.todoId,
            }
        })
    },
    update(req, res) {
        TodoItem.find({
            where: {
              id: req.body.todoItemId,
              todoId: req.body.todoId,
            },
        }).then(todoItem => {
            if (!todoItem) {
                return res.status(404).send({
                  message: 'TodoItem Not Found',
                });
            }
            console.log('FOund utem')

            todoItem.update({
                content: req.body.content || todoItem.content,
                complete: req.body.complete || todoItem.complete,
            })
            .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
            .catch(error => res.status(400).send(error));
        }).catch(error => res.status(400).send(error));
    },
};