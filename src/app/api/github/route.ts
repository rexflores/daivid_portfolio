import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo');

  if (!repo) return NextResponse.json({ error: "No repo provided" }, { status: 400 });

  // Extremely aggressive caching to prevent API rate limits!
  // This tells Vercel to cache the GitHub response globally for 3600 seconds (1 hour).
  const fetchOpts = { next: { revalidate: 3600 } };

  try {
    const [repoRes, commitsRes, contentsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, fetchOpts),
      fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`, fetchOpts),
      fetch(`https://api.github.com/repos/${repo}/contents`, fetchOpts)
    ]);

    const repoData = await repoRes.json();
    const commitsData = await commitsRes.json();
    const contentsData = await contentsRes.json();

    // GitHub's contents API sometimes returns an object instead of array if it's not a dir,
    // but root is always an array for repos. We'll sort directories first, then files.
    let sortedContents = [];
    if (Array.isArray(contentsData)) {
      sortedContents = contentsData.sort((a, b) => {
        if (a.type === 'dir' && b.type !== 'dir') return -1;
        if (a.type !== 'dir' && b.type === 'dir') return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return NextResponse.json({
      repo: repoData,
      latestCommit: commitsData[0],
      contents: sortedContents
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
