import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import Routers from "./routes/Routers";

const App = () => {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
};

export default App;
