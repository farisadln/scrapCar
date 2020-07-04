const cheerio = require("cheerio");
const axios = require("axios").default;
const _ = require('lodash');
let db = require('../config/db')






const fethHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
    }
};

const carImg = selector => {



    let img1 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(1) > p.gallery_thumb span.gallery_thumbIn > img[src$='.jpg']")
        .attr('src');

    let img2 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(2) > p.gallery_thumb span.gallery_thumbIn > img[src$='.jpg']")
        .attr("src");

    let img3 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(3) > p.gallery_thumb span.gallery_thumbIn > img[src$='.jpg']")
        .attr("src");

      
        let createdAt = new Date();


    saveToSQL(img1,img2,img3,createdAt);


    let arr = [{img1,img2,img3}];





    return {
        img1,img2,img3
    }
};


function saveToSQL(img1,img2,img3,createdAt){
    let sql = "INSERT INTO imgCar (`img1`,`img2`,`img3`,`createdAt`) VALUES(?)";
    let values = [img1,img2,img3,createdAt];

    db.query(sql, [values], function (err) {
        console.log('Inserted data into table.');
        if (err) throw err;
        // db.end()
    });


}

let query = "SELECT urlImg FROM urlScrap ORDER BY id DESC LIMIT 1";
db.query(query, function (error, rows, fields) {
  if (error) {
    console.log(error);
  } else {
    let obj = Object.values(rows[0]);
    let array = obj;
    let hasil = array.toString();
    uriImg = hasil
    scrapImg(uriImg)

    return uriImg
    
  }
});





const scrapImg = async (uriImg) => {

    const specUrl = uriImg;


    const html = await fethHtml(specUrl);


    const selector = cheerio.load(html);

    const searchResults = selector("body")
        .find(".gallery.s-gallery");

    const imgs = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return carImg(elementSelector);
        })
        .get();

    return imgs;
};

module.exports = scrapImg;