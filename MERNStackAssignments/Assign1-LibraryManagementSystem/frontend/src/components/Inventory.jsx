import React, {useState, useEffect} from 'react'

const Inventory = () => {
     const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3000/api/getbooks');
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                setBooks(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch books: ' + err.message);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []); // Empty dependency array means this runs once on mount

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
      <div className="min-h-screen text-center pb-10" style={{ backgroundColor: "#616527"}}>
        <h1 className="py-8 text-3xl text-shadow-emerald-900 text-blue-100">
          Inventory Panel! Explore Books Now
        </h1>

        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-blue-100 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4" role="alert">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {books.map((book) => (
              <div 
                key={book.id} 
                className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105"
              >
                <img className="h-80 pb-3 justify-self-center" src={book.image} alt="img" />
                <h2 className="text-xl font-bold text-gray-800 mb-2">{book.bookName}</h2>
                <p className="text-gray-600 mb-2">Author: {book.bookAuthor}</p>
                <p className="text-gray-600 mb-2">Genre: {book.bookGenre}</p>
                {book.availability == 1 ? (
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
                    Available
                  </span>
                ) : (
                  <span className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded">
                    Not Available
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {!loading && !error && books.length === 0 && (
          <div className="text-blue-100 text-xl py-8">
            No books found in the inventory.
          </div>
        )}
      </div>
    </>
  );
}

export default Inventory