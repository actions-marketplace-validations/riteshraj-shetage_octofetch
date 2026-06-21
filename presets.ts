export const PRESETS: Record<string, any[]> = {
  "user-profile": [
    "name",
    "login",
    "bio",
    "avatarUrl",
    "company",
    "location",
    "websiteUrl",
    "followers { totalCount }",
    "following { totalCount }",
    `socialAccounts(first: 10) { 
      nodes { 
        provider 
        displayName 
        url 
      } 
    }`
  ],

    "user-metrics": [
        `repositories(first: 100, ownerAffiliations: [OWNER], isFork: false, privacy: PUBLIC) { 
        totalCount 
        nodes { 
            stargazerCount 
            forkCount 
        } 
    }`,
    "contributionsCollection { totalCommitContributions restrictedContributionsCount }"
  ],

  "user-contribution-calendar": [
    `contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }`
  ],

  "user-top-repos": [
    `repositories(first: 6, ownerAffiliations: [OWNER], isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes {
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
    }`
  ],

    "user-top-languages": [
        `repositories(first: 100, ownerAffiliations: [OWNER], isFork: false) {
        nodes {
            languages(first: 6, orderBy: {field: SIZE, direction: DESC}) {
            edges {
                size
                node {
                name
                color
                }
            }
            }
        }
        }`
    ]
};