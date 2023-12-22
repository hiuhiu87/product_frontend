import React, {useState} from "react";
import {useParams, useNavigate, NavigateFunction} from "react-router-dom";
import {useEffect} from "react";
import service from "../service/productService";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import validator from "validator";
import LoadingSpinner from "./LoadingComponent";
import {IModifyProduct} from "../models/IModifyProduct";
import {IBrand} from "../models/IBrand";
import {ISubcategory} from "../models/ISubcategory";
import {IStatus} from "../models/IStatus";

interface IMesssage {
    productName?: string;
    color?: string;
    quantity?: string;
    sellPrice?: string;
    originPrice?: string;
}

const ModifyComponent = () => {
    const [optionBrands, setOptionBrands] = useState<Array<IBrand>>([]);
    const [optionSubCates, setOptionSubCates] = useState<Array<ISubcategory>>([]);
    const [optionStatus, setOptionStatus] = useState<Array<IStatus>>([]);
    const [product, setProduct] = useState<IModifyProduct>({
        productName: "",
        color: "",
        quantity: 0,
        sellPrice: 0,
        originPrice: 0,
        brandId: 1,
        subCateId: 1,
        description: "",
        statusId: 1,
    });
    const navigation: NavigateFunction = useNavigate();
    const {id} = useParams();
    const [validateMsg, setValidateMsg] = useState<IMesssage>({});
    const url = window.location.href;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateField = () => {
        const message: IMesssage = {};
        if (validator.isEmpty(product?.productName.trim() as string)) {
            message.productName = "Please enter a product name";
        }

        if (validator.isEmpty(product?.color.trim() as string)) {
            message.color = "Please enter color";
        }

        if (product?.quantity === undefined || product.quantity === 0) {
            message.quantity = "Please enter quantity";
        } else if (!validator.isInt(product.quantity + "")) {
            message.quantity = "Quantity is a integer";
        }

        if (product?.sellPrice === undefined || product.sellPrice === 0) {
            message.sellPrice = "Please enter sell price";
        } else if (!validator.isFloat(product.sellPrice + "")) {
            message.sellPrice = "Sell Price is a float";
        }

        if (product?.originPrice === undefined || product.originPrice === 0) {
            message.originPrice = "Please enter origin price";
        } else if (!validator.isFloat(product.originPrice + "")) {
            message.originPrice = "Origin price is a float";
        }
        setValidateMsg(message);
        return Object.keys(message).length <= 0;
    };

    const showAlertWarning = (title: string, message: string): void => {
        Swal.fire({
            title: title,
            text: message,
            icon: "warning",
            confirmButtonText: "OK",
        }).then(r => {
            if (r.isConfirmed) {
                navigation("/product_frontend");
            }
        });
    };

    const showAlertSuccess = (title: string, message: string): void => {
        Swal.fire({
            title: title,
            text: message,
            icon: "info",
            confirmButtonText: "OK",
        }).then(r => {
            if (r.isConfirmed) {
                navigation("/product_frontend");
            }
        });
    };


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct!,
            [name]: value!,
        }));
    };


    const saveOrUpdate = () => {
        console.log(product);
        if (id) {
            setIsLoading(true);
            service
                .updateProduct(product, id)
                .then((response) => {
                    setIsLoading(false);
                    showAlertSuccess("Thông báo", response.data);
                    navigation("/product_frontend");
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            service
                .createProduct(product)
                .then((response) => {

                    setIsLoading(true);
                    showAlertSuccess("Thông Báo", response.data);
                    setIsLoading(false);
                    navigation("/product_frontend");
                })
                .catch((error) => {
                    console.log(error);
                    showAlertWarning("Lỗi", "Không Thêm Được Sản Phẩm");
                });
        }
    };

    useEffect(() => {
        if (id || id !== undefined) {
            setIsLoading(true);
            service
                .getProductById(id)
                .then((response) => {
                    console.log(response.data);
                    setProduct(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    useEffect(() => {
        service.getAllBrands().then((response) => {
            setOptionBrands(response.data);
        });
        service.getAllSubcategory().then((response) => {
            setOptionSubCates(response.data);
        });
        service.getAllStatusType().then((response) => {
            setOptionStatus(response.data);
        });
    }, []);

    const title = () => {
        if (url.includes("detail-product") && id) {
            return <h2 className="text-center mt-2">Detail Product</h2>;
        } else if (id) {
            return <h2 className="text-center mt-2">Update Product</h2>;
        } else {
            return <h2 className="text-center mt-2">Add Product</h2>;
        }
    };

    const updateStatusProduct = () => {
        if (id) {
            return (
                <div className="form-group mb-2">
                    <label className="form-label">Trạng Thái </label>
                    <select
                        className="form-select"
                        name="statusId"
                        onChange={(e) => handleOnChange(e)}
                        value={product?.statusId}
                    >
                        {optionStatus.map((opt: IStatus) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.statusName}
                            </option>
                        ))}
                    </select>
                </div>
            );
        }
    };

    const buttonSaveChanges = () => {
        if (!url.includes("detail-product")) {
            return (
                <button
                    className="btn btn-success"
                    onClick={(e) => {
                        e.preventDefault();
                        const isValid = validateField();
                        if (!isValid) return;
                        Swal.fire({
                            title: "Xác Nhận",
                            text: "Bạn có chắc chắn muốn lưu lại thay đổi không ?",
                            showCancelButton: true,
                            showConfirmButton: true,
                        }).then((result) => {
                            if (result["isConfirmed"]) {
                                saveOrUpdate();
                            }
                        });
                    }}
                >
                    Save Changes
                </button>
            );
        }
    };

    const renderForm = () => {
        return (
            <div className="container" style={{height: "900px"}}>
                <div className="row mh-75">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {title()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">Name </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        name="productName"
                                        className="form-control"
                                        value={product?.productName || ""}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <span className="text-danger fs-6">
                                        {validateMsg.productName}
                                    </span>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Color </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Color"
                                        name="color"
                                        className="form-control"
                                        value={product?.color || ""}
                                        onChange={(e) => handleOnChange(e)}
                                    ></input>
                                    <span className="text-danger">{validateMsg.color}</span>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Quantity </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Quantity"
                                        name="quantity"
                                        className="form-control"
                                        value={product?.quantity || ""}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    <span className="text-danger">{validateMsg.quantity}</span>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Sell Price </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Sell Price"
                                        name="sellPrice"
                                        className="form-control"
                                        value={product?.sellPrice || ""}
                                        onChange={(e) => handleOnChange(e)}
                                    ></input>
                                    <span className="text-danger">{validateMsg.sellPrice}</span>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Origin Price </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Sell Price"
                                        name="originPrice"
                                        className="form-control"
                                        value={product?.originPrice || ""}
                                        onChange={(e) => handleOnChange(e)}
                                    ></input>
                                    <span className="text-danger">{validateMsg.originPrice}</span>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Brand Name </label>
                                    <select
                                        className="form-select"
                                        name="brandId"
                                        onChange={(e) => handleOnChange(e)}
                                        value={product?.brandId}
                                    >
                                        {optionBrands.map((option) => (
                                            <option key={option.id} value={option.id}>
                                                {option.brandName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Subcategory </label>
                                    <select
                                        className="form-select"
                                        name="subCateId"
                                        onChange={(e) => handleOnChange(e)}
                                        value={product?.subCateId}
                                    >
                                        {optionSubCates.map((optionSub) => (
                                            <option key={optionSub.id} value={optionSub.id}>
                                                {optionSub.subCateName}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mb-2">
                                    <label className="form-label">Description </label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        value={product?.description || ""}
                                        onChange={(e) => handleOnChange(e)}
                                    ></textarea>
                                </div>
                                {updateStatusProduct()}
                                <div className="d-flex flex-row justify-content-end">
                                    {buttonSaveChanges()}
                                    <Link
                                        to="/product_frontend"
                                        className="btn  px-2"
                                        style={{
                                            marginLeft: "10px",
                                            color: "white",
                                            backgroundColor: "gray",
                                        }}
                                    >
                                        Close
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    console.log(product)
    return (
        <div>
            <br/>
            <br/>
            {isLoading ? <LoadingSpinner/> : renderForm()}
        </div>
    );
};

export default ModifyComponent;
