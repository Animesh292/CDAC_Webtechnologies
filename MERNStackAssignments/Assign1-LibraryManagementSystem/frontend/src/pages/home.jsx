import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero';
import GetBook from '../components/GetBook';
import AddBook from '../components/AddBook';
import Inventory from '../components/Inventory';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <section id="hero">
          <Hero />
        </section>
        
        <section id="getBook">
          <GetBook/>
        </section>

        <section id="addBook">
          <AddBook />
        </section>
        <section id="inventory">
          <Inventory/>
        </section>
        <Footer />

      </div>
    </div>
  );
}

export default Home;