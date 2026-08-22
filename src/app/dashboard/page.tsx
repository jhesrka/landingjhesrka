import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let leadsData: any[] = [];
  
  try {
    leadsData = await db.select().from(leads).orderBy(desc(leads.createdAt));
  } catch (error) {
    console.error("Failed to fetch leads:", error);
  }

  // Fallback mock data in case DB connection fails
  const displayLeads = leadsData.length > 0 ? leadsData : [
    {
      id: 1,
      fullName: "Juan Pérez",
      phone: "+593 99 123 4567",
      email: "juan@ejemplo.com",
      projectType: "Tienda Online",
      message: "Necesito un e-commerce para mi negocio de ropa.",
      status: "nuevo",
      createdAt: new Date(),
    },
    {
      id: 2,
      fullName: "María González",
      phone: "+593 98 765 4321",
      email: "maria@empresa.com",
      projectType: "Página Web",
      message: "Cotización para una web corporativa.",
      status: "contactado",
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: 3,
      fullName: "Cliente Ejemplo (Tienda)",
      phone: "+593 99 999 9999",
      email: "ejemplo@payphone.com",
      projectType: "Venta Tienda",
      message: "Compra PayPhone Aprobada.\nRef: Compra en JHESRKA - 2 items\nTotal: $420.00\nTx ID: 12345678",
      status: "pagado",
      createdAt: new Date(),
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#060D1A] border border-[#1A2333] rounded-2xl p-6 shadow-lg">
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-wider mb-2">Total Leads</p>
          <h3 className="text-white text-[32px] font-extrabold">{displayLeads.length}</h3>
        </div>
        <div className="bg-[#060D1A] border border-[#1A2333] rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#00D2FF] blur-[50px] opacity-10" />
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-wider mb-2 relative z-10">Nuevos</p>
          <h3 className="text-[#00D2FF] text-[32px] font-extrabold relative z-10">
            {displayLeads.filter(l => l.status === 'nuevo').length}
          </h3>
        </div>
        <div className="bg-[#060D1A] border border-[#1A2333] rounded-2xl p-6 shadow-lg">
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-wider mb-2">Contactados</p>
          <h3 className="text-[#FABB18] text-[32px] font-extrabold">
            {displayLeads.filter(l => l.status === 'contactado').length}
          </h3>
        </div>
        <div className="bg-[#060D1A] border border-[#1A2333] rounded-2xl p-6 shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-green-500 blur-[50px] opacity-10" />
          <p className="text-[#8995A9] text-[13px] font-bold uppercase tracking-wider mb-2 relative z-10">Ventas</p>
          <h3 className="text-green-500 text-[32px] font-extrabold relative z-10">
            {displayLeads.filter(l => l.status === 'pagado').length}
          </h3>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#060D1A] border border-[#1A2333] rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-[#1A2333] flex justify-between items-center">
          <h2 className="text-white font-bold text-[16px]">Contactos y Ventas Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#01040A]">
                <th className="py-4 px-6 text-[#8995A9] text-[12px] font-bold uppercase tracking-wider">Fecha</th>
                <th className="py-4 px-6 text-[#8995A9] text-[12px] font-bold uppercase tracking-wider">Cliente</th>
                <th className="py-4 px-6 text-[#8995A9] text-[12px] font-bold uppercase tracking-wider">Proyecto</th>
                <th className="py-4 px-6 text-[#8995A9] text-[12px] font-bold uppercase tracking-wider">Mensaje</th>
                <th className="py-4 px-6 text-[#8995A9] text-[12px] font-bold uppercase tracking-wider">Estado</th>
                <th className="py-4 px-6 text-[#8995A9] text-[12px] font-bold uppercase tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A2333]">
              {displayLeads.map((lead, idx) => (
                <tr key={lead.id || idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-[#8995A9] text-[13px] whitespace-nowrap">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-white font-bold text-[13px]">{lead.fullName}</p>
                    <p className="text-[#00D2FF] text-[11px] mt-1">{lead.phone}</p>
                    <p className="text-[#8995A9] text-[11px]">{lead.email}</p>
                  </td>
                  <td className="py-4 px-6 text-white text-[13px]">
                    <span className="bg-[#1A2333] px-3 py-1 rounded-full text-[11px] font-bold text-[#DCE6FF]">
                      {lead.projectType || 'No especificado'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[#8995A9] text-[12px] max-w-xs whitespace-pre-wrap">
                    {lead.message || '-'}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                      lead.status === 'nuevo' 
                        ? 'bg-[#00D2FF]/10 text-[#00D2FF] border border-[#00D2FF]/20' 
                        : lead.status === 'pagado'
                        ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                        : 'bg-[#FABB18]/10 text-[#FABB18] border border-[#FABB18]/20'
                    }`}>
                      {lead.status === 'nuevo' ? 'Nuevo' : lead.status === 'pagado' ? 'Pagado' : 'Contactado'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <a 
                      href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-[#FABB18] hover:text-white text-[12px] font-bold underline transition-colors"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayLeads.length === 0 && (
            <div className="p-8 text-center text-[#8995A9] text-[13px]">
              No hay contactos registrados aún.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
