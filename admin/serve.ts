import { loadSync } from "../deno.deps.ts";

const PUB_DIR = loadSync()["PUB_DIR"];
const server = Deno.listen({ port: 8080 });
console.log("HTTP webserver running at: http://localhost:8080/");

const decoder = new TextDecoder("utf-8");
const MIME_TYPES = {
  css: "text/css",
  gif: "image/gif",
  htm: "text/html",
  html: "text/html",
  ico: "image/vnd.microsoft.icon",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  mjs: "text/javascript",
  png: "image/png",
  pdf: "application/pdf",
  svg: "image/svg+xml",
  ttf: "font/ttf",
  txt: "text/plain",
} as const;

function contentType(filePath: string) {
  const key = (filePath.match(/\.(.*)/) || [])[1] as keyof typeof MIME_TYPES;
  const type = key in MIME_TYPES ? MIME_TYPES[key] : MIME_TYPES.txt;

  return { "Content-Type": type };
}

for await (const conn of server) {
  serveHttp(conn);
}

async function serveHttp(conn: Deno.Conn) {
  const httpConn = Deno.serveHttp(conn);

  for await (const req of httpConn) {
    const host = req.request.headers.get("host") ?? "";
    const reqPath = req.request.url.replace(`http://${host}/`, "");
    const filePath = reqPath || "index.html";
    const mime = contentType(filePath);

    console.log(req.request.method, filePath, mime);

    try {
      const data = await Deno.readFileSync(`${PUB_DIR}/${filePath}`);

      req.respondWith(
        new Response(decoder.decode(data), {
          headers: { ...mime },
          status: 200,
        }),
      );
    } catch (error) {
      if (error.name === Deno.errors.NotFound.name) {
        console.log(`[404] File not found: "${filePath}`);
        req.respondWith(new Response("Not found.", { status: 404 }));
      } else {
        req.respondWith(
          new Response("Sorry, something went wrong.", { status: 500 }),
        );
        throw error;
      }
    }
  }
}
