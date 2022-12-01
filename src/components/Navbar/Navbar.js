import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
            <div className="container">
                <Link className="navbar-brand" to={"/reactjs-bookstore-management/"}>
                    <h3 className="d-flex ">
                        <i className="fa-solid fa-book-open-reader text-warning me-2 display-6"> </i>
                        <span className='display-6'>BookStore</span>
                        
                    </h3>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;