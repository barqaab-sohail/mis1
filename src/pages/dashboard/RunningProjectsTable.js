import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
// material-ui
import { Grid, Typography } from '@mui/material';
import MaterialTable from 'material-table';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@material-ui/core/CircularProgress';
const END_POINT = '/powerRunningProjectsTable';

const RunningProjectsTable = () => {
    const nav = useNavigate();
    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['powerRunnProjectsTable'],
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

    const columns = [
        { title: 'Type', field: 'projectType', cellStyle: { width: '5%' } },
        {
            title: 'Project Name',
            field: 'projectName',
            cellStyle: { width: '50%' }
        },
        { title: 'Payment Received', field: 'paymentReceived' },
        { title: 'Pending Receipts', field: 'pendingPayments' },
        { title: 'Budget Utilization', field: 'budgetUtilization' },
        { title: 'Project Progress', field: 'projectProgress' },
        { title: 'Last Invoice', field: 'latestInvoiceMonth' },
        { title: 'Last Expense', field: 'latestExpenditureMonth' },
        { title: 'Last Receipt', field: 'latestPaymentMonth' }
    ];

    return (
        <>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <MaterialTable
                    columns={columns}
                    title="List of Power Running Projects"
                    data={data?.data}
                    onRowClick={(event, rowData) => {
                        nav('/project-detail/' + rowData.id);
                    }}
                    options={{ headerStyle: { position: 'sticky', top: 0 }, maxBodyHeight: '650px' }}
                />
            </Grid>
        </>
    );
};

export default RunningProjectsTable;
