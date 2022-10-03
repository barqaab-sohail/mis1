import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import axios from '../../api/axios';

const ExpenseChart = (props) => {
    const [months, setMonths] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const getMonth = [];
        const getExpenses = [];
        const getInvoices = [];
        const getPayments = [];

        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const dataReq = await axios.get('/projectExpenseChart/' + props.projectId);
                const dataRes = await dataReq.data;

                dataRes.map((Item) => {
                    getMonth.push(Item.months);
                    getExpenses.push(Item.expenses);
                    getInvoices.push(Item.invoices);
                    getPayments.push(Item.payments);
                });
                setMonths(getMonth);
                setInvoices(getInvoices);
                setExpenses(getExpenses);
                setPayments(getPayments);
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
                xaxis: {
                    categories: months
                },
                yaxis: {
                    show: true,
                    labels: {
                        show: false,
                        formatter: function (val, index) {
                            return val;
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val, index) {
                            var parts = val.toString().split('.');
                            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            return parts.join('.');
                        }
                    }
                }
            }}
            series={[
                {
                    name: 'Invoices',
                    data: invoices
                },
                {
                    name: 'Payments',
                    data: payments
                },
                {
                    name: 'Expenses',
                    data: expenses
                }
            ]}
            type="bar"
            width={'100%'}
            height={500}
        />
    );
};

export default ExpenseChart;
