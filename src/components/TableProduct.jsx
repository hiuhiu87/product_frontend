import React from "react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import service from "../service/ProductService";
import Swal from "sweetalert2";
import DataTable from "react-data-table-component";
import SearchForm from "./SearchFormComponent";
import { useParams } from "react-router-dom";

const TableProduct = () => {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const {searchData} = useParams();
  const columns = [
    {
      name: "ID",
      selector: (row) => row.productId,
    },
    {
      name: "Product Name",
      selector: (row) => row.productName,
      sortable: true
    },
    {
      name: "Brand Name",
      selector: (row) => row.brandName,
      sortable: true
    },
    {
      name: "Subcategory",
      selector: (row) => row.subCateName,
      sortable: true
    },
    {
      name: "Price",
      selector: (row) => row.sellPrice,
      sortable: true
    },
    {
      name: "Status",
      selector: (row) => row.statusName,
    },
    {
      name: "Function",
      cell: (row) => (
        <>
          <Link
            className="btn btn-info"
            to={`/edit-product/${row.productId}`}
          >
            <i className="fa fa-pencil-square-o"></i>
          </Link>
          {"     "}
          <button
                    className="btn btn-danger"
                    onClick={() => {
                      Swal.fire({
                        title: "Thông Báo",
                        text: "Bạn Có Chắc Chắn Muốn Xóa Sản Phẩm Này Không ?",
                        icon: "Warning",
                        confirmButtonText: "Delete",
                        showCancelButton: true,
                      }).then((result) => {
                        if (result["isConfirmed"]) {
                          deleteProduct(row.productId);
                        }
                      });
                    }}
                    style={{ marginLeft: "10px" }}
                  >
                    {" "}
                    <i className="fa fa-trash-o"></i>
                  </button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if(searchData !== null && searchData !== undefined){
      const dataProduct = JSON.parse(searchData);
      setProducts(dataProduct);
    }
  }, [searchData])

  useEffect(() => {
    getAllProducts(currentPage);
    getTotalPages();
  }, [currentPage]);

  const getTotalPages = () => {
    service
      .getTotalPages()
      .then((response) => {
        console.log(response.data);
        setTotalPage(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllProducts = (pageNumber) => {
    service
      .getAllProducts(pageNumber)
      .then((response) => {
        setCurrentPage(pageNumber);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (productId) => {
    service
      .deleteProductById(productId)
      .then((response) => {
        getAllProducts(currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderButtonPage = () => {
    return (
      <Fragment>
        {Array(totalPage)
          .fill(null)
          .map((_, i) => (
            <li key={i} className="page-item">
              <span
                className="page-link"
                onClick={(e) => {
                  setCurrentPage(i + 1);
                }}
                style={{ cursor: "pointer" }}
              >
                {i + 1}
              </span>
            </li>
          ))}
      </Fragment>
    );
  };

  return (
    <Fragment>
    <SearchForm />
    <div className="shadow p-3 mb-5 bg-white rounded mt-5">
      <Link to="/add-product" className="btn btn-primary mb-2">
        {" "}
        Add Product
        {" "}
      </Link>
      <DataTable columns={columns} data={products}/>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination mt-3">
          <li className="page-item">
            <span
              style={{ cursor: "pointer" }}
              className="page-link"
              onClick={(e) => {
                if (currentPage < 1) {
                  setCurrentPage(1);
                } else {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Previous
            </span>
          </li>
          {renderButtonPage()}
          <li className="page-item">
            <span
              style={{ cursor: "pointer" }}
              className="page-link"
              onClick={(e) => {
                if (currentPage === totalPage) {
                  setCurrentPage(totalPage);
                } else {
                  setCurrentPage(currentPage + 1);
                }
              }}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
    </Fragment>
  );
};

export default TableProduct;
