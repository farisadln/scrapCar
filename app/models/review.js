const cheerio = require("cheerio");
const axios = require("axios").default;
const mysql = require('mysql');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'rose',
    password : '',
    database : 'cararena_be'
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