'use client'

import React, {useState, useEffect, useRef} from 'react';
import { Container, Grid, Typography, TablePagination } from '@mui/material';
import { FileUploadForm } from '@/components/organisms/FileUploadForm';
import { FileTable } from '@/components/organisms/FileTable';
import { fetchFiles, uploadFile as uploadFileToBackend } from '@/utils/api';
import {File, FileGetResponse} from "@/@types/global";
import styles from "@/components/organisms/Files/index.module.css";

interface Props {
    userId: string;
    initFiles: FileGetResponse;
}

const Files: React.FC<Props> = ({userId, initFiles}) => {
    const [files, setFiles] = useState<File[]>(initFiles.files);
    const [totalFiles, setTotalFiles] = useState(initFiles.total);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const hasPageRendered = useRef(false);

    useEffect(() => {
        console.log('call fetch')
        if(!hasPageRendered.current) {
            hasPageRendered.current = true;
            return;
        }

        console.log('call fetch after ref')
        fetchFiles(userId, rowsPerPage, page)
            .then((data) => {
                setTotalFiles(data.total);
                setFiles(data.files);
            })
            .catch((error) => {

            }).finally(() => {
        });
    }, [rowsPerPage, page, setFiles, setTotalFiles, userId]);

    const handleFileUpload = async (formData: FormData) => {
        setIsLoading(true);
        try {
            const newFile = await uploadFileToBackend(formData);
            setFiles((prevFiles) => [...prevFiles, newFile]);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    return (
        <main className={styles.main}>
            <Container maxWidth="md">
                <Typography variant="h4" align="center" gutterBottom>
                    Мои файлы
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FileUploadForm onSubmit={handleFileUpload} isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12}>
                        <FileTable files={files} />
                        <TablePagination
                            labelRowsPerPage={'Строк на странице:'}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={totalFiles}
                            page={page - 1}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
};

export default Files;
