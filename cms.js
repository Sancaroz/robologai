(function () {
  const postsUrl = "content/posts.json";

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

    if (post.slug === "embodied-tien-kung-3") {
      return "assets/robots/tien-kung-3.png";
    }

    return "";
  }

  function ensureHomePostsContainer() {
    let container = document.querySelector("[data-cms-posts]");

    if (container) return container;

    const main = document.querySelector("main");

    if (!main) return null;

    const section = document.createElement("section");

    section.id = "blog";
    section.className = "content-section latest-posts-section";

    section.innerHTML = `
      <div class="section-heading compact">
        <p>Latest Posts</p>
        <h2>New analysis from the RoboLogAI editor desk.</h2>
        <span>Fresh robotics, humanoid AI, and physical AI updates.</span>
      </div>

      <div class="post-grid" data-cms-posts></div>
    `;

    main.appendChild(section);

    return section.querySelector("[data-cms-posts]");
  }

  async function loadPosts() {
    const response = await fetch(postsUrl, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Could not load CMS posts");
    }

    return normalizePosts(await response.json());
  }

  function renderHomePosts(posts) {
    const container = ensureHomePostsContainer();

    if (!container) return;

    container.innerHTML = posts
      .slice(0, 6)
      .map(
        (post) => `
        <a class="post-card" href="${escapeHtml(post.url)}">
          ${
            postCover(post)
              ? `<img class="post-card-image" src="${escapeHtml(postCover(post))}" alt="">`
              : ""
          }

          <span>
            ${escapeHtml(post.type)} ·
            ${escapeHtml(post.category)} ·
            ${readingTime(post.body)}
          </span>

          <h3>${escapeHtml(post.title)}</h3>

          <p>${escapeHtml(post.excerpt)}</p>
        </a>
      `
      )
      .join("");
  }

  loadPosts()
    .then((posts) => {
      renderHomePosts(posts);
    })
    .catch((error) => {
      console.error(error);
    });
})();
