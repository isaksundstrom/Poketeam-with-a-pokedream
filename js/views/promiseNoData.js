function promiseNoData(promise, data, error, h){  
    return  !promise && "no data"     
|| error && <h1>{error}</h1>   
          || !data && <img className="loadingGif" src="https://media4.giphy.com/media/W2LPUUdHkPFNLaWwPZ/giphy.gif"/>     
}
