import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import MonthlyBarChart from '../dashboard/MonthlyBarChart';
import InvoiceExpenseChart from './InvoiceExpenseChart';
// material-ui
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';
import Highlighter from '../../components/third-party/Highlighter';
import ExpenseChart from './ExpenseChart';
import TotalChart from './TotalChart';
import RemainingBudgetChart from './RemainingBudgetChart';

// ==============================|| PROJECT DETAIL PAGE ||============================== //

const ProjectDetail = () => {
    const { ProjectId } = useParams();
    const [projectDetail, setProjectDetail] = useState([]);
    const nav = useNavigate();
    const dashboard = () => {
        nav('/dashboard');
    };
    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const resp = await axios.get('/projectDetail/' + ProjectId);
                setProjectDetail(await resp.data);
            } catch (err) {
                console.log(err);
            }
        };

        sendGetRequest();
    }, []);

    return (
        <>
            <MainCard title={projectDetail.projectName}>
                <Typography>
                    <b>Client Name :</b> {projectDetail.clientName}
                </Typography>
                <Typography>
                    <b>Commencement Date :</b> {projectDetail.commencementDate}
                </Typography>
                <Typography>
                    <b>Contractual Completion Date :</b> {projectDetail.contractualCompletionDate}
                </Typography>
                {projectDetail.projectType === 'Man Month' ? (
                    <>
                        <Typography>
                            <b>Last Invoice Month :</b> {projectDetail.lastInvoiceMonth}
                        </Typography>
                        <Typography>
                            <b>Total Project Cost W/O Sales Tax : </b>
                            {projectDetail.projectTotalCostWOTax}
                        </Typography>
                        <Typography>
                            <b>Total Invoices Raised w/O Sales Tax :</b> {projectDetail.totalInvoicesAmountWOTaxWOExc}
                        </Typography>
                        <Typography>
                            <b>Remaining Budget :</b> {projectDetail.balaneBudget}, {projectDetail.percentageRemainingBudget}%
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
            {projectDetail.projectType != 'Lumpsum' ? (
                <>
                    <Grid item xs={12} sx={{ mb: -2.25 }}>
                        <RemainingBudgetChart remainingBudget={projectDetail.percentageRemainingBudget} />
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
