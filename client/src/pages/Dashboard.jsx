import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Note: Recharts not installed, using simple divs if needed or install it. I'll stick to simple UI for now to avoid extra deps unless requested, but user asked for Dashboard. I'll implement simple cards.

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOffers: 0,
    acceptedOffers: 0,
    stockCount: 0,
    distributions: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/stats');
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* Hero Section Artistique - Version Épurée & Claire */}
      <div className="relative bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-10 text-white shadow-xl overflow-hidden">
        {/* Formes décoratives douces */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-cyan-300 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            Votre don d'aujourd'hui devient <br/>
            <span className="text-blue-50">le confort de demain</span>
          </h1>
          <h2 className="text-xl font-medium text-blue-100">
            Donnez une seconde vie à vos objets, offrez un nouvel espoir.
          </h2>
        </div>
      </div>

      {/* Stats Cards avec Effet Glassmorphism */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Offres" 
          value={stats.totalOffers} 
          color="blue" 
          delay="0"
          icon={<svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
        />
        <StatCard 
          title="Offres Acceptées" 
          value={stats.acceptedOffers} 
          color="emerald" 
          delay="100"
          icon={<svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatCard 
          title="Objets en Stock" 
          value={stats.stockCount} 
          color="violet" 
          delay="200"
          icon={<svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
        />
        <StatCard 
          title="Distributions" 
          value={stats.distributions} 
          color="amber" 
          delay="300"
          icon={<svg className="w-8 h-8 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>}
        />
      </div>

      {/* Section Actions Rapides & Activités */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        
        {/* Actions Rapides */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
            <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuickActionCard 
              to="/offers" 
              title="Créer une Offre" 
              desc="Enregistrer un nouveau don"
              color="blue"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>}
            />
            <QuickActionCard 
              to="/stock" 
              title="Gérer le Stock" 
              desc="Scanner et déplacer des objets"
              color="purple"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>}
            />
            <QuickActionCard 
              to="/redistribution" 
              title="Redistribuer" 
              desc="Faire un don ou une vente"
              color="green"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>}
            />
             <QuickActionCard 
              to="/offers" 
              title="Voir les Rapports" 
              desc="Consulter les bilans PDF"
              color="yellow"
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
            />
          </div>
        </div>

        {/* Activités Récentes (Mock) */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Activités Récentes</h2>
          <div className="space-y-6">
            <ActivityItem 
              title="Nouvelle offre reçue" 
              time="Il y a 2 min" 
              desc="Lot de vêtements hiver - Dupont"
              color="blue"
            />
            <ActivityItem 
              title="Objet mis en stock" 
              time="Il y a 15 min" 
              desc="Table basse vers Entrepôt"
              color="purple"
            />
            <ActivityItem 
              title="Distribution effectuée" 
              time="Il y a 1h" 
              desc="Don à la famille Martin"
              color="green"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickActionCard = ({ to, title, desc, color, icon }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    purple: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    green: "bg-green-50 text-green-600 hover:bg-green-100",
    yellow: "bg-yellow-50 text-yellow-600 hover:bg-yellow-100",
  };

  return (
    <a href={to} className={`flex items-start p-4 rounded-xl transition-all duration-300 ${colors[color]} group`}>
      <div className="p-3 bg-white rounded-lg shadow-sm mr-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{desc}</p>
      </div>
    </a>
  );
};

const ActivityItem = ({ title, time, desc, color }) => {
  const dotColors = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    green: "bg-green-500",
  };

  return (
    <div className="flex items-start">
      <div className={`mt-1.5 w-2.5 h-2.5 rounded-full ${dotColors[color]} mr-4`}></div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mb-1">{time}</p>
        <p className="text-sm text-gray-600">{desc}</p>
      </div>
    </div>
  );
};

// Composant Carte Statistique avec Design Glassmorphism
const StatCard = ({ title, value, color, delay, icon }) => {
  const styles = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
    violet: "bg-violet-50 text-violet-600 border-violet-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200"
  };

  return (
    <div 
      className={`relative p-6 rounded-2xl border ${styles[color]} shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 opacity-0 animate-slide-up overflow-hidden`}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-40 rounded-full blur-2xl"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
          <p className="text-4xl font-extrabold tracking-tight">{value}</p>
        </div>
        <div className="p-2 bg-white bg-opacity-60 rounded-xl shadow-sm backdrop-blur-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
