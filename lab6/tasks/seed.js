const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.restaurants;
const reviews=require('../data/reviews')

async function main() {
   const db = await dbConnection();
try{
   const Restaurant1 = await restaurants.create(
    "The Saffron Lounge",
   "New York City, New York",
  "123-456-7890",
    "http://www.saffronlounge.com",
   "$$$$",
   ["Cuban", "Italian" ],
    {dineIn: true, takeOut: true, delivery: false}
 ) 
  
/* 
 const Restaurant1= await restaurants.update("61798d797eda7316c07909ad","The osho",
 "New York City, New York",
"123-456-7890",
  "http://www.saffronlounge.com",
 "$$$$",
 ["Cuban", "Italian" ],

  {dineIn: true, takeOut: true, delivery: false})

console.log(Restaurant1) */
 /*  const Review = await reviews.getAll("61798d797eda7316c07909ad") */

console.log(Restaurant1)
 /*  const Review2 = await reviews.create(
    "61798d797eda7316c07909ad",
     "This place was okay",
     "scaredycat",
     3,
    "10/13/2021",
    "This place was great! the staff is top notch and the food was delicious!  They really know how to treat their customers"
      ); */
   

     /*  const Review3=await reviews.remove("6174e54e6bcd8819b48595e9")
      const util = require('util')
      // alternative shortcut
  console.log(util.inspect(Review3, false, null, true )) */
  }
  catch(e)
  {
    console.log(e)
  }
  console.log('Done seeding database');

  await db.serverConfig.close();
}

main();