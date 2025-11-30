import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRecords, addRecord, updateRecord, deleteRecord } from '../api/finance';

const Records = () => {
    const { token } = useAuth();
    const [records, setRecords] = useState([]);
    const [form, setForm] = useState({ categoryId: '', typeId: '', amount: '', description: '', currency: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        const res = await getRecords(token);
        setRecords(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateRecord(editingId, form, token);
            setEditingId(null);
        } else {
            await addRecord(form, token);
        }
        setForm({ categoryId: '', typeId: '', amount: '', description: '', currency: '' });
        fetchRecords();
    };

    const handleEdit = (record) => {
        setForm({
            categoryId: record.categoryId,
            typeId: record.typeId,
            amount: record.amount,
            description: record.description,
            currency: record.currency
        });
        setEditingId(record.id);
    };

    const handleDelete = async (id) => {
        await deleteRecord(id, token);
        fetchRecords();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Records</h1>
            <form className="mb-6 flex flex-col gap-2" onSubmit={handleSubmit}>
                <input type="text" placeholder="Category ID" value={form.categoryId} onChange={(e) => setForm({...form, categoryId: e.target.value})} required />
                <input type="text" placeholder="Type ID" value={form.typeId} onChange={(e) => setForm({...form, typeId: e.target.value})} required />
                <input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} required />
                <input type="text" placeholder="Currency" value={form.currency} onChange={(e) => setForm({...form, currency: e.target.value})} required />
                <input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            </form>

            <table className="w-full border">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category ID</th>
                        <th>Type ID</th>
                        <th>Amount</th>
                        <th>Currency</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(r => (
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.categoryId}</td>
                            <td>{r.typeId}</td>
                            <td>{r.amount}</td>
                            <td>{r.currency}</td>
                            <td>{r.description}</td>
                            <td>{new Date(r.date).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEdit(r)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                                <button onClick={() => handleDelete(r.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Records;
