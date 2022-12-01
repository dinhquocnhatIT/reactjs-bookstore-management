import axios from "axios";
import { PUBLISHER_API } from "./common";

class PublisherService {
    static getPublishers() {
        return axios.get(PUBLISHER_API)
    }
}
export default PublisherService;