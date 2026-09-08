"use client";

import React, { useState } from "react";
import NextImage, { ImageProps } from "next/image";

export default function ImageWithLoader({ className, onLoad, ...props }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <NextImage
      {...props}
      className={`
        ${className || ''} 
        transition-all duration-700 ease-in-out
        ${isLoading ? 'scale-105 blur-sm bg-[#0F172A] animate-pulse' : 'scale-100 blur-0'}
      `}
      onLoad={(e) => {
        setIsLoading(false);
        if (onLoad) onLoad(e);
      }}
    />
  );
}
