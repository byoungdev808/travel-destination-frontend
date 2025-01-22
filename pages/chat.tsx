'use client';

// import { useEdgeRuntime } from "@assistant-ui/react";
import { Thread, AssistantRuntimeProvider, useMessage, useThreadRuntime } from '@assistant-ui/react';
import { useVercelUseChatRuntime } from '@assistant-ui/react-ai-sdk';
import { useChat } from 'ai/react';
import { ToolFallback } from '@/components/ToolFallBack';
import { makeMarkdownText } from '@assistant-ui/react-markdown';

const MarkdownText = makeMarkdownText();

export default function Chat() {
  const chat = useChat({
    api: '/api/chat',
  });
  
  const runtime = useVercelUseChatRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
        <div className="h-full">
            <Thread
                assistantMessage={{ components: { Text: MarkdownText, ToolFallback } }}
            />
        </div>
    </AssistantRuntimeProvider>
  );
}
