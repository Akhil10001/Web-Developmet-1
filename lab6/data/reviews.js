const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;


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

function isValidObjectId(id){
    let { ObjectId } = require('mongodb');
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;        
        return false;
    }
    return false;
}


function calculate_overallRating(resobject)
{
let overallRating=0;

for(let i=0; i<resobject.reviews.length;i++)
{
    overallRating=resobject.reviews[i].rating+overallRating

}

overallRating=overallRating/resobject.reviews.length;

return overallRating;
}




module.exports={
    async getrestaurantsbyid(id)
    {
    
        const res=await restaurants();
    const restaurant=await res.findOne({_id:id});
    return restaurant;
    
    },

    async create(restaurantId, title, reviewer, rating, dateOfReview, review)
    {

        check_reviews_create(restaurantId, title, reviewer, rating, dateOfReview, review)


        let { ObjectId } = require('mongodb');
        let newObjId = ObjectId();

        let parsedId = ObjectId(restaurantId);

        const restaurantscollection = await restaurants();
        

let object=await restaurantscollection.updateOne({_id:parsedId},{ $push:{ reviews:{_id:newObjId,
    title: title,
    reviewer:reviewer,
    rating: rating,
    dateOfReview: dateOfReview,
    review:review }}})
    const restaurantobject=await this.getrestaurantsbyid(parsedId);

    if(restaurantobject==null)
    {
        throw "Restaurant dosen't exist with that id"
    }
    let obj=await restaurantscollection.updateOne({_id:parsedId},{$set:{ overallRating:calculate_overallRating(restaurantobject)}})
   
    const resobject=await this.getrestaurantsbyid(parsedId);

    

    resobject._id=resobject._id.toString();

    for(let i=0; i<resobject.reviews.length;i++)
    {
        resobject.reviews[i]._id=resobject.reviews[i]._id.toString()

    }
    


    return resobject;
    },

    async getAll(restaurantId)
    {
        check_restaurantid(restaurantId)

        let { ObjectId } = require('mongodb');


        let parsedId = ObjectId(restaurantId);
        const restaurantobject=await this.getrestaurantsbyid(parsedId);

        if(restaurantobject==null)
        {
            throw "Restaurant dosen't exist with that restaurantid"
        }
        restaurantobject._id=restaurantobject._id.toString()

        for(let i=0;i<restaurantobject.reviews.length;i++)
        {
            restaurantobject.reviews[i]._id=restaurantobject.reviews[i]._id.toString()
        }

        if(restaurantobject.reviews.length==0)
        {
            throw 'No reviews for this Restauarnt'
        }
        
return restaurantobject.reviews

    },

    async get(reviewId)
    {
    check_reviewid(reviewId)
        let restaurant=await restaurants();
        let { ObjectId } = require('mongodb');


        let parsedId = ObjectId(reviewId);



        let resobject=await restaurant.aggregate([
            {$unwind : "$reviews"},
            {$match : {"reviews._id" : parsedId}},
            {$project : {_id : "$reviews._id", 
                         title: "$reviews.title",
                         reviewer:"$reviews.reviewer",
                        rating:"$reviews.rating",
                        dateOfReview:"$reviews.dateOfReview",
                        review:"$reviews.review"}}
        ]).toArray() 

       if(resobject.length==0)
       {
           throw "Review dosen't exist with that Id"
       }
    resobject[0]._id=resobject[0]._id.toString()
        return resobject[0]

    },



    async remove(reviewId)
    {

        check_reviewid(reviewId)
        let res_id;
       
        const restaurantscollection = await restaurants();
        const Allrestaurants=await restaurantscollection.find({}).toArray();
        let { ObjectId } = require('mongodb');


        let parsedId = ObjectId(reviewId);

        for(let i=0;i<Allrestaurants.length;i++)
        {
           for(let j=0;j<Allrestaurants[i].reviews.length;j++)
           {
               
               if(Allrestaurants[i].reviews[j]._id==reviewId)
               {
                    res_id=Allrestaurants[i]._id.toString()
               }
           }
        }


if(!res_id)
{
     throw "Review dosen't exist with that Id"
}


        let resobj = ObjectId(res_id);

        await restaurantscollection.updateOne({_id:resobj},{$pull: {reviews:{ "_id": parsedId}}})
        const restaurantobject=await this.getrestaurantsbyid(resobj);



        let obj=await restaurantscollection.updateOne({_id:resobj},{$set:{ overallRating:calculate_overallRating(restaurantobject)}})
        

        let returnobj={reviewId:reviewId,deleted:true}

        return returnobj;
        

    }

}
