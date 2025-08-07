// 📁 File: assets/js/talks.js

const talks = [
  {
    title: "Estimation of lateral wheel/rail contact force magnitude by means of extensometry on a scale prototype railroad",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>, P. Urda, X. Iriarte, J.L. Escalona`,
    event: "XXV National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Santander, Spain",
    year: 2025,
    talk_type: "Oral",
    link: "https://doi.org/10.63450/aim.1.293.2025",
    category: "conference"
  },
  {
    title: "Musculoskeletal simulations of the pedaling sequence of cyclists",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">I. Agirre</span>, A. Plaza, J. Ibarrola, J. Bacaicoa`,
    event: "XXV National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Santander, Spain",
    year: 2025,
    talk_type: "Oral",
    link: "https://doi.org/10.63450/aim.1.196.2025",
    category: "conference"
  },
  {
    title: "Hybrid characterization of an energy harvesting device",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">M. Merino</span>, X. Iriarte, A. Plaza, J. Bacaicoa`,
    event: "XXV National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Santander, Spain",
    year: 2025,
    talk_type: "Oral",
    link: "https://doi.org/10.63450/aim.1.130.2025",
    category: "conference",
    award: "🏆 Best Applied Research Work"
  },
  {
    title: "Determination of optimal strain sensor configurations for the estimation of individual loads on circular section shafts",
    authors: `X. Iriarte, <span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>, J. Aginaga, A. Plaza`,
    event: "XXIV National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Las Palmas de Gran Canaria, Spain",
    year: 2023,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Positioning error analysis of different gage configurations for wind turbine load measurements",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Aginaga</span>, J. Bacaicoa, X. Iriarte, A. Plaza, I. Agirre`,
    event: "XXIV National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Las Palmas de Gran Canaria, Spain",
    year: 2023,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Computational Analytical Synthesis of Mechanisms",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">A. Plaza</span>, J. Ros, X. Iriarte, A. Plaza, J. Aginaga, J.M. Aguinagalde, J. Bacaicoa`,
    event: "XXIV National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Las Palmas de Gran Canaria, Spain",
    year: 2023,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Optimal arrangement of strain gauges for load estimation on circular cross-section shafts",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>, X. Iriarte, F.J. Lerga, J. Ros`,
    event: "XXIII National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Jaén, Spain",
    year: 2021,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Calibration of a strain gauge system for the estimation of loads on the slow shaft of a wind turbine",
    authors: `F.J. Lerga, <span title="Speaker" style="color:#1a73e8; font-weight:600">X. Iriarte</span>, J. Bacaicoa, J. Aginaga`,
    event: "XXIII National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Jaén, Spain",
    year: 2021,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Design of a Kalman Filter for accurate azimuth estimation of horizontal axis wind turbines",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">A. Plaza</span>, J. Ros, J. Bacaicoa, F.J. Lerga`,
    event: "XXIII National Mechanical Engineering Conference - CNIM",
    event_type: "National Conference",
    place: "Jaén, Spain",
    year: 2021,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Static calibration of a configuration of 8 strain gauges for the estimation of mechanical loads on circular cross-section shafts",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>, X. Iriarte, J. Aginaga, O. Saldaña`,
    event: "XV Iberoamerican Congress of Mechanical Engineering - CIBIM",
    event_type: "International Conference",
    place: "Madrid, Spain",
    year: 2022,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Mechanical sensitivity analysis of strain gauge configurations in the main shaft of wind turbines",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>, X. Iriarte, J. Aginaga, A. Plaza`,
    event: "TORQUE",
    event_type: "International Conference",
    place: "Delft, Netherland",
    year: 2022,
    talk_type: "Poster",
    link: "",
    category: "conference"
  },
  {
    title: "Optimal strain gauge configurations for the estimation of mechanical loads in the main shaft of HAWT",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">X. Iriarte</span>, J. Aginaga, F.J. Lerga, J. Ros, J. Bacaicoa`,
    event: "TORQUE",
    event_type: "International Conference",
    place: "Delft, Netherland (online)",
    year: 2020,
    talk_type: "Oral",
    link: "",
    category: "conference"
  },
  {
    title: "Identification of dynamic parameters of a 3-PRS Robot by Maximum Likelihood",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>, X. Iriarte, J. Aginaga`,
    event: "IkerGazte",
    event_type: "International Conference",
    place: "Bayone, France",
    year: 2019,
    talk_type: "Poster",
    link: "",
    category: "conference"
  },
  {
    title: "Rotor load estimation using strain gauges",
    authors: `<span title="Speaker" style="color:#1a73e8; font-weight:600">J. Bacaicoa</span>`,
    event: "I Workshop on Structural Health Analysis in Wind Turbines",
    event_type: "Seminar",
    place: "Pamplona, Spain",
    year: 2023,
    talk_type: "Oral",
    link: "",
    category: "seminar"
  }
];

// 🧱 Crea la tarjeta HTML para una charla
function createTalkCard(talk) {
  const awardBadge = talk.award
    ? `<div style="background:#f9f9f9; margin-top:0.7rem; padding:0.5rem; border-radius:8px; font-size:0.8rem">${talk.award}</div>`
    : "";

  const talkLink = talk.link
    ? `<a href="${talk.link}" class="talk-btn" target="_blank" title="View talk link"><i class="fas fa-link"></i></a>`
    : "";

  const talkTypeLine = talk.talk_type
    ? ` &nbsp;&nbsp;|&nbsp;&nbsp;🎤 <em>${talk.talk_type}</em>`
    : "";

  return `
    <div class="talk-card">
      <div class="talk-header">
        <h3>${talk.title}</h3>
        <div class="talk-meta">${talk.authors}</div>
      </div>
      <div class="talk-meta">
        🗓️ <strong>${talk.event}</strong><br>
        🎪 ${talk.event_type} <br>
        🌍 ${talk.place} <br>
        📅 ${talk.year}${talkTypeLine}
      </div>
      <div class="talk-link">${talkLink}</div>
      ${awardBadge}
    </div>
  `;
}

// 🔧 Inserta las charlas en el HTML
function renderTalks() {
  const confHTML = talks
    .filter(t => t.category === "conference")
    .map(createTalkCard)
    .join("");

  const seminarHTML = talks
    .filter(t => t.category === "seminar")
    .map(createTalkCard)
    .join("");

  document.getElementById("talks-container").innerHTML = `
    <h2>🎤 Conferences & Congresses</h2>
    From regional meetups to European research forums, each talk listed below represents a story shared and a lesson learned. These appearances reflect both my areas of interest and the amazing communities I’ve learned from.
    <div class="talks-grid">${confHTML}</div>

    <h2><i class="fas fa-chalkboard-teacher" style="color:#003399;"></i> Seminars & Other Talks</h2>
    <div class="talks-grid">${seminarHTML}</div>
  `;
}

// ➕ Función auxiliar para calcular el Y máximo sugerido (50% extra)
function getSuggestedMax() {
  const yearCount = talks.reduce((acc, t) => {
    acc[t.year] = (acc[t.year] || 0) + 1;
    return acc;
  }, {});
  const max = Math.max(...Object.values(yearCount));
  return Math.ceil(max * 1.5);
}

// 📊 Renderiza las gráficas de estadísticas
function renderCharts() {
  const typeCount = {};
  const yearTypeCount = {};

  talks.forEach(talk => {
    const type = talk.event_type || "Other";
    const year = talk.year;

    typeCount[type] = (typeCount[type] || 0) + 1;

    if (!yearTypeCount[year]) yearTypeCount[year] = {};
    yearTypeCount[year][type] = (yearTypeCount[year][type] || 0) + 1;
  });

  // 🥧 Gráfico de tipos de evento con número total centrado
  new Chart(document.getElementById("eventTypeChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(typeCount),
      datasets: [{
        data: Object.values(typeCount),
        backgroundColor: ["#3f51b5", "#009688", "#ff9800", "#e91e63", "#9c27b0"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Types of Events",
          font: {
            size: 22,
            family: "'Open Sans', sans-serif",
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 16,
              family: "'Open Sans', sans-serif"
            },
            padding: 15,
            boxWidth: 20,
            usePointStyle: true
          }
        }
      }
    },
    plugins: [{
      id: 'centerText',
      beforeDraw(chart) {
        const { width, height, ctx } = chart;
        ctx.save();
        const text = `${talks.length} Talks`;
        const fontSize = Math.min(width, height) / 16; // ajusta proporción aquí
        ctx.font = `${fontSize}px 'Open Sans', sans-serif`;
        ctx.fillStyle = '#444';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, width / 2, height / 2);
        ctx.restore();
      }
    }]
  });

  // 📊 Gráfico apilado por año y tipo
  const years = Object.keys(yearTypeCount).sort();
  const types = Object.keys(typeCount);

  const datasets = types.map((type, i) => ({
    label: type,
    data: years.map(y => yearTypeCount[y][type] || 0),
    backgroundColor: ["#3f51b5", "#009688", "#ff9800", "#e91e63", "#9c27b0"][i % 5]
  }));

  new Chart(document.getElementById("talksPerYearChart"), {
    type: "bar",
    data: {
      labels: years,
      datasets: datasets
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Talks per Year",
          font: {
            size: 30,
            family: "'Open Sans', sans-serif",
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 22,
              family: "'Open Sans', sans-serif"
            },
            boxWidth: 20,
            usePointStyle: true,
            padding: 15
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            font: {
              size: 20,
              family: "'Open Sans', sans-serif"
            }
          }
        },
        y: {
          stacked: true,
          suggestedMax: getSuggestedMax(),
          ticks: {
            font: {
              size: 20,
              family: "'Open Sans', sans-serif"
            }
          }
        }
      }
    }
  });
}

// ▶️ Inicia al cargar
document.addEventListener("DOMContentLoaded", () => {
  renderTalks();
  renderCharts();
});
