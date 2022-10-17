import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { FixedSizeList as List } from 'react-window';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// material-ui
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import MaterialTable from 'material-table';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const END_POINT = '/employees';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [filterEmployees, setFilterEmployees] = useState([]);
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
    // if (employees.length === 0) {
    //     return <CircularProgress />;
    // }

    const handleSearch = (event) => {
        if (event.target.value != '') {
            const filtered = employees.filter((employee) => {
                return employee.full_name.toLowerCase().includes(event.target.value.toLowerCase());
            });
            setEmployees(filtered);
        }
    };

    return (
        <>
            <TextField id="standard-basic" label="Search" onChange={(event) => handleSearch(event)} />
            <h1>Employee Lists</h1>

            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    {employees.map((item, key) => {
                        return (
                            <Card key={key} sx={{ maxWidth: 500, background: '#bbdefb' }}>
                                <Grid container spacing={1}>
                                    <Grid item lg={4}>
                                        {/* <CardMedia component="img" width="10%" image={item.picture} alt="Employee Picture" /> */}
                                        <LazyLoadImage effect="blur" src={item.picture} alt="employee picture" width="100%" />
                                    </Grid>
                                    <Grid item lg={8}>
                                        {/* <CardHeader title={item.full_name} subheader={item.designation} /> */}
                                        <Typography variant="h4">{item.full_name}</Typography>
                                        <Typography variant="h5">{item.designation}</Typography>
                                        <Typography>Date of Joining: {item.date_of_joining}</Typography>
                                        <Typography>CNIC: {item.cnic}</Typography>
                                        <Typography>Employee No: {item.employee_no}</Typography>
                                        <Typography>Date of Birth: {item.date_of_birth}</Typography>
                                        <Typography>Contact Number: {item.mobile}</Typography>
                                        <Typography>Current Status: {item.status}</Typography>
                                    </Grid>
                                </Grid>
                            </Card>
                        );
                    })}
                </Stack>
            </Box>
        </>
    );
};
export default EmployeeList;
