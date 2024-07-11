import React, { useState } from 'react';
import { Button, TextField, Box, LinearProgress, Typography } from '@mui/material';

interface FileUploadFormProps {
    onSubmit: (formData: FormData) => Promise<void>;
    isLoading: boolean;
}

export const FileUploadForm: React.FC<FileUploadFormProps> = ({ onSubmit, isLoading }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('userId', process.env.NEXT_PUBLIC_USER_ID!);
            await onSubmit(formData);
            setSelectedFile(null); // Очищаем поле после загрузки
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target.files?.[0] || null);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                type="file"
                inputProps={{ accept: '.pdf' }}
                onChange={handleFileChange}
                fullWidth
                margin="normal"
            />
            {selectedFile && (
                <Typography variant="body2" color="textSecondary">
                    Выбранный файл: {selectedFile.name}
                </Typography>
            )}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={!selectedFile || isLoading}
            >
                Загрузить
            </Button>
            {isLoading && <LinearProgress />}
        </Box>
    );
};
