import React, { useState, useEffect } from 'react';

// third-party
import Chart from 'react-apexcharts';

const RemainingBudgetChart = (props) => {
    const remainingBudget = props.remainingBudget;
    const budgetUtilize = 100 - remainingBudget;

    return (
        <Chart
            options={{
                labels: ['Budget Utilized', 'Remaining Budget'],
                legend: {
                    show: true,
                    position: 'bottom',
                    horizontalAlign: 'center'
                },
                title: {
                    text: 'Budget Utilization and Remaining Budget Chart ',
                    align: 'center',
                    margin: 100,
                    style: {
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#263238'
                    }
                },

                dataLabels: {
                    enabled: true,
                    formatter: function (val, opts) {
                        return val?.toFixed(2) + '%' || '';
                    }
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: function (val, opts) {
                            return val?.toFixed(2) + ' %' || '';
                        }
                    }
                }
            }}
            series={[!!budgetUtilize, !!remainingBudget]}
            type="donut"
            width={'100%'}
            height={500}
        />
    );
};

export default RemainingBudgetChart;
