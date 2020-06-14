const cheerio = require("cheerio");
const axios = require("axios").default;
const _ = require('lodash');





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
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(1) span.gallery_thumbIn > img[src$='.jpg']")
        .attr('src');

    let img2 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(2) span.gallery_thumbIn > img")
        .attr("src");

    let img3 = selector
        .find("li.gallery_thumbItem.s-gallery_thumbItem:nth-child(3) span.gallery_thumbIn > img")
        .attr("src");
    console.log(img1)
return img1
};






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