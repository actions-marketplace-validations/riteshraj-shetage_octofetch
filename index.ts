import * as core from '@actions/core';
import * as github from '@actions/github';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

async function run() {
  try {
    const token = process.env.GITHUB_TOKEN || core.getInput('github_token', { required: true });
    const queryFile = process.env.QUERY_FILE || core.getInput('query_file', { required: true });
    const variablesInput = process.env.VARIABLES || core.getInput('variables') || '{}';
    const outputFile = process.env.OUTPUT_FILE || core.getInput('output_file', { required: true });

    const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
    const absoluteQueryPath = resolve(workspace, queryFile);
    const absoluteOutputPath = resolve(workspace, outputFile);

    core.info(`Reading native GraphQL query from: ${queryFile}`);

    const fileRef = Bun.file(absoluteQueryPath);
    if (!(await fileRef.exists())) {
      throw new Error(`Query file not found at path: ${absoluteQueryPath}`);
    }
    const query = await fileRef.text();

    let variables = {};
    try {
      variables = JSON.parse(variablesInput);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Failed to parse variables JSON string. Ensure it is valid JSON. Error: ${e.message}`);
      }
    }

    const octokit = github.getOctokit(token);
    core.info(`Executing query against GitHub API...`);
    
    const response = await octokit.graphql(query, variables);

    mkdirSync(dirname(absoluteOutputPath), { recursive: true });
    
    await Bun.write(absoluteOutputPath, JSON.stringify(response, null, 2));
    
    core.info(`Successfully wrote telemetry payload to ${outputFile}`);

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`octofetch failed: ${error.message}`);
    } else {
      core.setFailed(`octofetch failed with an unknown error.`);
    }
  }
}

run();