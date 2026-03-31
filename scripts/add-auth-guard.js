/**
 * Transform script: wraps all API route handlers with withAuth guard.
 * Skips login/logout routes (public endpoints).
 *
 * Run: node scripts/add-auth-guard.js
 * Dry run: node scripts/add-auth-guard.js --dry-run
 */
const fs = require("fs");
const path = require("path");

const DRY_RUN = process.argv.includes("--dry-run");
const API_DIR = path.join(__dirname, "..", "src", "app", "api");
const SKIP_DIRS = new Set(["login", "logout"]);

function findRouteFiles(dir, depth = 0) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Only skip login/logout at the top level of api/
      if (depth === 0 && SKIP_DIRS.has(entry.name)) continue;
      results.push(...findRouteFiles(fullPath, depth + 1));
    } else if (entry.name === "route.js") {
      results.push(fullPath);
    }
  }
  return results;
}

function findMatchingBrace(content, openBraceIndex) {
  let depth = 1;
  let i = openBraceIndex + 1;
  let inString = false;
  let stringChar = "";
  let inTemplate = false;
  let inLineComment = false;
  let inBlockComment = false;

  while (i < content.length && depth > 0) {
    const ch = content[i];
    const next = content[i + 1];

    // Line comment
    if (!inString && !inTemplate && !inBlockComment && ch === "/" && next === "/") {
      inLineComment = true;
      i += 2;
      continue;
    }
    if (inLineComment) {
      if (ch === "\n") inLineComment = false;
      i++;
      continue;
    }

    // Block comment
    if (!inString && !inTemplate && !inLineComment && ch === "/" && next === "*") {
      inBlockComment = true;
      i += 2;
      continue;
    }
    if (inBlockComment) {
      if (ch === "*" && next === "/") {
        inBlockComment = false;
        i += 2;
      } else {
        i++;
      }
      continue;
    }

    // String literals
    if (!inString && !inTemplate && (ch === '"' || ch === "'")) {
      inString = true;
      stringChar = ch;
      i++;
      continue;
    }
    if (inString) {
      if (ch === "\\" ) { i += 2; continue; }
      if (ch === stringChar) inString = false;
      i++;
      continue;
    }

    // Template literals
    if (!inString && !inTemplate && ch === "`") {
      inTemplate = true;
      i++;
      continue;
    }
    if (inTemplate) {
      if (ch === "\\") { i += 2; continue; }
      if (ch === "`") { inTemplate = false; i++; continue; }
      // Template expressions ${...} — depth tracking still applies
      if (ch === "$" && next === "{") { depth++; i += 2; continue; }
    }

    // Brace counting
    if (ch === "{") depth++;
    else if (ch === "}") depth--;
    i++;
  }

  return i; // position after the closing }
}

function transformFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  if (content.includes("withAuth")) {
    return { skipped: true, reason: "already has withAuth" };
  }

  // Match exported async functions (HTTP methods)
  const methodRegex =
    /export\s+async\s+function\s+(GET|POST|PUT|DELETE|PATCH)\s*\(([^)]*)\)\s*\{/g;
  const functions = [];
  let match;

  while ((match = methodRegex.exec(content)) !== null) {
    const method = match[1];
    const params = match[2].trim();
    const startIndex = match.index;
    // The { is the last char of the match
    const openBraceIndex = startIndex + match[0].length - 1;
    const endIndex = findMatchingBrace(content, openBraceIndex);

    functions.push({ method, params, startIndex, endIndex });
  }

  if (functions.length === 0) {
    return { skipped: true, reason: "no exported HTTP methods found" };
  }

  // Transform from end→start so indices stay valid
  for (let i = functions.length - 1; i >= 0; i--) {
    const fn = functions[i];
    const original = content.substring(fn.startIndex, fn.endIndex);

    // Extract the function body (between outer braces)
    const bodyStart = original.indexOf("{") + 1;
    const bodyEnd = original.length - 1;
    const body = original.substring(bodyStart, bodyEnd);

    // Build wrapped params: keep original destructuring, append auth
    let newParams;
    if (!fn.params) {
      newParams = "request, _context, auth";
    } else if (fn.params.includes("{")) {
      // Has destructured second arg like { params }
      newParams = fn.params + ", auth";
    } else {
      newParams = fn.params + ", _context, auth";
    }

    const wrapped =
      `export const ${fn.method} = withAuth(async (${newParams}) => {${body}});`;

    content =
      content.substring(0, fn.startIndex) + wrapped + content.substring(fn.endIndex);
  }

  // Insert import after the last existing import
  const lines = content.split("\n");
  let insertAfter = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(" from ") && (line.includes('"') || line.includes("'"))) {
      insertAfter = i;
    }
  }

  const importLine = 'import { withAuth } from "@/src/lib/withAuth";';
  if (insertAfter >= 0) {
    lines.splice(insertAfter + 1, 0, importLine);
  } else {
    lines.unshift(importLine, "");
  }

  content = lines.join("\n");

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, content, "utf8");
  }

  return { skipped: false, methods: functions.map((f) => f.method) };
}

// ── Main ──────────────────────────────────────────
const routeFiles = findRouteFiles(API_DIR);
console.log(`Found ${routeFiles.length} route files (excluding login/logout)`);
if (DRY_RUN) console.log("DRY RUN — no files will be modified\n");

let transformed = 0;
let skipped = 0;
const errors = [];

for (const file of routeFiles) {
  const rel = path.relative(API_DIR, file);
  try {
    const result = transformFile(file);
    if (result.skipped) {
      skipped++;
      console.log(`  SKIP  ${rel}  (${result.reason})`);
    } else {
      transformed++;
      console.log(`  OK    ${rel}  → ${result.methods.join(", ")}`);
    }
  } catch (err) {
    errors.push({ file: rel, error: err.message });
    console.error(`  ERR   ${rel}  — ${err.message}`);
  }
}

console.log(
  `\nDone: ${transformed} transformed, ${skipped} skipped, ${errors.length} errors`,
);
if (errors.length > 0) {
  console.log("Errors:");
  errors.forEach((e) => console.log(`  ${e.file}: ${e.error}`));
}
