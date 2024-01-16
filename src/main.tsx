import "./index.scss";
import "./fonts/Tocco-Bold.woff";
import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
