function extractGitHubStats(svgContent: string): {
  totalCommits: number;
  totalPRs: number;
  contributedTo: number;
} {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");

  const totalCommitsText = svgDoc.querySelector('[data-testid="commits"]')?.textContent?.trim();
  const totalPRsText = svgDoc.querySelector('[data-testid="prs"]')?.textContent?.trim();
  const contributedToText = svgDoc.querySelector('[data-testid="contribs"]')?.textContent?.trim();

  const totalCommits = totalCommitsText ? parseInt(totalCommitsText, 10) : 0;
  const totalPRs = totalPRsText ? parseInt(totalPRsText, 10) : 0;
  const contributedTo = contributedToText ? parseInt(contributedToText, 10) : 0;

  return {
    totalCommits,
    totalPRs,
    contributedTo,
  };
}