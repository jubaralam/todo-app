import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Routers from "./routes/Routers";

const App = () => {
  return (
    <BrowserRouter>
      App container
      <Routers />
    </BrowserRouter>
  );
};

export default App;
