import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header/header"
import Main from "./Components/Main/main";
import Footer from "./Components/Footer/footer";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Main />
        <Footer />
    </BrowserRouter>
  );
}

export default App;
