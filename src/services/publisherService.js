import axios from "axios";
import { PUBLISHER_API } from "./common";

class PublisherService {
    static getPublishers() {
        return axios.get(PUBLISHER_API)
    }
    static getPublisher(pubId) {
        return axios.get(`${PUBLISHER_API}/${pubId}`)
    }
}
export default PublisherService;