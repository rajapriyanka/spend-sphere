import React, { useEffect, useState } from 'react';
import DataGrid from 'react-data-grid';
import { getExcelReport } from '../api/excel';

const ExcelViewer = ({ month, year, token }) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const fetchExcel = async () => {
            const res = await getExcelReport(month, year, token);
            const data = res.data.data;
            if (data.length > 0) {
                setColumns(Object.keys(data[0]).map(key => ({ key, name: key })));
                setRows(data);
            }
        };
        fetchExcel();
    }, [month, year, token]);

    return <DataGrid columns={columns} rows={rows} className="h-96" />;
};

export default ExcelViewer;
