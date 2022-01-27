/*<img id = "image_shiny" height = {"500px"} style="display:none"  src = {currentPoke.sprites.front_shiny}></img>

<script>{function myFunction(){
    var checkBox = document.getElementById("myCheck");
    var image = document.getElementById("image");
    var image_shiny = document.getElementById("image_shiny");

    if (checkBox.checked == true){
      image_shiny.style.display = "block";
      image.style.display = "none";

    } else {
      image_shiny.style.display = "none";
      image.style.display = "block";
    }
  }
}
</script>
*/
function isTmMove(poke) {
  if (poke.version_group_details[0].level_learned_at == 0) {
    return "TM";
  } else {
    return poke.version_group_details[0].level_learned_at;
  }
}

function getTotalStats(currentStats) {
  totatlstats = currentStats.reduce(
    (accumulator, dish) => accumulator + dish.base_stat,
    0
  );
  return totatlstats;
}

function getCry(pokemonName) {
  var audio = new Audio(
    "https://play.pokemonshowdown.com/audio/cries/" + pokemonName + ".ogg"
  );
  audio.volume = 0.5;
  audio.play();
}

function switchImg(currentPoke) {
  document.getElementById("imgToSwitch").src = currentPoke.sprites.front_shiny;
}

const StatsView = ({
  h,
  currentTeam,
  onCurrentTeam,
  teamList,
  onTeam,
  pokeAdded,
  currentPoke,
  isPokeInTeam,
  cancel,
  addLabel,
  myFunction,
}) => (
  /*TODO just JSON.stringify(dish) for now*/
  //LÄGG TILL <button onClick={()=> pokeAdded(dish)} disabled = {isDishInMenu(dish.id)}>{addLabel}</button>
  //<img image = "image" height = {"150px"}  src = {pokeAdded.sprites.front_default}></img>

  <div>
    <button onClick={() => (cancel[0](), onCurrentTeam("Select Team"))}>
      Cancel
    </button>
    <select onChange={(event) => onCurrentTeam(event.target.value)}>
      {[...teamList].map((k) => (
        <option key={k[0]}>{k[0]}</option>
      ))}
    </select>
    <button
      onClick={() =>
        pokeAdded(currentPoke, currentTeam[0], console.log(currentPoke.id))
      }
      disabled={currentTeam == teamList[0] || isPokeInTeam(currentPoke.name)}
    >
      {addLabel}
    </button>
    <h1>
      {currentPoke.name.charAt(0).toUpperCase() + currentPoke.name.slice(1)}
    </h1>

    {/* <label htmlFor="checkbox"> Show Shiny Sprite</label> */}
    <button onClick={() => getCry(currentPoke.name)}> Play Pokemon Cry </button>

    <button onClick={() => switchImg(currentPoke)}> Show Shiny Sprite </button>

    <img
      image="image"
      height={"500px"}
      src={currentPoke.sprites.front_default}
      id="imgToSwitch"
    ></img>

    <h2>{"Information"}</h2>

    {
      // TO DO: Table med all information
      <table className="divforstats">
        <tr>
          <th>{"STAT"}</th>
          <th>{"VALUES"}</th>
        </tr>

        {currentPoke.stats.map((poke) => (
          <tbody>
            <tr>
              <td>{poke.stat.name.toUpperCase() + ":"}</td>
              <td>{poke.base_stat}</td>
              <td></td>

              <td></td>
            </tr>
          </tbody>
        ))}
        <tr>
          <td>{"STAT-TOTAL: "}</td>
          <td>{getTotalStats(currentPoke.stats)}</td>
        </tr>
      </table>
    }

    {
      // TO DO: Table med all information
      <table className="divformoves">
        <tr>
          <th>{"MOVE"}</th>
          <th>{"LV"}</th>
        </tr>
        {currentPoke.moves.sort(comparelevel).map((poke) => (
          <tbody>
            <tr>
              <td>
                {poke.move.name.charAt(0).toUpperCase() +
                  poke.move.name.slice(1)}
              </td>

              <td>{isTmMove(poke)}</td>
            </tr>
          </tbody>
        ))}
      </table>
    }

    {
      // TO DO: Table med all information
      <table className="divforabilities">
        {
          <tr>
            <th>{"ABILITIES"}</th>
          </tr>
        }

        {currentPoke.abilities.map((poke) => (
          <tbody>
            <th>{}</th>
            <tr>
              <td>
                {poke.ability.name.charAt(0).toUpperCase() +
                  poke.ability.name.slice(1)}
              </td>

              <td>{}</td>

              <td></td>
            </tr>
          </tbody>
        ))}
      </table>
    }

    {
      // TO DO: Table med all information
      <table className="divfortypes">
        <tr>
          <th>{"TYPE"}</th>
        </tr>
        {currentPoke.types.map((poke) => (
          <tbody>
            <tr>
              <td>{poke.type.name.toUpperCase()}</td>
              <td>{}</td>

              <td></td>
            </tr>
          </tbody>
        ))}
      </table>
    }
  </div>
);

function comparelevel(a, b) {
  if (
    a.version_group_details[0].level_learned_at <
    b.version_group_details[0].level_learned_at
  ) {
    return 1;
  }
  if (
    a.version_group_details[0].level_learned_at >
    b.version_group_details[0].level_learned_at
  ) {
    return -1;
  } // TODO return 1 if a.aisle > b.aisle. Note: not >= !!!
  // At this point, we know that a.aisle===b.aisle
}
