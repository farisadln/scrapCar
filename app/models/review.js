const cheerio = require("cheerio");
const axios = require("axios").default;
const mysql = require('mysql');
var _ = require('lodash');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'arenaScrap'
});




const fethHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
    }
};

const carImg = selector => {

    const name = selector
        .find("li[class='reviewDtlList_item base']:nth-child(1) > div[class='reviewDtl'] " +
            "> div[class='reviewDtl_cont'] " +
            "> p[class='reviewDtl_userInfo'] span.reviewDtl_contName")
        .text()
        .trim();

    const review = selector
        .find("li[class='reviewDtlList_item base']:nth-child(1) > div[class='reviewDtl'] " +
            "> div[class='reviewDtl_cont'] " +
            "> p[class='reviewDtl_txt']")
        .text()
        .trim();

    let createdAt = new Date();

    saveToSQL(name,review,createdAt)

    return {
        name,
        review,

    };
};

db.connect(function(err) 
{
  if (err) throw err;
    db.query("SELECT `url` FROM `url`", function (err, result, fields) 
    {
      if (err) throw err;
      var length = Object.keys(result).length;
     
      for (var i = 0; i < length; i++) 
      {
        

   let ress =  result[i]
   let arr = Object.values(ress)
 
   
      console.log(ress)

      };

    });

});



function saveToSQL(name,review,createdAt){
    let sql = "INSERT INTO review (`name`,`review`,`createdAt`) VALUES(?)";
    let values = [name,review,createdAt];
    console.log(values)

    db.query(sql, [values], function (err) {
        console.log('Inserted data into table.');
        if (err) throw err;
        // db.end()
    });


}


const scrapImg = async () => {
    const specUrl =
        "https://id.priceprice.com/BMW-6-Series-7731/reviews/";

    const html = await fethHtml(specUrl);

    const selector = cheerio.load(html);

    const searchResults = selector("body")
        .find(".reviewDtlList");

    const reviews = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return carImg(elementSelector);
        })
        .get();

    return reviews;
};

module.exports = scrapImg;