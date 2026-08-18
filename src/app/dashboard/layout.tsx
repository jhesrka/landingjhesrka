import Link from "next/link";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#01040A] text-white overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-[#060D1A] border-r border-[#1A2333] flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-[#1A2333]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 relative">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M50 5 L95 50 L50 95 L5 50 Z" fill="#00D2FF" />
                <path d="M50 25 L75 50 L50 75 L25 50 Z" fill="#FFD700" />
              </svg>
            </div>
            <span className="font-extrabold tracking-widest text-[14px]">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-8 px-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-[#8995A9] hover:text-[#00D2FF] hover:bg-[#00D2FF]/5 rounded-lg font-bold text-[13px] transition-all">
            <LayoutDashboard size={18} /> Resumen
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-[#8995A9] hover:text-white hover:bg-white/5 rounded-lg font-bold text-[13px] transition-all">
            <Users size={18} /> Leads (Contactos)
          </Link>
          <Link href="/dashboard/proyectos" className="flex items-center gap-3 px-4 py-3 text-[#8995A9] hover:text-white hover:bg-white/5 rounded-lg font-bold text-[13px] transition-all">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
            Proyectos
          </Link>
          <Link href="/dashboard/configuracion" className="flex items-center gap-3 px-4 py-3 text-[#8995A9] hover:text-white hover:bg-white/5 rounded-lg font-bold text-[13px] transition-all">
            <Settings size={18} /> Configuración
          </Link>
        </nav>
        
        <div className="p-4 border-t border-[#1A2333]">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-[#8995A9] hover:text-[#FABB18] rounded-lg font-bold text-[13px] transition-all">
            <LogOut size={18} /> Salir al sitio
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Topbar */}
        <header className="h-20 bg-[#01040A]/80 backdrop-blur-md border-b border-[#1A2333] flex items-center justify-between px-8 z-10">
          <h1 className="text-[18px] font-bold">Panel de Administración</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#00D2FF] flex items-center justify-center text-black font-bold text-[14px]">
              J
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D2FF] blur-[200px] opacity-5 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            {children}
          </div>
        </div>
      </main>
      
    </div>
  );
}
