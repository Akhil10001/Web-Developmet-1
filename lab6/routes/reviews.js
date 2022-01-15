const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantData =data.restaurants;
const reviewsData=require('../data/reviews')

function check_reviews_create(restaurantId, title, reviewer, rating, dateOfReview, review)
{
    if(!restaurantId || !title || !reviewer|| !rating|| !dateOfReview|| !review)
    {
    
    throw 'All fields need to have valid values';
    
    }
    else if(!isString(restaurantId) || !isString(title)|| !isString(reviewer)|| !isString(dateOfReview)|| !isString(review))
{
    throw 'please enter only strings';
}
else if(check_for_spaces(restaurantId) || check_for_spaces(title)|| check_for_spaces(reviewer)|| check_for_spaces(dateOfReview)|| check_for_spaces(review))
{
    throw "Enter data instead of spaces";
}
else if(!isValidObjectId(restaurantId))
{
    throw "Enter proper objectid as string"
}
else if(typeof rating!='number' || !(rating>=1 && rating<=5))
{

    throw "please enter number between 1 to 5 for rating"
}

else if(!isDate(dateOfReview))
{
    throw "please enter a valid date"
}
else if(todaysDate(dateOfReview))
{
    throw "please enter today's date"
}


}




function todaysDate(dateOfReview)
{
    var inputDate = new Date(dateOfReview);

    var todaysDate = new Date();
    
    if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
       
        return false;
    }
    else
    {
        return true;
    }
    
}



function isDate(ExpiryDate) { 
    var objDate,   
        mSeconds,  
        day,      
        month,     
        year;       
    if (ExpiryDate.length !== 10) { 
        return false; 
    }  
    if (ExpiryDate.substring(2, 3) !== '/' || ExpiryDate.substring(5, 6) !== '/') { 
        return false; 
    } 
    month = ExpiryDate.substring(0, 2) - 1; 
    day = ExpiryDate.substring(3, 5) - 0; 
    year = ExpiryDate.substring(6, 10) - 0; 

    if (year < 1000 || year > 3000) { 
        return false; 
    } 
 
    mSeconds = (new Date(year, month, day)).getTime(); 
    objDate = new Date(); 
    objDate.setTime(mSeconds); 

    if (objDate.getFullYear() !== year || 
        objDate.getMonth() !== month || 
        objDate.getDate() !== day) { 
        return false; 
    } 

    return true; 
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



function check_restaurantid(restaurantid)
{
    if(!restaurantid)
    {
        throw "please enter restaurantid";
    }
    else if(typeof restaurantid!='string')
    {
        throw "please enter restaurantid as string";
    }
    else if(check_for_spaces(restaurantid))
    {
        throw "Enter restaurantid without spaces"
    }
    else if(!isValidObjectId(restaurantid))
    {
        throw "Enter proper objectid as string"
    }
   
}

function check_reviewid(reviewid)
{
    if(!reviewid)
    {
    throw 'please enter reviewid'
    }
    else if(!isString(reviewid))
    {
        throw 'please enter only strings';
    }
    else if(check_for_spaces(reviewid) )
    {
        throw "Enter data instead of spaces";
    }
    else if(!isValidObjectId(reviewid))
    {
        throw "Enter proper objectid as string"
    }
}


function isString(x)                    //common code for strings
{
    return Object.prototype.toString.call(x) === "[object String]"
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

function isValidObjectId(id){
  let { ObjectId } = require('mongodb');
  if(ObjectId.isValid(id)){
      if((String)(new ObjectId(id)) === id)
          return true;        
      return false;
  }
  return false;
}




router.get('/:id', async (req, res) => {

   try{
    check_restaurantid(req.params.id)
  }
  catch(e)
  {
    res.status(400).json({ error: e });
    return;
  } 

    try {
     let reviews= await reviewsData.getAll(req.params.id);
      res.status(200).json(reviews)
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });


  router.post('/:id', async (req, res) => {
    const reviewData = req.body;
    const { title, reviewer, rating, dateOfReview, review} = reviewData;


    try{
      check_reviews_create(req.params.id, title, reviewer, rating, dateOfReview, review)
    }
    catch(e)
    {
      res.status(400).json({ error: e });
      return;
    } 
    try {
      const newReview = await reviewsData.create(req.params.id, title, reviewer, rating, dateOfReview, review);
      res.status(200).json(newReview);
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

  router.get('/review/:id', async (req, res) => {

    try{
      check_reviewid(req.params.id)
    }
    catch(e)
    {
      res.status(400).json({ error: e });
      return;
    } 

    try {
     let reviews= await reviewsData.get(req.params.id);
      res.status(200).json(reviews)
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });



  router.delete('/:id', async (req, res) => {

    try{
      check_reviewid(req.params.id)
    }
    catch(e)
    {
      res.status(400).json({ error: e });
      return;
    } 
    try {
        let reviews= await reviewsData.remove(req.params.id);
      res.status(200).json(reviews)
    } catch (e) {
      res.status(404).json({ error: e });
    }
  });

module.exports = router;