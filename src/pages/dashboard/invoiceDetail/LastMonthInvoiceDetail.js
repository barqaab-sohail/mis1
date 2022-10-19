import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { Grid, Button, Typography } from '@mui/material';
const END_POINT = '/lastMonthInvoices';

const LastMonthInvoiceDetail = () => {
    const [lastMonthInvoices, setLastMonthInvoices] = useState([]);
    const nav = useNavigate();

    const dashboard = () => {
        nav('/dashboard');
    };

    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const resp = await axios.get(END_POINT);
                setLastMonthInvoices(await resp.data);
            } catch (err) {
                console.log(err);
            }
        };

        sendGetRequest();
    }, []);

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
                    data={lastMonthInvoices}
                    options={{ headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '650px', pageSize: 10 }}
                />
            </Grid>
        </>
    );
};

export default LastMonthInvoiceDetail;
