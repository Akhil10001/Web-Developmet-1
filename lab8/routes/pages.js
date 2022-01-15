const express = require('express');
const router = express.Router();
const data = require('../data/pages');






router.get('/', async (req, res) => {

    const marvelData = await data.getAll();

    res.render('pages/index', { marvel:  marvelData , keywords:"Character Finder" });
    
  });


  router.post('/search', async (req, res) => {

    let errors = [];


    if (!req.body.searchTerm) {
      errors.push('No searchTerm provided');
    }
    else if(req.body.searchTerm.trim().length==0)
    {
      errors.push('please add something other than spaces');
    }



    if(errors.length>0)
    {
      res.status(400).render('pages/index',{error: errors,
                                              keywords:"Character Finder" })
    }
    else
    {
      req.body.searchTerm=req.body.searchTerm.trim();

    const marvelData = await data.getBySearch(req.body.searchTerm);

    
    res.render('pages/search', { marvel:  marvelData.data.results, 
                                 searchterm:  req.body.searchTerm ,
                                 keywords:"Characters Found"});
    }
  
    
  });



   router.get('/characters/:id', async (req, res) => {

    let marvelData ;
    let errors=[];
    
    if(!req.params.id)
    {
      errors.push('Please enter id')

      res.status(404).render('pages/search',{error: errors,
                              searchterm:  req.params.id ,
                              keywords:"Character Found" })
        return;
    }

    try{
    marvelData=await data.getById(req.params.id);
    }
    catch(e)
    {
      errors.push('No Character Found')

      res.status(404).render('pages/search',{error: errors,
                              searchterm:  req.params.id ,
                              keywords:"Character Found" })
        return;
    }
    res.render('pages/images', { marvel:  marvelData.data.results[0], 
                                 marvelArray: marvelData.data.results[0].comics, 
                                 keywords:marvelData.data.results[0].name  });
    
    
  });
 
  module.exports = router;