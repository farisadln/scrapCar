const cheerio = require("cheerio");
const axios = require("axios").default;

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "rose",
  password: "",
  database: "cararena_be",
});

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

    let createdAt = new Date();
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
    createdAt
  );

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
  createdAt
) {
  let sql =
    "INSERT INTO specification (`kapasistasMesin`, `jmlSilinder`, `jmlKatup`, `drivetrain`, `maxTenaga`, `maxTorsi`, `jenisBahanBakar`, `kapasitasBahanBakar`, `banLebar`, `banAspekRasio`, `banDiameter`, `suspensiDepan`, `suspensiBelakang`, `tipeTransmisi`, `tipeGearBox`, `dimensiPanjang`, `dimanesiLebar`, `dimensiTinggi`, `dimensiSumbuRoda`, `dimensiGroundClearance`, `dimensiBerat`, `dimensiKargo`, `jmlPintu`, `jmlKuris`,`createdAt`) VALUES(?)";
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
    createdAt
  ];
  console.log(values)

  db.query(sql, [values], function (err) {
    console.log("Inserted data into table.");
    if (err) throw err;
  });
}

const scrapSpec = async () => {
  const specUrl = "https://id.priceprice.com/BMW-6-Series-7731/specs/";

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
