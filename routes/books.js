const express=require('express')
const router=express.Router();
const controller=require('../controllers/books');
router.post('/books',controller.addBook);
router.get('/books',controller.getBooks);
router.get('/books/:id', controller.getBookById);
router.put('/books/:id', controller.updateBook);
router.delete('/books/:id', controller.deleteBook);

module.exports = router;