import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import MailList from "./components/mailList/MailList";
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search/Search";
import ViewMore from "./pages/ViewMore/ViewMore";
import Favourite from "./pages/Favourite/Favourite";
import ViewPost from "./pages/ViewMore/ViewPost";
import Properties from "../Properties";

function App() {
  

  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Routes>
          <Route path="/" element={
            <Properties/>
          } />
          <Route path="/Search" element={<Search />} />
          <Route path="/Post" element={<ViewPost />} />
          <Route path="/ViewMore/:id" element={<ViewMore />} />
          <Route path="/Favourite" element={<Favourite />} />
        </Routes>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
