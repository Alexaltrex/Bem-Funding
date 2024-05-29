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
    translations?: {
        langCode: string
        title: string
        content: string
    }[]
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
    translations: {
        langCode: string
        name: string
    }[]
}

export interface IBlogItem {
    id: number
    categoryId: number
    date: string
    author: string
    image: string | null
    slug: string
    title: string
    rank: number
    content: string
    views: number
    category: {
        id: number
        name: string
    }
    translations: {
        langCode: string
        title: string
        content: string
    }[]
}

export interface IBlog {
    id: number
    categoryId: number
    date: string
    author: string
    title: string
    image: string | null
    slug: string
    rank: number
    views: number
    translations: {
        langCode: string
        title: string
    }[]
    category: {
        name: string
        id: number
        translations: {
            name: string
            categoryId: number
        }[]
    }
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



