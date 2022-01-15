const axios = require("axios")
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }




async function getPersonById(id){
  let data=await getPeople();
  let person;

  id=String_check(id);


  for(let i=0;i<data.length;i++)
  {
    if(data[i].id==id)
    {
      person=data[i];
    }
}

if(person!= null)
{
  return person;
}
else{
  throw 'person not found';
}
}







  async function sameStreet(streetName, streetSuffix){

    streetName=String_check(streetName);
    streetSuffix=String_check(streetSuffix);


    let data=await getPeople();

    let street_array=[];


    for(let i=0;i<data.length;i++)
    {
      let{address}=data[i];
      let{work}=address;
      let{home}=address;

      
        if(work.street_name.toLowerCase()==streetName.toLowerCase() && work.street_suffix.toLowerCase()==streetSuffix.toLowerCase() ||
        home.street_name.toLowerCase()==streetName.toLowerCase() && home.street_suffix.toLowerCase()==streetSuffix.toLowerCase())
        {
          street_array.push(data[i]);
        }
      
    }

    if(street_array.length>=2)
    {
    return street_array;
    }
    else
    {
      throw `there are not at least two people that live or work on ${streetName} ${streetSuffix}`;

    }

  }





  async function manipulateSsn()
  {
    if(arguments.length> 0)
    {
        throw 'do not pass any arguments'
    }

    let data=await getPeople();
    let ssn_obj={};
    let ssn_array=[];
    let highest_record={};
    let lowest_record={};
    let total_record={};
    let sum=0;

    let copyarray=[];
    for(let i=0;i<data.length;i++)
    {

      for(let key in data[i])
      {
        
        ssn_obj[data[i].ssn]=data[i].ssn.replace(/\D/g,'').split('').sort().join('')
        ssn_array[i]=data[i].ssn.replace(/\D/g,'').split('').sort().join('');

      }
    }
       copyarray = Array.from(ssn_array.sort());

       let highest=copyarray[copyarray.length-1];
       let lowest=copyarray[0];

      let highest_ssn;
      let lowest_ssn;

      for(let key in ssn_obj)
      {
        if(ssn_obj[key]==highest)
        {
          highest_ssn= key;

        }
        if(ssn_obj[key]==lowest)
        {
          lowest_ssn= key;

        }

      }

      for(let i=0;i<data.length;i++)
  {


    if(data[i].ssn==highest_ssn)
    {
        highest_record.firstname=data[i].first_name;
        highest_record.lastname=data[i].last_name;
    }

    if(data[i].ssn==lowest_ssn)
    {
    lowest_record.firstname=data[i].first_name;
    lowest_record.lastname=data[i].last_name;
    }
}

total_record.highest=highest_record;
total_record.lowest=lowest_record;

for(let i=0;i<copyarray.length;i++)
{
  sum=sum+parseInt(copyarray[i]);

}

total_record.average=Math.floor(sum/(copyarray.length));

    return total_record;

  }

  



 async function sameBirthday(month, day)
 {
  let data=await getPeople();
  let birth_array=[];

  birthday_check(month,day);

  for(let i=0;i<data.length;i++)
  {
    let date = new Date(data[i].date_of_birth)

    let d=date.getDate();
    let m=date.getMonth()+1;
    let y=date.getFullYear();

    if(month==m && day==d)
    {
     birth_array.push(data[i].first_name+' '+data[i].last_name);

    }

  }

  if(birth_array.length<1)
  {
    throw 'There are no people with that birthday'
  }

return birth_array;
 }


  function birthday_check(month,day)
  {
    if(month && day)
    {
    if(typeof month!== 'number') 
    {
      if(typeof month==='string')
      {
        if(isNaN(parseInt(month,10)))
        {
          throw 'month is not a number'
        }
      }
      else{
        throw 'enter valid datatype for month';
      }
    }   

    if(typeof day!== 'number') 
    {
      if(typeof day==='string')
      {
        if(isNaN(parseInt(day,10)))
        {
          throw 'day is not a number'
        }
      }
      else{
        throw 'enter valid datatype for day';
      }
    }  
  }
else
{
  throw 'please enter month and day'
}


if(month>0 && month<13)
{
  if(month==2)
  {
       if(!(day>0 && day<29))
       {
        throw 'day is not valid'
       }
  }
     else if(month==9 || month==4 || month==6 || month==11)
      {
        if(!(day>0 && day<31))
        {
          throw 'day is not valid'
        }
      }
   else if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)
   {
    if(!(day>0 && day<32))
    {
      throw 'day is not valid'
    }
  }

}

else
{
  throw 'month is invalid';
}

}



  

 function String_check(string)                //common code for strings
 {

 if (!string) {
  throw 'please enter a string'
}
else if(!isString(string))
{
  throw 'input is not a string'
}
else if(string.length==0)
{
  throw 'please enter a string that is greater than zero'
}
else if(check_for_spaces(string))
{
  throw 'string should contain more than spaces'
}

return string.trim();
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


module.exports = {
  firstName: "Akhil", 
  lastName: "Medasani", 
  studentId: "10478655",
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday
};


