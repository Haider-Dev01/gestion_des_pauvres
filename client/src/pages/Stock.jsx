import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { QrCode, MapPin } from 'lucide-react';

const Stock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const res = await api.get('/stock');
      setStock(res.data);
    } catch (error) {
      console.error("Error fetching stock", error);
    }
  };

  const generateQR = async (id) => {
    try {
      const res = await api.post(`/stock/${id}/qrcode`);
      alert(`QR Code généré: ${res.data.qrCode}`);
      fetchStock();
    } catch (error) {
      console.error("Error generating QR", error);
    }
  };

  const updateLocation = async (id, location) => {
    try {
      await api.put(`/stock/${id}/location`, { lieu: location });
      fetchStock();
    } catch (error) {
      console.error("Error updating location", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Gestion du Stock</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stock.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{item.Offer?.description}</h3>
                <p className="text-sm text-gray-500">{item.Offer?.type}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${item.statut === 'EN_TRANSIT' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                {item.statut}
              </span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">Lieu actuel: <span className="font-semibold">{item.lieu}</span></p>
              {!item.qrCode ? (
                <button onClick={() => generateQR(item.id)} className="flex items-center text-blue-600 text-sm hover:underline">
                  <QrCode size={16} className="mr-1" /> Générer QR
                </button>
              ) : (
                <p className="text-xs text-gray-400 font-mono">{item.qrCode}</p>
              )}
            </div>

            <div className="border-t pt-4">
              <label className="block text-xs text-gray-500 mb-2">Déplacer vers:</label>
              <select 
                className="w-full p-2 border rounded text-sm"
                value={item.lieu}
                onChange={(e) => updateLocation(item.id, e.target.value)}
              >
                <option value="AUCUN">Choisir...</option>
                <option value="GARAGE">Garage</option>
                <option value="ENTREPOT">Entrepôt</option>
                <option value="DEPOT_COMMERCIAL">Dépôt Commercial</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stock;
