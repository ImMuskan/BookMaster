const db = require('../models/books')

exports.addBook = (req, res) => {
    const book = req.body;
    db.addBook(book, (err) => {
        if (err) {
            console.error('Error adding book', err);
            res.status(500).send('Error adding new book');
            return;
        }
        res.status(201).send('Book added successfully');
    });
}

exports.getBooks = (req, res) => {
    db.getBooks((err, books) => {
        if (err) {
            console.error('Error getting books', err);
            res.status(500).send('Error getting books');
            return;
        }
        res.send(books);
    })
}

exports.getBookById = (req, res) => {
    const bookId = req.params.id;

    db.getBookByID(bookId, (err, book) => {
        if (err) {
            console.error('Error getting book', err);
            res.status(500).send('Error getting book');
            return;
        }
        if (!book) {
            res.status(404).send('Book not found');
            return;
        }
        res.send(book);
    });
};

exports.updateBook = (req, res) => {
    const bookId = req.params.id;
    const updatedBook = req.body;
  
    db.updateBook(bookId, updatedBook, (err, result) => {
      if (err) {
        console.error('Error updating book', err);
        res.status(500).send('Error updating book');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('Book not found');
        return;
      }
      res.send('Book updated successfully');
    });
  };
  
  exports.deleteBook = (req, res) => {
    const bookId = req.params.id;
  
    db.deleteBook(bookId, (err, result) => {
      if (err) {
        console.error('Error deleting book', err);
        res.status(500).send('Error deleting book');
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send('Book not found');
        return;
      }
      res.send('Book deleted successfully');
    });
  };