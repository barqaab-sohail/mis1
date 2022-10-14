import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
// material-ui
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import MaterialTable from 'material-table';
const END_POINT = '/employees';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const resp = await axios.get(END_POINT);
                setEmployees(await resp.data);
            } catch (err) {
                console.log(err);
            }
        };
        sendGetRequest();
    }, []);

    return (
        <>
            <h1>Employee Lists</h1>
            {employees.map((item) => {
                return (
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia component="img" width="10%" image={item.picture} alt="Employee Picture" />
                        <CardHeader title={item.full_name} subheader={item.designation} />
                    </Card>
                );
            })}
        </>
    );
};
export default EmployeeList;
