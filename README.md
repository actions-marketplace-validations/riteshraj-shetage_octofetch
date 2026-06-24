# octofetch

![build](https://img.shields.io/github/actions/workflow/status/riteshraj-shetage/octofetch/test.yml?branch=main&style=flat-square&color=black&labelColor=18181b)

A lightweight Action to fetch custom GitHub telemetry.

`octofetch` is a zero-bloat, Bun-native execution engine that fires raw `.gql` files directly against the GitHub GraphQL API.

---

## Usage

Add this step to your GitHub Actions workflow:

```yaml
- name: Fetch Custom Telemetry
  uses: riteshraj-shetage/octofetch@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    query_file: ".github/octofetch/repo-meta.gql"
    variables: '{"owner": "${{ github.repository_owner }}", "name": "${{ github.event.repository.name }}"}'
    output_file: "./data/repo-meta.json"
```

### Inputs

| Input          | Description                                                  | Required | Default               |
| -------------- | ------------------------------------------------------------ | -------- | --------------------- |
| `github_token` | GitHub Personal Access Token or standard workflow token.     | **Yes**  | `-`                   |
| `query_file`   | Path to your native GraphQL query file.                      | **Yes**  | `-`                   |
| `variables`    | A JSON string containing variables injected into your query. | No       | `{}`                  |
| `output_file`  | Destination path to save the resulting JSON payload.         | No       | `./data/sourced.json` |

---

## Query

`octofetch` executes pure GraphQL. No custom syntax or translation layers.

To get native IDE auto-complete and real-time schema validation:

1. Install the [GraphQL VS Code extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql).
2. Add a standard `.graphqlrc.yml` to your repository root:

```yaml
schema: "https://docs.github.com/public/fpt/schema.docs.graphql"
documents: ".github/octofetch/**/*.{gql,graphql}"
```

### Example Query

`.github/octofetch/repo-meta.gql`

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

MIT License © 2026 riteshraj-shetage.

See the [LICENSE](LICENSE) file details.
