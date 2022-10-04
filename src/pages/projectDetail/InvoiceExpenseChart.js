import { useEffect, useState } from 'react';
import axios from '../../api/axios';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const columnChartOptions = {
    chart: {
        type: 'bar',
        height: 430,
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '30%',
            borderRadius: 4
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 8,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yaxis: {
        title: {
            text: 'PKR'
        }
    },
    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter(val) {
                return `PKR ${val}`;
            }
        }
    },
    legend: {
        show: true,
        fontFamily: `'Public Sans', sans-serif`,
        offsetX: 10,
        offsetY: 10,
        labels: {
            useSeriesColors: false
        },
        markers: {
            width: 16,
            height: 16,
            radius: '50%',
            offsexX: 2,
            offsexY: 2
        },
        itemMargin: {
            horizontal: 15,
            vertical: 50
        }
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                yaxis: {
                    show: false
                }
            }
        }
    ]
};

// ==============================|| SALES COLUMN CHART ||============================== //

const InvoiceExpenseChart = (props) => {
    const theme = useTheme();

    const { primary, secondary } = theme.palette.text;
    const line = theme.palette.divider;

    const warning = theme.palette.warning.main;
    const primaryMain = theme.palette.primary.main;
    const successDark = theme.palette.success.dark;

    const [invoiceData, setInvoiceData] = useState([]);
    const [paymentData, setPaymentData] = useState([]);
    const [monthData, setMonthData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);

    const [series, setSeries] = useState([]);

    useEffect(() => {
        const chartMonth = [];
        const chartExpenses = [];
        const chartInvoices = [];
        const chartPayments = [];

        const sendGetRequest = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const dataReq = await axios.get('/projectExpenseChart/' + props.projectId);
                const dataRes = await dataReq.data;
                for (let i = 0; i < dataRes.length; i++) {
                    chartMonth.push(dataRes[i].months);
                    chartExpenses.push(dataRes[i].expenses);
                    chartInvoices.push(dataRes[i].invoices);
                    chartPayments.push(dataRes[i].payments);
                }
                setInvoiceData(chartInvoices);
                setPaymentData(chartPayments);
                setMonthData(chartMonth);
                setExpenseData(chartExpenses);
            } catch (err) {
                console.log(err);
            }
        };

        sendGetRequest();
    }, []);
    console.log(expenseData);
    const [options, setOptions] = useState(columnChartOptions);

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,
            colors: [warning, primaryMain],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                labels: {
                    style: {
                        colors: [secondary, secondary, secondary, secondary, secondary, secondary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [secondary]
                    }
                }
            },
            grid: {
                borderColor: line
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: {
                    colors: 'grey.500'
                }
            }
        }));
    }, [primary, secondary, line, warning, primaryMain, successDark]);

    return (
        <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height={430} />
        </div>
    );
};

export default InvoiceExpenseChart;
