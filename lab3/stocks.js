const axios = require("axios")
async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }


async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of stocks objects
  }



 async function listShareholders()
 {

    if(arguments.length> 0)
    {
        throw 'do not pass any arguments'
    }

    let people_data=await getPeople();
    let stocks_data=await getStocks();
    let string;

    for(let i=0;i<stocks_data.length;i++)
    {

        let{shareholders}=stocks_data[i];

        for(let j=0;j<people_data.length;j++)
        {
            for(let k=0;k<shareholders.length;k++)
            {
            if(people_data[j].id==shareholders[k].userId)
            {
                shareholders[k].first_name=people_data[j].first_name;
                shareholders[k].last_name=people_data[j].last_name;
                delete shareholders[k].userId;
    
            }
        }
        }

    } 

return stocks_data;
 }

async function topShareholder(stockName)
{
   stockName= String_check(stockName);

    let people_data=await getPeople();
    let stocks_data=await getStocks();
    let big=0,value;
    let check_stock=false;

    for(let i=0;i<stocks_data.length;i++)
    {

        if(stocks_data[i].stock_name==stockName)
        {
            check_stock=true;

            let {shareholders}=stocks_data[i];

            for(let j=0;j<shareholders.length;j++)
            {
                if(shareholders[j].number_of_shares>big)
                {
                    big=shareholders[j].number_of_shares;
                    value=j;
                }
            }

        
            if(big>0)
            {
                for(let i=0;i<people_data.length;i++)
                {
                    if( shareholders[value].userId==people_data[i].id)
                    {
                       string=`With ${big} shares in ${stockName}, ${people_data[i].first_name +" "+ people_data[i].last_name} is the top shareholder.`;
                    }
                }
                  
            }
            else
            {
                string=`${stockName} currently has no shareholders.`
            }
        }
    }

    if(check_stock!=true)
    {
        throw 'No stock with that name'
    }

return string;
}





async function listStocks(firstName, lastName)
{
    firstName=String_check(firstName);
    lastName=String_check(lastName);

    let people_data=await getPeople();
    let stocks_data=await getStocks();
    let stock_info=[];
    let people_id;
    

    for(let i=0;i<people_data.length;i++)
    {
        if(people_data[i].first_name==firstName && people_data[i].last_name==lastName)
        {
            people_id=people_data[i].id;
        }

    }
    if(people_id!=null)
    {
       for(let i=0;i<stocks_data.length;i++)
        {
            let {shareholders}=stocks_data[i];

            for(let j=0;j<shareholders.length;j++)
            {
                if(people_id==shareholders[j].userId)
                {
                    let share={};
                    share.stock_name=stocks_data[i].stock_name
                    share.number_of_shares=shareholders[j].number_of_shares;
                    stock_info.push(share);
                }

            }
        }
    }
    else
    {
        throw `${firstName} ${lastName} is not in people.json`
    }
   if(stock_info.length>0)
{
    return stock_info;}
else
{
throw `${firstName} ${lastName} dosent have atleast one stock`;
}

}






async function getStockById(id)
{

    id=String_check(id);
    let stocks_data=await getStocks();
    let stock;
    
    for(let i=0;i<stocks_data.length;i++)
    {
        if(stocks_data[i].id==id)
        {
            stock= stocks_data[i];
        }

    }

    if(typeof stock=== 'object')
    {
        return stock;
    }
    else{
        throw 'stock not found'
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
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
};