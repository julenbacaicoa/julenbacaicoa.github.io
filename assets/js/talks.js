const talks = [
    {
      title: "Physics-Informed Neural Networks for Engineering Applications",
      event: "International Conference on Smart Systems",
      place: "Bilbao, Spain",
      year: 2024,
      type: "Invited Talk",
      link: "https://example.com/talk1"
    },
    {
      title: "Modelado de Materiales Inteligentes",
      event: "Jornadas de Ingeniería Aplicada",
      place: "UPNA",
      year: 2023
    },
    {
      title: "Aprendizaje Automático en Mantenimiento Predictivo",
      event: "IEEE Industrial AI Workshop",
      place: "Online",
      year: 2022,
      link: "https://example.com/talk2"
    },
    {
      title: "Simulación Numérica en Ciencias de Materiales",
      event: "UPNA Internal Seminar",
      place: "Pamplona, Spain",
      year: 2021
    }
  ];
  
  function createTalk(talk) {
    const typeBadge = talk.type
      ? `<span class="talk-type">${talk.type}</span>`
      : "";
  
    return `
      <div class="talk-card">
        <div class="talk-header">
          <h3>${talk.title} ${typeBadge}</h3>
        </div>
        <div class="talk-meta">
          <strong>Event:</strong> ${talk.event}<br>
          <strong>Place:</strong> ${talk.place}<br>
          <strong>Year:</strong> ${talk.year}
        </div>
        ${talk.link ? `<div class="talk-link"><a href="${talk.link}" target="_blank">🔗 View Resource</a></div>` : ""}
      </div>
    `;
  }
  
  document.getElementById("talks-container").innerHTML = `
    <h2 style="text-align:center">🎤 Talks & Presentations</h2>
    <div class="talks-grid">
      ${talks.map(createTalk).join('')}
    </div>
  `;
  