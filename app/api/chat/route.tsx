import {
    AIStream,
    AIStreamCallbacksAndOptions,
    AIStreamParser,
    StreamingTextResponse,
    createStreamDataTransformer,
  } from "ai";
  
export const dynamic = "force-dynamic";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

function parseLangServeStream(): AIStreamParser {
  return (data) => {
    const json = JSON.parse(data)
    if (json.agent && json.agent.messages) {
      const messages = json.agent.messages
      return messages[messages.length - 1]
    }
    return '';
  };
}

function LangServeStream(
  res: Response,
  cb?: AIStreamCallbacksAndOptions,
): ReadableStream {
  return AIStream(res, parseLangServeStream(), cb).pipeThrough(
    createStreamDataTransformer(),
  );
}

export async function POST(req: Request) {
  const { messages } = await req.json();
  const postData = { input: { messages } };


  const fetchResponse = await fetch(`${BACKEND_URL}/chat/stream`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  const anthropicStream = LangServeStream(fetchResponse, {
    onStart: async () => {
      console.log("Stream started");
    },
    onCompletion: async (completion) => {
      console.log("Completion completed", completion);
    },
    onFinal: async (completion) => {
      console.log("Stream completed", completion);
    },
    onToken: async (token) => {
      console.log("Token received", token);
    },
  });

  return new StreamingTextResponse(anthropicStream);
}