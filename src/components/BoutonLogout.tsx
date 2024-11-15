import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

export default function ContainedButtons() {
    const router = useRouter()
    const handlelogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    return (
        <Button variant="contained" onClick={handlelogout}>
            Deconnexion
        </Button>
    );
}