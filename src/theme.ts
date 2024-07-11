'use client';

import { Inter } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        background: {
            default: '#f5f5f5',
        },
        mode: 'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#f44336',
        },
        warning: {
            main: '#ff9800',
        },
        info: {
            main: '#2196f3',
        },
        success: {
            main: '#4caf50',
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
    },
});

export default theme;