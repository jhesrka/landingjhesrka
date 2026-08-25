"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { Activity, Users, Eye, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  const [data, setData] = useState<{date: string, views: number}[]>([]);
  const [stats, setStats] = useState({ total: 0, today: 0, unique: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // In a real app we'd fetch from an API route that queries the DB.
  // For the prompt we'll simulate the dashboard data loading to provide immediate feedback.
  useEffect(() => {
    // Generate some mock data for the last 30 days
    const generateMockData = () => {
      const mockData = [];
      const now = new Date();
      let totalViews = 0;
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const views = Math.floor(Math.random() * 50) + 10;
        totalViews += views;
        mockData.push({
          date: date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }),
          views
        });
      }
      return { mockData, totalViews };
    };

    setTimeout(() => {
      const { mockData, totalViews } = generateMockData();
      setData(mockData);
      setStats({
        total: totalViews,
        today: mockData[mockData.length - 1].views,
        unique: Math.floor(totalViews * 0.7) // estimate
      });
      setIsLoading(false);
    }, 1000);
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
          <h1 className="text-white text-[28px] font-extrabold tracking-tight mb-2">Estadísticas de Tráfico</h1>
          <p className="text-[#8995A9] text-[14px]">Monitorea el rendimiento de tu sitio web y visitas diarias.</p>
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
            <span className="flex items-center text-green-400 text-[12px] font-bold bg-green-400/10 px-2 py-1 rounded-md">
              +12% <ArrowUpRight size={14} className="ml-1" />
            </span>
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
        <div className="mb-8">
          <h2 className="text-white text-[18px] font-bold">Visitas de los últimos 30 días</h2>
          <p className="text-[#8995A9] text-[13px]">Tendencia general de tráfico orgánico y directo</p>
        </div>
        <div className="w-full h-[400px]">
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
    </div>
  );
}
