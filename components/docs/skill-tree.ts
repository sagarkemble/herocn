import fs from "node:fs";
import path from "node:path";

export function skillFileTree(name: string): string {
  const root = path.join(process.cwd(), "skills", name);
  const lines = [`${path.basename(root)}/`];

  function walk(dir: string, indent: string) {
    const entries = fs
      .readdirSync(dir, {withFileTypes: true})
      .sort((a, b) => Number(b.isDirectory()) - Number(a.isDirectory()) || a.name.localeCompare(b.name));
    entries.forEach((entry, i) => {
      const last = i === entries.length - 1;
      const branch = last ? "└── " : "├── ";
      const nextIndent = indent + (last ? "    " : "│   ");
      if (entry.isDirectory()) {
        const nested = fs.readdirSync(path.join(dir, entry.name));
        if (entry.name === "components") {
          lines.push(`${indent}${branch}${entry.name}/ (${nested.length} files)`);
          return;
        }
        lines.push(`${indent}${branch}${entry.name}/`);
        walk(path.join(dir, entry.name), nextIndent);
        return;
      }
      lines.push(`${indent}${branch}${entry.name}`);
    });
  }

  walk(root, "");
  return lines.join("\n");
}
