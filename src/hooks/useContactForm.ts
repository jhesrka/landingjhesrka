"use client";

import { useState, useEffect } from "react";

export type ContactFormData = {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  message: string;
  company?: string;
  budget?: string;
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
    company: "",
    budget: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Check cooldown on mount
  useEffect(() => {
    setIsMounted(true);
    const lastSubmitTime = localStorage.getItem("jhesrka_last_submit");
    if (lastSubmitTime) {
      const timePassed = Date.now() - parseInt(lastSubmitTime);
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (timePassed < thirtyMinutes) {
        setIsSubmitted(true);
        // Calculate remaining minutes for display if needed
        setCooldownTimeLeft(Math.ceil((thirtyMinutes - timePassed) / 60000));
      } else {
        localStorage.removeItem("jhesrka_last_submit");
      }
    }
  }, []);

  const openCalendly = () => {
    setIsPopupOpen(true);
  };

  const closeCalendly = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  // Custom setter for complex inputs like grids of buttons
  const setFieldValue = (name: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      alert("Por favor, ingresa al menos tu nombre y WhatsApp.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Set cooldown, show Thank You message, and open popup
        localStorage.setItem("jhesrka_last_submit", Date.now().toString());
        setIsSubmitted(true);
        openCalendly();
      } else {
        alert("Hubo un error al enviar tu solicitud. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Hubo un error al enviar tu solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    isSubmitted,
    isPopupOpen,
    cooldownTimeLeft,
    isMounted,
    handleChange,
    setFieldValue,
    handleSubmit,
    openCalendly,
    closeCalendly,
  };
};
