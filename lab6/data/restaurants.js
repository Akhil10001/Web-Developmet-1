const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;



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


module.exports={


async getrestaurantsbyid(id)
{

    const res=await restaurants();
const restaurant=await res.findOne({_id:id});
return restaurant;

},







    async create(name, location, phoneNumber, website, priceRange, cuisines,serviceOptions)
    {

        check_create(name, location, phoneNumber, website, priceRange, cuisines,serviceOptions)

        name=name.trim();
        location=location.trim();

        for(let i=0;i<cuisines.length;i++)
        {

            cuisines[i]=cuisines[i].trim();
        }




        const restaurantscollection = await restaurants();

        let newrestaurant=
        { 
    name:name,
    location:location,
    phoneNumber:phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines:cuisines,
    overallRating:0,
    serviceOptions:serviceOptions,
    reviews: []
        };


     
        const insertInfo = await restaurantscollection.insertOne(newrestaurant);

        const restaurant= insertInfo.insertedId;

        const resobject=await this.getrestaurantsbyid(restaurant);

resobject._id=resobject._id.toString();  
    return resobject;

    },
    



    async getAll()
    {
        if(arguments.length>0)
        {
            throw "please do not enter arguments for getAll()";
        }

        const restaurantscollection = await restaurants();
        const Allrestaurants=await restaurantscollection.find({},{ projection: { _id: 1,name:1 }} ).toArray();


        for(let i=0;i<Allrestaurants.length;i++)
        {
    Allrestaurants[i]._id=Allrestaurants[i]._id.toString()
        }

        return Allrestaurants;
    },





    async get(id)
    {

           check_id(id);

           id=id.trim();


        let { ObjectId } = require('mongodb');
        let parsedId = ObjectId(id);

        let object=await this.getrestaurantsbyid(parsedId);

        if(object==null)
        {
            throw "Restaurant dosen't exist"
        } 
object._id=object._id.toString()

for(let i=0;i<object.reviews.length;i++)
{
    object.reviews[i]._id=object.reviews[i]._id.toString()
}

        return object;

       

    },





    async remove(id)
    {

        
        check_id(id);

        id=id.trim();

        let { ObjectId } = require('mongodb');
        let parsedId = ObjectId(id);

    let restaurant=await restaurants();

   let name=await this.getrestaurantsbyid(parsedId);
   if(name==null)
   {
    throw "Restaurant dosen't exist"
   }
    let object=await restaurant.deleteOne({_id:parsedId});

    let returnobj={

        restaurantId:name._id.toString(),
        deleted:true
    };
return returnobj ;

    },


  async  update (id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions)
    {
        
        check_id(id);
        check_create(name, location, phoneNumber, website, priceRange, cuisines,serviceOptions)

        let oldarray;
        name=name.trim();
        location=location.trim();

        for(let i=0;i<cuisines.length;i++)
        {

            cuisines[i]=cuisines[i].trim();
        }

        let { ObjectId } = require('mongodb');
        let parsedId = ObjectId(id);
        let restaurant=await restaurants();
        let res=await this.getrestaurantsbyid(parsedId);
        
        if(res==null)
   {
    throw "Restaurant dosen't exist"
   }


   oldarray=res.reviews;
   let overallRating=res.overallRating;


   let object=await restaurant.updateOne({_id:parsedId},{ $set: {
    name:name,
    location:location,
    phoneNumber:phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines:cuisines,
    overallRating:overallRating,
    serviceOptions:serviceOptions,
    reviews:oldarray
}});

   let updated=await this.getrestaurantsbyid(parsedId);
  updated._id= updated._id.toString()

  for(let i=0;i<updated.reviews.length;i++)
  {
    updated.reviews[i]._id=updated.reviews[i]._id.toString()
  }
  
         return updated ;
    }
}