const config=require("../config/config")
const mysql=require('mysql2');

const db=mysql.createConnection({
    host:config.host,
    user:config.user,
    password:config.password,
    database:config.database
});

db.connect((err)=>{
    if(err){
        console.log("Connection failed",err);
        return;
    }
    else{
        console.log("Database Connected")
    }
})

exports.addBook=(book,callback)=>{
    db.query(
        `INSERT INTO books (id, title, author, genre, publication_year) VALUES ('${book.id}','${book.title}','${book.author}','${book.genre}','${book.publication_year}')`,
        callback
    );
}

exports.getBooks=(callback)=>{
    db.query('SELECT * FROM books',callback);
}

exports.getBookByID=(bookId,callback)=>{
    db.query('SELECT * FROM books WHERE id=?',bookId,(err,result)=>{
        if(err){
            callback(err,null);
            return;
        }
        callback(null,result[0]);
    })
}

exports.updateBook=(BookId,updateBook,callback)=>{
    db.query('UPDATE books SET ? WHERE id = ?',[updateBook,BookId],callback);
}

exports.deleteBook=(bookId,callback)=>{
    db.query('DELETE FROM books WHERE id= ?',bookId,callback);
}