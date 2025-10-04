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
import '../i18n';
import { useTranslation } from 'react-i18next';
import { Counter } from './components/Counter';
import { LoaderProvider } from './components/Loader';
import { Product } from './components/Product';
import { ProductDetails } from './components/ProductDetails';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <LoaderProvider>
          <Container>
            <HStack mb={20}>
              <Button variant="subtle">
                <Link to={RoutesEnum.Home}>{t('menu.home')}</Link>
              </Button>
              <Button variant="subtle">
                <Link to={RoutesEnum.About}>{t('menu.about')}</Link>
              </Button>
              <Button variant="subtle">
                <Link to={RoutesEnum.User + '/123'}>{t('menu.user')}</Link>
              </Button>
              <Button variant="subtle">
                <Link to={RoutesEnum.Form}>{t('menu.form')}</Link>
              </Button>
              <Button variant="subtle">
                <Link to={RoutesEnum.Counter}>{t('menu.counter')}</Link>
              </Button>
              <Button variant="subtle">
                <Link to={RoutesEnum.Product}>{t('menu.product')}</Link>
              </Button>

              <Button onClick={() => changeLanguage('en')}>
                {t('menu.language.english')}
              </Button>
              <Button onClick={() => changeLanguage('pl')}>
                {t('menu.language.polish')}
              </Button>
            </HStack>

            <Routes>
              <Route path={RoutesEnum.Home} element={<Home />} />
              <Route path={RoutesEnum.About} element={<About />} />
              <Route path={RoutesEnum.UserDetails} element={<UserDetails />} />
              <Route path={RoutesEnum.Form} element={<Form />} />
              <Route path={RoutesEnum.Counter} element={<Counter />} />
              <Route path={RoutesEnum.Product} element={<Product />} />
              <Route
                path={RoutesEnum.ProductDetails}
                element={<ProductDetails />}
              />
            </Routes>
            <Toaster />
          </Container>
        </LoaderProvider>
      </Router>
    </Provider>
  );
}

export default App;
