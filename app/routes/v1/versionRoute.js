var express = require('express'),
	body = require('body-parser'),
	caseService = require('../../service/caseNumber/caseNumberService'),
	employService = require('../../service/employee/employeeService'),
	employDateService = require('../../service/employee/employeeDateService'),
	employeeCaseService = require('../../service/employee/employeeCaseService');
	router = express.Router();

router.get('/casenumber/:caseNumber', caseService.getDetail);
router.get('/employee/:employeeName', employService.getDetail);
router.post('/employee', employDateService.getDetail);
router.post('/employeeCase', employeeCaseService.getDetail);

module.exports = router;