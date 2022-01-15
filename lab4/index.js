const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");


const main = async () => {
     try {
      /*  const Restaurant1 = await restaurants.create(
         "The Saffron Lounge",
        "New York City, New York",
       "123-456-7890",
         "http://www.saffronlounge.com",
        "$$$$",
        ["Cuban", "Italian" ],
       
         {dineIn: true, takeOut: true, delivery: false}
      );
      console.log(Restaurant1);



      const Restaurant2 = await restaurants.create(
        "papa john's",
        "Hoboken, New Jersey",
        "123-567-1010",
        "http://www.papajohn.com",
        "$$$",
        ["American", "Italian"],
        4,
        { dineIn: true, takeOut: true, delivery: false }
      );



      const all = await restaurants.getAll();
      console.log(all);




      const Restaurant3 = await restaurants.create(
        "Mental cafe",
        "Los Angeles",
        "456-617-1234",
        "http://www.Mentalcafe.com",
        "$",
        ["American"],
        4,
        { dineIn: true, takeOut: true, delivery: true }
      );
      console.log(Restaurant3);
 */


        const Restaurant1 = await restaurants.create(
         "The Saffron Lounge",
        "New York City, New York",
       "123-456-7890",
         "http://www.saffronlounge.com",
        "$$$$",
        ["Cuban", "Italian" ],
        3,
       
         {dineIn: true, takeOut: true, delivery: false}
      );
      console.log(Restaurant1);

      const restaurant1 = await restaurants.rename(
        Restaurant1._id.toString(),
        "http://www.saffr.com"
      );
      console.log(restaurant1);



      /* const removeRestaurant = await restaurants.remove(Restaurant2._id.toString());
      console.log(removeRestaurant);



      const Updated = await restaurants.getAll();
      console.log(Updated);



      try {
        const Restaurant = await restaurants.create(
            "Manchester",
            "England, UK",
            "1000",
            "fsgdfgdgdhtxtdgdtgd",
            "$$",
            ["Mexican"],
            4,
            { dineIn: false, takeOut: true, delivery: true }
          ); 
    } catch(e) {
       
        console.log(e);
    }

      

 try{

    await restaurants.remove("907f1f77bcf86cd123456011");
 }
    catch(e) {
       
        console.log(e);
    }
     

 try{
       await restaurants.rename(
        "807f1f77bcf86cd712345611",
        "http://www.micheal.com"
      ); 
       }
       catch(e) {
       
        console.log(e);
    }



try {

    await restaurants.rename(
        Restaurant1._id.toString(),
        "https://www.mang.com"
      );
    
}  catch(e) {
       
    console.log(e);
}

 
     
 



try{
   const Error = await restaurants.get(Restaurant2._id.toString());

}

catch(e) {
       
    console.log(e);
}


  
    */ } catch (error) {
      console.log(error);
    }
  
    const db = await connection();
    await db.serverConfig.close();
  };
  
  main().catch((error) => {
    console.log(error);
  });
  