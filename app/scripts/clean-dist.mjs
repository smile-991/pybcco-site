import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
fs.rmSync(distDir, { recursive: true, force: true });
console.log("✅ Cleaned dist before production build");
