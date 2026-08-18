"use client";

import { useState } from "react";
import { updateSettings } from "./actions";
import { Save } from "lucide-react";

export default function ConfigForm({ initialSettings }: { initialSettings: any }) {
  const [payphoneToken, setPayphoneToken] = useState(initialSettings?.payphoneToken || "");
  const [payphoneStoreId, setPayphoneStoreId] = useState(initialSettings?.payphoneStoreId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("payphoneToken", payphoneToken);
    formData.append("payphoneStoreId", payphoneStoreId);

    const res = await updateSettings(formData);
    
    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: "Configuración guardada correctamente." });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-[#8995A9] uppercase mb-2">PayPhone Token</label>
        <input 
          type="text" 
          value={payphoneToken}
          onChange={e => setPayphoneToken(e.target.value)}
          placeholder="Ej: Bearer YW..."
          className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-2">Token de autorización Bearer proporcionado por PayPhone.</p>
      </div>

      <div>
        <label className="block text-sm font-bold text-[#8995A9] uppercase mb-2">PayPhone Store ID</label>
        <input 
          type="text" 
          value={payphoneStoreId}
          onChange={e => setPayphoneStoreId(e.target.value)}
          placeholder="Ej: store-1234..."
          className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D2FF] font-mono text-sm"
        />
        <p className="text-xs text-gray-500 mt-2">Identificador único de la tienda en PayPhone.</p>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="flex items-center gap-2 bg-[#00D2FF] text-[#01040A] px-6 py-3 rounded-lg font-bold hover:bg-[#00D2FF]/80 transition-colors disabled:opacity-50"
      >
        <Save size={18} />
        {isSubmitting ? "Guardando..." : "Guardar Configuración"}
      </button>
    </form>
  );
}
