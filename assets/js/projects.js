const projects = [
    {
      title: "VisuTrace",
      image: "/assets/images/projects/visutrace.png",
      description: "Visual tool for analyzing industrial robot trajectories and joint dynamics.",
      link: "/projects/visutrace",
      class: "big-image"  // 👈 IMAGEN MÁS GRANDE
    },
    {
      title: "SolBeam2D",
      image: "/assets/images/projects/solbeam2d.png",
      description: "Interactive tool for modeling and analyzing 2D beam structures with real-time visual feedback.",
      link: "/projects/solbeam2d",
      class: "big-image"  // 👈 IMAGEN MÁS GRANDE
    },
    {
      title: "VibraSim",
      image: "/assets/images/projects/vibrasim.png",
      description: "Interactive simulator for vibration analysis — under active development.",
      link: "/projects/vibrasim",
      class: "big-image"  // 👈 IMAGEN MÁS GRANDE
    }
  ];
  
  function createProjectCard(project) {
    return `
      <div class="project-card ${project.class || ''}" onclick="location.href='${project.link}'">
        <img src="${project.image}" alt="${project.title}">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("projects-container");
    container.className = "projects-grid";
    container.innerHTML = projects.map(createProjectCard).join("");
  });
  