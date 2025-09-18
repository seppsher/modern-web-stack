import './App.css';
import { Provider } from './components/ui/provider';
import { Routes as RoutesEnum } from './enums/Routes';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { About } from './components/About';
import { Home } from './components/Home';
import { UserDetails } from './components/UserDetails';
import { Form } from './components/Form';
import { HStack, Button, Container } from '@chakra-ui/react';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Provider>
      <Router>
        <Container>
          <HStack mb={20}>
            <Button variant="subtle">
              <Link to={RoutesEnum.Home}>Home</Link>
            </Button>
            <Button variant="subtle">
              <Link to={RoutesEnum.About}>About</Link>
            </Button>
            <Button variant="subtle">
              <Link to={RoutesEnum.User + '/123'}>User</Link>
            </Button>
            <Button variant="subtle">
              <Link to={RoutesEnum.Form}>Form</Link>
            </Button>
          </HStack>
          <Routes>
            <Route path={RoutesEnum.Home} element={<Home />} />
            <Route path={RoutesEnum.About} element={<About />} />
            <Route path={RoutesEnum.UserDetails} element={<UserDetails />} />
            <Route path={RoutesEnum.Form} element={<Form />} />
          </Routes>
          <Toaster />
        </Container>
      </Router>
    </Provider>
  );
}

export default App;
