import axios from 'axios'
import { Component } from 'react'
import AddProduct from './addproduct'
import CategoryForm from './category'
import EditProductForm from './editproductform'
import FormDeleteProduct from './formDeleteproduct'
import ItemProduct from './itemproduct'
export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isShowCategory: false,
            isShowAddproduct: false,
            isShoEditproduct: false,
            isShowDelProduct: false,
            strSearch: ''
        }
        this.OpenCategory = this.OpenCategory.bind(this)
        this.handleClodeCategory = this.handleClodeCategory.bind(this)
        this.handleShowaddproduct = this.handleShowaddproduct.bind(this)
        this.handleCloseaddproduct = this.handleCloseaddproduct.bind(this)
        this.handleShowEditproduct = this.handleShowEditproduct.bind(this)
        this.handleCloseEditproduct = this.handleCloseEditproduct.bind(this)
        this.handleShowDelProduct = this.handleShowDelProduct.bind(this)
        this.handleCloseDelProduct = this.handleCloseDelProduct.bind(this)
        this.addproducttolist = this.addproducttolist.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }


    componentDidUpdate(pP, pS) {
        if (JSON.stringify(pS) !== JSON.stringify(this.state)) {
            console.log(pS.products)
            console.log(this.state.products)

            axios({
                method: "GET",
                url: "https://tttn.herokuapp.com/api/product/all"
            }).then(response => {
                this.setState({
                    products: response.data.products
                })
            })
        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/product/all"
        }).then(response => {
            this.setState({
                products: response.data.products
            })
        })
    }
    handleShowaddproduct() {
        this.setState({
            isShowAddproduct: true
        })
    }



    handleCloseaddproduct() {
        this.setState({
            isShowAddproduct: false
        })
    }
    handleShowEditproduct() {
        this.setState({
            isShowEditproduct: true
        })
    }

    handleShowDelProduct() {
        this.setState({
            isShowDelProduct: true
        })
    }
    handleCloseDelProduct() {
        this.setState({
            isShowDelProduct: false
        })
    }
    handleCloseEditproduct() {
        this.setState({
            isShowEditproduct: false
        })
    }
    OpenCategory() {
        this.setState({
            isShowCategory: true
        })
    }

    handleClodeCategory() {
        this.setState({
            isShowCategory: false
        })
    }

    addproducttolist(product) {
        let listproduct = this.state.products
        listproduct.push(product)
        this.setState(
            {
                products: listproduct
            }
        )
    }
    handleSearch(strsearch) {
        this.setState({
            strSearch: strsearch
        })
    }
    render() {
        let { products, isShowAddproduct, isShowEditproduct, isShowDelProduct } = this.state
        const search = this.state.strSearch
        let items = []
        if (search.length > 0) {
            products.forEach(item => {
                if (item.TenSP.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    items.push(item)
                }
            })
        }
        else items = products
        let listproduct = items.map((product, index) => {
            return <ItemProduct product={product} key={index} num={index} handleShowEditproduct={this.handleShowEditproduct} handleShowDelProduct={this.handleShowDelProduct} />
        })
        let categorypage
        if (this.state.isShowCategory === true) {
            categorypage = <CategoryForm handleClodeCategory={this.handleClodeCategory} />
        }
        else categorypage = ''
        let accessToken = localStorage.getItem("accessToken")
        let addproduct, editproduct, delproduct
        if (isShowAddproduct === true) {
            addproduct = <AddProduct handleCloseaddproduct={this.handleCloseaddproduct} addproducttolist={this.addproducttolist} />
        }
        if (isShowEditproduct === true) {
            editproduct = <EditProductForm handleCloseEditproduct={this.handleCloseEditproduct} />
        }
        if (isShowDelProduct === true) {
            delproduct = <FormDeleteProduct handleCloseDelProduct={this.handleCloseDelProduct} />
        }
        return (<div className="listproductadmin showwithsidebar">
            <ul className="productadmin__navbar">
                <li className="navbar__item">
                    <div className="nav__iconList"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z">
                        </path>
                    </svg></div>
                    <h3>Sản phẩm</h3>
                </li>
            </ul>
            {addproduct}
            {categorypage}
            {editproduct}
            {delproduct}
            <SearchProduct handleSearch={this.handleSearch} />
            <div className="productadmin__list">
                <div className="list__title">
                    <h3>Danh sách sản phẩm</h3>
                    <button className="opencategory" onClick={this.OpenCategory}><p>+ 1 Loại sản phẩm</p></button>
                    <button className="ThemSanPhamMoi" onClick={this.handleShowaddproduct}><p>+ Thêm 1 sản phẩm</p></button>
                </div>
                <ul className="list__namecolumn">
                    <li className="list__namecolumn-item ten"><p>Tên sản phẩm</p></li>
                    <li className="list__namecolumn-item soluong"><p>Số lượng</p></li>
                    <li className="list__namecolumn-item gia"><p>Giá</p></li>
                    <li className="list__namecolumn-item km"><p>Khuyến mãi</p></li>
                    <li className="list__namecolumn-item mota"><p>Mô tả</p></li>
                    <li className="list__namecolumn-item anh"><p>Ảnh</p></li>
                    <li className="list__namecolumn-item loai"><p>Loại</p></li>
                    <li className="list__namecolumn-item edit"><p>Chỉnh sửa</p></li>
                </ul>
                <div className="listProduct">
                    {listproduct}


                </div>
            </div>


        </div>)
    }
}

class SearchProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            strSearch: ''
        }
        this.searchuser = this.searchuser.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }
    searchuser(e) {
        this.setState({
            strSearch: e.target.value
        })
    }
    handleSearch() {
        this.props.handleSearch(this.state.strSearch)
    }
    handleClear() {
        this.setState({
            strSearch: ''
        })
        this.props.handleSearch('')

    }
    render() {
        return (
            <div className="searchForm product">
                <input type="text" value={this.state.strSearch} onChange={this.searchuser} placeholder="Nhập tên sản phẩm chỉ gmail" />
                <button onClick={this.handleSearch} className="btn1">Search</button>
                <button onClick={this.handleClear} className="btn2">Clear</button>
            </div>
        )
    }
}