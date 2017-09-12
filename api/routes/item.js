var express = require('express');
var router = express.Router();
const controller = require('../controllers').todoitems;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'To do item' });
});

router.post('/create', controller.create);
router.put('/:todoItemId/update', controller.update);

module.exports = router;
