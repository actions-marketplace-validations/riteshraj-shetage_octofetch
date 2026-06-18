const token = process.env.GITHUB_TOKEN;
const login = "riteshraj-shetage";

if (!token) {
  console.error("Error: Missing GITHUB_TOKEN.");
  process.exit(1);
}

try {
  const query = await Bun.file(`${import.meta.dir}/graphql/user/get-user.graphql`).text();
  
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "User-Agent": "octofetch-action" },
    body: JSON.stringify({ query, variables: { login } })
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

  const raw = await res.json() as { data?: any; errors?: any[] };
  if (raw.errors) throw new Error(`GraphQL: ${JSON.stringify(raw.errors)}`);

  console.log(JSON.stringify(raw, null, 2));
} catch (e: any) {
  console.error("Fatal:", e.message);
  process.exit(1);
}