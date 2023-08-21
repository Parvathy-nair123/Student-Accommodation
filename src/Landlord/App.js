import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "../Common/Page/Footer";
import MailList from "../Common/Page/MailList";
import { Route, Routes } from "react-router-dom";
import AddProperty from "./pages/AddProperty";
import ViewProperty from "./pages/ViewProperty";
import Properties from "../Common/Page/Properties";
import ViewRequests from "./pages/ViewRequest";
import UpdatePropertyForm from "./pages/UpdateProperty";

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
          <Route path="/AddProperty" element={<AddProperty />} />
          <Route path="/ViewProperty" element={<ViewProperty />} />
          <Route path="/ViewRequests" element={<ViewRequests />} />
          <Route path="/UpdateProperty/:uid" element={<UpdatePropertyForm />} />
        </Routes>
        <MailList />
        <Footer />
      </div>
    </div>
  );
}

export default App;
