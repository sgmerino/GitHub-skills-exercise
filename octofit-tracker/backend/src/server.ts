import type { Express } from "express";

const port = 8000;
const codespace = process.env.CODESPACE_NAME;
const apiUrl = codespace
  ? `https://${codespace}-8000.app.github.dev`
  : `http://localhost:${port}`;

export function startServer(app: Express) {
  app.listen(port, () => {
    console.log(`Server listening on ${apiUrl}`);
  });
}
