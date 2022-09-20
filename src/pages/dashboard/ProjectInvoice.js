import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
const END_POINT = '/invoiceData';

// material-ui
import { Grid, Typography } from '@mui/material';

const ProjectInvoice = () => {
    const [powerInvoice, setPowerInvoice] = useState([]);

    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const resp = await axios.get(END_POINT);
                setPowerInvoice(await resp.data);
            } catch (err) {
                console.log(err);
            }
        };

        sendGetRequest();
    }, []);

    return (
        <>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <AnalyticEcommerce title="Total Power Projects Running" count={powerInvoice.total_power_projects_running} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <AnalyticEcommerce title="Current Month Payment Received" count={powerInvoice.current_month_received} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <AnalyticEcommerce title="Last Month Payment Received" count={powerInvoice.last_month_received} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <AnalyticEcommerce title="Current Month Total Invoices" count={powerInvoice.current_month_invoice} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}>
                <AnalyticEcommerce title="Last Month Total Invoices" count={powerInvoice.last_month_invoice} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={2}></Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
        </>
    );
};

export default ProjectInvoice;
