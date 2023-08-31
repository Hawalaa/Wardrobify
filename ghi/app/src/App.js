import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ShoesList from './ShoesList';
import HatForm from './HatForm';
import HatsList from './HatList';
import ShoeForm from './ShoeForm';


function App(props) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route path='hats'>
            <Route path='' element={<HatsList hats={props.hats} />} />
        </Route>
        <Route path='hats'>
            <Route path='new' element={<HatForm />} />
        </Route>
        <Route path='shoes'>
            <Route path='new' element={<ShoeForm />} />
        </Route>
        <Route path='shoes'>
            <Route path='' element={<ShoesList shoes={props.shoes} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
