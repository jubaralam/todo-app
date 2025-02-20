import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import Routers from "./routes/Routers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routers />
    </BrowserRouter>
  );
};

export default App;
