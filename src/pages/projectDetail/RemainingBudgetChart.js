import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
// third-party
import Chart from 'react-apexcharts';

const RemainingBudgetChart = (props) => {
    const [data, setData] = useState([]);
    const remainingBudget = props.remainingBudget;
    const budgetUtilize = 100 - remainingBudget;
    const remainingAmount = 0;

    return (
        <Chart
            options={{
                labels: ['Budget Utilized', 'Remaining Budget'],
                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center'
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        return val + '%';
                    }
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val, opts) {
                            return val.toFixed(2) + ' %';
                        }
                    }
                }
            }}
            series={[budgetUtilize, remainingBudget]}
            type="donut"
            width={'100%'}
            height={500}
        />
    );
};

export default RemainingBudgetChart;
