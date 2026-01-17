
import React, { useState, useEffect } from 'react';
import { ApiEndpoint, ViewMode } from '../types';
import { generateClientCode } from '../services/geminiService';

interface EditorProps {
  endpoint: ApiEndpoint;
  onUpdate: (id: string, updates: Partial<ApiEndpoint>) => void;
}

const Editor: React.FC<EditorProps> = ({ endpoint, onUpdate }) => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.DESIGN);
  const [code, setCode] = useState<string>('');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [lang, setLang] = useState('TypeScript');

  useEffect(() => {
    if (viewMode === ViewMode.CODE) {
      handleGenerateCode(lang);
    }
  }, [viewMode, endpoint.id]);

  const handleGenerateCode = async (targetLang: string) => {
    setIsGeneratingCode(true);
    setLang(targetLang);
    try {
      const generated = await generateClientCode(endpoint, targetLang);
      setCode(generated);
    } catch (err) {
      setCode('// Failed to generate code. Please try again.');
    } finally {
      setIsGeneratingCode(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex bg-slate-900 px-4 border-b border-slate-800">
        {[
          { id: ViewMode.DESIGN, label: 'Design' },
          { id: ViewMode.DOCS, label: 'Documentation' },
          { id: ViewMode.TEST, label: 'Testing' },
          { id: ViewMode.CODE, label: 'Code' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as ViewMode)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              viewMode === tab.id
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {viewMode === ViewMode.DESIGN && (
          <div className="max-w-4xl mx-auto space-y-8">
            <header className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{endpoint.name}</h1>
                <p className="text-slate-400 text-lg">{endpoint.description}</p>
              </div>
              <div className="flex items-center gap-2">
                 <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                  endpoint.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' :
                  endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                  endpoint.method === 'PUT' ? 'bg-amber-500/20 text-amber-400' :
                  endpoint.method === 'DELETE' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-500/20 text-slate-400'
                }`}>
                  {endpoint.method}
                </span>
                <span className="bg-slate-800 text-slate-300 font-mono text-sm px-3 py-1 rounded-full">
                  {endpoint.path}
                </span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  Response Schema
                </h3>
                <pre className="text-xs font-mono bg-slate-950 p-4 rounded-lg overflow-x-auto text-slate-400 border border-slate-800 leading-relaxed h-[300px]">
                  {JSON.stringify(JSON.parse(endpoint.responseSchema), null, 2)}
                </pre>
              </section>

              <section className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h3 className="text-slate-200 font-semibold mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Mock Response
                </h3>
                <pre className="text-xs font-mono bg-slate-950 p-4 rounded-lg overflow-x-auto text-emerald-400/80 border border-slate-800 leading-relaxed h-[300px]">
                  {JSON.stringify(endpoint.exampleResponse, null, 2)}
                </pre>
              </section>
            </div>
          </div>
        )}

        {viewMode === ViewMode.DOCS && (
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h1 className="text-white">API Reference</h1>
            <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-emerald-500 text-slate-950 px-2 py-1 rounded font-bold text-xs">GET</span>
                <code className="text-slate-200 text-lg">{endpoint.path}</code>
              </div>
              <p className="text-slate-400 mb-4">{endpoint.description}</p>
            </div>

            <h2 className="text-xl text-white border-b border-slate-800 pb-2">Headers</h2>
            <table className="w-full text-sm text-left mt-4 mb-8">
              <thead>
                <tr className="text-slate-400">
                  <th className="pb-2">Name</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 divide-y divide-slate-800">
                <tr>
                  <td className="py-3 font-mono">Authorization</td>
                  <td className="py-3">string</td>
                  <td className="py-3">Bearer token required for authentication</td>
                </tr>
                <tr>
                  <td className="py-3 font-mono">Content-Type</td>
                  <td className="py-3">string</td>
                  <td className="py-3">application/json</td>
                </tr>
              </tbody>
            </table>

            <h2 className="text-xl text-white border-b border-slate-800 pb-2">Response Codes</h2>
            <div className="grid grid-cols-1 gap-3 mt-4">
              <div className="flex items-center gap-4 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                <span className="font-bold text-emerald-400">200</span>
                <span className="text-slate-400 text-sm">Success - returns {endpoint.name} resource</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                <span className="font-bold text-rose-400">401</span>
                <span className="text-slate-400 text-sm">Unauthorized - missing or invalid token</span>
              </div>
            </div>
          </div>
        )}

        {viewMode === ViewMode.CODE && (
          <div className="max-w-4xl mx-auto flex flex-col h-full gap-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {['TypeScript', 'JavaScript', 'Python', 'Go'].map(l => (
                  <button
                    key={l}
                    onClick={() => handleGenerateCode(l)}
                    className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                      lang === l ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Code
              </button>
            </div>
            
            <div className="flex-1 min-h-[500px] relative">
              {isGeneratingCode && (
                <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-slate-300 text-sm">Synthesizing code...</span>
                  </div>
                </div>
              )}
              <pre className="h-full w-full bg-slate-900 p-6 rounded-xl border border-slate-800 font-mono text-sm leading-relaxed overflow-auto text-slate-300">
                {code || '// Select a language to generate client code...'}
              </pre>
            </div>
          </div>
        )}

        {viewMode === ViewMode.TEST && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 p-2 bg-slate-800/50 border-b border-slate-800">
                <span className="px-3 py-1 bg-emerald-500 text-slate-950 rounded font-bold text-xs uppercase">GET</span>
                <input 
                  type="text" 
                  value={`https://api.forge.ai${endpoint.path}`} 
                  readOnly 
                  className="flex-1 bg-transparent text-slate-300 text-sm focus:outline-none px-2 font-mono"
                />
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-1.5 rounded-lg text-sm font-semibold transition-colors">
                  Send Request
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Parameters</h4>
                  <div className="text-sm text-slate-600 italic">No query parameters defined</div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Auth</h4>
                  <div className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-xs text-slate-400">Bearer Token</span>
                    <input type="password" value="••••••••••••••••" readOnly className="bg-transparent text-slate-300 flex-1 outline-none text-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Response Body</h4>
                <div className="flex gap-4">
                   <span className="text-xs text-emerald-400 font-bold">Status: 200 OK</span>
                   <span className="text-xs text-slate-500 font-mono">245ms</span>
                </div>
              </div>
              <pre className="bg-slate-950 p-6 rounded-lg border border-slate-800 text-emerald-400/80 font-mono text-xs leading-relaxed overflow-auto max-h-[400px]">
                {JSON.stringify(endpoint.exampleResponse, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
