import React from 'react'

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <nav
        className="navsection h-16 flex items-center justify-between bg-slate-500 fixed w-full top-0 z-50"
      >
        <span className="logo ps-8 text-indigo-50 text-2xl">LiBX</span>
        <ul className="flex pr-10">
          <li 
            onClick={() => scrollToSection('hero')}
            className="text-indigo-50 text-md list-none p-5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            Home
          </li>
          <li 
            onClick={() => scrollToSection('inventory')}
            className="text-indigo-50 text-md list-none p-5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            Inventory
          </li>
          <li 
            onClick={() => scrollToSection('getBook')}
            className="text-indigo-50 text-md list-none p-5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            GetBook
          </li>
          <li 
            onClick={() => scrollToSection('addBook')}
            className="text-indigo-50 text-md list-none p-5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            AddBook
          </li>
          <li 
            onClick={() => scrollToSection('addBook')}
            className="text-indigo-50 text-md list-none p-5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            Update Book
          </li>
          <li 
            onClick={() => scrollToSection('addBook')}
            className="text-indigo-50 text-md list-none p-5 cursor-pointer hover:bg-slate-800 transition-colors"
          >
            DeleteBook
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar