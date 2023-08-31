import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import HatForm from './HatForm';
import HatsList from './HatList';


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
      </Routes>
    </BrowserRouter>
  );
}


export default App;
