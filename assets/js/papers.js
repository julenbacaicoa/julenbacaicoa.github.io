const papers = [
    {
      title: "Optimal strain-gauge placement for mechanical load estimation in circular cross-section shafts",
      authors: "X. Iriarte, J. Aginaga, G. Gainza, J.Ros, J. Bacaicoa",
      venue: "Measurements",
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
      title: "Design, Manufacturing, Validation of a Multi-Orientation Tilt Test Bench for Testing Vehicles Rollover and Tests of ATV-Quad for Agricultural Applications",
      authors: "J. Bacaicoa, T. Ballesteros, I. Arana, J. Aginaga, J.I. Latorre-Biel",
      venue: "Applied Sciences",
      year: "2021",
      quartile: "Q1",
      link: "https://doi.org/10.3390/app11062575",
      pdf: "https://hdl.handle.net/2454/47130"
    },
    {
      title: " Dataset for the identification of a ultra-low frequency multidirectional energy harvester for wind turbines",
      authors: "J. Bacaicoa, M. Hualde-Otamendi, M. Merino-Olagüe, A. Plaza, X. Iriarte, C. Castellano-Aldave, A. Carlosena",
      venue: "Data in Brief",
      year: "2024",
      quartile: "Q3",
      link: "https://doi.org/10.1016/j.dib.2024.111126",
      pdf: "https://academica-e.unavarra.es/handle/2454/52653"
      }
  ];
  
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
            backgroundColor: ['#2ecc71', '#f39c12', '#3498db', '#9b59b6'], // nuevos colores
            borderWidth: 2,
            barThickness: 40
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 14,
                  family: "'Open Sans', sans-serif"
                }
              }
            },
            title: {
              display: true,
              text: 'Publications by Quartile',
              font: {
                size: 18,
                family: "'Open Sans', sans-serif"
              }
            }
          }
        }
      });
      
      new Chart(document.getElementById('yearChart'), {
        type: 'bar',
        data: {
          labels: Object.keys(yearlyCounts).sort(),
          datasets: [{
            label: 'Publications',
            data: Object.values(yearlyCounts),
            backgroundColor: '#3f51b5',
            barThickness: 40 // ancho de barras
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Publications Per Year',
              font: {
                size: 18,
                family: "'Open Sans', sans-serif"
              }
            }
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14
                }
              }
            },
            y: {
              ticks: {
                font: {
                  size: 14
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
          ${paper.link ? `<a href="${paper.link}" target="_blank">DOI</a>` : ''}
          ${paper.pdf ? `<a href="${paper.pdf}" target="_blank">PDF</a>` : ''}
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
  