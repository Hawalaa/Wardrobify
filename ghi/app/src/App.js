import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import ShoeForm from './ShoeForm';

function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path='shoes'>
            <Route path='' element={<ShoesList shoes={props.shoes} />} />
        </Route>
        <Route path='shoes'>
            <Route path='new' element={<ShoeForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
