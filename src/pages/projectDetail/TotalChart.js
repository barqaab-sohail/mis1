import { useEffect, useState } from 'react';
import axios from '../../api/axios';

// third-party
import Chart from 'react-apexcharts';

const TotalChart = (props) => {
    const [expenses, setExpenses] = useState('');
    const [invoices, setInvoices] = useState('');
    const [payments, setPayments] = useState('');
    const [budget, setBudget] = useState('');
    const colors = ['#04cf30', '#fc1403', '#0307fc', '#f502a0'];
    useEffect(() => {
        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const dataReq = await axios.get('/totalBudgetExpenditure/' + props.projectId);
                const dataRes = await dataReq.data;
                setInvoices(dataRes.totalInvoice);
                setExpenses(dataRes.totalExpense);
                setPayments(dataRes.totalPayment);
                setBudget(dataRes.budget);
            } catch (err) {
                console.log(err);
            }
        };
        sendGetRequest();
    }, []);

    return (
        <Chart
            options={{
                chart: {
                    id: 'expense-chart'
                },
                colors: colors,
                xaxis: {
                    categories: [
                        ['Total', 'Budget'],
                        ['Total', 'Expenses'],
                        ['Total', 'Payments'],
                        ['Total', 'Invoices']
                    ]
                },
                yaxis: {
                    show: true,
                    labels: {
                        show: true,
                        formatter: function (val, index) {
                            var parts = val?.toString().split('.') || '';
                            if (parts) {
                                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                                return parts.join('.');
                            } else {
                                return '';
                            }
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        columnWidth: '45%',
                        distributed: true
                    }
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, index) {
                        var parts = val?.toString().split('.') || '';
                        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                        return parts.join('.');
                    }
                },

                tooltip: {
                    enabled: true
                }
            }}
            series={[{ data: [budget, expenses, payments, invoices] }]}
            type="bar"
            width={'100%'}
            height={500}
        />
    );
};

export default TotalChart;
