import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import BookService from "./../../services/bookService";
import Helper from './../../services/helper';
function BookList() {
  const [state, setState] = useState({
    loading: false,
    books: [],
    errorMessage: "",
  });

  useEffect(() => {
    try {
      setState({ ...state, loading: true });
      async function getData() {
        let resBook = await BookService.getBooks();
        setState({
          ...state,
          loading: false,
          books: resBook.data,
        });
      }
      getData();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  const { loading, books } = state;

  return (
    <>
      <section className="create-book my-2">
        <div className="container">
          <div className="d-flex align-items-center">
            <h3 className="me-2">Book Management</h3>
            <button className="btn btn-primary btn-sm">
              <i className="fa fa-circle-plus me-2"></i>
              New
            </button>
          </div>
          <div>
            <form className="d-flex w-25">
              <input type="text" className="form-control"></input>
              <button className="btn btn-outline-secondary btn-sm ms-2">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            {loading ? (
              <Spinner />
            ) : (
              books.map((book) => (
                <div className="col-md-4 mb-4" key={book.id}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row d-flex align-items-center">
                        <div className="col-md-3">
                            <img className="rounded photo-md" src={book.photo} alt='' />
                        </div>
                        <div className="col-md-8">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    Book Name: <span className="fw-bolder">{book.bookName}</span>
                                </li>
                                <li className="list-group-item">
                                    Price: <span className="fw-bolder">{Helper.formatCurrency(book.price)}</span>
                                </li>
                                <li className="list-group-item">
                                    Author: <span className="fw-bolder">{book.author}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1">
                            <div className="d-flex flex-column align-items-center">
                                <button className="btn btn-warning btn-sm">
                                    <i className="fa fa-eye"></i>
                                </button>
                                <button className="btn btn-primary btn-sm my-3">
                                    <i className="fa fa-edit"></i>
                                </button>
                                <button className="btn btn-danger btn-sm">
                                    <i className="fa fa-trash"></i>
                                </button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
export default BookList;
