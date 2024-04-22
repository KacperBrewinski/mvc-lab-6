const User = require('../models/User');
const Book = require('../models/Book');
const bookController = {
    getBookDetails: (req, res) => {
        const userId = req.session.userId;
        const bookId = req.params.id;
        const book = Book.findById(bookId);
        const didUserBorrowTheBook = User.findById(userId).findBorrowedBookById(bookId);
        res.render('book-details', { title: 'Book Details', book, didUserBorrowTheBook });
    },
    postBookBorrow: (req, res) => {
        const userId = req.session.userId;
        const bookId = req.params.id;
        const book = Book.findById(bookId);
        const user = User.findById(userId);
        if (book && user) {
            if (book.available) {
                book.borrow();
                user.borrowBook(book);
                res.redirect('/books/borrow/success');
            } else {
                res.send('Book not available for borrowing.');
            }
        } else {
            res.send('User or book not found.');
        }
    },
    getBookBorrowSuccess: (req, res) => {
        res.render('success', { title: 'Success', message: 'Book borrowed successfully' });
    },
    postBookReturn: (req, res) => {
        const userId = req.session.userId;
        const bookId = req.params.id;
        const book = Book.findById(bookId);
        const user = User.findById(userId);
        if (book && user) {
            if (!book.available) {
                book.return();
                user.returnBook(bookId);
                res.redirect('/books/return/success');
            } else {
                res.send('Book already returned or not available for return.');
            }
        } else {
            res.send('User or book not found.');
        }
    },
    getBookReturnSuccess: (req, res) => {
        res.render('success', { title: 'Success', message: 'Book returned successfully' });
    }
};
module.exports = bookController;