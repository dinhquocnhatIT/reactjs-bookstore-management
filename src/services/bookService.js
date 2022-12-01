//file service chinh de call api
import axios from "axios";
import { BOOK_LIST_API } from "./common";

class BookService{
    static getBooks() {
        return axios.get(BOOK_LIST_API)
    }
}
export default BookService;