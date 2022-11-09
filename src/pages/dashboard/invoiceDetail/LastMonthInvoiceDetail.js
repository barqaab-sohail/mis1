import { useState, useEffect } from 'react';
import api from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Grid, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
const END_POINT = '/lastMonthInvoices';

const LastMonthInvoiceDetail = () => {
    const nav = useNavigate();

    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['lastMonthInvoices'],
        () => {
            return api.get(END_POINT);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );

    const dashboard = () => {
        nav('/dashboard');
    };
    if (isLoading) {
        return <CircularProgress />;
    }

    const columns = [
        { title: 'Project Name', field: 'projectName', cellStyle: { width: '75%' } },
        { title: 'Invoice Amount W/O GST', field: 'invoiceAmount' }
    ];
    return (
        <>
            <Button variant="contained" onClick={dashboard}>
                Dashboard
            </Button>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <MaterialTable
                    columns={columns}
                    title="Last Month Invoice Detail"
                    data={data?.data}
                    options={{ headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '650px', pageSize: 10 }}
                />
            </Grid>
        </>
    );
};

export default LastMonthInvoiceDetail;
