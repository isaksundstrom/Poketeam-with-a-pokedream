const PokeSource = {
  apiCall(params) {
    return (
      fetch(BASE_URL + params, {
        method: "GET",
        headers: {},
      })
        // from headers to response data
        .then((response) => {
          if (response.status != 200)
            throw (
              "Please search for a full pokemon name, try again! Error: " +
              response.status
            );

          return response.json();
        })
    );
  }, // comma between object methods, like between any properties!
  searchPokemon({ searchvalue }) {
    if (!searchvalue) {
      searchvalue = "";
    }
    if (searchvalue) {
      //searchvalue = "";
      bigboy = this.apiCall("pokemon/" + searchvalue).then(
        (data) => (
          (data.level = 1),
          (data.move = [0, "Move 1", "Move 2", "Move 3", "Move 4"]),
          [data]
        )
      );

      return bigboy;
    }
  },

  pagePokemon({ query }) {
    //pokemon?limit=20&offset=10
    if (!query) {
      query = "";
    }
    totpoke = this.apiCall("pokemon?limit=20&offset=" + query).then(
      async function (data) {
        let newData = [];
        for (let item of data.results) {
          let value = await fetch(item.url);
          let response = await value.json();
          response.level = 1;
          response.move = [0, "Move 1", "Move 2", "Move 3", "Move 4"];
          newData.push(response);
        }
        return newData;
      }
    );

    return totpoke;

    //var url = new URL('recipes/search?query=');
    //var params = new URLSearchParams(url.search);

    // leave out the unimportant parts of the response data
  },
  getPokeStats(pokemon) {
    return this.apiCall("pokemon/" + pokemon.name).then((data) => data);
  },
}; // end of PokeSource
