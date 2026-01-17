
import React from 'react';
import { ApiEndpoint } from '../types';

interface SidebarProps {
  endpoints: ApiEndpoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ endpoints, selectedId, onSelect, onAdd }) => {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Endpoints</h2>
        <button 
          onClick={onAdd}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
          title="New Endpoint"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {endpoints.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No endpoints yet. Create one to get started.
          </div>
        ) : (
          endpoints.map((ep) => (
            <button
              key={ep.id}
              onClick={() => onSelect(ep.id)}
              className={`w-full text-left px-4 py-3 border-b border-slate-800/50 hover:bg-slate-800/50 transition-colors flex items-center gap-3 ${
                selectedId === ep.id ? 'bg-slate-800 border-l-4 border-l-indigo-500' : ''
              }`}
            >
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded min-w-[45px] text-center ${
                ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' :
                ep.method === 'POST' ? 'bg-blue-500/10 text-blue-400' :
                ep.method === 'PUT' ? 'bg-amber-500/10 text-amber-400' :
                ep.method === 'DELETE' ? 'bg-rose-500/10 text-rose-400' : 'bg-slate-500/10 text-slate-400'
              }`}>
                {ep.method}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate text-slate-200">{ep.name}</div>
                <div className="text-xs text-slate-500 truncate font-mono">{ep.path}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Sidebar;
