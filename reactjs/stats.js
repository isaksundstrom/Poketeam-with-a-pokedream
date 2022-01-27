function Stats({ model, ok: [addNav, addLabel], cancel }) {
  const CurrentPoke = useModelProp(model, "currentPoke");
  const teams = useModelProp(model, "currentTeam");
  const [promise, setPromise] = React.useState(null);
  const teamList = useModelProp(model, "teamList");
  const currentTeam = useModelProp(model, "currentTeam");
  const [team, setTeam] = React.useState("");
  React.useEffect(
    () => setPromise(CurrentPoke && PokeSource.getPokeStats(CurrentPoke)),
    [CurrentPoke] //Model.id current
  );

  const [data, error] = usePromise(promise);
  return (
    promiseNoData(promise, data, error) ||
    h(StatsView, {
      h,
      currentTeam,
      teamList,
      onCurrentTeam: (teamname) => model.setCurrentTeam(teamname),
      onTeam: (team) => setTeam(team),
      pokeAdded: (addedpoke, teamname) => {
        model.addToTeam(addedpoke, teamname);
        addNav();
      },
      currentPoke: CurrentPoke,
      isPokeInTeam: (pokeid) => teams[1].find((poke) => poke.name == pokeid),
      cancel: cancel,
      addLabel: addLabel,
    })
  );
}
