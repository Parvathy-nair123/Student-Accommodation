import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "../Common/Page/Footer";
import MailList from "../Common/Page/MailList";
import { Route, Routes } from "react-router-dom";
import Properties from "../Common/Page/Properties";
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
        </Routes>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
