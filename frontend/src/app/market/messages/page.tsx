'use client';

import { useMemo, useState } from 'react';
import { Search, Edit, Phone, Video, Info, MoreVertical, Send, Smile, Paperclip, Image as ImageIcon } from 'lucide-react';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread?: number;
  online?: boolean;
  status?: string;
}

interface Message {
  id: string;
  sender: 'me' | 'other';
  text?: string;
  time: string;
  product?: {
    name: string;
    price: string;
    image: string;
    specs: string;
  };
}

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>([]);
  const [messages] = useState<Message[]>([]);
  const [activeConv, setActiveConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState<'tous' | 'non-lus' | 'archives'>('tous');

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeConv) || null,
    [activeConv, conversations]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Liste des conversations */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* En-tête */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Messages</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Edit className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Filtres */}
          <div className="flex gap-2 p-3 border-b border-gray-200">
            <button
              onClick={() => setFilter('tous')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'tous'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFilter('non-lus')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'non-lus'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Non lus
            </button>
            <button
              onClick={() => setFilter('archives')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === 'archives'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Archivés
            </button>
          </div>

          {/* Liste */}
          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-500 px-6 text-center">
                Aucune conversation pour le moment.
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setActiveConv(conv.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeConv === conv.id ? 'bg-orange-50 border-l-4 border-l-orange-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-12 h-12 rounded-full"
                      />
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 text-sm truncate">
                          {conv.name}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {conv.time}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 truncate mb-1">
                        {conv.lastMessage}
                      </p>
                      
                      {conv.status && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{conv.status}</span>
                          {conv.unread && (
                            <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Zone de conversation */}
        <div className="flex-1 flex flex-col bg-white">
          {/* En-tête conversation */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {activeConversation ? (
                <>
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{activeConversation.name}</h3>
                    {activeConversation.online && (
                      <p className="text-xs text-green-600">● En ligne</p>
                    )}
                  </div>
                </>
              ) : (
                <div>
                  <h3 className="font-semibold text-gray-900">Messagerie</h3>
                  <p className="text-xs text-gray-500">Sélectionnez une conversation ou commencez un chat</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Appel audio">
                <Phone className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Appel vidéo">
                <Video className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Infos">
                <Info className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg" aria-label="Plus d'options">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center text-sm text-gray-500">
                Aucun message pour le moment. Envoyez votre premier message pour démarrer la conversation.
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'other' && (
                    <img
                      src={activeConversation?.avatar}
                      alt=""
                      className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                    />
                  )}
                  
                  <div className={`max-w-lg ${msg.sender === 'me' ? 'ml-12' : 'mr-12'}`}>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        msg.sender === 'me'
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    
                    <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                      <span className="text-xs text-gray-500">{msg.time}</span>
                      {msg.sender === 'me' && (
                        <span className="text-xs text-gray-500">✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Zone de saisie */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Smile className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Paperclip className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ImageIcon className="w-5 h-5 text-gray-600" />
              </button>
              
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              
              <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
