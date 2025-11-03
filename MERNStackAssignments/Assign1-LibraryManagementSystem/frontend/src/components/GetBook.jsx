import React from 'react'
import { useRef, useState, useEffect } from 'react'

const Inventory = () => {
    const [Book, setBook] = useState();
    const bookName = useRef(null);
    const bookAuthor = useRef(null);
    const bookGenre = useRef(null);
    const publication = useRef(null);

    useEffect(() => {
        console.log('Books added', Book)
    },[Book])

    async function handleFetchBook() {
        // const aBook = {
        //   bookName: bookName.current.value,
        //   bookAuthor: bookAuthor.current.value,
        //   bookGenre: bookGenre.current.value,
        //   publication: publication.current.value,
        // };
        
        try {
            const response = await fetch(`http://localhost:3000/api/books/${bookName.current.value}`, {
                method : 'GET',
                headers: {'Content-Type': 'application/json'},
                // body: JSON.stringify(aBook),
            });
            if(response.ok) {
                const book = await response.json();
                alert('Book successfully fetched');
                console.log(`Book successfully fetched ${JSON.stringify(book.data
                )
                }`);
                clearForm();
                setBook(book.data);
                return;
            }
            else {
                alert('Request declined from server query unresolved.')
                clearForm();
                return;
            }
        } catch (error) {
            console.log(`Unexpected Behaviour ${error}`);
            alert(`Unexpected Behaviour ${error}`);
            clearForm();
            return;
        }
    }

    function clearForm() {
      let inputs = document.querySelectorAll("input");
      inputs.forEach(input => {
        input.value = ''
      })
    }


  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Carme&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');
      </style>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Carme&family=Momo+Signature&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap');
      </style>
      <div
        id="GetBook"
        className="getBooks h-screen flex relative"
        style={{
          background:
            "linear-gradient(to right, rgb(209, 211, 212), rgb(184, 196, 169))",
          height: "50vw",
        }}
      >
        <h2
          className="text-2xl text-white pt-20.5 font-bold ps-9.5"
          style={{ fontFamily: "Titillium Web" }}
        >
          Get books Available with us:
        </h2>
        <div
          className="userInputs relative right-68 top-28 rounded-3xl mt-8.5 ps-14.5"
          style={{
            backgroundSize: "contain",
            backgroundBlendMode: "darken",
            // backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(117, 151, 196, 0.9)",
            paddingTop: "3.3vw",
            height: "33vw",
            width: "28vw",
            display: "flex",
            flexDirection: "column",
            backgroundImage:
              "URL(https://images.unsplash.com/photo-1529158062015-cad636e205a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=753)",
          }}
        >
          <label htmlFor="" className="text-lg text-white pt-3.5 pr-2.5 pb-3.5">
            Enter Book Name:{" "}
          </label>
          <input
            className="bg-white w-80 rounded-2xl p-1.5"
            type="text"
            ref={bookName}
            placeholder="Enter book name"
            required
          />
          <label htmlFor="" className="text-lg text-white pt-3.5 pr-2.5 pb-3.5">
            Enter Author Name:{" "}
          </label>
          <input
            className="bg-white w-80 rounded-2xl p-1.5"
            type="text"
            ref={bookAuthor}
            placeholder="Enter author name"
            required
          />
          <label htmlFor="" className="text-lg text-white pt-3.5 pr-2.5 pb-3.5">
            Enter Genre Name:{" "}
          </label>
          <input
            className="bg-white w-80 rounded-2xl p-1.5"
            type="text"
            ref={bookGenre}
            placeholder="Enter genre"
            required
          />
          <label htmlFor="" className="text-lg text-white pt-3.5 pr-2.5 pb-3.5">
            Enter publication Year:
          </label>
          <input
            className="bg-white w-80 rounded-2xl p-1.5"
            type="number"
            ref={publication}
            placeholder="Enter publication"
            required
          />
          <button
            onClick={handleFetchBook}
            className="bg-pink-500  ms-6 hover:bg-blue-700 w-30 text-white font-bold mt-8 py-2 px-4 rounded-3xl"
          >
            Get Book
          </button>
        </div>

        {Book && (
          <div
            className="box absolute right-90 top-47 bg-slate-400  h-50 w-50 "
            style={{ height: "30w", width: "29vw" }}
          >
            <>
              <div
                className="pt-20 pb-10 text-xl text-white text-center shadow-2xl"
                style={{
                  fontFamily: "Momo signature",
                  fontWeight: "light",
                  backgroundColor: "rgb(152, 161, 188)",
                  borderRadius: "15px",
                }}
              >
                <h1 className="p-2">BookName: {Book.bookName}</h1>
                <h1 className="p-2">Author: {Book.bookAuthor}</h1>
                <h1 className="p-2">Genre: {Book.bookGenre}</h1>
                <h1 className="p-2">Publication Year: {Book.publication}</h1>
                <button className="bg-pink-500 font-sans ms-6 hover:bg-blue-700 w-37 text-white cursor-pointer mt-8 py-2 px-4 rounded-3xl">
                  Buy Now
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
}

export default Inventory