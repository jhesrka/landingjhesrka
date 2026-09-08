"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Minus, Send, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useRouter } from 'next/navigation';
import Image from "@/components/ui/ImageWithLoader";

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
    if (e) e.preventDefault();
    const textToSend = customInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: "user", content: textToSend };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages })
      });
      
      if (res.ok) {
        const data = await res.json();
        setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.text }]);
      } else {
        setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Hubo un error de conexión, inténtalo de nuevo.' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Hubo un error de red, revisa tu conexión.' }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
            {/* Tooltip Premium */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="relative px-5 py-3 rounded-2xl bg-[#0A101D]/80 backdrop-blur-md border border-[#00D2FF]/20 shadow-[0_8px_32px_rgba(0,210,255,0.15)] flex items-center cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              {/* Brillo interior sutil */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00D2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="relative text-[14px] font-medium text-white/90 whitespace-nowrap tracking-wide">
                ¿Tienes dudas? <span className="text-[#00D2FF] font-semibold drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]">¡Hablemos!</span>
              </span>
              
              {/* Triángulo apuntando al botón */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-[#00D2FF]/30"></div>
            </motion.div>

            {/* Botón Premium (Mascota) */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-[80px] h-[80px] md:w-[130px] md:h-[130px] flex items-center justify-center z-50 group"
              aria-label="Abrir chat de ventas"
            >
              {/* Resplandor exterior animado suave detrás de la mascota */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-[#00D2FF] to-[#007BFF] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Imagen de mascota libre (sin burbuja) */}
              <div className="relative w-full h-full">
                <Image 
                  src="/mascota.webp" 
                  alt="Asistente Jhesrka" 
                  fill 
                  className="object-contain transform group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_10px_rgba(0,210,255,0.4)]"
                />
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Ventana del Chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] bg-[#060D1A] border border-[#00D2FF]/30 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A101D] border-b border-white/10 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12">
                  <Image 
                    src="/mascota.webp" 
                    alt="Asistente Jhesrka" 
                    fill 
                    className="object-contain drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold text-[15px]">Asistente Jhesrka</h3>
                  <p className="text-[#00D2FF] text-[11px] font-medium flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#00D2FF] animate-pulse"></span>
                    En línea (Respuestas inmediatas)
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[#8995A9] hover:text-white transition-colors p-2"
                  aria-label="Minimizar chat"
                  title="Minimizar (no perderás la conversación)"
                >
                  <Minus size={20} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-[#8995A9] hover:text-white transition-colors p-2"
                  aria-label="Cerrar chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#01040A]">
              {/* Mensaje de bienvenida inicial */}
              {messages.length === 0 && (
                <div className="flex justify-start">
                  <div className="bg-[#0A101D] border border-white/5 text-white/90 p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-[14px] shadow-sm">
                    ¡Hola! 👋 Soy el asistente experto de Jhesrka Developer.
                    <br/><br/>
                    ¿Cuéntame, en qué te puedo ayudar hoy? ¿Buscas una cotización, una página web, o tienes alguna duda?
                  </div>
                </div>
              )}

              {/* Mapeo de mensajes de la conversación */}
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`p-3 rounded-2xl max-w-[85%] text-[14px] shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-[#00D2FF] text-black rounded-tr-sm font-medium' 
                        : 'bg-[#0A101D] border border-white/5 text-white/90 rounded-tl-sm'
                    }`}
                  >
                    {m.role === 'user' ? (
                      m.content
                    ) : (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-snug" {...props} />,
                          a: ({node, ...props}) => {
                            const isInternal = props.href?.startsWith('/');
                            const isHash = props.href?.startsWith('#');
                            
                            if (isInternal || isHash) {
                              return (
                                <a 
                                  href={props.href}
                                  onClick={(e) => {
                                    if (isInternal) {
                                      e.preventDefault();
                                      if (props.href) router.push(props.href);
                                    }
                                    // Para isHash, dejamos que el navegador haga el scroll natural
                                  }}
                                  className="text-[#00D2FF] font-bold hover:underline cursor-pointer"
                                >
                                  {props.children}
                                </a>
                              );
                            }
                            return <a target="_blank" rel="noopener noreferrer" className="text-[#00D2FF] font-bold hover:underline" {...props} />;
                          },
                          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="leading-snug" {...props} />
                        }}
                      >
                        {m.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Indicador de escribiendo */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0A101D] border border-white/5 p-3 rounded-2xl rounded-tl-sm text-[#8995A9] flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>


            {/* Input Footer */}
            <div className="p-4 bg-[#0A101D] border-t border-white/10">
              <form 
                onSubmit={(e) => handleSubmit(e)}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  disabled={isLoading}
                  className="w-full bg-[#01040A] border border-white/10 text-white text-[13px] rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-[#00D2FF] transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 text-[#00D2FF] p-2 hover:bg-[#00D2FF]/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
