import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../service/ProductService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import validator from 'validator';

const AddUpdateComponent = () => {
  const [productName, setProductName] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [originPrice, setOriginPrice] = useState(0);
  const [brandId, setBrandId] = useState(1);
  const [optionBrands, setOptionBrands] = useState([]);
  const [optionSubCate, setOptionSubCate] = useState([]);
  const [optionStatus, setOptionStatus] = useState([]);
  const [subCateId, setSubCateId] = useState(1);
  const [statusId, setStatusId] = useState(1);
  const [description, setDescription] = useState("");
  const navigation = useNavigate();
  const { id } = useParams();
  const [validateMsg, setValidateMsg] = useState({});

  const validateField = () => {
    const message = {};
    if (validator.isEmpty(productName)) {
      message.productName = "Please enter a product name";
    }

    if (validator.isEmpty(color)) {
      message.color = "Please enter color";
    }

    if (validator.isEmpty(quantity + '') || quantity === 0) {
      message.quantity = "Please enter quantity";
    }

    if (validator.isEmpty(sellPrice + '') || sellPrice === 0) {
      message.sellPrice = "Please enter sell price";
    }

    if (validator.isEmpty(originPrice + '') || originPrice === 0) {
      message.originPrice = "Please enter origin price";
    }

    setValidateMsg(message);
    if (Object.keys(message).length > 0) return false;
    return true;
  };

  const showAlertWarning = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      confirmButtonText: "OK",
    });
  };

  const showAlertSuccess = (title, message) => {
    Swal.fire({
      title: title,
      text: message,
      icon: "info",
      confirmButtonText: "OK",
    });
  };

  const saveOrUpdate = (e) => {
    const product = {
      productName,
      color,
      quantity,
      sellPrice,
      originPrice,
      brandId,
      subCateId,
      description,
      statusId,
    };
    console.log(product);
    if (id) {
      service
        .updateProduct(product, id)
        .then((response) => {
          navigation("/products");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      service
        .createProduct(product)
        .then((response) => {
          showAlertSuccess("Thông Báo", response.data);
          navigation("/products");
        })
        .catch((error) => {
          showAlertWarning("Lỗi", "Không Thêm Được Sản Phẩm");
        });
    }
  };

  useEffect(() => {
    service
      .getProductById(id)
      .then((response) => {
        console.log(response.data);
        setProductName(response.data.productName);
        setColor(response.data.color);
        setQuantity(response.data.quantity);
        setSellPrice(response.data.sellPrice);
        setOriginPrice(response.data.originPrice);
        setBrandId(response.data.brandId);
        setSubCateId(response.data.subCateId);
        setDescription(response.data.description);
        setStatusId(response.data.statusId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    service.getAllBrands().then((response) => {
      setOptionBrands(response.data);
    });
    service.getAllSubcategory().then((response) => {
      setOptionSubCate(response.data);
    });
    service.getAllStatusType().then((response) => {
      setOptionStatus(response.data);
    });
  }, []);

  const title = () => {
    if (id) {
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
            name="form-control"
            id="sub-category"
            onChange={(e) => setStatusId(e.target.value)}
            value={statusId}
          >
            {optionStatus.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.statusName}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
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
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  ></input>
                  <span className="text-danger fs-6">{validateMsg.productName}</span>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Color </label>
                  <input
                    type="text"
                    placeholder="Enter Color"
                    name="color"
                    className="form-control"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
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
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                  <span className="text-danger">{validateMsg.quantity}</span>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Sell Price </label>
                  <input
                    type="text"
                    placeholder="Enter Sell Price"
                    name="sell-price"
                    className="form-control"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                  ></input>
                  <span className="text-danger">{validateMsg.sellPrice}</span>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Origin Price </label>
                  <input
                    type="text"
                    placeholder="Enter Sell Price"
                    name="sell-price"
                    className="form-control"
                    value={originPrice}
                    onChange={(e) => setOriginPrice(e.target.value)}
                  ></input>
                  <span className="text-danger">{validateMsg.originPrice}</span>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Brand Name </label>
                  <select
                    className="form-select"
                    name="form-control"
                    id="brandList"
                    onChange={(e) => setBrandId(e.target.value)}
                    value={brandId}
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
                    name="form-control"
                    id="sub-category"
                    onChange={(e) => setSubCateId(e.target.value)}
                    value={subCateId}
                  >
                    {optionSubCate.map((optionSub) => (
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                {updateStatusProduct()}
                <div className="d-flex flex-row justify-content-end">
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
                          saveOrUpdate(e);
                        }
                      });
                    }}
                  >
                    Submit
                  </button>

                  <Link
                    to="/products"
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
    </div>
  );
};

export default AddUpdateComponent;
