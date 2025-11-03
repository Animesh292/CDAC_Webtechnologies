const express = require("express");
const {handleHomePageView, handleGetItems, handleAddItem, handleDeleteItem, handleRemoveAllItems} = require("../Controller/home");

const router = express.Router();

router.get('/home', handleHomePageView);
router.get('/getitems', handleGetItems);
router.post('/additems', handleAddItem);
router.delete('/deleteitem/:itemname', handleDeleteItem)
router.delete('/removeall', handleRemoveAllItems)

module.exports = router;