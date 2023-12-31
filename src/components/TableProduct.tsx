import React from "react";
import {Fragment, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import service from "../service/productService";
import Swal from "sweetalert2";
import DataTable, {TableColumn, TableRow} from "react-data-table-component";
import SearchForm from "./SearchFormComponent";
import {useParams} from "react-router-dom";
import LoadingSpinner from "./LoadingComponent";
import "../style/TableStyle.css";
import {IProduct} from "../models/IProduct";

const TableProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Array<IProduct>>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const {searchData} = useParams();
    const [records, setRecords] = useState<Array<IProduct>>([]);
    const [allProducts, setAllProducts] = useState([]);

    const showConfirmDelete = (productId: number) => {
        Swal.fire({
            title: "Thông Báo",
            text: "Bạn Có Chắc Chắn Muốn Xóa Sản Phẩm Này Không ?",
            icon: "warning",
            confirmButtonText: "Delete",
            showCancelButton: true,
        }).then((result) => {
            if (result["isConfirmed"]) {
                deleteProduct(productId);
            }
        });
    };

    const handleReset = () => {
        setRecords(products);
        window.location.replace("/product_frontend");
    };

    const showPrevious = () => {
        return (
            <li className="page-item">
        <span
            style={{cursor: "pointer"}}
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
        );
    };

    const showNext = () => {
        return (
            <li className="page-item">
        <span
            style={{cursor: "pointer"}}
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
        );
    };

    const columns: TableColumn<IProduct>[] = [
        {
            name: "ID",
            selector: (row: IProduct) => row.productId,
            maxWidth: "10px",
        },
        {
            name: "Product Name",
            selector: (row: IProduct) => row.productName,
            sortable: true,
        },
        {
            name: "Brand Name",
            selector: (row: IProduct) => row.brandName,
            sortable: true,
        },
        {
            name: "Subcategory",
            selector: (row: IProduct) => row.subCateName,
            sortable: true,
        },
        {
            name: "Price",
            selector: (row: IProduct) => row.sellPrice,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: IProduct) => row.statusName,
            sortable: true,
        },
        {
            name: "Function",
            cell: (row: IProduct) => (
                <>
                    <Link
                        className="btn btn-secondary"
                        to={`/detail-product/${row.productId}`}
                    >
                        <i className="fa fa-eye"></i>
                    </Link>
                    <Link
                        className="btn btn-info"
                        style={{marginLeft: "10px"}}
                        to={`/edit-product/${row.productId}`}
                    >
                        <i className="fa fa-pencil-square-o"></i>
                    </Link>
                    {"     "}
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            showConfirmDelete(row.productId);
                        }}
                        style={{marginLeft: "10px"}}
                    >
                        <i className="fa fa-trash-o"></i>
                    </button>
                </>
            ),
        },
    ];

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const newData = allProducts.filter((row: TableRow) => {
            // @ts-ignore
            return row.productName
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
        });
        setRecords(newData);
        if (e.target.value === "") {
            setRecords(products);
        }
    };

    const renderSearchName = () => {
        return (
            <div className="d-flex justify-content-end align-items-center form-search-name">
                <label htmlFor="search-input" id="label-search-input">
                    Search By Name
                </label>
                <input
                    className="form-control"
                    id="search-input"
                    type="text"
                    onChange={(e) => handleFilter(e)}
                    // onFocus={}
                />
            </div>
        );
    };

    useEffect(() => {
        service
            .getAllProductsSearch()
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (searchData !== null && searchData !== undefined) {
            const dataProduct = JSON.parse(window.decodeURIComponent(searchData));
            setRecords(dataProduct);
        }
    }, [searchData]);

    useEffect(() => {
        getAllProducts(currentPage);
        getTotalPages();
    }, [currentPage]);

    const getTotalPages = () => {
        service
            .getTotalPages()
            .then((response) => {
                setTotalPage(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllProducts = (pageNumber: number) => {
        setIsLoading(true);
        service
            .getAllProducts(pageNumber)
            .then((response) => {
                setCurrentPage(pageNumber);
                setProducts(response.data);
                setRecords(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const showDeleteSuccess = () => {
        Swal.fire({
            title: "Thông Báo",
            text: "Xóa Sản Phẩm Thành Công",
            icon: "success",
            confirmButtonText: "OK",
        });
    };

    const deleteProduct = (productId: number) => {
        service
            .deleteProductById(productId)
            .then((response) => {
                showDeleteSuccess();
                getAllProducts(currentPage);
                getTotalPages();
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
                      console.log(currentPage);
                  }}
                  style={{cursor: "pointer"}}
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
            <SearchForm/>
            <div className="shadow p-3 mb-5 bg-white rounded mt-5">
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="/add-product" className="btn btn-primary mb-2">
                        Add Product
                    </Link>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleReset}
                    >
                        <i className="fa fa-refresh"></i> Reset
                    </button>
                </div>
                {renderSearchName()}
                {isLoading ? (
                    <LoadingSpinner/>
                ) : (
                    <DataTable columns={columns} data={records}/>
                )}
                <nav className="d-flex justify-content-center">
                    <ul className="pagination mt-3">
                        {currentPage === 1 ? !showPrevious() : showPrevious()}
                        {renderButtonPage()}
                        {currentPage >= totalPage ? !showNext() : showNext()}
                    </ul>
                </nav>
            </div>
        </Fragment>
    );
};

export default TableProduct;
