"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit2, Trash2, X, Save, Upload } from "lucide-react";
import { addProject, updateProject, deleteProject } from "./actions";

type Project = {
  id: number;
  title: string;
  subtitle: string | null;
  imageUrl: string | null;
  previewImageUrl?: string | null;
  link: string | null;
};

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/webp", 0.7));
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export default function ProjectsManager({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState<any[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState("todos");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewImageFile, setPreviewImageFile] = useState<File | null>(null);
  const [previewImagePreviewUrl, setPreviewImagePreviewUrl] = useState<string | null>(null);
  const [existingPreviewImageUrl, setExistingPreviewImageUrl] = useState("");

  const openModal = (project?: any) => {
    if (project) {
      const validTechs = ['React', 'Next.js', 'Node.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript', 'Tailwind', 'PHP', 'WordPress', 'WooCommerce', 'Astra'];
      const currentTechs = project.technologies || [];
      const filteredTechs = currentTechs.filter((t: string) => validTechs.includes(t));

      setEditingId(project.id);
      setTitle(project.title);
      setSubtitle(project.subtitle || "");
      setCategoryId(project.categoryId || "todos");
      setDescription(project.description || "");
      setTechnologies(filteredTechs);
      setImageUrl(project.imageUrl || "");
      setLink(project.link || "");
      setPreviewUrl(project.imageUrl || null);
      setExistingPreviewImageUrl(project.previewImageUrl || "");
      setPreviewImagePreviewUrl(project.previewImageUrl || null);
    } else {
      setEditingId(null);
      setTitle("");
      setSubtitle("");
      setCategoryId("todos");
      setDescription("");
      setTechnologies([]);
      setImageUrl("");
      setLink("");
      setPreviewUrl(null);
      setExistingPreviewImageUrl("");
      setPreviewImagePreviewUrl(null);
    }
    setImageFile(null);
    setPreviewImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePreviewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImageFile(file);
      setPreviewImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    formData.append("technologies", JSON.stringify(technologies));
    formData.append("imageUrl", imageUrl);
    formData.append("previewImageUrl", existingPreviewImageUrl);
    formData.append("link", link);
    if (imageFile) {
      const compressed = await compressImage(imageFile);
      formData.append("imageBase64", compressed);
    }
    if (previewImageFile) {
      const compressedPreview = await compressImage(previewImageFile);
      formData.append("previewImageBase64", compressedPreview);
    }

    try {
      let res;
      if (editingId) {
        res = await updateProject(editingId, formData);
      } else {
        res = await addProject(formData);
      }
      
      if (res?.error) {
        throw new Error(res.error);
      }

      // Refresh page to get new data including proper image URLs
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Hubo un error al guardar.");
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de eliminar este proyecto y su imagen asociada?")) {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[20px] font-bold text-white tracking-wide">Gestión de Proyectos</h2>
        <button 
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-[#00D2FF] text-[#01040A] px-4 py-2 rounded-lg font-bold hover:bg-[#00D2FF]/80 transition-colors"
        >
          <Plus size={18} /> Añadir Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#060D1A] rounded-xl border border-[#1A2333] overflow-hidden flex flex-col">
            <div className="h-40 bg-black relative">
              {p.imageUrl ? (
                <Image src={p.imageUrl} alt={p.title} fill className="object-cover object-top opacity-80" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">Sin Imagen</div>
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-white font-bold mb-1">{p.title}</h3>
              <p className="text-sm text-[#8995A9] mb-4 flex-1">{p.subtitle}</p>
              
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => openModal(p)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm transition-colors"
                >
                  <Edit2 size={14} /> Editar
                </button>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="flex items-center justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500 p-2 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#060D1A] border border-[#1A2333] rounded-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-5 border-b border-[#1A2333]">
              <h3 className="text-white font-bold">{editingId ? 'Editar Proyecto' : 'Nuevo Proyecto'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-xs text-[#8995A9] uppercase mb-1 font-bold">Título</label>
                <input 
                  type="text" required
                  value={title} onChange={e => setTitle(e.target.value)}
                  className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
                />
              </div>
              
              <div>
                <label className="block text-xs text-[#8995A9] uppercase mb-1 font-bold">Subtítulo (Para Portada)</label>
                <input 
                  type="text" 
                  value={subtitle} onChange={e => setSubtitle(e.target.value)}
                  className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#8995A9] uppercase mb-1 font-bold">Pestaña (Categoría del Portafolio)</label>
                <select
                  value={categoryId} onChange={e => setCategoryId(e.target.value)}
                  className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
                >
                  <option value="todos">Todos</option>
                  <option value="paginas-web">Páginas Web</option>
                  <option value="tiendas-online">Tiendas Online</option>
                  <option value="aplicaciones-web">Aplicaciones Web</option>
                  <option value="sistemas">Sistemas Empresariales</option>
                  <option value="landing">Landing Pages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#8995A9] uppercase mb-1 font-bold">Descripción Detallada</label>
                <textarea 
                  rows={3}
                  value={description} onChange={e => setDescription(e.target.value)}
                  className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#8995A9] uppercase mb-1 font-bold">Tecnologías</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['React', 'Next.js', 'Node.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript', 'Tailwind', 'PHP', 'WordPress', 'WooCommerce', 'Astra'].map(tech => (
                    <label key={tech} className="flex items-center gap-2 text-sm text-white cursor-pointer bg-[#01040A] border border-[#1A2333] p-2 rounded-lg hover:border-[#00D2FF] transition-colors">
                      <input 
                        type="checkbox" 
                        checked={technologies.includes(tech)}
                        onChange={(e) => {
                          if (e.target.checked) setTechnologies([...technologies, tech]);
                          else setTechnologies(technologies.filter(t => t !== tech));
                        }}
                        className="accent-[#00D2FF]"
                      />
                      {tech}
                    </label>
                  ))}
                </div>
              </div>

              <div className="border border-[#1A2333] rounded-lg p-3 bg-[#01040A]">
                <label className="block text-xs text-[#8995A9] uppercase mb-2 font-bold">Imagen del Proyecto</label>
                
                {previewUrl && (
                  <div className="mb-3 relative h-32 w-full rounded-md overflow-hidden bg-black border border-white/10">
                    <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                  </div>
                )}
                
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-2 border-2 border-dashed border-[#1A2333] hover:border-[#00D2FF] rounded-lg p-3 text-sm text-[#8995A9] transition-colors">
                    <Upload size={16} />
                    <span>Haz clic para subir una imagen</span>
                  </div>
                </div>
                
                {!imageFile && imageUrl && (
                  <p className="text-[10px] text-gray-500 mt-2">Imagen actual: {imageUrl}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-[#8995A9] uppercase mb-1 font-bold">Enlace del Proyecto (Link)</label>
                <input 
                  type="text" 
                  value={link} onChange={e => setLink(e.target.value)}
                  className="w-full bg-[#01040A] border border-[#1A2333] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00D2FF]"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 mt-auto">
                <button 
                  type="button" onClick={closeModal}
                  className="px-4 py-2 text-[#8995A9] hover:text-white transition-colors text-sm font-bold"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" disabled={isSubmitting}
                  className="px-4 py-2 bg-[#00D2FF] text-[#01040A] rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-[#00D2FF]/80 transition-colors"
                >
                  <Save size={16} /> {isSubmitting ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
