import axios, {AxiosResponse} from "axios";

export const uploadPath = "https://bem-funding.digit-nova.com/uploads/";
export const baseURL = "https://bem-funding.digit-nova.com/api/v1/";

export const instance = axios.create({
    baseURL,
    withCredentials: true,
});

// trading updates
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

// blog
export interface ICategory {
    id: number
    name: string
    posts: any[]
}

export interface IBlogItem {
    id: number
    title: string
    content: string
    author: string
    image: string | null
    date: string
    views: number
    slug: string
    categoryId: number
    rank: number
}

export interface IBlog extends IBlogItem {
    category: {
        name: string
    }
}

export interface ICategory {
    id: number
    name: string
}

export const blogApi = {
    getCategories: async () => {
        const response = await instance.get<any, AxiosResponse<ICategory[]>>(`categories`);
        return response.data;
    },
    getCategory: async (id: number) => {
        const response = await instance.get<any, AxiosResponse<ICategory>>(`categories/${id}`);
        return response.data;
    },
    getBlogs: async () => {
        const response = await instance.get<any, AxiosResponse<IBlog[]>>(`posts`);
        return response.data;
    },
    getBlog: async (id: string) => {
        const response = await instance.get<any, AxiosResponse<IBlogItem>>(`posts/${id}`);
        return response.data;
    },
    searchBlogs: async (payload: { title: string, categoryId: number }) => {
        const response = await instance.post<any, AxiosResponse<IBlog[]>>(
            "posts/search",
            payload.categoryId !== -1
                ? payload
                : {title: payload.title}
        );
        return response.data;
    }
}



