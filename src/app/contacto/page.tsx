import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { ContactWhyUs } from "@/components/contact/ContactWhyUs";
import { ContactFAQ } from "@/components/contact/ContactFAQ";
import { ContactFinalCTA } from "@/components/contact/ContactFinalCTA";

export const metadata = {
  title: "Contacto | JHESRKA DEVELOPER",
  description: "Hablemos de tu próximo proyecto. Cuéntanos tu idea y te ayudaremos a convertirla en una solución digital profesional para tu empresa.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#01040A] flex flex-col selection:bg-[#00D2FF]/30 selection:text-white">
      <Navbar />
      
      <main className="flex-grow pt-[80px]">
        <ContactHero />
        <ContactMethods />
        <ContactWhyUs />
        <ContactFAQ />
        <ContactFinalCTA />
      </main>

      <Footer />
    </div>
  );
}
