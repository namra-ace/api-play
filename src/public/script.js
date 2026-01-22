const nameEl = document.getElementById("name");
const workEl = document.getElementById("work");
const githubEl = document.getElementById("github");
const linkedinEl = document.getElementById("linkedin");
const skillsEl = document.getElementById("skills");
const projectsEl = document.getElementById("projects");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Load profile
fetch("/api/profile")
  .then(res => res.json())
  .then(profile => {
    nameEl.textContent = profile.name;
    workEl.textContent = profile.work;

    githubEl.href = profile.links.github;
    linkedinEl.href = profile.links.linkedin;

    // Skills
    skillsEl.innerHTML = "";
    profile.skills.forEach(skill => {
      const span = document.createElement("span");
      span.className = "chip";
      span.textContent = skill;
      
      // --- START UPDATE: Make skills clickable ---
      span.style.cursor = "pointer"; 
      span.title = `Filter projects by ${skill}`;
      
      span.onclick = async () => {
        // Visual feedback: clear search to avoid confusion
        searchInput.value = ""; 
        searchResults.innerHTML = "";
        
        try {
          const res = await fetch(`/api/projects?skill=${encodeURIComponent(skill)}`);
          const projects = await res.json();
          renderProjects(projects, projectsEl);
        } catch (err) {
          console.error("Failed to filter by skill:", err);
        }
      };
      // --- END UPDATE ---

      skillsEl.appendChild(span);
    });

    // Projects
    renderProjects(profile.projects, projectsEl);
  })
  .catch(() => {
    document.body.innerHTML = "<h2>Failed to load profile</h2>";
  });

// Render projects helper
function renderProjects(projects, container) {
  container.innerHTML = "";

  if (!projects || projects.length === 0) {
    container.innerHTML = "<p>No projects found.</p>";
    return;
  }

  projects.forEach(project => {
    const div = document.createElement("div");
    div.className = "project";
    div.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <a href="${project.links[0]}" target="_blank">View Project →</a>
    `;
    container.appendChild(div);
  });
}

// Live search
let debounceTimer = null;

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim();

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    if (!query) {
      searchResults.innerHTML = "";
      return;
    }

    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const projects = await res.json();

    searchResults.innerHTML = "";

    if (!projects.length) {
      searchResults.innerHTML = "<p>No matching projects found</p>";
      return;
    }

    renderProjects(projects, searchResults);
  }, 300); // 300ms debounce
});