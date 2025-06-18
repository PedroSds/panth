
"use client";

import Image from 'next/image';
import type { FeedbackItem } from '@/types';
import { Card } from '@/components/ui/card'; // Removed CardContent as it's not directly used for layout here

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-2xl shadow-xl h-full min-h-[380px] sm:min-h-[420px] md:min-h-[480px] justify-center items-center p-6 bg-card">
      {feedback.imageUrl ? (
        <div className="flex flex-col items-center text-center w-full">
          <div className="aspect-square relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] border-4 border-secondary rounded-xl p-1.5 bg-muted/20 mb-6 shadow-md">
            <Image
              src={feedback.imageUrl}
              alt={`Feedback de ${feedback.name}`}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
              data-ai-hint="customer feedback image"
            />
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary">{feedback.name}</p>
        </div>
      ) : (
        <div className="text-center max-w-md">
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary mb-4">{feedback.name}</p>
          {feedback.text && (
            <blockquote className="text-base sm:text-lg md:text-xl text-muted-foreground italic leading-relaxed">
              "{feedback.text}"
            </blockquote>
          )}
        </div>
      )}
    </Card>
  );
}
