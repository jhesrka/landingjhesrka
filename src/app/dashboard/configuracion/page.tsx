import { getSettings } from "./actions";
import ConfigForm from "./ConfigForm";

export default async function ConfiguracionPage() {
  const currentSettings = await getSettings();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Configuración del Sistema</h1>
      
      <div className="bg-[#060D1A] border border-[#1A2333] rounded-xl p-6">
        <h2 className="text-xl font-semibold text-[#00D2FF] mb-4">Integración PayPhone</h2>
        <p className="text-gray-400 text-sm mb-6">
          Ingresa tus credenciales de PayPhone para habilitar los pagos en línea en la Tienda.
        </p>
        
        <ConfigForm initialSettings={currentSettings} />
      </div>
    </div>
  );
}
