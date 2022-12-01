import { Routes,Route } from 'react-router-dom'
import './App.css';
import BookList from './components/BookList/BookList';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/reactjs-bookstore-management/' element={<BookList/>}/>
      </Routes>
    </>
  );
}

export default App;
