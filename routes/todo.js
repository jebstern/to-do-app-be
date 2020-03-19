const express = require('express');
const router = express.Router();
// const passport = require('passport');
const controller = require('../controllers/todo');


router.get('/items', controller.items);
router.get('/incomplete', controller.incomplete);
router.post('/add', controller.add);
router.put('/update', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
