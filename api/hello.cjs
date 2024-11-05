export function GET(request) {

  return new Response(`Hello from ${request.url}, I'm a Vercel Function!`);
}