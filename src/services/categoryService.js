import axios from "axios";
import { CATEGORY_API } from "./common";

class CategoryService {
    static getCategories() {
        return axios.get(CATEGORY_API)
    }
    static getCategory(catId) {
        return axios.get(`${CATEGORY_API}/${catId}`)
    }
}
export default CategoryService;