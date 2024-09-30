import axios from "axios";

class HttpService {
    private static getHeader() {
        return {
            Authorization: "Bearer " + window.localStorage.getItem("accessToken")
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
            },
            data: JSON.stringify(body)
        }).then((res) => res.data);

        return xhr;
    }
}

export default HttpService;
