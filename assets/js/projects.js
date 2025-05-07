const projects = [
    {
      title: "Smart Predictive Maintenance",
      image: "/assets/images/projects/blank-image.jpg",
      description: "Machine learning-driven system to predict mechanical failures in industrial environments.",
      link: "/projects/smart-maintenance"
    },
    {
      title: "Digital Twin for Vehicle Dynamics",
      image: "/assets/images/projects/blank-image.jpg",
      description: "Simulation model of a vehicle's dynamic behavior for control algorithm development.",
      link: "/projects/digital-twin"
    },
    {
      title: "Robotic Arm Vibration Analysis",
      image: "/assets/images/projects/blank-image.jpg",
      description: "Experimental modal analysis and real-time damping control for robotic manipulators.",
      link: "/projects/robotic-arm"
    }
  ];
  
  function createProjectCard(project) {
    return `
      <div class="project-card" onclick="location.href='${project.link}'">
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
  