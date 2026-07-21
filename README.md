# octofetch

![build](https://img.shields.io/github/actions/workflow/status/riteshraj-shetage/octofetch/test.yml?branch=main&style=flat-square&labelColor=18181b&logo=github&logoColor=white)
![release](https://img.shields.io/github/v/release/riteshraj-shetage/octofetch?style=flat-square&labelColor=18181b&logo=github&logoColor=white)

<br>

**octofetch** is a lightweight, zero-config, Bun-native `GitHub action` that executes raw query files against the [GitHub GraphQL API](https://docs.github.com/en/graphql) and dumps clean JSON payloads.

---

## Usage

Add this step to your GitHub Actions workflow:

```yaml
- name: Fetch Custom Telemetry using octofetch
  uses: riteshraj-shetage/octofetch@v1
  with:
    query_file: ".github/octofetch/your-query.gql"
```

### Inputs

| Input          | Description                                                        | Required | Default               |
| -------------- | ------------------------------------------------------------------ | -------- | --------------------- |
| `github_token` | GitHub token for authentication.                                   | No       | `${{ github.token }}` |
| `query_file`   | Path to your native GraphQL query file.                            | **Yes**  | `-`                   |
| `variables`    | A JSON string containing variables to be injected into your query. | No       | `{}`                  |
| `output_file`  | Destination path to save the resulting JSON payload.               | No       | `./data/sourced.json` |

---

## GraphQL

`octofetch` executes pure GraphQL. No custom syntax or translation layers.

To get native IDE auto-complete and real-time schema validation:

1. Install the [GraphQL VS Code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).
2. Add a standard `.graphqlrc.yml` to your repository root:

```yaml
schema: "https://docs.github.com/public/fpt/schema.docs.graphql"
documents: ".github/octofetch/**/*.{gql,graphql}"
```

### Example Query

```graphql
query ($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    description
    url
    stargazerCount
    forkCount
    primaryLanguage {
      name
      color
    }
  }
}
```

---

## Development

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=flat-square&logo=bun&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-%23000000.svg?style=flat-square&logo=typescript&logoColor=white)

```bash
# Install dependencies
bun install

# Execute locally
bun run index.ts
```

## License

[MIT License](LICENSE) © 2026 riteshraj-shetage.
