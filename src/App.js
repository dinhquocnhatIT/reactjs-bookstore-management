import { Routes,Route } from 'react-router-dom'
import './App.css';
import BookList from './components/BookList/BookList';
import Navbar from './components/Navbar/Navbar';
import CreateBook from './components/CreateBook/CreateBook';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/reactjs-bookstore-management/' element={<BookList/>}/>
        <Route path='/reactjs-bookstore-management/book/create' element={<CreateBook/>}/>
      </Routes>
    </>
  );
}

export default App;
