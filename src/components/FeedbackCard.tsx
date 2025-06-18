
"use client";

import Image from 'next/image';
import type { FeedbackItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg h-full">
      {feedback.imageUrl ? (
        <div className="p-3"> {/* Outer padding for the border visual */}
          <div className="aspect-square relative w-full border-2 border-secondary rounded-md p-1 bg-muted/20"> {/* Border itself with inner padding */}
            <Image
              src={feedback.imageUrl}
              alt={`Feedback de ${feedback.name}`}
              layout="fill"
              objectFit="contain" 
              className="rounded-sm"
              data-ai-hint="customer feedback image"
            />
          </div>
        </div>
      ) : null}
      <CardContent className="p-4 text-center flex-grow flex flex-col justify-center">
        <p className="text-lg font-semibold text-primary mb-2">{feedback.name}</p>
        {!feedback.imageUrl && feedback.text && (
          <blockquote className="text-sm text-muted-foreground italic leading-relaxed">
            "{feedback.text}"
          </blockquote>
        )}
      </CardContent>
    </Card>
  );
}
