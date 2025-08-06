function loadMarkdownFromHash() {
  const slug = location.hash.slice(1) || "home"; // fallback to home
  const file = `md/${slug}.md`;

  fetch(file)
    .then((res) => {
      if (!res.ok) throw new Error("Not found");
      return res.text();
    })
    .then((md) => {
      const html = marked.parse(md);
      document.getElementById("markdown-box").innerHTML = html;

      // Use the rendered DOM directly
      const firstH1 = document.querySelector("#markdown-box h1");
      if (firstH1) {
        document.title = firstH1.textContent.trim();
        console.log("Page title set to:", document.title);
      } else {
        console.warn("No <h1> found in markdown.");
      }
    })
    .catch(() => {
      window.location.href = "https://forrai-zoltan.github.io/404";
    });
}

window.addEventListener("hashchange", loadMarkdownFromHash);
window.addEventListener("DOMContentLoaded", loadMarkdownFromHash);
