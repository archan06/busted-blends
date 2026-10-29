import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Dev only: serve api/*.ts (Vercel Web-handler functions) from the Vite server so `npm run dev` books for real.
const apiDev = (): Plugin => ({
  name: "api-dev",
  configureServer(server) {
    server.middlewares.use("/api", async (req, res) => {
      const name = req.url!.split("?")[0];
      if (!/^\/[a-z]+$/.test(name)) { res.statusCode = 404; return res.end(); }
      try {
        const handler = (await server.ssrLoadModule(`/api${name}.ts`))[req.method!];
        if (!handler) { res.statusCode = 405; return res.end(); }
        const chunks: Buffer[] = [];
        for await (const c of req) chunks.push(c);
        const r: Response = await handler(new Request(`http://localhost${req.originalUrl}`, {
          method: req.method, headers: req.headers as Record<string, string>,
          body: chunks.length ? Buffer.concat(chunks) : undefined,
        }));
        res.statusCode = r.status;
        r.headers.forEach((v, k) => res.setHeader(k, v));
        res.end(Buffer.from(await r.arrayBuffer()));
      } catch (e) {
        server.config.logger.error(String(e));
        res.statusCode = 500; res.end();
      }
    });
  },
});

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), "")); // .env.local → process.env for the API
  return { plugins: [react(), tailwindcss(), apiDev()] };
});
