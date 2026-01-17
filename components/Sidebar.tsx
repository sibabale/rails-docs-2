
import React from 'react';
import { ApiEndpoint, SyncStatus } from '../types';

interface SidebarProps {
  endpoints: ApiEndpoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onPull: () => void;
  syncStatus: SyncStatus;
  lastSynced?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  endpoints, 
  selectedId, 
  onSelect, 
  onAdd, 
  onPull, 
  syncStatus,
  lastSynced 
}) => {
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
            No endpoints yet. Create one or pull from GitHub.
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

      {/* GitHub Sync Section */}
      <div className="p-4 bg-slate-950/50 border-t border-slate-800">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            <span>GitHub Repo</span>
            {lastSynced && (
              <span className="text-emerald-500/80">Synced {new Date(lastSynced).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            )}
          </div>
          <button
            onClick={onPull}
            disabled={syncStatus.isSyncing}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-semibold transition-all ${
              syncStatus.isSyncing 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-600/20 hover:border-indigo-600'
            }`}
          >
            {syncStatus.isSyncing ? (
              <>
                <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                Pulling...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Pull Latest
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
