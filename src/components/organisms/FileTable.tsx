import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material';
import humanFormat from 'human-format';
import {File} from "@/@types/global";

interface FileTableProps {
    files: File[];
}

export const FileTable: React.FC<FileTableProps> = ({ files }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Название</TableCell>
                        <TableCell align="right">Размер</TableCell>
                        <TableCell align="right">Формат</TableCell>
                        <TableCell align="right">Страницы</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow key={file._id}>
                            <TableCell component="th" scope="row">
                                {file.originalname}
                            </TableCell>
                            <TableCell align="right">{humanFormat(file.size)}</TableCell>
                            <TableCell align="right">{file.mimetype}</TableCell>
                            <TableCell align="right">{file.pageCount}</TableCell>
                        </TableRow>
                    ))}
                    {!files.length && (
                        <TableRow>
                            <TableCell colSpan={4} align="center">
                                <Typography variant="body2" color="textSecondary">
                                    Нет загруженных файлов
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
