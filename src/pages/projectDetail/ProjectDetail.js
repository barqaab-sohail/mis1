import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

// material-ui
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';
import Highlighter from '../../components/third-party/Highlighter';
import ExpenseChart from './ExpenseChart';
import TotalChart from './TotalChart';
import RemainingBudgetChart from './RemainingBudgetChart';
import { useQuery } from '@tanstack/react-query';
const END_POINT = '/projectDetail/';

// ==============================|| PROJECT DETAIL PAGE ||============================== //

const ProjectDetail = () => {
    const { ProjectId } = useParams();
    const nav = useNavigate();
    const dashboard = () => {
        nav('/dashboard');
    };

    const token = localStorage.getItem('auth_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['projectDetail', ProjectId],
        () => {
            return axios.get(END_POINT + ProjectId);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );

    return (
        <>
            <MainCard title={data?.data.projectName}>
                <Typography>
                    <b>Client Name :</b> {data?.data.clientName}
                </Typography>
                <Typography>
                    <b>Commencement Date :</b> {data?.data.commencementDate}
                </Typography>
                <Typography>
                    <b>Contractual Completion Date :</b> {data?.data.contractualCompletionDate}
                </Typography>
                {data?.data.projectType === 'Man Month' ? (
                    <>
                        <Typography>
                            <b>Last Invoice Month :</b> {data?.data.lastInvoiceMonth}
                        </Typography>
                        <Typography>
                            <b>Total Project Cost W/O Sales Tax : </b>
                            {data?.data.projectTotalCostWOTax}
                        </Typography>
                        <Typography>
                            <b>Total Invoices Raised w/O Sales Tax :</b> {data?.data.totalInvoicesAmountWOTaxWOExc}
                        </Typography>
                        <Typography>
                            <b>Remaining Budget :</b> {data?.data.balaneBudget}, {data?.data.percentageRemainingBudget}%
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography>Total Expenses: </Typography>
                    </>
                )}
                <CardActions>
                    <Button variant="contained" onClick={dashboard}>
                        Dashboard
                    </Button>
                </CardActions>
            </MainCard>
            {data?.data.projectType != 'Lumpsum' ? (
                <>
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <RemainingBudgetChart remainingBudget={data?.data.percentageRemainingBudget} />
                    </Grid>
                </>
            ) : (
                <>
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <TotalChart projectId={ProjectId} />
                    </Grid>
                </>
            )}

            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <ExpenseChart projectId={ProjectId} />
            </Grid>
        </>
    );
};

export default ProjectDetail;
