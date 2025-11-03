const express = require("express");
const db = require("../db/db");

async function handlehomepage(req, res) {

    try {
        res.status(200).send("Home page");
        return;
    }
    catch(error) {
        res.status(500).json(`Unable to load the webpage ${error}`)
        return;
    }
}

async function handleSingleGetBook(req, res){
    const booknm = req.params.bookname;
    // const {bookName, bookAuthor, bookGenre, publication } = req.body;
    try {
        // if(!bookName || !bookAuthor || !bookGenre || !publication) {
        //     console.log("One of the required fields missing!");
        //     return res.status(400).json({message: 'One of the required fields missing!'})
        // }
        const query = `select * from books where bookName=?`
        db.query(query, [booknm], (err, response) => { //notice: we're using params book name for fetching along with posted data from form
            if(err) {
                console.log(`Query execution failed make sure details are correct: ${err}`)
                return res.status(500).json({message: `Query execution failed make sure details are correct: ${err}`})
            }
            if(response.length === 0) {
                console.log('No query found matching.')
                return res.status(404).json({message: `No matching data found`})
            }
            const data = response[0];
            console.log(`Books details: ${data}`)
            return res.status(200).json({message: 'Books fetched successfully', data});
        })
    } catch (error) {
        console.log(`Unexpected behaviour request time out ${error}`)
        return res.status(500).json({message: 'Internal server error'});
    }
}
async function handleBookAdd(req, res) {
    const { bookName, bookAuthor, bookGenre, publication, available} = req.body;
    try {
        if(!bookName || !bookAuthor || !bookGenre || !publication || !available) {
            console.log(`All fields are required!`)
            return res
              .status(400)
              .json({ message: "All fields are required!" });
        }
        const query = `insert into books(bookName, bookAuthor, bookGenre, publication, availability) values(?, ?, ?, ?, ?)`
        db.query(query, [bookName, bookAuthor, bookGenre, publication, available], (err, response) => {
            if(err) {
                console.log(`Request failed unable to add to the database: ${err}`)
                return res.status(500).json({message: `Unable to make request failed ${err}`})
            }
            console.log(`Request succeeded book added successfully: bookName: ${bookName}, bookAuthor: ${bookAuthor}`)
            return res
              .status(200)
              .json({
                message: `Request succeeded book added successfully: bookName: ${bookName}, bookAuthor: ${bookAuthor}`
              });
        })
    } catch (error) {
        console.log(`Unexpected behaviour Internal Server error! ${error}`)
        return res
          .status(500)
          .json({
            message: `Unexpected behaviour Internal Server error! ${error}`,
          });
    }
}

async function handleBookUpdate(req, res) {
    const {bookName, bookAuthor, bookGenre, publication, available} = req.body;
    try{
        if(!bookName || !bookAuthor || !bookGenre || !publication || !available) {
            console.log(`Unable to update book since we received insufficient inputs from user.`)
            return res.status(400).json({message: 'Unable to update book since we receive insufficient inputs from user.'})
        }
        if(available == 0) {//no book then delete
        const query = `delete from books where bookName = ? AND bookAuthor = ?`
        db.query(query, [bookName, bookAuthor], (err, response) => {
            if(err) {
                console.log(`Unable to make query query please try again ${err}`)
                return res.status(500).send(`Unable to make query please try later ${err}`)
            }
            console.log(`We received your request since availibility was set to none it's no longer available`);
            return res.status(200).send("Book has been successfully removed", bookName);
        })
        }
        else {
            const query = `update books set bookName = ?, bookAuthor = ?, bookGenre = ? where publication= ?`
            db.query(query, [bookName, bookAuthor, bookGenre, publication], (err, response) => {
                if(err) {
                    console.log(`Unable to make query please try again later ${err}`)
                    return res.status(500).send(`Unable to make query please try again later ${err}`);
                }
                console.log(`Book has been successfully updated bookName: ${bookName}`)
                return res.status(200).send("Book has been successfully updated", bookName);
            })
        }
    }
    catch(error) {
        console.log(`Unexpected behaviour internal server error: ${error}`)
        return res
          .status(500)
          .json({
            message: `Unexpected behaviour internal server error: ${error}`,
          });
    }
}


async function handleGetBooks(req, res) {
    try {
        const query = `select * from books`
        db.query(query, [], (err, response) => {
            if(err) {
                console.log(`Unable to fetch books from records ${err}`)
                return res
                  .status(500)
                  .send(`Unable to fetch books from records ${err}`);
            }
            if(response.length === 0) {
                console.log('Empty set no books found!')
                return res.status(404).json({message: 'Empty set no books found', response})
            }
            const data = JSON.stringify(response);
            console.log(`Books fetched successfully ${data}`)
            return res.status(200).send(data);
        })
    } catch (error) {
        console.log(`Internal Server Error ${error}`)
        return res.status(500).send(`Internal server error ${error}`)
    }
}


module.exports = {
    handlehomepage,
    handleSingleGetBook,
    handleBookAdd, 
    handleBookUpdate,
    handleGetBooks
}
