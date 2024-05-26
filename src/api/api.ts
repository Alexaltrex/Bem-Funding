import axios, {AxiosResponse} from "axios";

export const instance = axios.create({
    baseURL: "https://bem-funding.digit-nova.com/api/v1/",
    withCredentials: true
});

export interface ITradingUpdate {
    id: number
    title: string
    content: string
    editor: string
    date: string
    image: string | null
}

export const tradingUpdatesApi = {
    getAll: async () => {
        const response = await instance.get<any, AxiosResponse<ITradingUpdate[]>>('trading_updates');
        return response.data;
    }
}