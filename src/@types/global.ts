export interface File {
    _id: string;
    filename: string;
    originalname: string;
    mimetype: string;
    size: number;
    pageCount: number;
}

export interface FileGetResponse {
    files: File[];
    total: number;
    totalPages: number;
    page: number;
}