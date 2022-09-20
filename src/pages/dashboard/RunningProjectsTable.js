import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
// material-ui
import { Grid, Typography } from '@mui/material';
import MaterialTable from 'material-table';
const END_POINT = '/powerRunningProjectsTable';

const RunningProjectsTable = () => {
    const [runningProjects, setRunningProjects] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const resp = await axios.get(END_POINT);
                setRunningProjects(await resp.data);
            } catch (err) {
                console.log(err);
            }
        };

        sendGetRequest();
    }, []);

    const columns = [
        { title: 'Type', field: 'projectType', cellStyle: { width: '5%' } },
        {
            title: 'Project Name',
            field: 'projectName',
            cellStyle: { width: '50%' }
        },
        { title: 'Payment Received', field: 'paymentReceived' },
        { title: 'Pending Payments', field: 'pendingPayments' },
        { title: 'Budget Utilization', field: 'budgetUtilization' },
        { title: 'Project Progress', field: 'projectProgress' }
    ];

    return (
        <>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <MaterialTable
                    columns={columns}
                    title="List of Power Running Projects"
                    data={runningProjects}
                    onRowClick={(event, rowData) => {
                        nav('/project-detail');
                        console.log(rowData.id);
                    }}
                />
            </Grid>
        </>
    );
};

export default RunningProjectsTable;
