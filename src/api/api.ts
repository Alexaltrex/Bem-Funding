import axios from "axios";

export const instance = axios.create({
    baseURL: "https://bem-funding.digit-nova.com/api/v1/",
    // baseURL: process.env.NODE_ENV === 'development'
    //     ? 'http://localhost:4444/shop/'
    //     : 'https://alexaltrex-common-api.herokuapp.com/shop/',
    withCredentials: true
});

export const tradingUpdatesApi = {
    getAll: async () => {
        const response = instance.get('trading_updates');
        return response;
    }
}