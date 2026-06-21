import { PRESETS } from "./presets";

const token = process.env.GITHUB_TOKEN;
const configFile = process.env.CONFIG_FILE || `${import.meta.dir}/.github/default.config.json`;
const outputFile = process.env.OUTPUT_FILE || "./data/sourced.json";

if (!token) {
  console.error("::error:: Error: Missing GITHUB_TOKEN.");
  process.exit(1);
}

try {
  const config = JSON.parse(await Bun.file(configFile).text());
  const { targetNode, args, presets } = config;

  let fields: any[] = config.fields || [];
  if (presets) {
    const presetList = Array.isArray(presets) ? presets : [presets];
    for (const p of presetList) {
      if (PRESETS[p]) fields = [...fields, ...PRESETS[p]];
    }
  }

  let argString = "";
  if (args && Object.keys(args).length > 0) {
    const formattedArgs = Object.entries(args)
      .map(([key, val]) => `${key}: "${val}"`)
      .join(", ");
    argString = `(${formattedArgs})`;
  }

  const fieldString = fields
    .map((f: any) => {
      if (typeof f === "string") return f;
      const [key, val] = Object.entries(f)[0] as [string, any];
      return `${key} { ${val.fields.join(" ")} }`;
    })
    .join("\n    ");

  const query = `
    query {
      ${targetNode}${argString} {
        ${fieldString}
      }
    }
  `;

  console.log("::: Compiling Query :::\n", query);

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${token}`, 
      "User-Agent": "octofetch-action",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const raw = await res.json() as { data?: any; errors?: any[] };
  if (raw.errors) throw new Error(`GraphQL Error: ${JSON.stringify(raw.errors)}`);

  await Bun.write(outputFile, JSON.stringify(raw.data, null, 2));
  console.log(`::: Output written to ${outputFile} :::`);

} catch (e: any) {
  console.error("Fatal:", e.message);
  process.exit(1);
}