class PokeModel {
  constructor(
    currentTeam = ["Select Team", []],
    currentPoke = null,
    teamList = [["Select Team", []]],
    page = 0,
    level = 0
  ) {
    this.subscribers = [];
    this.currentTeam = currentTeam;
    this.teamList = teamList;
    this.currentPoke = currentPoke;
    this.page = page;
  }

  setPage(x) {
    this.page += x;
    this.notifyObservers();
  }

  addObserver(callback) {
    this.subscribers = this.subscribers.concat(callback);
  }

  removeObserver(obs) {
    this.subscribers = this.subscribers.filter((o) => o != obs /*TODO*/);
  }

  setNotes(poke, newNotes) {
    poke.notes = newNotes;
  }

  setLevel(poke, levelnew) {
    poke.level += levelnew;
    this.notifyObservers();
  }

  //   inTeam(poke, teamname){
  //        for(let i = 0; i < this.teamList.length; i++){
  //            if(this.teamList[i][0] == teamname){
  //                for(let j = 0; j < this.teamList[i][1].length; j++){
  //                    if(this.teamList[i][1][j] == poke){

  //                    }

  //                }
  //            }
  //        }
  //    }

  setMove(poke, movename, index) {
    poke.move[index] = movename;

    this.notifyObservers();
  }

  addToTeam(poke, teamname) {
    for (let i = 0; i < this.teamList.length; i++) {
      //console.log("i0", this.teamList[i][0])
      if (this.teamList[i][0] == teamname) {
        this.teamList[i][1].push(poke);
        this.currentTeam = this.teamList[0];
      }
    }
    // if(this.currentTeam.some(o => o.id == poke.id)){
    //     throw "Pokemon already in team!";
    // }
    // else{
    //     this.currentTeam=[...this.currentTeam, poke]
    // }
    this.notifyObservers();
  }

  removeFromTeam(poke) {
    this.currentTeam[1] = this.currentTeam[1].filter(
      (item) => item.id != poke.id
    );
    this.notifyObservers();
  }

  setCurrentPoke(id) {
    this.currentPoke = id;

    this.notifyObservers();
  }

  setCurrentTeam(teamname) {
    for (let i = 0; i < this.teamList.length; i++) {
      //console.log("i0", this.teamList[i][0])
      if (this.teamList[i][0] == teamname) {
        this.currentTeam = this.teamList[i];
      }
    }

    this.notifyObservers();
  }

  addTeam(teamName, teamArray) {
    this.teamList = [...this.teamList, [teamName, teamArray]];
    //this.teamList.teamName = [];
    this.notifyObservers();
  }

  removeTeam(teamName) {
    this.teamList = this.teamList.filter((item) => item[0] != teamName);
    this.notifyObservers();
  }

  getTeam() {
    return [...this.currentTeam];
  }

  getTeamList() {
    return [...this.teamList];
  }

  notifyObservers() {
    this.subscribers.forEach((callback) => {
      try {
        callback();
      } catch (err) {
        console.error("Error ", err, callback);
      }
    });
  }
}
