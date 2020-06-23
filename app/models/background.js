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

const background = selector => {
    const url_img1 = selector
        .find("li.linkItem:nth-child(1) > div.newsSum.s-newsSum > div.newsSum_thumb > img")
        .attr('src');

    const url_img2 = selector
        .find("li.linkItem:nth-child(2) > div.newsSum.s-newsSum > div.newsSum_thumb > img")
        .attr('src');

    const url_img3 = selector
        .find("li.linkItem:nth-child(3) > div.newsSum.s-newsSum > div.newsSum_thumb > img")
        .attr('src');


    saveToSQL(url_img1, url_img2, url_img3);


    return {
        url_img1,url_img2,url_img3
    };
};

function saveToSQL( url_img1,
                    url_img2,
                    url_img3){
    let sql = "INSERT INTO background (`url_img1`,`url_img2`,`url_img3`) VALUES(?)";
    let values = [ url_img1, url_img2, url_img3];

    db.query(sql, [values], function (err) {
        console.log('Inserted data into table.');
        if (err) throw err;
        // db.end()
    });

}

const scrapBackground = async () => {
    const specUrl =
        "https://id.priceprice.com/mobil/";

    const html = await fethHtml(specUrl);

    const selector = cheerio.load(html);

    const searchResults = selector("body")
        .find(".modal_bgClip");

    const backgrounds = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return background(elementSelector);
        })
        .get();

    return backgrounds;
};

module.exports = scrapBackground;