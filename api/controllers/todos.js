const Todo = require('../models').Todo;

module.exports = {
    create(req, res) {
        Todo.create({
            title: req.body.title
        }).then(function(user) {
            res.json(user);
        });
    },
    list(req, res) {
        Todo.findAll({}).then(function(todos) {
            res.json(todos);
        });
    },
};