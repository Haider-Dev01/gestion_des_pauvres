import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Gift, ShoppingCart } from 'lucide-react';

const Redistribution = () => {
  const [stock, setStock] = useState([]);
  const [formData, setFormData] = useState({
    stockItemId: '',
    type: 'DON',
    beneficiaireId: '', // Pour simplifier, on saisira l'ID ou on pourrait lister les utilisateurs
    montant: 0
  });

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await api.get('/stock');
      // Filtrer pour n'afficher que les objets en stock (pas déjà donnés/vendus)
      const availableStock = res.data.filter(item => ['GARDE_MEUBLES', 'DEPOT_VENTE', 'GARAGE', 'ENTREPOT', 'DEPOT_COMMERCIAL'].includes(item.statut) || (item.statut === 'EN_TRANSIT' && item.lieu !== 'AUCUN'));
      setStock(availableStock);
    } catch (error) {
      console.error("Error fetching stock", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/distribution', formData);
      alert('Redistribution enregistrée avec succès !');
      fetchStock(); // Rafraîchir la liste
      setFormData({ ...formData, stockItemId: '', montant: 0 });
    } catch (error) {
      console.error("Error creating distribution", error);
      alert("Erreur lors de la redistribution");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Redistribution & Sortie de Stock</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Enregistrer une sortie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-gray-700 mb-2">Objet à redistribuer</label>
            <select
              className="w-full p-2 border rounded"
              value={formData.stockItemId}
              onChange={(e) => setFormData({ ...formData, stockItemId: e.target.value })}
              required
            >
              <option value="">Sélectionner un objet...</option>
              {stock.map(item => (
                <option key={item.id} value={item.id}>
                  {item.Offer?.description} ({item.lieu}) - {item.Offer?.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Type de sortie</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'DON' })}
                className={`flex items-center px-4 py-2 rounded ${formData.type === 'DON' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                <Gift size={18} className="mr-2" /> Don
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: 'VENTE' })}
                className={`flex items-center px-4 py-2 rounded ${formData.type === 'VENTE' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                <ShoppingCart size={18} className="mr-2" /> Vente
              </button>
            </div>
          </div>

          {formData.type === 'VENTE' && (
            <div>
              <label className="block text-gray-700 mb-2">Montant (€)</label>
              <input
                type="number"
                step="0.01"
                className="w-full p-2 border rounded"
                value={formData.montant}
                onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) })}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">ID Bénéficiaire / Acheteur (Optionnel)</label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              placeholder="ID Utilisateur"
              value={formData.beneficiaireId}
              onChange={(e) => setFormData({ ...formData, beneficiaireId: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
          >
            Valider la sortie
          </button>
        </form>
      </div>
    </div>
  );
};

export default Redistribution;
