'use client';

import { useState } from 'react';
import { AIEvent } from '@/lib/ai-agent';

interface UseEventGeneratorReturn {
    generateEvent: (prompt: string) => Promise<AIEvent | null>;
    loading: boolean;
    error: string | null;
}

export function useEventGenerator(): UseEventGeneratorReturn {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateEvent = async (prompt: string): Promise<AIEvent | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/generate-event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate event');
            }

            if (data.event) {
                return data.event;
            }

            if (data.is_appropriate === false) {
                setError("The request was marked as inappropriate by the AI.");
                return null;
            }

            return null;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { generateEvent, loading, error };
}
