
//const App = ({model}) => <Search/>
const teamNav=[()=> window.location.hash="team", "Team"];
const backToSearch=[() => window.location.hash="search", "Back to search"];
const seestats=[()=> window.location.hash="stats", "Stats"];
const seestatsteam=[()=> window.location.hash="statsteam", "Stats"];

const addToTeam=[()=> window.location.hash="search", "Add To Team"];

function defaultRoute(){
  if(! ["#search", "#stats", "#team", "#statsteam"].find(knownRoute=>
           knownRoute == window.location.hash))
window.location.hash="#search";
}

window.addEventListener("hashchange", defaultRoute)

const App= ({model, h})=>
<div className="flexParent">
  <Show hash="#search"><Search model={model} nav={teamNav} nav2={seestats}/></Show>
  <Show hash="#team"><Team model={model} nav={backToSearch} nav2={seestatsteam}/></Show>
  <Show hash="#stats"><Stats model={model} ok={addToTeam} cancel={backToSearch} /></Show>
  <Show hash="#statsteam"><Stats model={model} ok={addToTeam} cancel={teamNav} /></Show>





  </div>