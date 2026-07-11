/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { 
  Folder, File, GitBranch, Tag, Star, Eye, GitFork, 
  Search, Code, BookOpen, Activity, Loader2
} from "lucide-react";

export function GithubRepoWidget({ repoName }: { repoName: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/github?repo=${repoName}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [repoName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-text-secondary bg-[#0d1117] min-h-[500px] border border-[#30363d] rounded-xl shadow-2xl">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-accent" />
        <p>Fetching live repository data...</p>
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <div className="p-8 text-center bg-[#0d1117] border border-[#30363d] rounded-xl text-red-400">
        Failed to load repository data.
      </div>
    );
  }

  const { repo, latestCommit, contents } = data;

  // Format date relatively (e.g. "2 days ago")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const commitDate = latestCommit ? formatDate(latestCommit.commit.author.date) : "";
  const commitHash = latestCommit ? latestCommit.sha.substring(0, 7) : "";
  const authorName = latestCommit ? latestCommit.commit.author.name : "Unknown";
  const authorAvatar = latestCommit?.author?.avatar_url || "https://github.com/ghost.png";
  const commitMessage = latestCommit ? latestCommit.commit.message.split('\n')[0] : "Initial commit";

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] rounded-xl border border-[#30363d] shadow-2xl overflow-hidden font-sans w-full max-w-6xl mx-auto text-sm flex flex-col md:flex-row">
      
      {/* Main Content (Left) */}
      <div className="flex-1 p-4 md:p-6 border-b md:border-b-0 md:border-r border-[#30363d] min-w-0">
        
        {/* Repo Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={repo.owner.avatar_url} alt="owner" className="w-6 h-6 rounded-full" />
            <span className="font-semibold text-[#58a6ff] hover:underline cursor-pointer truncate text-lg">
              {repoName}
            </span>
            <span className="px-2 py-0.5 rounded-full border border-[#30363d] text-xs text-[#8b949e]">
              Public
            </span>
          </div>

          <div className="flex gap-2 shrink-0">
            <button className="flex items-center gap-2 px-3 py-1 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] transition-colors rounded-md text-xs font-medium">
              <Eye className="w-4 h-4 text-[#8b949e]" /> Watch <span className="bg-[#040d21] px-1.5 rounded-full">{repo.subscribers_count || 0}</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] transition-colors rounded-md text-xs font-medium">
              <GitFork className="w-4 h-4 text-[#8b949e]" /> Fork <span className="bg-[#040d21] px-1.5 rounded-full">{repo.forks_count}</span>
            </button>
            <button className="flex items-center gap-2 px-3 py-1 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] transition-colors rounded-md text-xs font-medium">
              <Star className="w-4 h-4 text-[#8b949e]" /> Star <span className="bg-[#040d21] px-1.5 rounded-full">{repo.stargazers_count}</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] transition-colors rounded-md text-xs font-medium">
              <GitBranch className="w-4 h-4 text-[#8b949e]" /> main <span className="text-[#8b949e] text-[10px]">▼</span>
            </button>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1.5 hover:text-[#58a6ff] cursor-pointer transition-colors"><GitBranch className="w-4 h-4 text-[#8b949e]" /> 1 Branch</span>
              <span className="flex items-center gap-1.5 hover:text-[#58a6ff] cursor-pointer transition-colors"><Tag className="w-4 h-4 text-[#8b949e]" /> 0 Tags</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#30363d] hover:bg-[#30363d] transition-colors rounded-md text-xs font-medium text-[#8b949e]">
              <Search className="w-4 h-4" /> Go to file
            </button>
            <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#30363d] hover:bg-[#30363d] transition-colors rounded-md text-xs font-medium text-[#8b949e]">
              Add file <span className="text-[10px]">▼</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-[#238636] border border-[#2ea043] hover:bg-[#2ea043] transition-colors rounded-md text-xs font-semibold text-white">
              <Code className="w-4 h-4" /> Code <span className="text-[10px]">▼</span>
            </button>
          </div>
        </div>

        {/* File Explorer */}
        <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
          {/* Commit Header */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-[#30363d]">
            <div className="flex items-center gap-2 overflow-hidden">
              <img src={authorAvatar} alt="author" className="w-6 h-6 rounded-full" />
              <span className="font-semibold hover:text-[#58a6ff] cursor-pointer truncate">{authorName}</span>
              <span className="text-[#8b949e] truncate hover:text-[#58a6ff] cursor-pointer">{commitMessage}</span>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4 text-xs">
              <span className="text-[#8b949e] hover:text-[#58a6ff] cursor-pointer font-mono">{commitHash}</span>
              <span className="text-[#8b949e] whitespace-nowrap">{commitDate}</span>
            </div>
          </div>

          {/* Files */}
          <div className="flex flex-col">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {contents.map((item: any, idx: number) => (
              <div key={item.path} className={`flex items-center px-4 py-2 hover:bg-[#161b22] transition-colors group ${idx !== contents.length - 1 ? 'border-b border-[#30363d]' : ''}`}>
                <div className="w-6 shrink-0 text-[#8b949e]">
                  {item.type === 'dir' ? <Folder className="w-4 h-4 fill-[#8b949e]" /> : <File className="w-4 h-4" />}
                </div>
                <div className="flex-1 text-[#c9d1d9] hover:text-[#58a6ff] cursor-pointer truncate pr-4">
                  {item.name}
                </div>
                <div className="hidden sm:block flex-1 text-[#8b949e] truncate pr-4 hover:text-[#58a6ff] cursor-pointer">
                  {commitMessage}
                </div>
                <div className="shrink-0 text-[#8b949e] text-xs whitespace-nowrap">
                  {commitDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add a README */}
        <div className="mt-8 border border-[#30363d] rounded-md overflow-hidden">
          <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center gap-2 font-semibold">
            <BookOpen className="w-4 h-4" /> README
          </div>
          <div className="p-12 flex flex-col items-center justify-center text-center bg-[#0d1117]">
            <BookOpen className="w-8 h-8 text-[#8b949e] mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">Add a README</h3>
            <p className="text-[#8b949e] mb-4">Help people interested in this repository understand your project.</p>
            <button className="px-4 py-1.5 bg-[#238636] border border-[#2ea043] hover:bg-[#2ea043] transition-colors rounded-md text-sm font-semibold text-white">
              Add a README
            </button>
          </div>
        </div>

      </div>

      {/* Right Sidebar */}
      <div className="w-full md:w-72 p-4 md:p-6 shrink-0">
        <h3 className="font-semibold mb-4 text-base">About</h3>
        <p className="text-[#8b949e] italic mb-6">
          {repo.description || "No description, website, or topics provided."}
        </p>

        <div className="flex flex-col gap-3 text-[#8b949e] mb-8">
          <div className="flex items-center gap-2 hover:text-[#58a6ff] cursor-pointer transition-colors">
            <Activity className="w-4 h-4" /> Activity
          </div>
          <div className="flex items-center gap-2 hover:text-[#58a6ff] cursor-pointer transition-colors">
            <Star className="w-4 h-4" /> {repo.stargazers_count} stars
          </div>
          <div className="flex items-center gap-2 hover:text-[#58a6ff] cursor-pointer transition-colors">
            <Eye className="w-4 h-4" /> {repo.subscribers_count || 0} watching
          </div>
          <div className="flex items-center gap-2 hover:text-[#58a6ff] cursor-pointer transition-colors">
            <GitFork className="w-4 h-4" /> {repo.forks_count} forks
          </div>
        </div>

        <div className="border-t border-[#30363d] pt-6 mb-6">
          <h3 className="font-semibold mb-3">Releases</h3>
          <p className="text-xs text-[#8b949e]">No releases published</p>
          <a href="#" className="text-[#58a6ff] text-xs hover:underline mt-1 inline-block">Create a new release</a>
        </div>

        <div className="border-t border-[#30363d] pt-6 mb-6">
          <h3 className="font-semibold mb-3">Packages</h3>
          <p className="text-xs text-[#8b949e]">No packages published</p>
          <a href="#" className="text-[#58a6ff] text-xs hover:underline mt-1 inline-block">Publish your first package</a>
        </div>

        <div className="border-t border-[#30363d] pt-6 mb-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">Contributors <span className="bg-[#30363d] text-white px-1.5 py-0.5 rounded-full text-[10px]">1</span></h3>
          <div className="flex items-center gap-2">
            <img src={repo.owner.avatar_url} alt="contributor" className="w-8 h-8 rounded-full" />
            <span className="text-[#c9d1d9] font-medium hover:text-[#58a6ff] cursor-pointer">{repo.owner.login}</span>
          </div>
        </div>

        <div className="border-t border-[#30363d] pt-6">
          <h3 className="font-semibold mb-3">Languages</h3>
          <div className="flex items-center gap-1 mb-2">
            <div className="w-[85%] h-2 bg-[#3178c6] rounded-l-full"></div>
            <div className="w-[15%] h-2 bg-[#f1e05a] rounded-r-full"></div>
          </div>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3178c6]"></span>
              <span className="text-[#c9d1d9] font-semibold">TypeScript</span>
              <span className="text-[#8b949e]">85.0%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f1e05a]"></span>
              <span className="text-[#c9d1d9] font-semibold">JavaScript</span>
              <span className="text-[#8b949e]">15.0%</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
