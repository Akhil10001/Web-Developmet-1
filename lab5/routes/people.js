const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData =data.people ;


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



router.get('/', async (req, res) => {
    try {
      const peopleList = await peopleData.getAllpeople();
      res.json(peopleList);
    } catch (e) {
      res.status(500).send();
    }
  });



  router.get('/:id', async (req, res) => {
    try {
      check_id(req.params.id);

      req.params.id=req.params.id.trim();
      const peopleList = await peopleData.getPersonById(req.params.id);
      res.json(peopleList);
    } catch (e) {
        res.status(404).json({ message: 'Person not found' })
    }
  });


 

  module.exports = router;