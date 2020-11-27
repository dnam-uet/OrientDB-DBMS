var fs = require("fs");
var data = JSON.parse(fs.readFileSync("db.json", { encoding: "utf-8" }));
const OrientDBClient = require("orientjs").OrientDBClient;
(async function () {
  let client;
  try {
    client = await OrientDBClient.connect({ host: "localhost" });
    console.log("Connected");
  } catch (e) {
    console.log(e);
  }

  if (client) {
    var session = await client.session({
      name: "Demo",
      username: "root",
      password: "25072707",
    });
    // use the session
    var i = 1;
    let startTime = new Date();
    let count = 1;
    for(let i=1; i<=10000; i++){
      let query = "INSERT INTO Customer(id, first_name, last_name, city_id) VALUES";
      for(let j=1;j<=1000;j++){
        let customer = data[i*j % 100];
        query = query + `(${count}, ${customer.first_name}, ${customer.last_name}, ${customer.city_id}),`
        count ++;
      }
      let mainQuery = query.slice(0,query.length-1);
      await session.command(mainQuery).all();
    }
    let endTime = new Date();
    console.log(`Insert successfully in ${(endTime - startTime)/1000}s`);
    // close the session
    await session.close();
  }
})();