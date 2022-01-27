function Show({hash, children}){  
    const [route, setRoute]= React.useState(window.location.hash);
    const [, setState]= React.useState()
    React.useEffect(()=> 
      window.addEventListener("hashchange", 
                 ()=> /*TODO set React state */setRoute(window.location.hash)), 
 []); 
    return hash===window.location.hash? children/*TODO show children*/: false;
 }   
 
 