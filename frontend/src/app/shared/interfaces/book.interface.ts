export interface IBookResponse {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    published_year: number;
    author_name: string;
    created_at: string;
    book_genres: Array<string>
}

export interface IBookRequest {
    title: string;
    description: string;
    thumbnail: string;
    published_year?: number;
    author_name: string;
    created_at: string;
    book_genres: Array<string>;
}