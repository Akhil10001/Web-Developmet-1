const pepole = require("./people");
const stocks = require("./stocks");

async function main() {
  try {
    console.log("getPersonById");
    console.log(
      await pepole.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10")
    );
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("sameStreet");
    console.log(await pepole.sameStreet("SuthErland", "Point"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("manipulateSsn");
    console.log(await pepole.manipulateSsn());
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("sameBirthday");
    console.log(await pepole.sameBirthday("012", "08"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("listShareholders");
    console.dir(await stocks.listShareholders(), { depth: null });
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("topShareholder");
    console.log(await stocks.topShareholder("Cathay General Bancorp"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("listStocks");
    console.log(await stocks.listStocks("Grenville    ", "Pawelke"));
  } catch (error) {
    console.log(error);
  }

  try {
    console.log("getStockById");
    console.log(
      await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0")
    );
  } catch (error) {
    console.log(error);
  }
}

main();

