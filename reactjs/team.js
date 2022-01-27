function Team({ model, nav, nav2 }) {
  const currentTeam = useModelProp(model, "currentTeam");
  const teamList = useModelProp(model, "teamList");
  const [team, setTeam] = React.useState("");
  const [hej, forceUpdateState] = React.useState("");
  React.useEffect(() => model.addObserver(() => forceUpdateState({})), []);

  return h(TeamView, {
    h,
    remFromTeam: (poke) => model.removeFromTeam(poke),
    setlv: (poke, lv) => model.setLevel(poke, lv),
    setnote: (poke, newNotes) => model.setNotes(poke, newNotes),
    setMove: (poke, newMove, index) => model.setMove(poke, newMove, index),
    teamList,
    currentTeam,
    onCurrentTeam: (teamname) => model.setCurrentTeam(teamname),
    onTeam: (team) => setTeam(team),
    addTeam: (teamName, tem) => model.addTeam(teamName, tem),
    removeTeam: (teamName) => model.removeTeam(teamName),
    pokemonChosen: (pokeid) => model.setCurrentPoke(pokeid),
    nav,
    nav2,
  });
}
