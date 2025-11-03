import React from 'react'

const Hero = () => {
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
        className="hero bg-teal h-full w-full"
        style={{
          position: "relative",
          background:
            "linear-gradient(to right, rgba(155, 180, 192), rgba(138, 190, 185))",
          height: "40vw",
        }}
      >
        <h1
          className="text-4xl text-black"
          style={{
            fontFamily: "Titillium Web",
            position: "relative",
            left: "5vw",
            top: "10vw",
            color: "white",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          Library Management System{" "}
          <span className="text-lg">
            <sub>powered by LiBX</sub>
          </span>
        </h1>
        <p
          className="headline text-2xl text-white"
          style={{
            fontFamily: "Momo signature",
            position: "absolute",
            bottom: "22vw",
            left: "7vw",
          }}
        >
          ~ Manage Books Smarter with SmartLibrary
        </p>
        <button
          style={{ position: "absolute", left: "9vw", bottom: "17vw" }}
          className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-3xl"
        >
          Give us a Quote
        </button>
        <div
          className="booksImg"
          style={{
            position: "absolute",
            right: "0",
            top: "0",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600904290455-241ce18f78bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=718')",
            height: "100%",
            width: "31%",
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </>
  );
}

export default Hero