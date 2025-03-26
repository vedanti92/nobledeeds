import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080';

createRoot(document.getElementById("root")).render(<App />);
