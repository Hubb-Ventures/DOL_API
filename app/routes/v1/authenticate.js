var express = require('express'),
	body = require('body-parser'),
	router = express.Router();

router.use(body.urlencoded({extended:true}));
router.use(body.json());

router.post('/auth', service.authenticate);

module.exports = router;