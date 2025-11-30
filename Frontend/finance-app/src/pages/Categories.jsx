import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axiosConfig';

const Categories = () => {
    const { token } = useAuth();
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');

    const fetchCategories = async () => {
        const res = await axios.get('/finance/categories', { headers: { Authorization: `Bearer ${token}` } });
        setCategories(res.data);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addCategory = async () => {
        await axios.post('/finance/categories', { name: newCategory }, { headers: { Authorization: `Bearer ${token}` } });
        setNewCategory('');
        fetchCategories();
    };

    const deleteCategory = async (id) => {
        await axios.delete(`/finance/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        fetchCategories();
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <div className="mb-4 flex gap-2">
                <input type="text" placeholder="New Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <button onClick={addCategory} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
            </div>
            <ul className="list-disc pl-6">
                {categories.map(cat => (
                    <li key={cat.id} className="flex justify-between items-center">
                        {cat.name}
                        <button onClick={() => deleteCategory(cat.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
