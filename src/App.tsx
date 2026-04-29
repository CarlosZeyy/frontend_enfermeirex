import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer limit={3}/>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
