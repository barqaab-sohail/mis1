import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
const END_POINT = '/invoiceData';

// material-ui
import { Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

const ProjectInvoice = () => {
    const nav = useNavigate();

    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['projectInvoice'],
        () => {
            return api.get(END_POINT);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );

    const currentMonthPaymentDetail = () => {
        if (data?.data.current_month_received != 0) {
            nav('/current-month-payment-detail');
        } else {
            console.log('No Payment Received');
        }
    };

    const lastMonthPaymentDetail = () => {
        if (data?.data.last_month_received != 0) {
            nav('/last-month-payment-detail');
        } else {
            console.log('No Payment Received');
        }
    };

    const currentMonthInvoiceDetail = () => {
        if (data?.data.current_month_invoice != 0) {
            nav('/current-month-invoice-detail');
        } else {
            console.log('No Invoice Raised');
        }
    };

    const lastMonthInvoiceDetail = () => {
        if (data?.data.last_month_invoice != 0) {
            nav('/last-month-invoice-detail');
        } else {
            console.log('No Invoice Raised');
        }
    };

    return (
        <>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <AnalyticEcommerce title="Total Power Projects Running" count={data?.data.total_power_projects_running} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} onClick={currentMonthPaymentDetail}>
                <AnalyticEcommerce title="Current Month Payment Received" count={data?.data.current_month_received} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} onClick={lastMonthPaymentDetail}>
                <AnalyticEcommerce title="Last Month Payment Received" count={data?.data.last_month_received} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} onClick={currentMonthInvoiceDetail}>
                <AnalyticEcommerce title="Current Month Total Invoices" count={data?.data.current_month_invoice} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2} onClick={lastMonthInvoiceDetail}>
                <AnalyticEcommerce title="Last Month Total Invoices" count={data?.data.last_month_invoice} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}></Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </>
    );
};

export default ProjectInvoice;
