import React, {useRef, useState, useEffect} from 'react'

const Home = () => {
     const [bill, setBill] = useState([]);
      const [error, setError] = useState(null);
      // const billItem = useRef(null);
      // const billPrice = useRef(null);
      // const billQuant = useRef(null);
      // const billName = useRef(null);
      const [loading ,SetLoading] = useState(false);
     const item = useRef(null);
     const amount = useRef(null);
     const quantity = useRef(null);

     // Fetch items on mount
     useEffect(() => {
       
       getItems();
     }, []);
  const getItems = async () => {
  //done both using database and localstorage
  try {
    SetLoading(true);
    const response = await fetch("http://localhost:3000/api/getitems");
    if (!response.ok) throw new Error("Unable to fetch items");

    const items = await response.json();
    console.log("Items successfully fetched", items.data);
    setError(null);
    setBill(items.data);
    //  let locStorage = localStorage.getItem("items");
    //  setBill(locStorage);
    //  localStorage.setItem("items", JSON.stringify(locStorage));
    console.log(bill); //this may not populate bill immediately because we're using async but later it gets added so don't worry if empty
  } catch (error) {
    console.error(`Error: ${error}`);
    setError(`Error fetching items: ${error.message}`);
    setBill([]); // Reset to empty array on error
  } finally {
    SetLoading(false);
  }
};

     // Add item to state + backend
     async function calculateBill() {//try to do both add the item to database & localStorage simultaneously
       const aItem = {
         itemName: item.current.value,
         price: amount.current.value,
         itemQuantity: quantity.current.value,
       };

       try {
         const response = await fetch("http://localhost:3000/api/additems", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(aItem),
         });

         if (response.ok) {
          console.log("Item successfully added to database");
          setBill((prev) => [...prev, aItem]);
          let locStore = JSON.parse(localStorage.getItem("items")) || [];
          locStore.push(aItem);
          // setBill(locStore);
          localStorage.setItem("items", JSON.stringify(locStore));
          console.log(bill);
          // console.log("Items");
          clearForm();
           return;
         }

         alert("Cannot add item to the database.");
         clearForm();
         return;
        //  setBill((prev) => [...prev, aItem]); // update local UI immediately
        //  console.log(bill);
        //  localStorage.setItem("Item", response)
       } catch (error) {
         console.error(`Server error: ${error}`);
         alert(`Server caught an error: ${error}`);
       }
     }

     async function handleRemoveItem(keyname) {
      // const payload = {
      //   itemName: billItem.current,
      //   itemPrice: billPrice.current,
      // itemQuantity: billQuant.current,
      // };
      // if (!payload) {
      //   alert("Complete reference not received");
      //   return;
      // }
      try {
        const response = await fetch(`http://localhost:3000/api/deleteitem/${keyname}`,{
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        })

        if(response.ok) {
          console.log(`Item removed ${response.response}`)
         
          getItems();
          // alert('Item removed from database')
          return;
        }
        console.log(`Item failed to remove -ve response from server ${response.err}`)
        alert('Item failed to remove -ve response from server');
        return;
      } catch (error) {
        console.log(`Unexpected Behaviour Internal Server error ${error}`)
        alert(`Unexpected Behaviour Internal Server error ${error}`);
        return;
      }
    }

    async function handleRemoveItems() {
      if(!bill) {
        alert('No item left to clear')
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/removeall`,{
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        })
        if(response.ok) {
          console.log(`All Items successfully removed`)
          setBill([])
          alert('Removed successfully all items')
          return;
        }
        console.log(`Error removing items please try again!`)
        alert('Unable to remove Items!')
        return;
      } catch (error) {
        console.log(`Unexpected Behaviour Internal Server error ${error}`);
        alert(`Unexpected Behaviour Internal Server error ${error}`);
        return;
      }
    }

     function clearForm() {
      let inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.value="";
      })
     }

  return (
    <>
      <div className="main text-center items-center p-8 bg-emerald-400 font-strech-condensed text-stone-700">
        <h1 className="text-5xl font-mono p-4">Your Daily Expense Tracker</h1>
        <p className="text-lg font-serif font-strech italic">
          No need to worry we're there to manage your bills.
        </p>
      </div>
      <div className="calculator bg-yellow-200 flex h-50 justify-center gap-4 py-18">
        <input
          className="border-2 p-3 h-12 rounded-xl w-70 bg-white"
          ref={item}
          type="text"
          placeholder="Enter item"
          required
        />
        <input
          className="border-2 p-3 h-12 rounded-xl w-70 bg-white"
          ref={amount}
          type="number"
          placeholder="Enter the amount"
          required
        />
        <input
          className="border-2 p-3 h-12 rounded-xl w-50 bg-white"
          ref={quantity}
          type="number"
          placeholder="Enter the quantity"
          required
        />
        <button
          onClick={calculateBill}
          className="font-black flex cursor-pointer hover:bg-red-400 items-center bg-red-200 p-4 h-12 rounded-2xl hover:scale-105 transform-3d"
        >
          =
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-100 border-t-transparent"></div>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 mt-3 px-4 py-3 rounded mx-4"
          role="alert"
        >
          <p>{error}</p>
        </div>
      )}
      {console.log(JSON.stringify(bill))}
      {bill && !loading && !error && (
        <div className="bg-yellow-200 h-screen pt-5 pb-10">
          {bill.map((b) => {
            return (
              <>
                <div
                  className="h-15 bg-stone-600 rounded-xl w-220 box-shadow my-3 mx-3 flex text-center items-center justify-self-center justify-center "
                  key={b.itemName}
                >
                  <h3 className="px-9 text-white text-lg">
                    Item Name: {b.itemName}
                  </h3>
                  <h4 className="px-9 text-white text-lg">Price: {b.price}</h4>
                  <h4 className="px-9 text-white text-lg">
                    Quantity: {b.itemQuantity}
                  </h4>
                  <button
                    onClick={() => handleRemoveItem(b.itemName)}
                    className="ps-9 pr-5 text-orange-300 cursor-pointer"
                  >
                    Remove Items
                  </button>
                </div>
              </>
            );
          })}
          {!loading && !error && bill.length > 0 && (
            <>
              <h1 className="text-2xl font-bold text-stone-700 text-center pt-4">
                Total bill is:{" "}
                {bill.reduce((sum, b) => sum + b.itemQuantity * b.price, 0)}
              </h1>
              <button className="bg-red-700 text-white p-2 m-6 cursor-pointer w-16 text-center text-lg rounded-xl items-center justify-center justify-self-center flex" onClick={handleRemoveItems}>Clear</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Home