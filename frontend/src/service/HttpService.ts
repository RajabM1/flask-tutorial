import axios from "axios";
import { getAccessToken } from "../utils/jwtHelpers";
class HttpService {
    private static getHeader() {
        return {
            Authorization: "Bearer " + getAccessToken()
        }
    }

    public static getRequest(url: string) {
        const xhr = axios({
            method: "GET",
            url: `${import.meta.env.VITE_BASE_URL}${url}`,
            headers: HttpService.getHeader(),
        }).then((res) => res.data);

        return xhr;
    }

    public static postRequest(url: string, body: object) {
        const xhr = axios({
            method: "POST",
            url: `${import.meta.env.VITE_BASE_URL}${url}`,
            headers: {
                "Content-Type": "application/json",
                ...HttpService.getHeader(),
            },
            data: JSON.stringify(body)
        }).then((res) => res.data);

        return xhr;
    }

    public static patchRequest(url: string, body: object) {
        const xhr = axios({
            method: "PATCH",
            url: `${import.meta.env.VITE_BASE_URL}${url}`,
            headers: {
                "Content-Type": "application/json",
                ...HttpService.getHeader(),
            },
            data: JSON.stringify(body)
        }).then((res) => res.data);

        return xhr;
    }

    public static deleteRequest(url: string) {
        const xhr = axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BASE_URL}${url}`,
            headers: HttpService.getHeader(),
        }).then((res) => res.data);

        return xhr;
    }
}

export default HttpService;
