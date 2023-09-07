import axios from "axios";

// const PRODUCT_BASE_API_URL = "https://springbootdeploy-production.up.railway.app/api/v1";
const PRODUCT_BASE_API_URL = "http://localhost:8080/api/v1";


class ProductService {
  getAllProducts(pageNumber) {
    return axios.get(PRODUCT_BASE_API_URL + "/getProducts/" + pageNumber);
  }

  createProduct(product) {
    return axios.post(PRODUCT_BASE_API_URL + "/addProduct", product);
  }

  updateProduct(product, id) {
    return axios.put(PRODUCT_BASE_API_URL + "/updateProduct/" + id, product);
  }

  getProductById(productId) {
    return axios.get(PRODUCT_BASE_API_URL + "/getProduct/" + productId);
  }

  getAllBrands() {
    return axios.get(PRODUCT_BASE_API_URL + "/brands");
  }

  getAllSubcategory() {
    return axios.get(PRODUCT_BASE_API_URL + "/getAllSub");
  }

  getAllStatusType() {
    return axios.get(PRODUCT_BASE_API_URL + "/status");
  }

  deleteProductById(productId) {
    return axios.delete(PRODUCT_BASE_API_URL + "/deleteProduct/" + productId);
  }

  getTotalPages() {
    return axios.get(PRODUCT_BASE_API_URL + "/totalPage");
  }

  getAllCategory(){
    return axios.get(PRODUCT_BASE_API_URL + "/category");
  }

  getListProductSearch(searchData){
    return axios.post(PRODUCT_BASE_API_URL + "/search", searchData);
  }

}

const service = new ProductService();

export default service;
