const cheerio = require("cheerio");
const axios = require("axios").default;

let db = require('../config/db')


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

const specCar = (selector) => {
  const kapasistasMesin = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(1) > td:last-child")
    .text()
    .trim();

  const jmlSilinder = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(2) > td:last-child")
    .text()
    .trim();

  const jmlKatup = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(3) > td:last-child")
    .text()
    .trim();

  const drivetrain = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(4) > td:last-child")
    .text()
    .trim();

  const maxTenaga = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(5) > td:last-child")
    .text()
    .trim();

  const maxTorsi = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(6) > td:last-child")
    .text()
    .trim();

  const jenisBahanBakar = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(7) > td:last-child")
    .text()
    .trim();

  const kapasitasBahanBakar = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(8) > td:last-child")
    .text()
    .trim();

  const banLebar = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(9) > td:last-child")
    .text()
    .trim();

  const banAspekRasio = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(10) > td:last-child")
    .text()
    .trim();

  const banDiameter = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(11) > td:last-child")
    .text()
    .trim();

  const suspensiDepan = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(12) > td:last-child")
    .text()
    .trim();

  const suspensiBelakang = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(13) > td:last-child")
    .text()
    .trim();

  const tipeTransmisi = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(14) > td:last-child")
    .text()
    .trim();

  const tipeGearBox = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(15) > td:last-child")
    .text()
    .trim();

  const dimensiPanjang = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(16) > td:last-child")
    .text()
    .trim();

  const dimanesiLebar = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(17) > td:last-child")
    .text()
    .trim();

  const dimensiTinggi = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(18) > td:last-child")
    .text()
    .trim();

  const dimensiSumbuRoda = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(19) > td:last-child")
    .text()
    .trim();

  const dimensiGroundClearance = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(20) > td:last-child")
    .text()
    .trim();

  const dimensiBerat = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(21) > td:last-child")
    .text()
    .trim();

  const dimensiKargo = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(22) > td:last-child")
    .text()
    .trim();

  const jmlPintu = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(23) > td:last-child")
    .text()
    .trim();

  const jmlKuris = selector
    .find("tbody")
    .find("tr[class='specTbl_tls']:nth-child(24) > td:last-child")
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
      saveToSQL(
        kapasistasMesin,
        jmlSilinder,
        jmlKatup,
        drivetrain,
        maxTenaga,
        maxTorsi,
        jenisBahanBakar,
        kapasitasBahanBakar,
        banLebar,
        banAspekRasio,
        banDiameter,
        suspensiDepan,
        suspensiBelakang,
        tipeTransmisi,
        tipeGearBox,
        dimensiPanjang,
        dimanesiLebar,
        dimensiTinggi,
        dimensiSumbuRoda,
        dimensiGroundClearance,
        dimensiBerat,
        dimensiKargo,
        jmlPintu,
        jmlKuris,
        generalId,
        createdAt
      );
      console.log("specId "+ generalId)
    }

  })



    let createdAt = new Date();
  

  return {
    kapasistasMesin,
    jmlSilinder,
    jmlKatup,
    drivetrain,
    maxTenaga,
    maxTorsi,
    jenisBahanBakar,
    kapasitasBahanBakar,
    banLebar,
    banAspekRasio,
    banDiameter,
    suspensiDepan,
    suspensiBelakang,
    tipeTransmisi,
    tipeGearBox,
    dimensiPanjang,
    dimanesiLebar,
    dimensiTinggi,
    dimensiSumbuRoda,
    dimensiGroundClearance,
    dimensiBerat,
    dimensiKargo,
    jmlPintu,
    jmlKuris,
  };
};


function saveToSQL(
  kapasistasMesin,
  jmlSilinder,
  jmlKatup,
  drivetrain,
  maxTenaga,
  maxTorsi,
  jenisBahanBakar,
  kapasitasBahanBakar,
  banLebar,
  banAspekRasio,
  banDiameter,
  suspensiDepan,
  suspensiBelakang,
  tipeTransmisi,
  tipeGearBox,
  dimensiPanjang,
  dimanesiLebar,
  dimensiTinggi,
  dimensiSumbuRoda,
  dimensiGroundClearance,
  dimensiBerat,
  dimensiKargo,
  jmlPintu,
  jmlKuris,
  generalId,
  createdAt
) {
  let sql =
    "INSERT INTO specification (`kapasistasMesin`, `jmlSilinder`, `jmlKatup`, `drivetrain`, `maxTenaga`, `maxTorsi`, `jenisBahanBakar`, `kapasitasBahanBakar`, `banLebar`, `banAspekRasio`, `banDiameter`, `suspensiDepan`, `suspensiBelakang`, `tipeTransmisi`, `tipeGearBox`, `dimensiPanjang`, `dimanesiLebar`, `dimensiTinggi`, `dimensiSumbuRoda`, `dimensiGroundClearance`, `dimensiBerat`, `dimensiKargo`, `jmlPintu`, `jmlKuris`,`generalId`,`createdAt`) VALUES(?)";
  let values = [
    kapasistasMesin,
    jmlSilinder,
    jmlKatup,
    drivetrain,
    maxTenaga,
    maxTorsi,
    jenisBahanBakar,
    kapasitasBahanBakar,
    banLebar,
    banAspekRasio,
    banDiameter,
    suspensiDepan,
    suspensiBelakang,
    tipeTransmisi,
    tipeGearBox,
    dimensiPanjang,
    dimanesiLebar,
    dimensiTinggi,
    dimensiSumbuRoda,
    dimensiGroundClearance,
    dimensiBerat,
    dimensiKargo,
    jmlPintu,
    jmlKuris,
    generalId,
    createdAt
  ];
  console.log(values)

  db.query(sql, [values], function (err) {
    console.log("Inserted data into table.");
    if (err) throw err;
  });
}

let query = "SELECT urlSpecification FROM urlScrap ORDER BY id DESC LIMIT 1";
db.query(query, function (error, rows, fields) {
  if (error) {
    console.log(error);
  } else {
    let obj = Object.values(rows[0]);
    let array = obj;
    let hasil = array.toString();
    uriSpec = hasil
    scrapSpec(uriSpec)

    return uriSpec
    
  }
});

const scrapSpec = async (uriSpec) => {

  console.log(uriSpec)

  const specUrl = uriSpec;

  const html = await fethHtml(specUrl);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    ".spec > .spec_clip > table[class='specTbl']"
  );

  const specs = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return specCar(elementSelector);
    })
    .get();

  return specs;
};

module.exports = scrapSpec;
