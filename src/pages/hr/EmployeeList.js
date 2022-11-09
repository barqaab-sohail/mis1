import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { FixedSizeList as List } from 'react-window';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// material-ui
import { Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@material-ui/core/TextField';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
const END_POINT = '/employees';

const EmployeeList = () => {
    const [searchText, setSearchText] = useState('');
    const nav = useNavigate();

    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['employees'],
        () => {
            return api.get(END_POINT);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );
    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <>
            <TextField id="standard-basic" label="Search" onChange={({ target }) => setSearchText(target.value)} />
            <h1>Employee Lists</h1>

            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    {data?.data
                        .filter((employee) => {
                            return JSON.stringify(employee).toLowerCase().includes(searchText.toLowerCase());
                        })
                        .map((item, key) => {
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
