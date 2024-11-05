import { compras } from "./hello.mjs";

export async function GET(request) {
  return new Response(JSON.stringify(compras), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}