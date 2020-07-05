const cheerio = require("cheerio");
const axios = require("axios").default;
let db = require('../config/db')


const general = (selector) => {
  const tipe = selector
    .find("h2")
    .find("h2[class='ivTl'] > span[class='ivTl_name']")
    .text()
    .trim();



  const hargaOtr = selector
    .find("p")
    .find("p[class='modelDtl_price'] > span[class='modelDtl_priceLow']")
    .text()
    .trim();

  let createdAt = new Date();

  

  const brand = tipe.split(' ')[0]
  console.log("brand"+ brand)
 
  
  let sql = "SELECT id FROM brand WHERE carBrand = " + db.escape(brand) + ""

  db.query(sql, function (error, rows, fields) {
    var glob = "0"
    if (error) {
      console.log(error);
    } else {
      let obj = Object.values(rows[0]);
      let array = obj;
      let hasil = array.toString();
      brandid = hasil
      saveToSQL(tipe, hargaOtr, createdAt,brandid);
    }

    
    console.log("getting glob"+glob)
   
  })



  

  

  return {
    tipe,
    hargaOtr,
  };
};

const fethHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};


function saveToSQL(tipe, hargaOtr, createdAt,brandid) {
  
  let sql = "INSERT INTO general (`type`, `hargaOtr`, `createdAt`, `brandId`) VALUES(?)";
  let values = [tipe, hargaOtr, createdAt,brandid];
  console.log(values);

  db.query(sql, [values], function (err) {
    console.log("Inserted data into table.");
    if (err) throw err;
    // db.end();
   
  });
}


  let query = "SELECT urlGeneral FROM urlScrap ORDER BY id DESC LIMIT 1";
  db.query(query, function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      let obj = Object.values(rows[0]);
      let array = obj;
      let hasil = array.toString();
      uriGeneral = hasil
      scrapGeneral(uriGeneral)

      return uriGeneral
      
    }
  });



const scrapGeneral = async (uriGeneral) => {
  console.log(uriGeneral);
  const specUrl = uriGeneral;

  const html = await fethHtml(specUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(".modelDtlWrap > .modelDtl");

  const generals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return general(elementSelector);
    })
    .get();

  return generals;
};

module.exports = scrapGeneral;
