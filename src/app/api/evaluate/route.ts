const API_URL = process.env.BACKEND_URL;
export const POST = async (req: Request) => {
  const body = (await req.json()) as { text: string };
  const { text } = body;
  const response = await fetch(`${API_URL}/api/chat/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_query: text,
    }),
  });
  const data = (await response.json()) as string;
  return new Response(JSON.stringify(JSON.parse(data)), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
