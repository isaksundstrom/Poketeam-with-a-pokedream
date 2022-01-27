const SearchResultsView = ({
  h,
  searchResults,
  pokemonChosen,
  nav2: [navCallback, navLabel],
}) => {
  return (
    <div>
      {searchResults.map((poke) => (
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
            <b>{poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</b>
          </div>
        </span>
      ))}{" "}
    </div>
  );
};

const SearchFormView = ({
  h,
  onPage,
  onCurrentTeam,
  onSearch,
  onSearchValue,
  onSetPage,
  setPage,
  page,
  nav: [navCallback, navLabel],
}) => {
  //console.log(onText)
  //console.log("RING DONG ", onSetPage())
  return (
    <div className="pageselectdiv">
      <button onClick={() => (navCallback(), onCurrentTeam(null))}>
        {navLabel}
      </button>
      <input
        type="text"
        onChange={(event) => onSearchValue(event.target.value.toLowerCase())}
      ></input>
      <button onClick={onSearch}>Search (Full Name Only)</button>
      <button
        onClick={() => {
          setPage(-20);
          onPage();
        }}
        disabled={page == 0}
      >
        Prev Page
      </button>
      <button
        onClick={() => {
          setPage(20);
          onPage();
        }}
      >
        Next Page
      </button>
    </div>
  );
};

/*
<select onChange = {event => onType(event.target.value)} >
{["starter", "main course", "dessert"].map(k=> 
<option key={k} >{k}</option>)
}       
</select>*/
