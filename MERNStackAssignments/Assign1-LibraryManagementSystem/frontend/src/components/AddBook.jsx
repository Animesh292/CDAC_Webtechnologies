import React, {useRef} from 'react'

const AddBook = () => {
    const bookName = useRef(null);
    const bookAuthor = useRef(null);
    const bookGenre = useRef(null);
    const publication = useRef(null);
    const available = useRef(false);

    async function handleAddBook() {
        const abook = {
            bookName: bookName.current.value,
            bookAuthor: bookAuthor.current.value,
            bookGenre: bookGenre.current.value,
            publication: publication.current.value,
            available: available.current.value
        }
        try {
            if(!bookName || !bookAuthor || !bookGenre || !publication || !available) {
                console.log('One of the input reference is missing!')
                alert('Complete details missing!')
                clearForm();
                return;
            }
            const response = await fetch(`http://localhost:3000/api/addbooks`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(abook)
            })
            if(response.ok) {
                console.log('We have successfully received your request! Book has been added to our database.', response.message)
                alert(
                  "We have successfully received your request! Book has been added to our database."
                );
                clearForm()
            } else {
                console.log('Failed to add book please try again later.', response.message);
                alert("Failed to add book please try again later.", JSON.stringify(response.message));
                clearForm();
            }
        } catch (error) {
            console.log(`Unexpected behaviour something went wrong: ${error}`)
            return;
        }
    }

    async function handleUpdateBook() {
         const abook = {
           bookName: bookName.current.value,
           bookAuthor: bookAuthor.current.value,
           bookGenre: bookGenre.current.value,
           publication: publication.current.value,
           available: available.current.value,
         };
         try {
           if (
             !bookName ||
             !bookAuthor ||
             !bookGenre ||
             !publication ||
             !available
           ) {
             console.log("One of the input reference is missing!");
             alert("Complete details missing!");
             clearForm();
             return;
           }
           const response = await fetch(`http://localhost:3000/api/updatebook`, {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(abook),
           });
           if (response.ok) {
             console.log(
               "We have successfully received your request! Book has been updated in our database.",
               response.message
             );
             alert(
               "We have successfully received your request! Book has been updated in our database."
             );
             clearForm();
           } else {
             console.log(
               "Failed to update book please try again later.",
               response.message
             );
             alert(
               "Failed to update book please try again later.",
               JSON.stringify(response.message)
            
             );
             clearForm();
           }
         } catch (error) {
           console.log(`Unexpected behaviour something went wrong: ${error}`);
           clearForm();
           return;
         }
    }

    function clearForm() {
        let inputs = document.querySelectorAll("input");
        inputs.forEach(input => {
            input.value = ''
        });
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
        id="AddBook"
        className="text-center pt-15 h-270 flex flex-col items-center"
        style={{ backgroundColor: "#B8C4A9" }}
      >
        <h1
          className="text-5xl p-4"
          style={{
            fontFamily: "PT sans",
            fontWeight: "bold",
          }}
        >
          Update/Add Your Book..
        </h1>
        <p className="p-3 text-xl">
          Have your book add now we'll sell it for you or update if you have
          some undone changes?
        </p>
        <div
          className="text-start addBookContainer pt-10 ps-10 pr-15 pb-10 rounded-2xl m-14 flex flex-col bg-red-300 w-100"
          style={{
            width: "30vw",
            background:
              "linear-gradient(rgba(152, 161, 188, 0.5), rgba(152, 161, 188, 0.5)), url('https://images.unsplash.com/photo-1622555063306-9930f396f051?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765') no-repeat center center/cover",
          }}
        >
          <label htmlFor="" className="text-lg py-1.5 text-white">
            Enter your bookname
          </label>
          <input
            className="bg-white w-90 rounded-2xl p-1.5 my-1.5 mx-2"
            ref={bookName}
            type="text"
            placeholder="Enter your bookname"
            required
          />
          <label htmlFor="" className="text-lg py-1.5 text-white">
            Enter author name
          </label>
          <input
            className="bg-white w-90 rounded-2xl p-1.5 my-1.5 mx-2"
            type="text"
            ref={bookAuthor}
            placeholder="Enter author/your name"
            required
          />
          <label htmlFor="" aria-disabled className="text-lg py-1.5 text-white">
            SetPrice
          </label>
          <input
            className="bg-white w-90 rounded-2xl p-1.5 my-1.5 mx-2"
            type="text"
            disabled
            placeholder="Enter your price"
            required
          />
          <label htmlFor="" className="text-lg py-1.5 text-white">
            Genre Name
          </label>
          <input
            className="bg-white w-90 rounded-2xl p-1.5 my-1.5 mx-2"
            type="text"
            ref={bookGenre}
            placeholder="Enter the genre"
            required
          />
          <label htmlFor="" className="text-lg py-1.5 text-white">
            Publish year:
          </label>
          <input
            className="bg-white w-90 rounded-2xl p-1.5 my-1.5 mx-2"
            type="text"
            ref={publication}
            placeholder="Publish year"
            required
          />
          <label htmlFor="" className="text-lg py-1.5 text-white">
            Availability
          </label>
          <input
            className="bg-white w-90 rounded-2xl p-1.5 my-1.5 mx-2"
            type="text"
            ref={available}
            placeholder="Give availability"
            required
          />
          <div className="btns flex items-center justify-around">
            <button
              onClick={handleAddBook}
              className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 mt-8 px-4 rounded-3xl cursor-pointer h-13 w-27"
            >
              Add Book
            </button>
            <button
              onClick={handleUpdateBook}
              className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 mt-8 px-4 rounded-3xl cursor-pointer h-13 w-33"
            >
              Update Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBook