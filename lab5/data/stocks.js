const axios = require("axios");

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of stocks objects
  }

  function check_id(id)
  {
  if(!id)
  {
      throw new Error("please enter id");
  }
  else if(typeof id!='string')
  {
      throw new Error("please enter id as string");
  }
  else if(check_for_spaces(id))
  {
      throw new Error("Enter id properly")
  }
}

function check_for_spaces(string)               //common code for strings
{
  string=string.trim()
  if(string.length>0)
  {
    return false;
  }
  else
  {
    return true;
  }
}


  let exportedMethods = {
    async getAllstocks() {
      const stocksCollection = await getStocks();
      return stocksCollection;
    },


    async getStockById(id) {
        const stocksCollection = await getStocks();
        let stock;
   
        check_id(id);
        id=id.trim();
      
      
        for(let i=0;i<stocksCollection.length;i++)
        {
          if(stocksCollection[i].id==id)
          {
            stock=stocksCollection[i];
          }
      }
      
      if(stock!= null)
      {
        return stock;
      }
      else{
        throw 'stock not found';
      }
      }




  };
  
  module.exports = exportedMethods;