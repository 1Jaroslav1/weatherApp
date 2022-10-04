import Header from '../header/Header';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {lazy, Suspense} from 'react'
import Spinner from '../spinner/Spinner';
import '../header/Header.scss'

const WeatherInfo = lazy(() => import('../weatherInfo/WeatherInfo'));
const FavouriteCities = lazy(() => import('../favouriteCities/FavouriteCities'));
const Page404 = lazy(() => import('../404/404'));
const About = lazy(() => import('../about/About'));

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Suspense fallback={<Spinner/>}>
          <Switch>
            <Route exact path="/">
              <WeatherInfo/>
            </Route>
            <Route exact path="/favourite_cities">
              <FavouriteCities/>
            </Route>
            <Route exact path="/about">
              <About/>
            </Route>
            <Route exact path="*">
              <Page404/>
            </Route>
          </Switch>
        </Suspense>
      </main>
    </Router>
  );
}

export default App;
