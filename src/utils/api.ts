import {FileGetResponse} from "@/@types/global";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost3000';

export const fetchFiles = async (userId: string, limit: number = 10, page: number = 1): Promise<FileGetResponse> => {
    try {
        console.log('fetchFiles')
        const response = await fetch(`${API_BASE_URL}/files/user/${userId}?limit=${limit}&page=${page}`);
        console.log('response', response)
        if (!response.ok) {
            console.log('Failed to fetch files')
            throw new Error('Failed to fetch files');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};

export const uploadFile = async (formData: FormData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/files`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            throw new Error('Failed to upload file');
        }
        return await response.json();
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};
