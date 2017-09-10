const TodoItem = require('../models').TodoItem;

module.exports = {
    create(req, res) {
        console.log('qwohp')
        console.log(req.params.todoId)
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
    }
};