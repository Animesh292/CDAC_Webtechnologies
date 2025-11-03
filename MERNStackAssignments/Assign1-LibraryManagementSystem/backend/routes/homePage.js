const express = require("express");
const {handlehomepage, handleSingleGetBook, handleBookAdd, handleBookUpdate, handleGetBooks} = require("../controller/homepage")

const router = express.Router();

router.get('/home', handlehomepage);
router.get('/books/:bookname', handleSingleGetBook);
router.post('/addbooks', handleBookAdd);
router.post('/updatebook', handleBookUpdate);
router.get('/getbooks', handleGetBooks);

module.exports = router;