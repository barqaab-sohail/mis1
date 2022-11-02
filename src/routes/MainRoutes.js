import { lazy, useState, useEffect } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const ProjectDetail = Loadable(lazy(() => import('pages/projectDetail/ProjectDetail')));
const CurrentMonthPaymentDetail = Loadable(lazy(() => import('pages/dashboard/paymentDetail/CurrentMonthPaymentDetail')));
const LastMonthPaymentDetail = Loadable(lazy(() => import('pages/dashboard/paymentDetail/LastMonthPayments')));
const CurrentMonthInvoiceDetail = Loadable(lazy(() => import('pages/dashboard/invoiceDetail/CurrentMonthInvoiceDetail')));
const LastMonthInvoiceDetail = Loadable(lazy(() => import('pages/dashboard/invoiceDetail/LastMonthInvoiceDetail')));

//render - HR
const EmployeeList = Loadable(lazy(() => import('pages/hr/EmployeeList')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
import PrivateRoutes from './PrivateRoutes';
import ProtectedRoute from './ProtectedRoute';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <ProtectedRoute>
            <MainLayout />
        </ProtectedRoute>
    ),
    children: [
        {
            path: '/dashboard',
            element: <DashboardDefault />
        },
        {
            path: '/employees',
            element: <EmployeeList />
        },
        {
            path: 'project-detail/:ProjectId',
            element: <ProjectDetail />
        },
        {
            path: 'current-month-payment-detail',
            element: <CurrentMonthPaymentDetail />
        },
        {
            path: 'last-month-payment-detail',
            element: <LastMonthPaymentDetail />
        },
        {
            path: 'current-month-invoice-detail',
            element: <CurrentMonthInvoiceDetail />
        },
        {
            path: 'last-month-invoice-detail',
            element: <LastMonthInvoiceDetail />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: '/dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
