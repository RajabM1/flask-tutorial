import { useEffect, useState } from "react";
import HttpService from "../../service/HttpService";

export const useFetch = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setData(null);
            setError(null);
            try {
                const response = await HttpService.getRequest(url);
                setData(response.data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return {
        data,
        isLoading,
        error,
    };
};
