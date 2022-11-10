import { useEffect, useState } from 'react';
import api from '../../api/axios';

// third-party
import Chart from 'react-apexcharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@tanstack/react-query';
const END_POINT = '/totalBudgetExpenditure/';

const TotalChart = (props) => {
    const colors = ['#04cf30', '#fc1403', '#0307fc', '#f502a0'];

    // const token = localStorage.getItem('auth_token');
    // api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { isLoading, error, data } = useQuery(
        ['totalBudgetExpenditure', props.projectId],
        () => {
            return api.get(END_POINT + props.projectId);
        },
        {
            staleTime: 30000, //refresh on swich screen
            refetchInterval: 60000 //refresh on some time
        }
    );
    if (isLoading) {
        return <CircularProgress />;
    }
    const categories = [
        data?.data.budget != 0 ? ['Total', 'Budget'] : '',
        ['Total', 'Expenses'],
        ['Total', 'Invoices'],
        ['Total', 'Payments']
    ];

    return (
        <Chart
            options={{
                chart: {
                    id: 'expense-chart'
                },
                title: {
                    text: data?.data.budget != 0 ? 'Total Budget, Invoices, Payments and Expenses Chart' : '',
                    align: 'center',
                    margin: 100,
                    style: {
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#263238'
                    }
                },

                colors: colors,
                xaxis: {
                    categories: categories
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
            series={[{ data: [data?.data.budget, data?.data.totalExpense, data?.data.totalInvoice, data?.data.totalPayment] }]}
            type="bar"
            width={'100%'}
            height={500}
        />
    );
};

export default TotalChart;
