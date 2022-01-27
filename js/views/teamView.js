function getTotalStats(currentStats) {
  totatlstats = currentStats.reduce(
    (accumulator, dish) => accumulator + dish.base_stat,
    0
  );
  return totatlstats;
}

const TeamView = ({
  h,
  remFromTeam,
  setlv,
  setnote,
  setMove,
  teamList,
  currentTeam,
  onCurrentTeam,
  onTeam,
  addTeam,
  removeTeam,
  pokemonChosen,
  nav: [navCallback1, navLabel1],
  nav2: [navCallback, navLabel],
}) => {
  return (
    <div>
      <table>
        <div className="pageselectdiv">
          <th>
            <button
              onClick={() => (navCallback1(), onCurrentTeam("Select Team"))}
            >
              {navLabel1}
            </button>
            <button
              onClick={() => {
                var name = prompt("Please enter your new team name", "");
                if (name == "Select Team") {
                  var name = prompt(
                    "Very Cool Kanye, but pick a better teamname!"
                  );
                }

                for (let i = 0; i < teamList.length; i++) {
                  if (teamList[i][0] == name) {
                    var name = prompt(
                      "Name already exists, pick another name!"
                    );
                  }
                }

                if (name != null && name != "Select Team") {
                  addTeam(name, []);
                  onCurrentTeam(name);
                  onCurrentTeam("Select Team");
                }
              }}
            >
              Create new team
            </button>
            <button
              onClick={() => {
                var confirmed = confirm(
                  "Are you sure you want to remove team '" +
                    currentTeam[0] +
                    "'?"
                );
                if (confirmed) {
                  removeTeam(currentTeam[0], onCurrentTeam("Select Team"));
                }
              }}
              disabled={currentTeam[0] == "Select Team"}
            >
              Remove Team
            </button>
            <button
              onClick={() => {
                firebase
                  .database()
                  .ref("Penis/" + currentTeam[0])
                  .set({
                    username: currentTeam,
                  });
                alert(
                  "Success! Team '" +
                    currentTeam[0] +
                    "' was saved to database (Please give it some time before you try to load it <3)"
                );
              }}
              disabled={currentTeam[0] == "Select Team"}
            >
              Save Team To Database
            </button>

            <button
              onClick={() => {
                // once() method
                var variable = prompt(
                  "Enter the name of the team you sent into the database"
                );
                firebase
                  .database()
                  .ref("Penis/" + variable)
                  .on("value", (snap) => {
                    currentTeam = snap.val().username[0];
                    currentTeamlist = snap.val().username[1];
                    console.log(currentTeamlist);

                    addTeam(currentTeam, currentTeamlist);
                  });
              }}
            >
              Load Team From Cloud
            </button>
          </th>
          <th>
            <select
              onChange={(event) => {
                if (event.target.value != "Select ") {
                  onCurrentTeam(event.target.value);
                } else {
                  onCurrentTeam("");
                }
              }}
            >
              {[...teamList].map((k) => (
                <option key={k[0]}>{k[0]}</option>
              ))}
            </select>
          </th>
        </div>

        {currentTeam[1].map((poke) => (
          <tbody>
            <tr>
              <span
                key={poke.name}
                className="searchResult"
                onClick={() => (pokemonChosen(poke), navCallback())}
              >
                <img
                  className="searchResultImg:"
                  height={"100px"}
                  src={poke.sprites.front_default}
                  alt=""
                ></img>
                <div>
                  <b>
                    {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                  </b>
                </div>

                {poke.types.map((poke) => poke.type.name.toUpperCase() + " ")}
              </span>
              <div className="divforteamview">
                <td>
                  <select
                    onChange={(event) => (
                      onTeam(event.target.value),
                      setMove(poke, event.target.value, 1)
                    )}
                  >
                    {poke.moves
                      .map(
                        (poke) =>
                          poke.move.name.charAt(0).toUpperCase() +
                          poke.move.name.slice(1)
                      )
                      .map((k) => (
                        <option key={k}>{k.replace("-", " ")}</option>
                      ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(event) => (
                      onTeam(event.target.value),
                      setMove(poke, event.target.value, 2)
                    )}
                  >
                    {poke.moves
                      .map(
                        (poke) =>
                          poke.move.name.charAt(0).toUpperCase() +
                          poke.move.name.slice(1)
                      )
                      .map((k) => (
                        <option key={k}>{k.replace("-", " ")}</option>
                      ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(event) => (
                      onTeam(event.target.value),
                      setMove(poke, event.target.value, 3)
                    )}
                  >
                    {poke.moves
                      .map(
                        (poke) =>
                          poke.move.name.charAt(0).toUpperCase() +
                          poke.move.name.slice(1)
                      )
                      .map((k) => (
                        <option key={k}>{k.replace("-", " ")}</option>
                      ))}
                  </select>
                </td>
                <td>
                  <select
                    onChange={(event) => (
                      onTeam(event.target.value),
                      setMove(poke, event.target.value, 4)
                    )}
                  >
                    {poke.moves
                      .map(
                        (poke) =>
                          poke.move.name.charAt(0).toUpperCase() +
                          poke.move.name.slice(1)
                      )
                      .map((k) => (
                        <option key={k}>{k.replace("-", " ")}</option>
                      ))}
                  </select>
                </td>
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                <td className="divformove">
                  <tr>
                    <td>
                      {"1: " + poke.move[1]}

                      <td>{"2: " + poke.move[2]}</td>

                      {"3: " + poke.move[3]}
                    </td>
                  </tr>
                  <tr>
                    <td>{"4: " + poke.move[4]}</td>
                  </tr>
                </td>
              </div>
              <tr>
                <div className="divforteamview2">
                  {"Level"}
                  <button
                    onClick={() => setlv(poke, -1)}
                    disabled={poke.level == 1}
                  >
                    {" "}
                    -
                  </button>
                  <b>{" " + poke.level + " "}</b>
                  <button
                    onClick={() => setlv(poke, 1)}
                    disabled={poke.level == 100}
                  >
                    +
                  </button>
                </div>
              </tr>
              <div className="divforteamview3">
                <tr>
                  <th></th>
                  <th></th>
                </tr>
                {poke.stats.map((poker) => (
                  <tr>
                    <td>
                      {poker.stat.name.toUpperCase() + ": "}
                      {(poker.base_stat * 1.012 ** poke.level).toFixed(0) +
                        "   "}
                    </td>
                  </tr>
                ))}

                <tr>
                  <td>
                    <b>{"STAT-TOTAL: "}</b>
                  </td>
                  <tr>
                    <b>
                      {(
                        getTotalStats(poke.stats) *
                        1.012 ** poke.level
                      ).toFixed(0)}
                    </b>
                  </tr>
                </tr>
              </div>

              <div className="divforteamview4">
                <tr>
                  <button onClick={() => remFromTeam(poke)}>X</button>
                </tr>
              </div>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};
