"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity, Users, Eye, ArrowUpRight, Globe, Link, FileText } from "lucide-react";
import { getAnalyticsData } from "./actions";

export default function AnalyticsPage() {
  const [data, setData] = useState<{date: string, views: number}[]>([]);
  const [stats, setStats] = useState({ total: 0, today: 0, unique: 0 });
  const [topPages, setTopPages] = useState<{path: string, views: number}[]>([]);
  const [topReferrers, setTopReferrers] = useState<{referer: string | null, views: number}[]>([]);
  const [topCountries, setTopCountries] = useState<{country: string | null, views: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAnalyticsData();
        setData(result.chartData || []);
        setStats(result.stats || { total: 0, today: 0, unique: 0 });
        setTopPages(result.topPages || []);
        setTopReferrers(result.topReferrers || []);
        setTopCountries(result.topCountries || []);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#00D2FF]/20 border-t-[#00D2FF] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-2">
        <div>
          <h1 className="text-white text-[28px] font-extrabold tracking-tight mb-2">Centro de Comando: Tráfico</h1>
          <p className="text-[#8995A9] text-[14px]">Análisis avanzado en tiempo real del rendimiento de tu plataforma.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#060D1A]/80 border border-[#1A2333] p-6 rounded-[20px] shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#00D2FF] blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF]">
              <Eye size={20} />
            </div>
          </div>
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-widest mb-1">Visitas Totales</p>
          <h3 className="text-white text-[32px] font-extrabold">{stats.total}</h3>
        </div>

        <div className="bg-[#060D1A]/80 border border-[#1A2333] p-6 rounded-[20px] shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FABB18] blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FABB18]/10 flex items-center justify-center text-[#FABB18]">
              <Activity size={20} />
            </div>
          </div>
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-widest mb-1">Visitas Hoy</p>
          <h3 className="text-white text-[32px] font-extrabold">{stats.today}</h3>
        </div>

        <div className="bg-[#060D1A]/80 border border-[#1A2333] p-6 rounded-[20px] shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#E0E7FF] blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white">
              <Users size={20} />
            </div>
          </div>
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-widest mb-1">Visitantes Únicos</p>
          <h3 className="text-white text-[32px] font-extrabold">{stats.unique}</h3>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-[#060D1A]/80 border border-[#1A2333] rounded-[24px] p-6 lg:p-8 shadow-xl">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-white text-[18px] font-bold">Tráfico Histórico (Últimos 30 días)</h2>
            <p className="text-[#8995A9] text-[13px]">Evolución diaria de las visitas en toda la web.</p>
          </div>
        </div>
        <div className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D2FF" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#00D2FF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2333" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#4A5568" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                tickMargin={12}
                minTickGap={20}
              />
              <YAxis 
                stroke="#4A5568" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ 
                  backgroundColor: '#01040A', 
                  border: '1px solid #1A2333',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
                itemStyle={{ color: '#00D2FF', fontWeight: 'bold' }}
                labelStyle={{ color: '#8995A9', marginBottom: '4px' }}
              />
              <Bar 
                dataKey="views" 
                fill="url(#colorViews)" 
                radius={[4, 4, 0, 0]} 
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top Pages */}
        <div className="bg-[#060D1A]/80 border border-[#1A2333] rounded-[24px] p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#00D2FF]/10 rounded-lg">
              <FileText size={18} className="text-[#00D2FF]" />
            </div>
            <h2 className="text-white text-[16px] font-bold">Páginas Más Visitadas</h2>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            {topPages.length > 0 ? topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center bg-[#0B1221] p-3 rounded-xl border border-[#1A2333]/50">
                <span className="text-[#E2E8F0] text-[14px] font-medium truncate max-w-[70%]">{page.path === '/' ? '/ (Inicio)' : page.path}</span>
                <span className="bg-[#1A2333] text-white px-3 py-1 rounded-full text-[12px] font-bold">{page.views}</span>
              </div>
            )) : <p className="text-[#8995A9] text-sm text-center my-auto">Sin datos suficientes</p>}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-[#060D1A]/80 border border-[#1A2333] rounded-[24px] p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#FABB18]/10 rounded-lg">
              <Link size={18} className="text-[#FABB18]" />
            </div>
            <h2 className="text-white text-[16px] font-bold">Fuentes de Tráfico</h2>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            {topReferrers.length > 0 ? topReferrers.map((ref, index) => (
              <div key={index} className="flex justify-between items-center bg-[#0B1221] p-3 rounded-xl border border-[#1A2333]/50">
                <span className="text-[#E2E8F0] text-[14px] font-medium truncate max-w-[70%]">{ref.referer || 'Directo'}</span>
                <span className="bg-[#1A2333] text-white px-3 py-1 rounded-full text-[12px] font-bold">{ref.views}</span>
              </div>
            )) : <p className="text-[#8995A9] text-sm text-center my-auto">Aún no hay suficientes datos de origen</p>}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-[#060D1A]/80 border border-[#1A2333] rounded-[24px] p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#10B981]/10 rounded-lg">
              <Globe size={18} className="text-[#10B981]" />
            </div>
            <h2 className="text-white text-[16px] font-bold">Audiencia por País</h2>
          </div>
          <div className="flex flex-col gap-4 flex-grow">
            {topCountries.length > 0 ? topCountries.map((country, index) => (
              <div key={index} className="flex justify-between items-center bg-[#0B1221] p-3 rounded-xl border border-[#1A2333]/50">
                <span className="text-[#E2E8F0] text-[14px] font-medium truncate max-w-[70%]">{country.country || 'Desconocido'}</span>
                <span className="bg-[#1A2333] text-white px-3 py-1 rounded-full text-[12px] font-bold">{country.views}</span>
              </div>
            )) : <p className="text-[#8995A9] text-sm text-center my-auto">Aún no hay suficientes datos de países</p>}
          </div>
        </div>

      </div>
    </div>
  );
}

