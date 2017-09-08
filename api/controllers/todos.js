const Todo = require('../models').Todo;

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
};