import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Grid, Button, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
const END_POINT = '/lastMonthInvoices';

const LastMonthInvoiceDetail = () => {
    const nav = useNavigate();

    const { isLoading, error, data } = useQuery(['lastMonthInvoices'], () => {
        return axios.get(END_POINT);
    });

    const dashboard = () => {
        nav('/dashboard');
    };

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
