const ProductDao = require("./ProductDao");
// const ProductDao=require("./Dao")
const Product = require("./Model/Product");

let getProducts = async () => {
  return await ProductDao.getProductsFromDB();
};

let getProductById = async (id) => {
  return await ProductDao.getProductsFromDB(id);
};

let getProductByName= async (name) => {
    return await ProductDao.getProductsFromDbName(name);
  };
  

let addProduct = async (input) => {
  let {
    name,
    small_description,
    long_description,
    icon_url,
    visit_url,
    created_on,
    created_by,
    updated_on,
    updated_by,
  } = input; //destructuring input json
  const productObject = new Product(
    name,
    small_description,
    long_description,
    icon_url,
    visit_url,
    created_on,
    created_by,
    updated_on,
    updated_by
  );
  console.log(productObject);
  let count = await ProductDao.validateName(input);
  if (count) return { err: "duplicate entry" };
  console.log("no err");
  let result=await ProductDao.addProductToDb(productObject);
  return result;
  
  // return await ProductDAO.addProductToDB(productInput);
};

let deleteProductByName = async(name) => {
  let count =  ProductDao.validateName(name);
    // console.log(count);
  if (count){
    // console.log(count);
    return "Product does not exists";
  } else {
    let result=await ProductDao.deleteProductsFromDB(name);
    return result;
  }
};

let updateProductById = async (id) => {
  return await ProductDao.updateProductInDB(id);

};

// console.log(getProducts);
module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProductByName,
  updateProductById,
  getProductByName
};

