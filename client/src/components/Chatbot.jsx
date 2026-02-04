import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Je suis l'assistant virtuel. Comment puis-je vous aider ?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputText('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: "Désolé, je ne peux pas répondre pour le moment.", sender: 'bot' }]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl mb-4 border border-gray-100 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-blue-600 p-4 flex justify-between items-center">
            <h3 className="text-white font-bold flex items-center">
              <MessageCircle size={20} className="mr-2" /> Assistant
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-blue-100 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={!inputText.trim()}
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Bouton Flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'} text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default Chatbot;
