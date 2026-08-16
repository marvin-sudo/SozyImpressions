import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import compression from "compression";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable HTTP response compression (gzip/deflate)
  app.use(compression({
    level: 6,
    threshold: 1024, // only compress responses above 1KB
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    }
  }));

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
  });

  // Vite middleware for development vs optimized static serving in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Cache static immutable assets (JS, CSS, images, fonts)
    app.use('/assets', express.static(path.join(distPath, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }));

    // Cache other static files with shorter TTL
    app.use(express.static(distPath, {
      maxAge: '1h',
      etag: true,
      lastModified: true
    }));

    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
