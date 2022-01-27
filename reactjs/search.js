 function Search({model, nav, nav2}){  
    const [type, setType]= React.useState(""); 
    const [query, setQuery]= React.useState("");
    const [searchvalue, setSearchValue]= React.useState("");
    const [setpage, setPageValue]= React.useState("");
    const [promise, setPromise]= React.useState(null);  
    React.useEffect(()=>setPromise(PokeSource.pagePokemon({})), []);
    const [data, error]= usePromise(promise);
    

    

    return h(React.Fragment, {}
               , h(SearchFormView, {

                   onText: text=> setQuery(text)/*TODO  set query */ ,
                   setPage: x => model.setPage(x),
                   onSearchValue: searchvalue=> setSearchValue(searchvalue),
                   onSetPage: setpage=> setPageValue(setpage),
                   onCurrentTeam: teamname => model.setCurrentTeam(null),
                   page: model.page,
                   onSearch: ()=> setPromise(PokeSource.searchPokemon({searchvalue: searchvalue})),
                   //onType: type=> setType(type)/*TODO  set type*/ ,
                   onPage: ()=> setPromise(PokeSource.pagePokemon({query: (model.page).toString()})),
                   nav
                   
               }) 
              , promiseNoData(promise, data, error)  // cases 0, 1, 3
              ||
              h(SearchResultsView, {searchResults: data, pokemonChosen: pokeid => model.setCurrentPoke(pokeid), nav2})// case 2,
              ,
              
              );
  }
  
 