# octofetch

![build](https://img.shields.io/github/actions/workflow/status/riteshraj-shetage/octofetch/test.yml?branch=main&style=flat-square&color=black&labelColor=18181b)

A declarative, lightweight GitHub GraphQL action that compiles user configs and fetches raw telemetry payloads for automated integrations. Zero-dependency, powered by Bun.

---

## Usage

Add this step to your GitHub Actions workflow to extract raw GitHub telemetry:

```yaml
- name: Fetch GitHub Telemetry
  uses: riteshraj-shetage/octofetch@v1
  env:
    GITHUB_TOKEN: ${{ secrets.OCTOFETCH_TOKEN }}
    CONFIG_FILE: .github/default.config.json
    OUTPUT_FILE: ./data/sourced.json
```

## Configuration

The action executes based on a declarative JSON configuration contract.

### Example Config

```json
{
  "targetNode": "repository",
  "args": {
    "owner": "riteshraj-shetage",
    "name": "octofetch"
  },
  "fields": ["name", "description", "stargazerCount", "forkCount"]
}
```

---

## Development

Engineered with Bun.

```bash
# Install dependencies
bun install

# Run compiler locally
bun run index.ts
```

## Contracts

Bind your configuration to the remote [JSON schema](https://raw.githubusercontent.com/riteshraj-shetage/octofetch/main/octofetch.schema.json) for live auto-complete and validation. If your IDE can't load it, refer to a downloaded local copy instead:

```json
"$schema": "./octofetch.schema.json"
```

---

## License

[MIT](LICENSE)
