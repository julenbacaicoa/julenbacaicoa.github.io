const papers = [
  {
    title: "Optimal strain-gauge placement for mechanical load estimation in circular cross-section shafts",
    authors: "X. Iriarte, J. Aginaga, G. Gainza, J.Ros, J. Bacaicoa",
    venue: "Measurement",
    year: "2021",
    quartile: "Q1",
    link: "https://doi.org/10.1016/j.measurement.2020.108938",
    pdf: "https://hdl.handle.net/2454/40053",
    award: "gold"
  },
  {
    title: "D-optimal strain sensor placement for mechanical load estimation in the presence of nuisance loads and thermal strain",
    authors: "X. Iriarte, J. Bacaicoa, J. Aginaga, A. Plaza, A. Szczepańska-Álvarez",
    venue: "Sensors and Actuators A: Physical",
    year: "2025",
    quartile: "Q1",
    link: "https://doi.org/10.1016/j.sna.2024.116110",
    pdf: "https://academica-e.unavarra.es/handle/2454/52779",
    award: "silver"
  },
  {
    title: "A unified analytical disk cam profile generation methodology using the Instantaneous Center of Rotation for educational purpose",
    authors: "X. Iriate, J. Bacaicoa, A. Plaza, J. Aginaga",
    venue: "Mechanism and Machine Theory",
    year: "2024",
    quartile: "Q1",
    link: "https://doi.org/10.1016/j.mechmachtheory.2024.105625",
    pdf: "https://hdl.handle.net/2454/48046",
    award: "bronze"
  },
  {
    title: "Impact of Strain Gauge Misalignment and Model Parameters on Load Estimation in Wind Turbines",
    authors: "J. Bacaicoa, X. Iriarte, J. Aginaga, A. Plaza",
    venue: "Measurement",
    year: "2025",
    quartile: "Q1",
    link: "https://doi.org/",
    pdf: "https://hdl.handle.net/"
  },
  {
    title: "Design, Manufacturing, Validation of a Multi-Orientation Tilt Test Bench for Testing Vehicles Rollover and Tests of ATV-Quad for Agricultural Applications",
    authors: "J. Bacaicoa, T. Ballesteros, I. Arana, J. Aginaga, J.I. Latorre-Biel",
    venue: "Applied Sciences",
    year: "2021",
    quartile: "Q1",
    link: "https://doi.org/10.3390/app11062575",
    pdf: "https://hdl.handle.net/2454/47130"
  },
  {
    title: "Dataset for the identification of a ultra-low frequency multidirectional energy harvester for wind turbines",
    authors: "J. Bacaicoa, M. Hualde-Otamendi, M. Merino-Olagüe, A. Plaza, X. Iriarte, C. Castellano-Aldave, A. Carlosena",
    venue: "Data in Brief",
    year: "2024",
    quartile: "Q3",
    link: "https://doi.org/10.1016/j.dib.2024.111126",
    pdf: "https://academica-e.unavarra.es/handle/2454/52653"
  }
];

// 🎨 Paleta de colores unificada para cuartiles
const quartileColors = {
  Q1: '#009688',   // verde turquesa
  Q2: '#3f51b5',   // azul
  Q3: '#ff9800',   // naranja
  Q4: '#d62728',   // rojo suave
  Other: '#7f7f7f' // gris
};

function getMedalIcon(award) {
  switch (award) {
    case "gold": return "🥇";
    case "silver": return "🥈";
    case "bronze": return "🥉";
    default: return "";
  }
}

function renderCharts() {
  const quartileCounts = {};
  const yearlyCounts = {};

  papers.forEach(p => {
    quartileCounts[p.quartile] = (quartileCounts[p.quartile] || 0) + 1;
    yearlyCounts[p.year] = (yearlyCounts[p.year] || 0) + 1;
  });

  new Chart(document.getElementById('quartileChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(quartileCounts),
      datasets: [{
        data: Object.values(quartileCounts),
        backgroundColor: Object.keys(quartileCounts).map(q => quartileColors[q] || quartileColors["Other"]),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 16,
              family: "'Open Sans', sans-serif"
            }
          }
        },
        title: {
          display: true,
          text: 'Publications by Quartile',
          font: {
            size: 20,
            family: "'Open Sans', sans-serif"
          }
        }
      }
    }
  });

  // 📊 Gráfico apilado por año y cuartil
  const yearQuartileCount = {};
  const quartileTypes = ["Q1", "Q2", "Q3", "Q4", "Other"];

  papers.forEach(p => {
    const year = p.year;
    const quartile = quartileTypes.includes(p.quartile) ? p.quartile : "Other";
    if (!yearQuartileCount[year]) yearQuartileCount[year] = {};
    yearQuartileCount[year][quartile] = (yearQuartileCount[year][quartile] || 0) + 1;
  });

  const years = Object.keys(yearQuartileCount).sort();
  const datasets = quartileTypes.map(q => ({
    label: q,
    data: years.map(y => yearQuartileCount[y][q] || 0),
    backgroundColor: quartileColors[q]
  }));

  const totalPerYear = years.map(y => Object.values(yearQuartileCount[y]).reduce((a, b) => a + b, 0));
  const maxY = Math.ceil(Math.max(...totalPerYear) * 1.5);

  new Chart(document.getElementById("yearChart"), {
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
          text: "Publications per Year by Quartile",
          font: {
            size: 20,
            family: "'Open Sans', sans-serif"
          }
        },
        legend: {
          position: "bottom",
          labels: {
            font: {
              size: 16,
              family: "'Open Sans', sans-serif"
            },
            padding: 10,
            boxWidth: 20,
            usePointStyle: true
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            font: {
              size: 14,
              family: "'Open Sans', sans-serif"
            }
          }
        },
        y: {
          stacked: true,
          suggestedMax: maxY,
          ticks: {
            font: {
              size: 14,
              family: "'Open Sans', sans-serif"
            }
          }
        }
      }
    }
  });
}

function renderPapers() {
  const container = document.createElement('div');
  container.className = 'papers-grid';

  papers.forEach(paper => {
    const card = document.createElement('div');
    card.className = 'paper-card';
    if (paper.award) card.setAttribute('data-award', paper.award);

    card.innerHTML = `
      <div class="paper-title">${getMedalIcon(paper.award)} ${paper.title}</div>
      <div class="paper-meta">${paper.authors}</div>
      <div class="paper-meta"><strong>${paper.venue}</strong> (${paper.year}) <span class="quartile-badge">${paper.quartile}</span></div>
      <div class="paper-actions">
        ${paper.link ? `<a href="${paper.link}" target="_blank" class="paper-btn" title="Open DOI"><i class="fas fa-link"></i></a>` : ''}
        ${paper.pdf ? `<a href="${paper.pdf}" target="_blank" class="paper-btn" title="Download PDF"><i class="fas fa-file-pdf"></i></a>` : ''}
      </div>
    `;

    container.appendChild(card);
  });

  document.getElementById('papers-container').appendChild(container);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCharts();
  renderPapers();
});
