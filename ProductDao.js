const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const util = require("util");
const product = require("./Model/Product");
const { addProduct } = require("./ProductService");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "vaibhavdb",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Succesfully connected to database");
});

const query = util.promisify(connection.query).bind(connection);

let getProductsFromDB = async (id) => {
  let getQuery = "SELECT * FROM product";
  getQuery = id ? getQuery + ` where id = "${id}";`: getQuery;
  let getQueryResult = await query(getQuery);
  return getQueryResult;
};

let getProductsFromDbName = async (name) => {
    let getQuery = "SELECT * FROM product";
    getQuery = name ? getQuery + " where name= " + name : getQuery;
    let getQueryResult = await query(getQuery);
    return getQueryResult;
  };

let insideValidateEntry = async (productName) => {
  // console.log(productName);
  let sqlQuery = `(SELECT COUNT(name) as count FROM product WHERE name = "${productName}");`;
  // let sqlQuery = `SELECT name FROM product WHERE EXISTS ( SELECT name FROM product WHERE name = "${productName}") `;
  console.log(sqlQuery);
  let result = await query(sqlQuery);
  console.log(result);
  return result[0].count;
};

let validateName = async (input) => {
  // console.log(typeof(input));
  if (typeof input === "object") {
    let productName = input.name;
    let result = await insideValidateEntry(productName);
    // console.log(result);
    return result;
  } else if (typeof input === "string") {
    let productName = input;
    console.log(productName);
    let result = await insideValidateEntry(productName);
    console.log(result);
    return result;
  }
};

let addProductToDb = async (input) => {
  // console.log(input);
  const userId = uuidv4();
  let columnQuery = "id,";
  let valueQuery = `"${userId}",`;

  //   for (let key in input) {
  //     columnQuery += `${key},`;
  //     let value = input[key];
  //     valueQuery += `"${value}",`;
  //   }

  //   let coloumnQueryupdated = columnQuery.substring(0, columnQuery.length - 1);
  //   let valueQueryUpdated = valueQuery.substring(0, valueQuery.columnQuery += `name, small_desp, long_desp, logo, url, created_on, created_by, updated_on, updated_by`;

  columnQuery =
    columnQuery +
    `name, small_description, long_description, icon_url,visit_url, created_on, created_by, updated_on, updated_by`;
  valueQuery =
    valueQuery +
    `"${input["name"]}","${input["small_description"]}","${input["long_description"]}","${input["icon_url"]}","${input["visit_url"]}","${input["created_on"]}","${input["created_by"]}","${input["updated_on"]}", "${input["updated_by"]}"`;

  // let defaultSqlQuery = "Select * from product";
  let AddProductQuery = `INSERT INTO PRODUCT (${columnQuery}) VALUES(${valueQuery})`;
  // console.log(AddProductQuery);
  // let result = await query(AddProductQuery);
  // console.log(result);
  // return result;
  let result = await query(AddProductQuery);
  // let addedProductId = result.insertId;
  // console.log(result);
  // // console.log(insertId);
  // console.log(addedProductId);
  // let getProductQuery = `SELECT * FROM product WHERE id = ${addedProductId}`;
  // let addedProduct = await query(getProductQuery);
  // return addedProduct[0];
  // let result = await query(AddProductQuery);
 result= await getProductsFromDB(userId)
 console.log(result[0]);
  return result[0];  
};

let deleteProductsFromDB = async (name) => {
  // let sqlQuery1 = "SELECT * FROM product";
  let sqlQuery = "DELETE FROM product";
  sqlQuery = sqlQuery + ` WHERE name = ${name}; `;
  console.log(sqlQuery);
  let result = await query(sqlQuery);
  console.log(result);
 
  // console.log("query is running",result);
  return result;
};

module.exports = {
  getProductsFromDB,
  addProductToDb,
  deleteProductsFromDB,
  validateName,
  getProductsFromDbName
};
