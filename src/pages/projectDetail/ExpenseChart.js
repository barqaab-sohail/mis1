import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import api from '../../api/axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@tanstack/react-query';
const END_POINT = '/projectExpenseChart/';

const ExpenseChart = (props) => {
    const months = [];
    const expenses = [];
    const invoices = [];
    const payments = [];

    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['projectExpenseChart', props.projectId],
        () => {
            return api.get(END_POINT + props.projectId);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );
    data?.data.map((Item) => {
        months.push(Item.months);
        expenses.push(Item.expenses);
        invoices.push(Item.invoices);
        payments.push(Item.payments);
    });
    if (isLoading) {
        return <CircularProgress />;
    }
    const isAllZero = expenses.every((item) => item === 0);
    return isAllZero === false ? (
        <>
            <Chart
                options={{
                    chart: {
                        id: 'expense-chart'
                    },
                    title: {
                        text: 'Monthly Invoices, Expenses and Payments Chart ',
                        align: 'center',
                        margin: 100,
                        style: {
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#263238'
                        }
                    },
                    xaxis: {
                        categories: months
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
                series={[
                    {
                        name: 'Invoices',
                        data: invoices,
                        color: '#fc1403'
                    },
                    {
                        name: 'Expenses',
                        data: expenses,
                        color: '#0307fc'
                    },
                    {
                        name: 'Payments',
                        data: payments,
                        color: '#f502a0'
                    }
                ]}
                type="bar"
                width={'100%'}
                height={500}
            />
        </>
    ) : (
        <>
            <br />
            <br />
            <h2>Necessary Data is not Avaiable for Monthly Invoices, Payments and Expenses Chart </h2>
        </>
    );
};

export default ExpenseChart;
