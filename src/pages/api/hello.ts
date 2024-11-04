export function GET(request: Request) {

  return new Response(`Hello from ${request.url}, I'm a Vercel Function!`);
}