import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

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

    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['projectDetail', ProjectId],
        () => {
            return api.get(END_POINT + ProjectId);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );
    let role = '';
    if (data?.data.barqaabRole === 1) {
        role = 'Independent';
    } else if (data?.data.barqaabRole === 2) {
        role = 'JV Partner';
    } else if (data?.data.barqaabRole == 3) {
        role = 'Lead Partner';
    } else if (data?.data.barqaabRole == 4) {
        role = 'Sub Consultant';
    }
    return (
        <>
            <MainCard title={data?.data.projectName}>
                <Typography>
                    <b>Client Name :</b> {data?.data.clientName}
                </Typography>
                <Typography>
                    <b>BARQAAB Role :</b> {role}
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
                            <b>Last Payment Received :</b> {data?.data.latestPaymentAmount}
                        </Typography>
                        <Typography>
                            <b>Last Payment Date :</b> {data?.data.latestPaymentDate}
                        </Typography>
                        <Typography>
                            <b>Total Project Cost W/O Sales Tax : </b>
                            {data?.data.projectTotalCostWOTax}
                        </Typography>
                        <Typography>
                            <b>Total Invoices Raised w/O Sales Tax :</b> {data?.data.totalInvoicesAmountWOTaxWOExc}
                        </Typography>
                        <Typography>
                            <b>Last Invoice Month :</b> {data?.data.lastInvoiceMonth}
                        </Typography>
                        <Typography>
                            <b>Remaining Budget Amount:</b> {data?.data.balaneBudget}
                        </Typography>
                        <Typography>
                            <b>Remaining Budget Percentage:</b>{' '}
                            {data?.data.percentageRemainingBudget != 'No Data Found' ? data?.data.percentageRemainingBudget + '%' : ''}
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
