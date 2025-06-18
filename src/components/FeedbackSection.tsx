
"use client";

import type { FeedbackItem } from '@/types';
import { FeedbackCard } from './FeedbackCard';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface FeedbackSectionProps {
  feedbackItems: FeedbackItem[];
}

export function FeedbackSection({ feedbackItems }: FeedbackSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!feedbackItems || feedbackItems.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < feedbackItems.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const currentFeedback = feedbackItems[currentIndex];

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
        
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg md:max-w-xl mb-6">
            {currentFeedback && <FeedbackCard feedback={currentFeedback} />}
          </div>

          {feedbackItems.length > 1 && (
            <div className="flex items-center justify-center space-x-4 mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                aria-label="Feedback anterior"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <p className="text-sm text-muted-foreground tabular-nums">
                {currentIndex + 1} / {feedbackItems.length}
              </p>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex === feedbackItems.length - 1}
                aria-label="Próximo feedback"
                className="border-primary text-primary hover:bg-primary/10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
