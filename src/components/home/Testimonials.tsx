import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { db } from "@/db";
import { testimonials as testimonialsSchema } from "@/db/schema";
import { desc } from "drizzle-orm";

export const Testimonials = async () => {
  let dbTestimonials: any[] = [];
  
  try {
    dbTestimonials = await db.select().from(testimonialsSchema).orderBy(desc(testimonialsSchema.createdAt));
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error);
  }

  // Map DB data or use default fallback if DB is empty/fails
  const testimonials = dbTestimonials.length > 0 
    ? dbTestimonials.map(t => ({
        text: t.content,
        name: t.name,
        company: t.company,
        avatar: t.avatarUrl || "https://i.pravatar.cc/150",
        stars: t.rating || 5
      }))
    : [
        { text: "Excelente trabajo, entendieron perfectamente lo que necesitábamos y superaron nuestras expectativas.", name: "Damián M.", company: "Atucucho Shop", avatar: "https://i.pravatar.cc/150?u=damian", stars: 5 },
        { text: "Profesionales, responsables y siempre dispuestos a ayudar. Nuestro sistema funciona perfecto.", name: "Verónica A.", company: "WishWay", avatar: "https://i.pravatar.cc/150?u=veronica", stars: 5 },
        { text: "Nuestra página quedó increíble, moderna y nos ha traído muchos nuevos clientes.", name: "Cristian V.", company: "CV3 Taller", avatar: "https://i.pravatar.cc/150?u=cristian", stars: 5 },
      ];

  return (
    <section className="py-24 bg-[#01040A] relative border-b border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Header */}
          <div className="lg:w-1/4 text-left">
            <h2 className="text-[26px] md:text-[32px] font-bold text-white uppercase tracking-wide leading-tight">
              LO QUE DICEN <br /> NUESTROS CLIENTES
            </h2>
          </div>

          {/* Carousel */}
          <div className="lg:w-3/4 w-full relative group">
            {/* Nav Arrows */}
            <button className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 text-[#00D2FF] hover:scale-125 transition-transform drop-shadow-[0_0_10px_rgba(0,210,255,0.5)] z-10">
              <ChevronLeft size={28} />
            </button>
            <button className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 text-[#00D2FF] hover:scale-125 transition-transform drop-shadow-[0_0_10px_rgba(0,210,255,0.5)] z-10">
              <ChevronRight size={28} />
            </button>

            <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-4 snap-x snap-mandatory no-scrollbar">
              {testimonials.map((test, idx) => (
                <div 
                  key={idx} 
                  className="snap-center min-w-[280px] lg:min-w-0 bg-[#060D1A] border border-[#1A2333] rounded-2xl p-8 flex flex-col justify-between h-[220px] hover:border-[#00D2FF]/30 transition-colors shadow-lg"
                >
                  <div className="relative">
                    <Quote size={20} className="text-[#00D2FF] mb-4 rotate-180 drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
                    <p className="text-[13px] text-[#DCE6FF] leading-relaxed">
                      "{test.text}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <img 
                        src={test.avatar} 
                        alt={test.name}
                        className="w-10 h-10 rounded-full border border-white/10 object-cover"
                      />
                      <div>
                        <h4 className="text-[13px] font-bold text-white">{test.name}</h4>
                        <p className="text-[11px] text-[#8995A9]">{test.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {[...Array(test.stars)].map((_, i) => (
                        <Star key={i} size={12} className="text-[#FABB18] fill-[#FABB18] drop-shadow-[0_0_5px_rgba(250,187,24,0.5)]" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
