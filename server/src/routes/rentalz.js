const express = require('express');
const router = express.Router();
const rentalzController = require('../controllers/RentalZController');

// route rentalz/createForm
router.post('/createForm', rentalzController.createForm);

// route rentalz/createForm
router.get('/getAllForm', rentalzController.getAllForm);

//route rentalz/deteleForm/:id
router.post('/deleteForm', rentalzController.deleteForm);

//route rentalz/searchForm/:address
router.get('/searchForm', rentalzController.searchForm);

//route rentalz/createDetailNote
router.post('/createDetailNote', rentalzController.createDetailNote);

//route rentalz/getDetailNote
router.get('/getDetailNote', rentalzController.getDetailNote);
module.exports = router;
