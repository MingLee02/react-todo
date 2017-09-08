var express = require('express');
var router = express.Router();
var todosController = require('../controllers').todos;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To do list' });
});

router.post('/create', todosController.create);
router.get('/list', todosController.list);
router.get('/:todoId', todosController.detail);

module.exports = router;
