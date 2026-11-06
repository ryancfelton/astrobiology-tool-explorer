const catalog=window.ASTROBIOLOGY_TOOLS||[];
const category=document.body.dataset.category;
const params=new URLSearchParams(window.location.search);
const isKeywordPage=document.body.dataset.page==="keyword";
const isAllToolsPage=document.body.dataset.page==="all-tools";
const keyword=isKeywordPage?(params.get("keyword")||"").trim():"";
const sourceId=isKeywordPage?params.get("from"):null;
const normalize=value=>value.trim().toLowerCase();
const names={"exoplanet-detection":"Exoplanet detection",biosignatures:"Biosignatures","atmosphere-characterization":"Atmosphere characterization","language-models":"Language models"};
const input=document.querySelector("#search"),results=document.querySelector("#results"),section=document.querySelector("#results-section"),count=document.querySelector("#result-count");
function node(tag,text,cls){const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el}
function link(text,url){const a=node("a",text);a.href=url;return a}
function render(){
 const query=input.value.trim().toLowerCase();
 section.hidden=!isAllToolsPage&&!isKeywordPage&&!category&&!query;results.replaceChildren();
 const matches=catalog.filter(t=>(!category||t.category===category)&&(!isKeywordPage||(keyword&&t.keywords.some(k=>normalize(k)===normalize(keyword))))&&[t.name,t.summary,names[t.category],...t.keywords,...t.publications.map(p=>p.title)].join(" ").toLowerCase().includes(query));
 if(isKeywordPage)matches.sort((a,b)=>Number(b.id===sourceId)-Number(a.id===sourceId));
 count.textContent=matches.length?matches.length+" tool"+(matches.length===1?"":"s")+" found":isKeywordPage?"No tools currently match this keyword"+(query?" and search.":"."):"No tools found. Try another search.";
 matches.forEach(t=>{
  const article=node("article",null,"tool"),figure=node("figure"),img=node("img"),content=node("div");
  if(t.id==="molecular-biosignature")figure.className="biosignature-plot";
  img.src=t.image;img.alt=t.imageAlt;img.width=180;img.height=150;figure.append(img);
  content.append(node("h3",t.name));if(!category)content.append(link(names[t.category],t.category+".html"));
  content.append(node("p",t.summary));
  const keywords=node("ul",null,"keywords");keywords.setAttribute("aria-label","AI/ML methods");t.keywords.forEach(k=>{
   const item=node("li");
   const destination="keyword.html?"+new URLSearchParams({keyword:k,from:t.id});
   const keywordLink=link(k,destination);
   keywordLink.setAttribute("aria-label","Find all tools using "+k);
   item.append(keywordLink);keywords.append(item);
  });content.append(keywords,link((t.repositoryLabel||"View repository").replace(/\s*↗/g,""),t.repository));
  const pubs=node("div",null,"publication");pubs.append(node("strong","Author publications"));t.publications.forEach(p=>pubs.append(link(p.title,p.url)));content.append(pubs);
  article.append(figure,content);results.append(article);
 });
}
input.addEventListener("input",render);
document.querySelector("form").addEventListener("submit",e=>e.preventDefault());
document.querySelector("form").addEventListener("reset",()=>{input.value="";render();input.focus()});
if(isKeywordPage){
 document.querySelector("h1").textContent=keyword?"Tools using "+keyword:"Browse tools by keyword";
 document.title=keyword?keyword+" | Astrobiology Tool Explorer":"Keywords | Astrobiology Tool Explorer";
 document.querySelector("#keyword-description").textContent=keyword?"All tools across all science categories with this exact AI/ML keyword, with the original tool listed first.":"Choose an AI/ML keyword from a tool listing to see related tools.";
}
// Add verified URLs here when supplied by the creators.
const creators=[
 {name:"Dr. Ryan Felton",role:"Astrobiologist & AI-ML Initiative Lead",website:"https://www.nasa.gov/people/ryan-felton/",linkedin:"https://www.linkedin.com/in/ryan-felton-phd-astronomer/"},
 {name:"Dr. Caleb Scharf",role:"Senior Scientist for Astrobiology",website:"https://www.nasa.gov/people/caleb-scharf/",linkedin:"https://www.linkedin.com/in/caleb-scharf-21137024/"}
];
const header=document.querySelector("header");
const home=header.querySelector("a");home.classList.add("site-name");
home.setAttribute("aria-label","Astrobiology AI/ML Tool Explorer — home");
home.replaceChildren();
const brandMark=node("span",null,"brand-mark");
brandMark.setAttribute("aria-hidden","true");
brandMark.innerHTML='<svg viewBox="0 0 56 56" fill="none"><ellipse cx="28" cy="28" rx="25" ry="10" transform="rotate(-35 28 28)" stroke="currentColor" stroke-width="2"/><circle cx="28" cy="28" r="11" fill="#a8d92d" stroke="currentColor" stroke-width="2"/><circle cx="45" cy="13" r="3.5" fill="#ed6337" stroke="currentColor" stroke-width="1.2"/></svg>';
const brandText=node("span",null,"brand-text");
brandText.append(node("span","Astrobiology","brand-title"),node("span","AI/ML Tool Explorer","brand-subtitle"));
home.append(brandMark,brandText);
const logo=node("div",null,"ames-logo");
const image=node("img");image.src="images/ames-logo-black.png";image.alt="NASA Silicon Valley — Ames Research Center";image.width=118;image.height=52;logo.append(image);header.prepend(logo);
const creatorSection=node("section",null,"creators");
creatorSection.setAttribute("aria-labelledby","creators-title");
const heading=node("h2","Meet the creators");heading.id="creators-title";creatorSection.append(heading);
const grid=node("div",null,"creator-grid");
creators.forEach(person=>{
 const card=node("article",null,"creator-card");
 const portrait=node("div",null,"portrait-placeholder");portrait.setAttribute("aria-label","Photo to come");
 portrait.innerHTML='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="23" r="11"/><path d="M12 57c0-15 8-22 20-22s20 7 20 22"/></svg>';
 card.append(portrait,node("h3",person.name),node("p","NASA Ames Research Center"),node("p",person.role));
 const links=node("div",null,"creator-links");
 for(const [key,label] of [["website","Website"],["linkedin","LinkedIn"]]){
  if(person[key]){
   const a=link("",person[key]);
   a.setAttribute("aria-label",person.name+" — "+label);
   a.title=label==="Website"?"NASA profile":"LinkedIn";
   a.innerHTML=key==="linkedin"
    ? '<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96C2 21.32 2.69 22 3.55 22h16.9c.86 0 1.55-.68 1.55-1.52V3.52C22 2.68 21.31 2 20.45 2ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.52 2.79-1.52 2.98 0 3.58 1.96 3.58 4.51v5.26Z"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10 13 4-4m-6 6-1 1a4.24 4.24 0 0 1-6-6l4-4a4.24 4.24 0 0 1 6 0m2 3 1-1a4.24 4.24 0 0 1 6 6l-4 4a4.24 4.24 0 0 1-6 0" transform="translate(1 1)"/></svg>';
   links.append(a);
  }
  else{const placeholder=node("span",label+" · coming soon");placeholder.className="link-placeholder";links.append(placeholder)}
 }
 card.append(links);grid.append(card);
});
creatorSection.append(grid);document.querySelector("main").after(creatorSection);
render();
