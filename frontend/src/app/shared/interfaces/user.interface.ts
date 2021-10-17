export interface IUserRequest {
    username: string;
    password: string;
}

export interface IUserResponse {
    username: string;
    password: string;
    token: string;
}