const cheerio = require("cheerio");
const axios = require("axios").default;
let db = require('../config/db')



const fethHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
    }
};

const review = selector => {

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


        
  let sql = "SELECT id FROM general ORDER BY id DESC LIMIT 1"
  db.query(sql, function (error, rows, fields) {
    var glob = "0"
    if (error) {
      console.log(error);
    } else {
      let obj = Object.values(rows[0]);
      let array = obj;
      let hasil = array.toString();
      generalId = hasil
      generalId = 1 + parseInt(generalId)
      saveToSQL(name,review,generalId,createdAt)
      console.log("reviewId "+ generalId)
    }

  })

    let createdAt = new Date();
    console.log(createdAt)
    

    return {
        name,
        review,

    };
};



function saveToSQL(name,review,generalId,createdAt){
    let sql = "INSERT INTO review (`name`,`review`,`generalId`,`createdAt`) VALUES(?)";
    let values = [name,review,generalId,createdAt];
    console.log(values)

    db.query(sql, [values], function (err) {
        console.log('Inserted data into table.');
        if (err) throw err;
        // db.end()
    });


}

let query = "SELECT urlReview FROM urlScrap ORDER BY id DESC LIMIT 1";
db.query(query, function (error, rows, fields) {
  if (error) {
    console.log(error);
  } else {
    let obj = Object.values(rows[0]);
    let array = obj;
    let hasil = array.toString();
    uriReview = hasil
    let urls = hasil.split(';');
      for(let i=0;i < urls.length;i++){
        uriReview = urls[i];
        console.log("uriGeneral" + uriReview)
        scrapReview(uriReview)
      }
    

    return uriReview
    
  }
});



const scrapReview = async (uriReview) => {
    const specUrl = uriReview;

    const html = await fethHtml(specUrl);

    const selector = cheerio.load(html);

    const searchResults = selector("body")
        .find(".reviewDtlList");

    const reviews = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return review(elementSelector);
        })
        .get();

    return reviews;
};

module.exports = scrapReview;