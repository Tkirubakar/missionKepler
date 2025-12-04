const BASE = "https://nijin-server.vercel.app/api/cineflex";

async function safeFetch(url){
  try {
    const res = await fetch(url);
    if(!res.ok) throw new Error("Network error");
    return await res.json();
  } catch (e) {
    console.warn("Fetch failed:", e.message);
    return null;
  }
}

export const MovieService = {
  async getShortTeasers(){
    const res = await safeFetch(`${BASE}/short-teasers`);
    if (res) return res;
    // fallback mock
    return {
      data: [
        { id: "teaser-1", title: "Teaser 1", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" },
        { id: "teaser-2", title: "Teaser 2", videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }
      ]
    };
  },

  async getMovies(page = 1){
    const res = await safeFetch(`${BASE}/movies?page=${page}`);
    if (res) return res;
    const sample = Array.from({length:9}).map((_, idx)=>({
      id: `m-${page}-${idx}`,
      title: `Sample Movie ${((page-1)*9)+(idx+1)}`,
      likes: Math.floor(Math.random()*200),
      synopsis: "Sample description for demo. Replace with API.",
      actors: ["Actor A","Actor B"]
    }));
    return { data: sample };
  }
};
