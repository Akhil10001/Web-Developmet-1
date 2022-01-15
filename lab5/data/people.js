
const axios = require("axios")
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
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
  async getAllpeople() {
    const peopleCollection = await getPeople();
    return peopleCollection;
  },


  async getPersonById(id) {


    check_id(id);

    id=id.trim();
    
    const peopleCollection = await getPeople();
    let person;

    
  
    for(let i=0;i<peopleCollection.length;i++)
    {
      if(peopleCollection[i].id==id)
      {
        person=peopleCollection[i];
      }
  }
  
  if(person!= null)
  {
    return person;
  }
  else{
    throw 'person not found';
  }
  }
};

module.exports = exportedMethods;