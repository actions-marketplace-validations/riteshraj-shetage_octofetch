const token = process.env.GITHUB_TOKEN;
const login = process.argv[2] || "riteshraj-shetage";
const configFile = process.env.CONFIG_FILE || `${import.meta.dir}/config/octofetch.config.json`;

const config = JSON.parse(await Bun.file(configFile).text());
const outputFile = config.outputFile;


if (!token) {
  console.error("Error: Missing GITHUB_TOKEN.");
  process.exit(1);
}

try {
  const query = await Bun.file(`${import.meta.dir}/graphql/user/get-user.graphql`).text();

  const res = await fetch(config.graphqlUrl, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "User-Agent": "octofetch-action" },
    body: JSON.stringify({ query, variables: { login } })
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const raw = await res.json() as { data?: any; errors?: any[] };
  if (raw.errors) throw new Error(`GraphQL: ${JSON.stringify(raw.errors)}`);

  await Bun.write(outputFile, JSON.stringify(raw, null, 2));
} catch (e: any) {
  console.error("Fatal:", e.message);
  process.exit(1);
}