import { Routes,Route } from 'react-router-dom'
import './App.css';
import BookList from './components/BookList/BookList';
import Navbar from './components/Navbar/Navbar';
import CreateBook from './components/CreateBook/CreateBook';
import ViewBook from './components/ViewBook/ViewBook';
import UpdateBook from './components/UpdateBook/UpdateBook';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/reactjs-bookstore-management/' element={<BookList/>}/>
        <Route path='/reactjs-bookstore-management/book/create' element={<CreateBook/>}/>
        <Route path='/reactjs-bookstore-management/book/view/:bookId' element={<ViewBook/>}/>
        <Route path='/reactjs-bookstore-management/update/:bookId' element={<UpdateBook/>}/>
      </Routes>
    </>
  );
}

export default App;
