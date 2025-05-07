const courses = [
    {
      title: "Elasticity and Strength of Materials",
      degree: "Mechanical and Industrial Engineering",
      years: "2021–2025",
      type: "BSc",
      description: "Introduction to elasticity theory and the fundamentals of stress and strain in mechanical components."
    },
    {
      title: "Vehicle Dynamics",
      degree: "Applied and Computational Mechanical Engineering",
      years: "2025",
      type: "MSc",
      description: "Study of the dynamic behavior of vehicles, covering longitudinal, lateral, and vertical dynamics."
    },
    {
      title: "Mechanics",
      degree: "Mechanical and Industrial Engineering",
      years: "2020, 2026",
      type: "BSc",
      description: "Basic principles of Newtonian mechanics including statics, kinematics, and dynamics of rigid bodies."
    },
    {
      title: "Condition Monitoring and Predictive Maintenance",
      degree: "Applied and Computational Mechanical Engineering",
      years: "2026",
      type: "MSc",
      description: "Techniques for monitoring machinery health and predicting failures using data-driven methods."
    },
    {
      title: "Mechanism and Machine Theory",
      degree: "Mechanical and Industrial Engineering",
      years: "2020–2023",
      type: "BSc",
      description: "Analysis and design of mechanical linkages and motion transmission systems."
    }
  ];
  
  function createCard(course) {
    const badgeColor = course.type === "MSc" ? "#ffd700" : "#d4eaff";
  
    return `
      <div class="teaching-card">
        <span class="teaching-badge" style="background-color:${badgeColor}">${course.type}</span>
        <h3>${course.title}</h3>
        <p><strong>Program:</strong> ${course.degree}</p>
        <p><strong>Years:</strong> ${course.years}</p>
        <div class="course-description">${course.description}</div>
      </div>
    `;
  }
  
  const container = document.getElementById('teaching-container');
  container.innerHTML = `
    <h2 style="text-align:center">🧑‍🏫 Teaching Experience</h2>
    <div class="teaching-grid">
      ${courses.map(createCard).join('')}
    </div>
  `;
  