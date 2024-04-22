class User {
    constructor(id, login, borrowedBooks = []) {
        this.id = id;
        this.login = login;
        this.borrowedBooks = borrowedBooks;
    }
    static getAll() {
        return users;
    }
    borrowBook(book) {
        this.borrowedBooks.push(book);
    }
    returnBook(bookId) {
        this.borrowedBooks = this.borrowedBooks.filter(book => book.id !== bookId);
    }
    findBorrowedBookById(bookId) {
        return this.borrowedBooks.some(book => book.id === bookId);
    }
}
const users = [
    new User(1, 'User 1'),
    new User(2, 'User 2'),
    new User(3, 'User 3'),
    new User(4, 'User 4'),
    new User(5, 'User 5')
];
module.exports = User;