import React, {useState} from "react";
import "../style/SeachStyle.css";
import service from "../service/productService";
import {useEffect} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";
import {IBrand} from "../models/IBrand";
import {ICategory} from "../models/ICategory";
import {IStatus} from "../models/IStatus";
import {ISearchProduct} from "../models/ISearchProduct";


const SearchForm = () => {
    const [searchForm, setSearchForm] = useState<ISearchProduct>();
    const [optionBrands, setOptionBrands] = useState<Array<IBrand>>([]);
    const [optionCates, setOptionCates] = useState<Array<ICategory>>([]);
    const [optionStatus, setOptionStatus] = useState<Array<IStatus>>([]);
    const navigation: NavigateFunction = useNavigate();

    const showAlertSearch = () => {
        Swal.fire({
            title: "Thông Báo",
            text: "Bạn Cần Chọn Ít Nhất 1 Trường Để Tìm Kiếm",
            icon: "warning",
            confirmButtonText: "OK",
            timer: 2000,
        });
    };

    const handleSearchForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearchForm(prevState => ({
            ...prevState!,
            [e.target.name]: e.target.value || '',
        }));
    }

    useEffect(() => {
        service.getAllBrands().then((response) => {
            setOptionBrands(response.data);
        });
        service.getAllCategory().then((response) => {
            setOptionCates(response.data);
        });
        service.getAllStatusType().then((response) => {
            setOptionStatus(response.data);
        });

        return () => {
            setOptionBrands([]);
            setOptionCates([]);
            setOptionStatus([]);
        }
    }, []);

    const handleSearch = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let countCheck = 0;

        for (const data in searchForm) {
            if (searchForm[data as keyof typeof searchForm] === "" || searchForm[data as keyof typeof searchForm] === undefined) {
                countCheck++;
            }
        }

        if (countCheck === 5) {
            showAlertSearch();
            return;
        }

        if (searchForm !== undefined) {
            service
                .getListProductSearch(searchForm)
                .then((response) => {
                    const url = `/search-product/`;
                    const dataUrl = window.encodeURIComponent(
                        `${JSON.stringify(response.data)}`
                    );
                    const finalUrl = url + dataUrl;
                    navigation(finalUrl);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="shadow p-3 mb-5 bg-white rounded mt-5">
            <form
                action=""
                className="d-flex justify-content-around align-items-center"
            >
                <div className="form-group search-group">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        name="nameProduct"
                        id="name"
                        className="form-control search-input"
                        onChange={(e) => handleSearchForm(e)}
                        value={searchForm?.nameProduct}
                    />
                </div>
                <div className="form-group search-group">
                    <label htmlFor="name" className="form-label">
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        className="form-control search-input"
                        onChange={(e) => handleSearchForm(e)}
                        value={searchForm?.price}
                    />
                </div>
                <div className="form-group search-group">
                    <label htmlFor="brand" className="form-label">
                        Brand
                    </label>
                    <select
                        name="brandId"
                        id="brand"
                        className="form-select"
                        onChange={(e) => handleSearchForm(e)}
                        value={searchForm?.brandId}
                    >
                        <option value='0'>--Choose Opts--</option>
                        {optionBrands.map((optionBrand) => (
                            <option key={optionBrand.id} value={optionBrand.id}>
                                {optionBrand.brandName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group search-group">
                    <label htmlFor="brand" className="form-label">
                        Category
                    </label>
                    <select
                        name="cateId"
                        id="category"
                        className="form-select"
                        onChange={(e) => handleSearchForm(e)}
                        value={searchForm?.cateId}
                    >
                        <option value="">--Choose Opts--</option>
                        {optionCates.map((optionCate) => (
                            <option key={optionCate.categoryId} value={optionCate.categoryId}>
                                {optionCate.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group search-group">
                    <label htmlFor="brand" className="form-label">
                        Status
                    </label>
                    <select
                        name="statusId"
                        id="status"
                        className="form-select"
                        onChange={(e) => handleSearchForm(e)}
                        value={searchForm?.statusId}
                    >
                        <option value="">--Choose Opts--</option>
                        {optionStatus.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.statusName}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button
                        className="btn btn-success"
                        style={{borderRadius: "90px", height: "40px"}}
                        onClick={(e) => handleSearch(e)}
                    >
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
