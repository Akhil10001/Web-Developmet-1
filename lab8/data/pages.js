const md5 = require('blueimp-md5');
const publickey = 'd9a23a6a20dedd3f5d3e5040c6fe4889';
const privatekey = '0165a5effa47fb323dd4c504349f2be30ad07a1e';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);



const axios = require("axios")
async function getMarvel(){

 
  const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


    const { data } = await axios.get(url)
    return data 
  }

  async function getMarvelSearch(searchTerm){

    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?nameStartsWith='+searchTerm+'&limit='+20+'&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;



    const { data } = await axios.get(url)
    return data 
  }



  async function  getMarvelId(id)
  {

    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
    const url = baseUrl + id+'?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
    
    const { data } = await axios.get(url)
    return data 

  }




const exportedMethods = {
    async  getAll(){

      if(arguments.length>0)
      {
        throw 'please do not pass arguments'
      }
        let data=await getMarvel();
       return data;
    },
    
    
    async getBySearch(searchTerm)
    {
      if(!searchTerm || typeof searchTerm!= 'string')
      {
        throw 'Please check the searchTerm'
      } 
        let data=await getMarvelSearch(searchTerm)
        return data;
    },

    async getById(id)
    {
        if(!id || typeof id!= 'string')
        {
          throw 'Please check the ID'
        }
      let data=await getMarvelId(id)
      return data;
    }

  };





  module.exports = exportedMethods;
 
  