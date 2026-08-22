"use client";

import React, { useEffect, useState } from "react";
import { getSettings } from "@/app/dashboard/configuracion/actions";

interface WhatsAppLinkProps {
  message?: string;
  className?: string;
  children: React.ReactNode;
}

export const WhatsAppLink = ({ 
  message = "Hola, me gustaría recibir más información sobre sus servicios.", 
  className, 
  children 
}: WhatsAppLinkProps) => {
  // Número de respaldo si falla la DB o no está configurado
  const [whatsappNumber, setWhatsappNumber] = useState("593979398949");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchNumber = async () => {
      try {
        const settings = await getSettings();
        if (settings?.whatsappNumber) {
          setWhatsappNumber(settings.whatsappNumber);
        }
      } catch (error) {
        console.error("Error fetching whatsapp number", error);
      }
    };
    fetchNumber();
  }, []);

  const encodedMessage = encodeURIComponent(message);
  // Prevenir hidratación incorrecta del href
  const waUrl = isMounted 
    ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    : "#";

  return (
    <a 
      href={waUrl} 
      target={isMounted ? "_blank" : undefined} 
      rel="noopener noreferrer" 
      className={className}
    >
      {children}
    </a>
  );
};
