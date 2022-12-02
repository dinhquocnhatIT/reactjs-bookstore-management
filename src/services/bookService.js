//file service chinh de call api
import axios from "axios";
import { BOOK_LIST_API } from "./common";


class BookService{
    static getBooks() {
        return axios.get(BOOK_LIST_API)
    }
    static getBook(bookId){
        return axios.get(`${BOOK_LIST_API}/${bookId}`)
    }
    static deleteBook(bookId) {
        return axios.delete(`${BOOK_LIST_API}/${bookId}`)
    }
    static createBook(book) {
        return axios.post(BOOK_LIST_API,book)
    }
    static updateBook(book,bookId){
        return axios.put(`${BOOK_LIST_API}/${bookId}`, book)
    }
}
export default BookService;