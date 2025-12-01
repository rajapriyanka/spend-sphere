import React, { useState } from "react";
import { DataGrid } from "react-data-grid";
import * as XLSX from "xlsx";

function ExcelViewer() {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // First row = column headers
    const headers = json[0];

    // Columns for DataGrid
    const col = headers.map((h) => ({
      key: h,
      name: h,
      resizable: true,
      width: 150,
    }));

    // Rows
    const r = json.slice(1).map((row, index) => {
      const obj = { id: index };
      headers.forEach((h, i) => {
        obj[h] = row[i] || "";
      });
      return obj;
    });

    setColumns(col);
    setRows(r);
  };

  return (
    <div className="p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">Excel Viewer</h1>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFile}
        className="mb-4 border p-2"
      />

      <div style={{ height: "600px" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </div>
  );
}

export default ExcelViewer;
