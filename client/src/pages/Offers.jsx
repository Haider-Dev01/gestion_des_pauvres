import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FileText, Check, X } from 'lucide-react';

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await api.get('/offers');
      setOffers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching offers", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/offers/${id}/status`, { statut: status });
      fetchOffers();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  const downloadPDF = async (id) => {
    try {
      const response = await api.get(`/offers/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `offer-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error downloading PDF", error);
    }
  };

  const [showForm, setShowForm] = useState(false);
  const [newOffer, setNewOffer] = useState({ description: '', type: 'Vêtement', userId: 1 }); // UserId 1 (Admin) par défaut pour test

  const handleCreateOffer = async (e) => {
    e.preventDefault();
    try {
      await api.post('/offers', newOffer);
      setShowForm(false);
      setNewOffer({ description: '', type: 'Vêtement', userId: 1 });
      fetchOffers();
      alert("Offre créée avec succès !");
    } catch (error) {
      console.error("Error creating offer", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Offres</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? 'Annuler' : 'Nouvelle Offre'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-blue-100">
          <h2 className="text-xl font-semibold mb-4">Créer une nouvelle offre</h2>
          <form onSubmit={handleCreateOffer} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Description</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={newOffer.description}
                onChange={(e) => setNewOffer({...newOffer, description: e.target.value})}
                required
                placeholder="Ex: Lot de manteaux..."
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Type</label>
              <select
                className="w-full p-2 border rounded"
                value={newOffer.type}
                onChange={(e) => setNewOffer({...newOffer, type: e.target.value})}
              >
                <option value="Vêtement">Vêtement</option>
                <option value="Meuble">Meuble</option>
                <option value="Alimentaire">Alimentaire</option>
                <option value="Jouet">Jouet</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Enregistrer
            </button>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donateur</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
              <tr key={offer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{offer.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{offer.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{offer.User?.nom} {offer.User?.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${offer.statut === 'ACCEPTE' ? 'bg-green-100 text-green-800' : 
                      offer.statut === 'REFUSE' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {offer.statut}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {offer.statut === 'EN_ATTENTE' && (
                    <>
                      <button onClick={() => handleStatusChange(offer.id, 'ACCEPTE')} className="text-green-600 hover:text-green-900"><Check size={20} /></button>
                      <button onClick={() => handleStatusChange(offer.id, 'REFUSE')} className="text-red-600 hover:text-red-900"><X size={20} /></button>
                    </>
                  )}
                  <button onClick={() => downloadPDF(offer.id)} className="text-blue-600 hover:text-blue-900"><FileText size={20} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Offers;
