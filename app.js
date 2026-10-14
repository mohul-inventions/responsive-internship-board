"use strict";

const internships = [
  {id:"field-notes-design",company:"Field Notes",type:"Design studio",initials:"fn",tone:"fern",title:"Brand Design Intern",domain:"Design",location:"Brooklyn, NY",mode:"Hybrid",duration:"12 weeks",applyUrl:"mailto:careers@fieldnotes.example?subject=Brand%20Design%20Intern"},
  {id:"soft-landing-growth",company:"Soft Landing",type:"Wellness, thoughtfully",initials:"sl",tone:"apricot",title:"Growth & Community Intern",domain:"Marketing",location:"Remote · US",mode:"Remote",duration:"Summer",applyUrl:"mailto:hello@softlanding.example?subject=Growth%20Intern"},
  {id:"northstar-product",company:"Northstar",type:"Tools for better work",initials:"n",tone:"blue",title:"Product Research Intern",domain:"Product",location:"New York, NY",mode:"Hybrid",duration:"10 weeks",applyUrl:"mailto:team@northstar.example?subject=Product%20Research%20Intern"},
  {id:"daybreak-data",company:"Daybreak",type:"A brighter kind of data",initials:"d",tone:"lilac",title:"Data & Insights Intern",domain:"Data",location:"Remote · US",mode:"Remote",duration:"Flexible",applyUrl:"mailto:careers@daybreak.example?subject=Data%20Intern"},
  {id:"goodkind-content",company:"Goodkind",type:"Everyday, a little better",initials:"g",tone:"ochre",title:"Content Strategy Intern",domain:"Marketing",location:"Austin, TX",mode:"Hybrid",duration:"12 weeks",applyUrl:"mailto:hi@goodkind.example?subject=Content%20Strategy%20Intern"},
  {id:"common-ground-engineering",company:"Common Ground",type:"Building for everyone",initials:"cg",tone:"ink",title:"Frontend Engineering Intern",domain:"Engineering",location:"Remote · US",mode:"Remote",duration:"Summer",applyUrl:"mailto:people@commonground.example?subject=Frontend%20Intern"},
  {id:"little-big-product",company:"Little Big Things",type:"Small things, big impact",initials:"lb",tone:"ochre",title:"Product Operations Intern",domain:"Product",location:"Chicago, IL",mode:"Hybrid",duration:"10 weeks",applyUrl:"mailto:team@littlebig.example?subject=Product%20Operations%20Intern"},
  {id:"wildflower-design",company:"Wildflower",type:"Made for the outdoors",initials:"w",tone:"fern",title:"Visual Design Intern",domain:"Design",location:"Portland, OR",mode:"On-site",duration:"12 weeks",applyUrl:"mailto:work@wildflower.example?subject=Visual%20Design%20Intern"},
  {id:"copperline-data",company:"Copperline",type:"Ideas into action",initials:"c",tone:"apricot",title:"Business Intelligence Intern",domain:"Data",location:"Remote · US",mode:"Remote",duration:"Summer",applyUrl:"mailto:careers@copperline.example?subject=BI%20Intern"}
];

const searchInput = document.querySelector("#search");
const domainSelect = document.querySelector("#domain");
const cardsElement = document.querySelector("#cards");
const countElement = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");
const filterForm = document.querySelector("#filters");

function setupDomains() {
  [...new Set(internships.map((job) => job.domain))].sort().forEach((domain) => {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    domainSelect.append(option);
  });
}

function makeCard(job) {
  const article = document.createElement("article");
  article.className = "internship-card";
  article.setAttribute("aria-labelledby", `${job.id}-title`);
  article.innerHTML = `
    <div class="card-top">
      <div class="company-lockup">
        <span class="company-mark mark-${job.tone}" aria-hidden="true">${job.initials}</span>
        <div><span class="company-name">${job.company}</span><span class="company-type">${job.type}</span></div>
      </div>
      <span class="card-tag">${job.domain}</span>
    </div>
    <h3 id="${job.id}-title">${job.title}</h3>
    <p class="card-meta">${job.location} · ${job.mode}</p>
    <div class="card-bottom"><span class="card-details"><span>${job.duration}</span><span>Paid internship</span></span><a class="apply-link" href="${job.applyUrl}" aria-label="Apply for ${job.title} at ${job.company}">View role <span aria-hidden="true">↗</span></a></div>`;
  return article;
}

function render() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const domain = domainSelect.value;
  const filtered = internships.filter((job) => {
    const searchable = [job.title, job.company, job.type, job.domain, job.location, job.mode].join(" ").toLocaleLowerCase();
    return (domain === "all" || job.domain === domain) && (!query || searchable.includes(query));
  });

  cardsElement.replaceChildren(...filtered.map(makeCard));
  const count = filtered.length;
  countElement.textContent = `${count} ${count === 1 ? "opportunity" : "opportunities"} to explore`;
  emptyState.hidden = count !== 0;
  cardsElement.hidden = count === 0;
  errorState.hidden = true;
}

function clearFilters() {
  searchInput.value = "";
  domainSelect.value = "all";
  render();
}

filterForm.addEventListener("submit", (event) => event.preventDefault());
filterForm.addEventListener("reset", () => requestAnimationFrame(render));
searchInput.addEventListener("input", render);
domainSelect.addEventListener("change", render);
document.querySelector("#empty-reset").addEventListener("click", clearFilters);
document.querySelector("#retry").addEventListener("click", render);

setupDomains();
render();
