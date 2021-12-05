import axios, { AxiosResponse } from "axios";
import { DUMMy_API } from "../constants/endpoints";
import { GetUserDetailsResponse, GetUserPostsResponse, GetUsersResponse, NewUserFormValues } from "../Types/User";

export const fetchUsersList: (page: number, total: number, limit: number) => Promise<AxiosResponse<GetUsersResponse>> = (page, total, limit) => axios.get<GetUsersResponse>(`${DUMMy_API}/user`, {
    params: {
        page,
        total,
        limit
    },
    headers: {
        "app-id": process.env.REACT_APP_DUMMY_API_APP_ID || ""
    }
})


export const fetchUserDetails: (userId: string, page: number, total: number, limit: number) => Promise<AxiosResponse<GetUserDetailsResponse>> = (userId, page, total, limit) => {

    return axios.get<GetUserDetailsResponse>(`${DUMMy_API}/user/${userId}`, {
        params: {
            page: page,
            total,
            limit
        },
        headers: {
            "app-id": process.env.REACT_APP_DUMMY_API_APP_ID || ""
        }
    })
}

export const fetchUserPosts: (userId: string, page: number, total: number, limit: number) => Promise<AxiosResponse<GetUserPostsResponse>> = (userId, page, total, limit) => axios.get<GetUserPostsResponse>(`${DUMMy_API}/user/${userId}/post`, {
    headers: {
        "app-id": process.env.REACT_APP_DUMMY_API_APP_ID || ""
    }
})


export const createNewUser: (values: NewUserFormValues) => Promise<AxiosResponse<GetUserDetailsResponse>> = (values) => axios.post<GetUserDetailsResponse>(`${DUMMy_API}/user/create`, { ...values }, {
    headers: {
        "app-id": process.env.REACT_APP_DUMMY_API_APP_ID || ""
    }
})

