import { useState, useEffect } from 'react';
import axios from 'axios';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// material-ui
import { Grid, Typography } from '@mui/material';

const ProjectInvoice = () => {
    const [powerInvoice, setPowerInvoice] = useState([]);

    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const resp = await axios.get('http://192.168.1.10/hrms/public/api/invoiceData');
                setPowerInvoice(await resp.data);
            } catch (err) {
                console.log(err);
            }
        };

        sendGetRequest();
        console.log(powerInvoice);
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
