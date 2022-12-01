import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryService from "./../../services/categoryService";
import PublisherService from "./../../services/publisherService";
import noBookPhoto from "../../assets/images/noBookPhoto.png";
import BookService from "../../services/bookService";
import FileHelper from "./../../services/fileHelper";
function CreateBook() {
  //create state to get a obj book
  const [state, setState] = useState({
    loading: false,
    categories: [],
    publishers: [],
    book: {},
    errorMessage: "",
  });

  // state upload file
  const [fileImg, setFileImg] = useState({
    uploading: false,
    file: {},
  });

  //navigate route link page
  const navigate = useNavigate();

  //call api async to get categories and publishers data
  useEffect(() => {
    try {
      setState({ ...state, loading: true });
      async function getData() {
        let catRes = await CategoryService.getCategories();
        let pubRes = await PublisherService.getPublishers();
        setState({
          ...state,
          categories: catRes.data,
          publishers: pubRes.data,
          loading: false,
        });
      }
      getData();
    } catch (error) {
      toast.error(error.message);
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  }, []);

  //get input value by attribute "name" from input tag to set state value
  const handleInputValue = (e) => {
    setState({
      ...state,
      book: {
        ...book,
        [e.target.name]: e.target.value,
      },
    });
  };

  //create book
  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      setState({ ...state, loading: false });
      let createRes = await BookService.createBook(book);
      if (createRes.data) {
        setState({ ...state, loading: false });
        navigate("/reactjs-bookstore-management/", { replace: true });
        toast.success(`Book ${book.bookName} has been created success!`);
      }
    } catch (error) {
      setState({ ...state, loading: false, errorMessage: error.message });
    }
  };
  //change photo and create fake url for photo file name
  const changePhoto = (e) => {
    let photo_url_fake = URL.createObjectURL(e.target.files[0]);
    setFileImg({ ...fileImg, file: e.target.files[0] });
    setState({
      ...state,
      book: {
        ...book,
        photo: photo_url_fake,
      },
    });
  };
  //handle upload img file to cloudinary click button
  const handleUploadImage = async () => {
    setFileImg({ ...fileImg, uploading: true });
    let uploadRes = await FileHelper.uploadImage(fileImg.file);
    if (uploadRes.data) {
      toast.success("Photo uploaded success !");
      setFileImg({ ...fileImg, uploading: false });
      setState({
        ...state,
        book: {
          ...book,
          photo: uploadRes.data.url,
        },
      });
    }
  };

  //distrustering state value
  const { loading, book, categories, publishers } = state;

  return (
    <>
      <section className="create-book my-2">
        <div className="container">
          <h3 className="me-2 text-success">Create Book</h3>
          <p className="fst-italic">
            {" "}
            Sunt elit cupidatat quis dolore laborum duis ex pariatur ut aute.
            Fugiat dolor fugiat reprehenderit consequat. Id dolor ex laboris
            anim elit occaecat consequat minim veniam incididunt aute nulla eu.
            Sunt qui ipsum exercitation do consectetur. Ad exercitation minim do
            do culpa tempor. Fugiat eiusmod consectetur adipisicing minim
            consequat dolor non velit minim ipsum deserunt. Fugiat aliqua nisi
            nulla nostrud aliquip cillum laborum commodo do occaecat minim.
          </p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <form className="w-100" onSubmit={handleCreateBook}>
                <div className="row align-items-center mb-2">
                  <div className="col-md-3">
                    <label className="col-form-label fw-bolder">
                      Book Name:
                    </label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="bookName"
                      className="form-control"
                      required
                      placeholder="enter book name..."
                      onInput={handleInputValue}
                    />
                  </div>
                </div>
                <div className="row align-items-center mb-2">
                  <div className="col-md-3">
                    <label className="col-form-label fw-bolder">Price:</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="number"
                      name="price"
                      min={1000}
                      max={Number.MAX_SAFE_INTEGER}
                      className="form-control"
                      required
                      placeholder="enter price..."
                      onInput={handleInputValue}
                    />
                  </div>
                </div>
                <div className="row align-items-center mb-2">
                  <div className="col-md-3">
                    <label className="col-form-label">Author</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      name="author"
                      className="form-control"
                      required
                      placeholder="enter author..."
                      onInput={handleInputValue}
                    />
                  </div>
                </div>
                <div className="row align-items-center mb-2">
                  <div className="col-md-3">
                    <label className="col-form-label">Publish Year</label>
                  </div>
                  <div className="col-md-9">
                    <input
                      type="number"
                      name="publishYear"
                      className="form-control"
                      required
                      placeholder="Publish Year"
                      min="1900"
                      max={new Date().getFullYear()}
                      onInput={handleInputValue}
                    />
                  </div>
                </div>
                <div className="row align-items-center mb-2">
                  <div className="col-md-3">
                    <label className="col-form-label">Category</label>
                  </div>
                  <div className="col-md-9">
                    <select name="catId" className="form-control" onChange={handleInputValue}>
                        {
                            categories && categories.map((cat) => (
                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                            ))
                        }
                    </select>
                  </div>
                </div>
                <div className="row align-items-center mb-2">
                    <div className="col-md-3">
                        <label className="col-form-label">Publisher</label>
                    </div>
                    <div className="col-md-9">
                        <select name="publisherId" className="form-control" onChange={handleInputValue}>
                            {
                                publishers && publishers.map((pub) => (
                                    <option value={pub.id} key={pub.id}> {pub.publisherName}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="row align-items-center mb-2">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                            <button type="submit" className="btn btn-success btn-sm me-2">Create</button>
                            <Link to={/reactjs-bookstore-management/} className="btn btn-secondary btn-sm">Close</Link>
                    </div>
                </div>
              </form>
            </div>
            <div className="col-md-3">
              <div className="d-flex flex-column align-items-center justify-content-center">
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={changePhoto}
                />
                <img
                  className="photo-lg"
                  src={(book && book.photo) || noBookPhoto}
                  alt=""
                  role="button"
                  onClick={() =>
                    document.querySelector('input[type = "file"]').click()
                  }
                />
                {fileImg.uploading ? (
                  <button
                    className="btn btn-info btn-sm mt-1"
                    type="button"
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    />
                    Uploading ...
                  </button>
                ) : (
                  <button className="btn btn-info btn-sm mt-1" onClick={handleUploadImage}>Upload</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default CreateBook;
