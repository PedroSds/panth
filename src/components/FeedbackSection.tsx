
"use client";

import type { FeedbackItem } from '@/types';
import { FeedbackCard } from './FeedbackCard';
import { Star } from 'lucide-react';

interface FeedbackSectionProps {
  feedbackItems: FeedbackItem[];
}

export function FeedbackSection({ feedbackItems }: FeedbackSectionProps) {
  if (!feedbackItems || feedbackItems.length === 0) {
    return null;
  }

  return (
    <section id="feedbacks" aria-labelledby="feedbacks-heading" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex flex-col items-center sm:flex-row sm:items-center">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-secondary mb-2 sm:mb-0 sm:mr-3" />
            <h2 id="feedbacks-heading" className="text-2xl sm:text-3xl font-headline font-semibold text-primary">
              Avaliações
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {feedbackItems.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      </div>
    </section>
  );
}

