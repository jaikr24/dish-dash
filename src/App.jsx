import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Plate from "./pages/Plate";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";
import Authentication from "./components/authentication/Authentication";
import { useState } from "react";
import { MenuProvider } from "./contexts/MenuProvider";
import { PlateProvider } from "./contexts/PlateProvider";
import { useAccount } from "./contexts/AccountProvider";

function App() {
  const [page, setPage] = useState("/");

  const { loggedIn } = useAccount();

  return (
    <>
      <PlateProvider>
        <BrowserRouter>
          <NavBar page={page} setPage={setPage} />
          {!loggedIn && page !== "/plate" && <Authentication page={page} />}
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="menu"
              element={
                <MenuProvider>
                  <Menu />
                </MenuProvider>
              }
            />

            <Route path="plate" element={<Plate />} />
          </Routes>
          {page !== "/plate" && <Footer />}
        </BrowserRouter>
      </PlateProvider>
    </>
  );
}

export default App;
