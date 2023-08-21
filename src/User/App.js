import Navbar from "./Main/components/Navbar";
import Header from "./Main/components/Header";
import Footer from "../Common/Page/Footer";
import MailList from "../Common/Page/MailList";
import { Route, Routes } from "react-router-dom";
import Search from "./Main/pages/Search";
import ViewMore from "./Main/pages/ViewMore";
import Favourite from "./Main/pages/Favourite";
import Properties from "../Common/Page/Properties";

function App() {


  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Routes>
          <Route path="/" element={
            <Properties />
          } />
          <Route path="/Search" element={<Search />} />
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