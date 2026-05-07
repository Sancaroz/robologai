(function () {
  const postsUrl = "content/posts.json";

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inlineMarkdown(value) {
    return escapeHtml(value)
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function markdownToHtml(value) {
    return String(value || "")
      .split(/\n{2,}/)
      .map((block) => {
        const text = block.trim();
        if (!text) return "";
        const image = text.match(/^['"]?\s*!\[(.*?)\]\((.*?)\)\s*$/);
        if (image) {
          const src = image[2].startsWith("http") || image[2].startsWith("/")
            ? image[2]
            : `/${image[2]}`;
          return `<figure class="cms-figure"><img src="${escapeHtml(src)}" alt="${escapeHtml(image[1])}" loading="lazy"></figure>`;
        }
        if (text.startsWith("## ")) return `<h2>${inlineMarkdown(text.slice(3))}</h2>`;
        if (text.startsWith("# ")) return `<h2>${inlineMarkdown(text.slice(2))}</h2>`;
        return `<p>${inlineMarkdown(text).replace(/\n/g, "<br>")}</p>`;
      })
      .join("");
  }

  function coverFigure(src, alt) {
    return `<figure class="cms-figure cms-cover"><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" onerror="this.onerror=null;this.src='/assets/uploads/mercy-ai-justice-cover.jpg';"></figure>`;
  }

  function normalizePosts(data) {
    return (data.posts || [])
      .filter((post) => post.status === "Published")
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
  }

  function readingTime(value) {
    const words = String(value || "").trim().split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 220))} min read`;
  }

  function postCover(post) {
    if (post.coverImage) return post.coverImage;
    if (post.slug === "mercy-ai-justice-review") return "/assets/uploads/mercy-ai-justice-cover.jpg";
    return "";
  }

  async function loadPosts() {
    const response = await fetch(postsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load CMS posts");
    return normalizePosts(await response.json());
  }

  function renderHomePosts(posts) {
    const container = document.querySelector("[data-cms-posts]");
    if (!container) return;
    container.innerHTML = posts.slice(0, 6).map((post) => `
      <a href="${escapeHtml(post.url || `post.html?slug=${encodeURIComponent(post.slug)}`)}">
        ${postCover(post) ? `<img class="post-card-image" src="${escapeHtml(postCover(post))}" alt="" loading="lazy">` : ""}
        <span>${escapeHtml(post.type)} · ${escapeHtml(post.category)} · ${readingTime(post.body)}</span>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt)}</p>
      </a>
    `).join("");
  }

  function renderPostPage(posts) {
    const article = document.querySelector("[data-cms-post]");
    if (!article) return;
    const slug = new URLSearchParams(window.location.search).get("slug");
    const post = posts.find((item) => item.slug === slug) || posts[0];
    if (!post) {
      article.innerHTML = "<h1>No CMS posts found.</h1><p>Add your first post from the admin panel.</p>";
      document.title = "No CMS posts found | robologai";
      return;
    }
    document.title = `${post.title} | robologai`;
    const coverImage = post.coverImage || (
      post.slug === "mercy-ai-justice-review"
        ? "/assets/uploads/mercy-ai-justice-cover.png"
        : ""
    );
    article.innerHTML = `
      <p class="page-kicker">${escapeHtml(post.type)} · ${escapeHtml(post.category)} · ${escapeHtml(post.date)}</p>
      <h1>${escapeHtml(post.title)}</h1>
      <div class="article-meta">
        <span>Robologai Editorial Desk</span>
        <span>${readingTime(post.body)}</span>
        <span>Source-focused analysis</span>
      </div>
      <p class="article-lead">${escapeHtml(post.excerpt)}</p>
      ${coverImage ? coverFigure(coverImage, post.title) : ""}
      <div class="share-actions">
        <a href="https://x.com/intent/tweet?text=${encodeURIComponent(`New on robologai: ${post.title}`)}&url=${encodeURIComponent(`https://robologai.com/post.html?slug=${post.slug}`)}" target="_blank" rel="noopener noreferrer">Share on X</a>
      </div>
      ${markdownToHtml(post.body)}
      <div class="article-note">
        <strong>Editorial note:</strong> This article was published through the Robologai admin workflow.
      </div>
      <div class="related-posts">
        <span>Continue reading</span>
        <a href="index.html#admin-desk">Latest Robologai analysis</a>
        <a href="index.html#sirketler">Company database</a>
      </div>
    `;
  }

  loadPosts()
    .then((posts) => {
      renderHomePosts(posts);
      renderPostPage(posts);
    })
    .catch(() => {
      // Keep the static fallback cards visible when local file browsing blocks fetch().
    });
})();
