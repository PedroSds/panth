
"use client";

import React, { useContext } from 'react';
import { StoreDataContext, type StoreDataContextType } from '@/contexts/StoreDataContext';
import { Film } from 'lucide-react';

export default function VideoPage() {
  const context = useContext(StoreDataContext);

  if (!context) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Erro ao carregar dados da loja...</p>
        </main>
    );
  }

  const { videoUrl, getSectionStyle, isMounted } = context;
  const videoSectionStyle = getSectionStyle('video');

  if (!isMounted) {
    return (
        <main className="flex-grow container mx-auto px-4 py-8 text-center">
            <p>Carregando vídeo...</p>
        </main>
    );
  }

  const showVideoSection = videoUrl && videoUrl.trim() !== '';

  return (
    <main className="flex-grow" style={videoSectionStyle}>
      <div id="video-player" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center sm:flex-row sm:items-center">
            <Film className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mb-2 sm:mb-0 sm:mr-3" />
            <h1 id="video-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-primary">
              Como comprar com segurança:
            </h1>
          </div>
        </div>
        {showVideoSection ? (
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-lg shadow-2xl overflow-hidden border border-border">
            <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="Vídeo em destaque"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-md">
            </iframe>
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-8">Nenhum vídeo configurado no momento.</p>
        )}
      </div>
    </main>
  );
}
