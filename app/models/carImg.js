const cheerio = require("cheerio");
const axios = require("axios").default;
const _ = require('lodash');

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



    let img1 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(1) > p.gallery_thumb span.gallery_thumbIn > img[src$='.jpg']")
        .attr('src');

    let img2 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(2) > p.gallery_thumb span.gallery_thumbIn > img[src$='.jpg']")
        .attr("src");

    let img3 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(3) > p.gallery_thumb span.gallery_thumbIn > img[src$='.jpg']")
        .attr("src");



    saveToSQL(img1,img2,img3);


    let arr = [{img1,img2,img3}];


    function filterItems(arr, query) {
        return arr.filter(function(el) {
            return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
        })
    }


    let ress =  filterItems(arr, '.jpg');

    console.log(ress);

    return {
        img1,img2,img3
    }
};


function saveToSQL(img1,img2,img3){
    let sql = "INSERT INTO imgCar (`img1`,`img2`,`img3`) VALUES(?)";
    let values = [img1,img2,img3];

    db.query(sql, [values], function (err) {
        console.log('Inserted data into table.');
        if (err) throw err;
        // db.end()
    });


}





const scrapImg = async () => {
    const specUrl =
        "https://id.priceprice.com/Suzuki-Ignis-19115/foto-gambar/";


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