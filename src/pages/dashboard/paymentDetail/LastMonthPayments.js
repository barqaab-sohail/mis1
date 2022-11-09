import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Grid, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
const END_POINT = '/lastMonthPaymentReceived';

const LastMonthPayments = () => {
    const nav = useNavigate();

    const dashboard = () => {
        nav('/dashboard');
    };

    const token = localStorage.getItem('auth_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['lastMonthPaymentReceived'],
        () => {
            return axios.get(END_POINT);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );
    if (isLoading) {
        return <CircularProgress />;
    }

    const columns = [
        { title: 'Project Name', field: 'projectName', cellStyle: { width: '75%' } },
        { title: 'Payment Received', field: 'amountReceived' }
    ];
    return (
        <>
            <Button variant="contained" onClick={dashboard}>
                Dashboard
            </Button>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <MaterialTable
                    columns={columns}
                    title="Last Month Payment Received Detail"
                    data={data?.data}
                    options={{ headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '650px' }}
                />
            </Grid>
        </>
    );
};

export default LastMonthPayments;
