var express = require('express');
var router = express.Router();
const contactsController  = require('../controllers').contacts;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/contact/list', contactsController.list);

module.exports = router;
