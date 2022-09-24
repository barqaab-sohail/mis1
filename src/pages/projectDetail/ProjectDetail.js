import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
// material-ui
import { Button, Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { useParams } from 'react-router-dom';
import Highlighter from '../../components/third-party/Highlighter';

// ==============================|| PROJECT DETAIL PAGE ||============================== //

const ProjectDetail = () => {
    const { ProjectId } = useParams();
    const [projectDetail, setProjectDetail] = useState([]);
    const nav = useNavigate();
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
            <Button variant="contained" href="#contained-buttons">
                Link
            </Button>
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
                <Typography>
                    <b>Last Invoice Month :</b> {projectDetail.lastInvoiceMonth}
                </Typography>
                <Typography>
                    <b>Total Project Cost W/O Sales Tax : </b>
                    {projectDetail.projectTotalCostWOTax}
                </Typography>
                <Typography>
                    <b>Total Invoices Raised w/O Sales Tax :</b> {projectDetail.totalInvoicesAmountWOTax}
                </Typography>
                {projectDetail.projectType === 'Lumpsum' ? <Typography>Total Expenses: </Typography> : ''}
            </MainCard>
        </>
    );
};

export default ProjectDetail;
