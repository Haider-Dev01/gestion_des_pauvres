import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        nom: '', prenom: '', email: '', password: '',
        role: 'DONATEUR', telephone: '', adresse: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', formData);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">Inscription</h2>
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <input name="nom" placeholder="Nom" onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                        <input name="prenom" placeholder="Prénom" onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                    </div>
                    <input name="email" type="email" placeholder="Email" onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                    <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} className="px-4 py-2 border rounded w-full" required />
                    <select name="role" onChange={handleChange} className="px-4 py-2 border rounded w-full">
                        <option value="DONATEUR">Donateur</option>
                        <option value="BENEFICIAIRE">Bénéficiaire</option>
                        <option value="TRANSPORTEUR">Transporteur</option>
                        {/* Admin role hidden for public registration usually, but keeping available for demo if needed or removed */}
                    </select>
                    <input name="telephone" placeholder="Téléphone" onChange={handleChange} className="px-4 py-2 border rounded w-full" />
                    <input name="adresse" placeholder="Adresse" onChange={handleChange} className="px-4 py-2 border rounded w-full" />
                    <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition">S'inscrire</button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Déjà un compte ? <Link to="/login" className="text-teal-600 hover:underline">Se connecter</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
