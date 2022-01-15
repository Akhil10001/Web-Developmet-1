const mongoCollections = require('../config/mongoCollections');
const restaurants = mongoCollections.restaurants;



function check_create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions)
{


    let dummywebsite=website.toLowerCase(); 


if(!name || !location || !phoneNumber|| !website|| !priceRange|| !cuisines|| !serviceOptions)
{

throw new Error('Please enter all the values');

}
else if(!isString(name) || !isString(location)|| !isString(phoneNumber)|| !isString(website)|| !isString(priceRange))
{
    throw new Error('please enter only strings');
}
else if(check_for_spaces(name) || check_for_spaces(location)|| check_for_spaces(phoneNumber)|| check_for_spaces(website)|| check_for_spaces(priceRange))
{
    throw new Error("Enter data instead of spaces");
}
else if((/^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/).test(phoneNumber)== false)
{
    throw new Error("Phone number format is wrong");
}
else if((/^(http:\/\/www\.)([a-zA-Z0-9!$_]{5,})+\.(com)$/).test(dummywebsite)==false)
{

    throw new Error("website is in wrong format, please check");
}
else if(priceRange!="$" && priceRange!="$$" && priceRange!="$$$" && priceRange!="$$$$")
{

    throw new Error("please check your priceRange");
}
else if(typeof overallRating!='number' || !(overallRating>=0 && overallRating<=5))
{

    throw new Error("please enter number between 0 to 5 for overallRating")
}

if(Array.isArray(cuisines) && cuisines.length>0)
{
for(let i=0;i<cuisines.length;i++)
{

    if(typeof cuisines[i]!= 'string')
    {
        throw new Error("Enter only strings in cuisines");
    }
    else if(check_for_spaces(cuisines[i]))
    {
        throw new Error("cuisines should not contain empty data")
    }
}

}
else
{
    throw new Error("Enter array with data for cuisines");
}



if(typeof serviceOptions === 'object' && !Array.isArray(serviceOptions) && serviceOptions !== null)
{
    if(!Object.keys(serviceOptions).length==0 )
    {
for(let key in serviceOptions)
{
    if(typeof serviceOptions[key] != 'boolean')
    {
        throw new Error("please enter boolean value in serviceOptions");
    }

}
    }
    else{
        throw new Error("please enter some keys ");
    }
}
else{
    throw new Error("please enter serviceOptions as object");
}

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
else if(!isValidObjectId(id))
{
    throw new Error("Enter proper objectid as string")
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







    async create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions)
    {

        check_create(name, location, phoneNumber, website, priceRange, cuisines, overallRating, serviceOptions)

        name=name.trim();
        location=location.trim();

        for(let i=0;i<cuisines.length;i++)
        {

            cuisines[i]=cuisines[i].trim();
        }




        const restaurantscollection = await restaurants();

        let r=await restaurantscollection.find({name:name, location:location, phoneNumber:phoneNumber}).toArray();

        

        let newrestaurant=
        { 
    name:name,
    location:location,
    phoneNumber:phoneNumber,
    website: website,
    priceRange: priceRange,
    cuisines:cuisines,
    overallRating:overallRating,
    serviceOptions:serviceOptions 
        };

     if(r.length==0)
     {

     
        const insertInfo = await restaurantscollection.insertOne(newrestaurant);

        const restaurant= insertInfo.insertedId;

        const resobject=await this.getrestaurantsbyid(restaurant);
  
    return resobject;
     }

else

{
    throw new Error("Restaurant already exists")
}

    },
    



    async getAll()
    {
        if(arguments.length>0)
        {
            throw new Error("please do not enter arguments for getAll()");
        }

        const restaurantscollection = await restaurants();
        const Allrestaurants=await restaurantscollection.find({}).toArray();

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
            throw new Error("Restaurant dosen't exist")
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
    throw new Error("Restaurant dosen't exist")
   }
    let object=await restaurant.deleteOne({_id:parsedId});

return `${name.name} has been successfully deleted!`

    },





    async rename(id, newWebsite){

        let dummywebsite=newWebsite.toLowerCase(); 
        check_id(id);

        id=id.trim();

        if(((/^(http:\/\/www\.)([a-zA-Z0-9!$_]{5,})+\.(com)$/).test(dummywebsite)==false))
        {
            throw new Error("newwebsite format is wrong");
        }





        let { ObjectId } = require('mongodb');
        let parsedId = ObjectId(id);

    let restaurant=await restaurants();

   let name=await this.getrestaurantsbyid(parsedId);

   if(name==null)
   {
    throw new Error("Restaurant dosen't exist")
   }
else if(name.website.toLowerCase()==newWebsite.toLowerCase())
{
    throw new Error("website already exists");
}
   

   let object=await restaurant.updateOne({_id:parsedId},{ $set: {website:newWebsite.toLowerCase()}});

   let updated=await this.getrestaurantsbyid(parsedId);

 
         return  updated;

    }

};
