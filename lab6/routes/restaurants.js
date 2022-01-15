const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData =data.restaurants;

function check_create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)
{


    let dummywebsite=website.toLowerCase(); 


if(!name || !location || !phoneNumber|| !website|| !priceRange|| !cuisines|| !serviceOptions)
{

throw 'All fields need to have valid values';

}
else if(!isString(name) || !isString(location)|| !isString(phoneNumber)|| !isString(website)|| !isString(priceRange))
{
    throw 'please enter only strings';
}
else if(check_for_spaces(name) || check_for_spaces(location)|| check_for_spaces(phoneNumber)|| check_for_spaces(website)|| check_for_spaces(priceRange))
{
    throw "Enter data instead of spaces";
}
else if((/^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/).test(phoneNumber)== false)
{
    throw "Phone number format is wrong";
}
else if((/^(http:\/\/www\.)([a-zA-Z0-9!$_]{5,})+\.(com)$/).test(dummywebsite)==false)
{

    throw "website is in wrong format, please check";
}
else if(priceRange!="$" && priceRange!="$$" && priceRange!="$$$" && priceRange!="$$$$")
{

    throw "please check your priceRange";
}

if(Array.isArray(cuisines) && cuisines.length>0)
{
for(let i=0;i<cuisines.length;i++)
{

    if(typeof cuisines[i]!= 'string')
    {
        throw "Enter only strings in cuisines";
    }
    else if(check_for_spaces(cuisines[i]))
    {
        throw "cuisines should not contain empty data"
    }
}

}
else
{
    throw "Enter array with data for cuisines";
}



if(typeof serviceOptions === 'object' && !Array.isArray(serviceOptions) && serviceOptions !== null)
{
    if(!Object.keys(serviceOptions).length==0 )
    {
for(let key in serviceOptions)
{
    if(typeof serviceOptions[key] != 'boolean')
    {
        throw "please enter boolean value in serviceOptions";
    }

}
    }
    else{
        throw "please enter some keys ";
    }
}
else{
    throw "please enter serviceOptions as object";
}

}


function check_id(id)
{
if(!id)
{
    throw "please enter id";
}
else if(typeof id!='string')
{
    throw "please enter id as string";
}
else if(check_for_spaces(id))
{
    throw "Enter id properly"
}
else if(!isValidObjectId(id))
{
    throw "Enter proper objectid as string"
}

}



function isValidObjectId(id){
    let { ObjectId } = require('mongodb');
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
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


function isString(x)                    //common code for strings
{
    return Object.prototype.toString.call(x) === "[object String]"
  }


router.get('/', async (req, res) => {
    try {
        const restaurant = await restaurantData.getAll();
        res.json(restaurant);
    } catch (e) {
      res.status(400).send();
    }
  });




  router.post('/', async (req, res) => {
    const restauarantdata = req.body;
    
    try {
      const { name, location, phoneNumber, website, priceRange, cuisines,serviceOptions} = restauarantdata;

      check_create(name, location, phoneNumber, website, priceRange, cuisines,serviceOptions);

      const newRestaurant = await restaurantData.create(name, location, phoneNumber, website, priceRange, cuisines,serviceOptions);
      
      res.status(200).json(newRestaurant);
    } 
    catch (e) {
      res.status(400).json({ error: e });
    }
  });



  router.get('/:id', async (req, res) => {

    try{
      check_id(req.params.id)
    }
    catch(e)
    {
      res.status(400).json({ error: e });
      return;
    }
    
    try {
        let { ObjectId } = require('mongodb');
        let parsedId = ObjectId(req.params.id);
        
    const restaurantList = await restaurantData.getrestaurantsbyid(parsedId);
    if(restaurantList==null)
    {
     throw 'Restaurant not found'
    }
    else{res.status(200).json(restaurantList)}
      
    } catch (e) {
        res.status(404).json({error: e})
    }


  });



  router.put('/:id', async (req, res) => {

    const restauarantdata = req.body;

    const {name, location, phoneNumber, website, priceRange, cuisines,serviceOptions} = restauarantdata;

    try{
      check_id(req.params.id);
      check_create(name, location, phoneNumber, website, priceRange, cuisines,serviceOptions)
    }
    catch(e)
    {
      res.status(400).json({ error: e });
      return;
    }
    
    
    try {

      const updateRestaurant = await restaurantData.update(req.params.id,name, location, phoneNumber, website, priceRange, cuisines,serviceOptions);
  
      res.status(200).json(updateRestaurant);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });


  router.delete('/:id', async (req, res) => {

    try{
      check_id(req.params.id)
    }
    catch(e)
    {
      res.status(400).json({ error: e });
      return;
    }

    try {
     let restaurant= await restaurantData.remove(req.params.id);
      res.status(200).json(restaurant)
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });


  
  module.exports = router;