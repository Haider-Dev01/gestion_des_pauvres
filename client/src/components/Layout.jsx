import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Package, Truck, LogOut, Gift } from 'lucide-react';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar Moderne */}
      <div className="w-72 bg-white shadow-2xl flex flex-col z-20">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Gift size={24} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Espoir des Pauvres</h1>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Gestion des Dons v2.0</p>
            </div>
          </div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu Principal</p>
            <nav className="space-y-2">
              <NavLink to="/" icon={<LayoutDashboard size={20} />} label="Tableau de Bord" />
              <NavLink to="/offers" icon={<Package size={20} />} label="Gestion des Offres" />
              <NavLink to="/stock" icon={<Truck size={20} />} label="Suivi du Stock" />
              <NavLink to="/redistribution" icon={<Gift size={20} />} label="Redistribution" />
            </nav>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
              {user?.nom?.charAt(0) || 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-800">{user?.nom}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role?.toLowerCase() || 'Utilisateur'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 font-medium group"
          >
            <LogOut size={20} className="mr-3 group-hover:scale-110 transition-transform" /> 
            Déconnexion
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 relative">
        <Outlet />
      </div>
    </div>
  );
};

const NavLink = ({ to, icon, label }) => {
  const { pathname } = window.location;
  const isActive = pathname === to || (to !== '/' && pathname.startsWith(to));
  
  return (
    <Link 
      to={to} 
      className={`flex items-center p-3.5 rounded-xl transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
      }`}
    >
      <span className={`mr-3 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 transition-colors'}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />}
    </Link>
  );
};

export default Layout;
