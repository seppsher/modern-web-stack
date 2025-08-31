import "./App.css";
import { Provider } from "./components/ui/provider";
import { Routes as RoutesEnum } from "./enums/Routes";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { UserDetails } from "./components/UserDetails";
import { Form } from "./components/Form";

function App() {
  return (
    <Provider>
      <Router>
        <nav>
          <Link to={RoutesEnum.Home}>Home</Link>
          <Link to={RoutesEnum.About}>About</Link>
          <Link to={RoutesEnum.User + "/123"}>User</Link>
          <Link to={RoutesEnum.Form}>Form</Link>
        </nav>

        <Routes>
          <Route path={RoutesEnum.Home} element={<Home />} />
          <Route path={RoutesEnum.About} element={<About />} />
          <Route path={RoutesEnum.UserDetails} element={<UserDetails />} />
          <Route path={RoutesEnum.Form} element={<Form />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
