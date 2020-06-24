const cheerio = require("cheerio");
const axios = require("axios").default;
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cararena_be",
});




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


  saveToSQL(tipe, hargaOtr,createdAt);

  return {
    tipe,
    hargaOtr,
  };
};

function saveToSQL(tipe, hargaOtr, createdAt) {
  let sql = "INSERT INTO general (`type`, `hargaOtr`, `createdAt`) VALUES(?)";
  let values = [tipe, hargaOtr,createdAt];
  console.log(values)

  db.query(sql, [values], function (err) {
    console.log("Inserted data into table.");
    if (err) throw err;
    // db.end();
  });
}

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
 

const scrapGeneral = async () => {
    
    const specUrl = "https://id.priceprice.com/BMW-6-Series-7731/";


    const html = await fethHtml(specUrl);

    
   

    const selector = cheerio.load(html);
   


    const searchResults = selector("body")
        .find(".modelDtlWrap > .modelDtl");

    const generals = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return general(elementSelector);
        })
        .get();

    return generals;
};

module.exports = scrapGeneral;
