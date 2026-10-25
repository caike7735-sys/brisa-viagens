import { defineConfig } from "@playwright/test";
const port = Number(process.env.TEST_PORT) || 3100;
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.js",
  use: { baseURL: `http://127.0.0.1:${port}` },
  webServer: {
    command: "node server.js",
    env: { PORT: String(port) },
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: false,
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
});
