import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboardData } from '../api/dashboard';
import CategoryPie from '../components/charts/CategoryPie';
import IncomeExpenseBar from '../components/charts/IncomeExpenseBar';
import SavingsLine from '../components/charts/SavingsLine';
import ExcelViewer from '../components/ExcelViewer';

const Dashboard = () => {
    const { token } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            const res = await getDashboardData(token);
            setDashboardData(res.data);
        };
        fetchDashboard();
    }, [token]);

    if (!dashboardData) return <div>Loading...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>Total Income: {dashboardData.totalIncome} {dashboardData.defaultCurrency}</div>
                <div>Total Expense: {dashboardData.totalExpense} {dashboardData.defaultCurrency}</div>
                <div>Total Savings: {dashboardData.totalSavings} {dashboardData.defaultCurrency}</div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <CategoryPie data={dashboardData.categoryTotals} />
                <IncomeExpenseBar data={dashboardData} />
                <SavingsLine data={dashboardData} />
            </div>
            <div className="mt-6">
                <ExcelViewer month={new Date().getMonth() + 1} year={new Date().getFullYear()} token={token} />
            </div>
        </div>
    );
};

export default Dashboard;
