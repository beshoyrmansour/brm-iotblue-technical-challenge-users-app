export interface Location {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
}

export interface User {
    firstName: string;
    id: string;
    lastName: string;
    picture: string;
    title: string;

    dateOfBirth?: string;
    email?: string;
    gender?: string;
    phone?: string;
    registerDate?: string;
    updatedDate?: string;
    location?: Location;
}
export interface NewUserFormValues {
    firstName: string;
    lastName: string;
    email: string;
}
export interface UserPost {
    id: string;
    image: string;
    likes: number;
    tags: Array<string>;
    text: string;
    publishDate: string;
    owner: User;
}

export interface GetUsersResponse {
    data: Array<User>;
    limit: number;
    page: number;
    total: number;
}
export interface GetUserDetailsResponse extends User {
    data: User;
}

export interface GetUserPostsResponse {
    data: Array<UserPost>;
    limit: number;
    page: number;
    total: number;
}