import {ISearchProduct} from "../models/ISearchProduct";
import {IModifyProduct} from "../models/IModifyProduct";
import instance from "../redux/api/axiosCustomize";

const PRODUCT_BASE_API_URL = "/api/v1";


class ProductService {
    getAllProducts(pageNumber: number) {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/products/" + pageNumber,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getAllProductsSearch() {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/products",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    createProduct(product: IModifyProduct | undefined) {
        return instance({
            method: "POST",
            url: PRODUCT_BASE_API_URL + "/add-product",
            data: product,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    updateProduct(product: IModifyProduct | undefined, id: string) {
        return instance({
            method: "PUT",
            url: PRODUCT_BASE_API_URL + "/update-product/" + id,
            data: product,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getProductById(productId: string) {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/product/" + productId,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getAllBrands() {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/brands",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getAllSubcategory() {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/subcategorys",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getAllStatusType() {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/status",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    deleteProductById(productId: number) {
        return instance({
            method: "DELETE",
            url: PRODUCT_BASE_API_URL + "/delete-product/" + productId,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getTotalPages() {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/total-pages",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getAllCategory() {
        return instance({
            method: "GET",
            url: PRODUCT_BASE_API_URL + "/categorys",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

    getListProductSearch(searchData: ISearchProduct) {
        return instance({
            method: "POST",
            url: PRODUCT_BASE_API_URL + "/search",
            data: searchData,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
    }

}

const service: ProductService = new ProductService();

export default service;
