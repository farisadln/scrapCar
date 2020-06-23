const cheerio = require("cheerio");
const axios = require("axios").default;
const mysql = require('mysql');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'scrap'
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


    saveToSQL(name,review)

    return {
        name,
        review,

    };
};

function saveToSQL(name,review){
    let sql = "INSERT INTO review (`name`,`review`) VALUES(?)";
    let values = [name,review];

    db.query(sql, [values], function (err) {
        console.log('Inserted data into table.');
        if (err) throw err;
        // db.end()
    });


}


const scrapImg = async () => {
    const specUrl =
        "https://id.priceprice.com/Suzuki-Ignis-19115/reviews/";

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