/**
 * Fix script: repairs routes where { params } destructuring caused
 * the body extraction to grab the wrong opening brace.
 *
 * Broken:  withAuth(async (request, { params }, auth) => { params }) {
 * Fixed:   withAuth(async (request, { params }, auth) => {
 *
 * Run: node scripts/fix-params-routes.js
 */
const fs = require("fs");
const path = require("path");

const API_DIR = path.join(__dirname, "..", "src", "app", "api");

function findRouteFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findRouteFiles(fullPath));
    } else if (entry.name === "route.js") {
      results.push(fullPath);
    }
  }
  return results;
}

let fixed = 0;
let skipped = 0;

for (const file of findRouteFiles(API_DIR)) {
  let content = fs.readFileSync(file, "utf8");
  const rel = path.relative(API_DIR, file);

  // Match the broken pattern: auth) => { params }) {
  // This is the artifact of indexOf("{") hitting the { in { params } instead of the function body
  const broken = /auth\)\s*=>\s*\{[^}]*\}\s*\)\s*\{/g;

  if (broken.test(content)) {
    content = content.replace(broken, "auth) => {");
    fs.writeFileSync(file, content, "utf8");
    fixed++;
    console.log(`  FIXED  ${rel}`);
  } else {
    skipped++;
  }
}

console.log(`\nDone: ${fixed} fixed, ${skipped} unchanged`);
