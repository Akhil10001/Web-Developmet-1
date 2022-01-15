const mongoCollections=require('../config/mongoCollections')
const users=mongoCollections.users
const bcrypt = require('bcryptjs');
const { mainModule } = require('process');
const saltRounds = 16;





function paramCheck(username, password)
{

if(!username)
{
    throw 'Please enter username'
}
else if(!password)
{
    throw 'please enter password'
}
else if(username.trim()==0 || /^([a-zA-Z0-9]{4,})*$/.test(username)==false)
{
    throw 'please check the username format'
}
else if(/^([a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]{6,})*$/.test(password)==false)
{
    throw 'please check the password format'
}


}



async function findUser(username)
{
    const userCollection=await users()
   
    const userCollectionArray=await userCollection.find({}).toArray()

    for(let i=0;i<userCollectionArray.length;i++)
    {
        if(username.toLowerCase()==userCollectionArray[i].username.toLowerCase())
        {
            return userCollectionArray[i];
        }
    }

    return null;

}



async function createUser(username, password)
{

        paramCheck(username, password)


        const userinfo= await findUser(username)
        if(userinfo!=null)
        {
            throw 'username already exists'
        }


    const hash = await bcrypt.hash(password, saltRounds);


    let userdata={
        username:username,
        password:hash   
    }

    let userCollection=await users()
    let user=await userCollection.insertOne(userdata)

    let data=
    {userInserted: true}

return data

}


async function checkUser(username, password)
{

    paramCheck(username,password)

    const userinfo= await findUser(username)

    if(userinfo==null)
    {
        throw 'Either the username or password is invalid' 
    }
    storedPassword= userinfo.password

   let compare = await bcrypt.compare(password, storedPassword);

  if(compare)
  {
      return {authenticated: true, username:userinfo.username}
  }
  return {authenticated: false}
}






module.exports=
{
    createUser,
    checkUser
}
