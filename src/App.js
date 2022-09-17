import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ThemeSwitch from './components/ThemeSwitch';
import Game from './pages/Game';
import GenreForm from './pages/GenreForm';

function App() {
  return (
    <>
      <ThemeSwitch></ThemeSwitch>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<GenreForm />}></Route>
          <Route path='/game' element={<Game />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
