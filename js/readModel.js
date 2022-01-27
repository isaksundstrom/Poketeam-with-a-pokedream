const readModel = () => {
    /*window.localStorage.setItem("dinnerModel", 
                        JSON.stringify({guests: model.guests, 
                            dishes: model.dishes,
                            currentDish: model.currentDish}
            ))*/
    
    const modelString= localStorage.getItem("PokeModel");
    let model;
    if(!modelString){
        model = new PokeModel() 
    }
    else{
        //console.log("Found data");
    let modelObject= JSON.parse(modelString);
    //console.log(modelObject);
    model = new PokeModel(modelObject.currentTeam, modelObject.currentPoke, modelObject.teamList)
    }
    

    model.addObserver(function(){
        window.localStorage.setItem("PokeModel", 
                        JSON.stringify({ 
                            currentPoke: model.currentPoke,
                            currentTeam: model.currentTeam,
                            teamList: model.teamList
                        }
            ))
    })
    return model;
}



//guests=2, currentTeam=[], teamList = [], currentPoke=null, page=0)