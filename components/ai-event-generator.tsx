'use client';

import { useState } from 'react';
import { useEventGenerator } from '@/hooks/use-event-generator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

interface AIEventGeneratorProps {
  onEventGenerated?: (event: { name: string; description: string; category: string }) => void;
}

export function AIEventGenerator({ onEventGenerated }: AIEventGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const { generateEvent, loading, error } = useEventGenerator();
  const [generatedEvent, setGeneratedEvent] = useState<{
    name: string;
    description: string;
    category: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    const event = await generateEvent(prompt);
    
    if (event) {
      setGeneratedEvent(event);
      onEventGenerated?.(event);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Event Generator
        </CardTitle>
        <CardDescription>
          Describe your event idea and let AI create professional content for you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            Event Description
          </label>
          <Textarea
            id="prompt"
            placeholder="Example: A tech conference about AI for software developers in Istanbul, focusing on practical applications and best practices..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            disabled={loading}
          />
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Event
            </>
          )}
        </Button>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {generatedEvent && (
          <div className="space-y-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <label className="text-sm font-medium text-green-900">Event Name</label>
              <p className="mt-1 text-green-700">{generatedEvent.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-green-900">Description</label>
              <p className="mt-1 text-green-700 whitespace-pre-wrap">
                {generatedEvent.description}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-green-900">Category</label>
              <p className="mt-1 text-green-700">{generatedEvent.category}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
