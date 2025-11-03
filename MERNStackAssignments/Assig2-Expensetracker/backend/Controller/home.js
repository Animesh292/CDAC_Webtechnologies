const express = require("express");
const db = require("../db/db.js")

async function handleHomePageView(req, res) {
    try {
        return res.status(200).send("Home page");
    } catch (error) {
        console.log('Error Loading the home page', error)
        return res.status(500).send(`Internal Server Error ${error}`)
    }
}

async function handleGetItems(req, res) {
    try {
        const query = `Select * from items`;
        db.query(query, [], (err, response) => {
            if(err) {
                console.log(`Unable to fetch items ${err}`)
                return res
                  .status(500)
                  .json({ message: `Unable to fetch items ${err}` });
            }
            console.log('Successfully retrieved from Database', response);
            return res.status(200).json({
                message: 'Successfully retrieved from Database', 
                data: response // Send the response array directly
            })
        })
    } catch (error) {
        console.log(`Internal Server error ${error}`)
        return res
          .status(500)
          .json({ message: `Internal Server error ${error}` });
    }
}

async function handleAddItem(req, res) {
    const {itemName, price, itemQuantity} = req.body;

    try {
        if(!itemName || !price || !itemQuantity) {
            console.log('No complete reference provided cannot add to database')
            return res
              .status(404)
              .json("No complete reference provided cannot add to database");
        }
        const query = `insert into items(itemName, price, itemQuantity) values(?, ?, ?)`
        db.query(query, [itemName, price, itemQuantity], (err, response) => {
            if(err) {
                console.log(`Error making query database error ${err}`)
                return res.status(500).json({message: `Error making query database error ${err}`});
            }
            console.log(`Successfully added item ${itemName} to database.`)
            return res
              .status(200)
              .json({
                message: `Successfully added item ${itemName} to database.`,
              });
        })
    } catch (error) {
        console.log(`Internal Server error ${error}`);
        return res
          .status(500)
          .json({ message: `Internal Server error ${error}` });
    }
}

async function handleDeleteItem(req, res) {
    const {itemname} = req.params;
    try {
        if(!itemname) {
            console.log(`No sufficient info received from client`)
            return res
              .status(400)
              .json({ message: "No sufficient info received from client" });
        }
        const query = 'delete from items where itemName=?'
        db.query(query, [itemname], (err, response) => {
          if (err) {
            console.log(`Database error ${err}`);
            return res
              .status(500)
              .json({ message: `Database error ${err}`, err });
          }
          console.log(
            "Successfully removed from database -DELETION PART1",
            response
          );
          return res.status(200)
                .json({
                  message: "Item successfully removed from database",
                  response,
                });
        })
        // const query1 = 'select * from items'
        // db.query(query1, [], (err, response) => {
        //     if(err) {
        //         console.log(`Database error ${err}`);
        //         return res
        //           .status(500)
        //           .json({ message: `Database error ${err}`, err });
        //     }
        //     console.log('Successfully fetched updated items - Deletion PART2', response.itemName)
        //     return res
        //       .status(200)
        //       .json({
        //         message: "Item successfully removed from database",
        //         response,
        //       });

    } catch (error) {
        console.log(`Internal server error ${error}`)
        return res.status(500).json({message: `Internal server error ${error}`});
    }
}

async function handleRemoveAllItems(req, res) {
    try {
        const query = `Delete from items`
        db.query(query, [], (err, response) => {
            if(err) {
                console.log('We had trouble removing items with the database query failed', err)
                return res.status(500).json({message: `Caught unhandled database query failed to execute ${err}`})
            }
            console.log('Items removed successfully')
            return res.status(200).json({message: 'Successfully removed', response})
        })
    } catch (error) {
        console.log(`Internal server error ${error}`);
        return res
          .status(500)
          .json({ message: `Internal server error ${error}` });
    }
}

module.exports = {
    handleHomePageView,
    handleGetItems,
    handleAddItem,
    handleDeleteItem,
    handleRemoveAllItems
}