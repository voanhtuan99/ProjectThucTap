import axios from 'axios'
import { Component } from 'react'
import Item from './item'
import FormAddCart from './formaddcart'
import ClipLoader from "react-spinners/ClipLoader";

export default class ProductPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isShowAddCart: false,
            loaisp: [],
            selectloai: 'all',
            tensp: '',
            isShowInfoProduct: false,
            listSearch: [],
            isShowSearch: false
        }
        this.closeaddcart = this.closeaddcart.bind(this)
        this.handleShowFormAddCart = this.handleShowFormAddCart.bind(this)
        this.handleallsp = this.handleallsp.bind(this)
        this.handlegiamgia = this.handlegiamgia.bind(this)
        this.handlebanchay = this.handlebanchay.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.searchsanpham = this.searchsanpham.bind(this)
        this.blurtimsp = this.blurtimsp.bind(this)
        this.handleShowFormInfoProduct = this.handleShowFormInfoProduct.bind(this)
        this.closeInfoProduct = this.closeInfoProduct.bind(this)
    }

    componentDidMount() {
        // console.log('didmount')
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/product/all"
        }).then(response => {
            this.setState({
                products: response.data.products
            })
        })
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/category/all"
        }).then(response => {
            this.setState({
                loaisp: response.data.categories
            })
        })
    }



    handleShowFormAddCart(product) {
        this.setState(
            {
                isShowAddCart: true,
                isShowSearch: false

            }
        )
    }

    handleallsp() {
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/product/all"
        }).then(response => {
            this.setState({
                products: response.data.products
            })
        })
        document.querySelector(".filters .allproduct").classList.toggle("active")
        document.querySelector(".filters .reduceproduct").classList.remove("active")
        document.querySelector(".filters .popularproduct").classList.remove("active")

    }

    handlegiamgia() {
        document.querySelector(".filters .reduceproduct").classList.toggle("active")
        document.querySelector(".filters .popularproduct").classList.remove("active")
        document.querySelector(".filters .allproduct").classList.remove("active")
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/select/sachgiamgia"
        }).then(response => {
            this.setState({
                products: response.data.listnew
            })
        })
    }

    handlebanchay() {
        document.querySelector(".filters .popularproduct").classList.toggle("active")
        document.querySelector(".filters .reduceproduct").classList.remove("active")
        document.querySelector(".filters .allproduct").classList.remove("active")
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/select/sachbanchay"
        }).then(response => {
            this.setState({
                products: response.data.listnew
            })
        })
    }
    closeaddcart() {
        this.setState(
            {
                isShowAddCart: false
            }
        )
    }




    handleSelect(e) {
        this.setState({
            selectloai: e.target.value
        })

        if (e.target.value === 'all') {
            axios({
                method: "GET",
                url: "https://tttn.herokuapp.com/api/product/all"
            }).then(response => {
                this.setState({
                    products: response.data.products
                })
            })
            document.querySelector(".filters .allproduct").classList.toggle("active")
            document.querySelector(".filters .reduceproduct").classList.remove("active")
            document.querySelector(".filters .popularproduct").classList.remove("active")
        }
        else {
            axios({
                method: "POST",
                url: "https://tttn.herokuapp.com/api/select/timsachtheoloai",
                data: {
                    id: e.target.value
                }
            }).then(response => {
                this.setState({
                    products: response.data.productget
                })
            })
        }
    }
    blurtimsp() {
        this.setState({
            isShowSearch: false
        })
    }
    searchsanpham() {
        let tensp = document.querySelector(".tensachcantim").value
        let selectsp = []
        this.state.products.filter(item => {
            if (item.TenSP.toLowerCase().includes(tensp.toLowerCase())) {
                selectsp.push(item)
            }
        })
        this.setState({
            listSearch: selectsp,
            isShowSearch: true
        })
    }
    handleShowFormInfoProduct(product) {
        this.setState(
            {
                isShowInfoProduct: true
            }
        )
    }

    closeInfoProduct() {
        this.setState(
            {
                isShowInfoProduct: false
            }
        )
    }
    render() {
        let { products, isShowAddCart, loaisp, tensp, isShowSearch, isShowInfoProduct } = this.state
        let formaddcart, formsearch, forminfoproduct
        console.log(products)

        let listProduct = products.map((product, index) => {
            return <Item handleShowFormInfoProduct={this.handleShowFormInfoProduct} key={index} product={product} handleShowFormAddCart={this.handleShowFormAddCart} />
        })
        if (isShowAddCart === true) {
            formaddcart = <FormAddCart closeaddcart={this.closeaddcart} product={this.props.product} />
        }
        let listloai = loaisp.map((cate, index) => {
            return <option value={cate._id} key={index}>{cate.TenLoai}</option>
        })
        if (isShowSearch === true) {
            formsearch = this.state.listSearch.map((item, key) => {
                return <ItemSearch item={item} key={key} handleShowFormAddCart={this.handleShowFormAddCart} />
            }
            )
        }
        if (isShowInfoProduct === true) {
            forminfoproduct = <FormInfoProduct closeInfoProduct={this.closeInfoProduct} />
        }
        return (<div>

            {/* Page Content */}
            <div className="page-heading products-heading header-text">
                {formaddcart}
                {forminfoproduct}
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-content">
                                <h4>DANH SÁCH SẢN PHẨM</h4>
                                <h2>SACH 99</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="products">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="luachon1">
                                <div className="searchsach">
                                    <h3>Tìm sách</h3>
                                    <input type="text" placeholder="Nhập tên sách" className="tensachcantim" onBlur={this.blurtimsp} />
                                    <button onClick={this.searchsanpham}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                                    </button>
                                    <div className="formsptim">
                                        {formsearch}
                                    </div>
                                </div>
                                <div className="chontheloai">
                                    <h3>Thể loại</h3>
                                    <select className="selecttheloai" onChange={this.handleSelect} >
                                        <option value="all">Tất cả</option>
                                        {listloai}
                                    </select>
                                </div>
                            </div>
                            <div className="filters">
                                <ul>
                                    <li className="allproduct active" onClick={this.handleallsp}>TẤT CẢ SẢN PHẨM</li>
                                    <li className="reduceproduct" onClick={this.handlegiamgia}>GIẢM GIÁ</li>
                                    <li className="popularproduct" onClick={this.handlebanchay}>Bán chạy nhất</li>
                                </ul>
                            </div>
                        </div>

                        {listProduct}

                        {/* <div className="col-md-12">
                            <ul className="pages">
                                <li><div>1</div></li>
                                <li className="active"><div>2</div></li>
                                <li><div>3</div></li>
                                <li><div>4</div></li>
                                <li><div><i className="fa fa-angle-double-right" /></div></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div >
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <p>Cảm ơn đã tin tưởng chúng tôi
                                    - Owner: TUANVO99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div >)
    }
}

class ItemSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.clickitem = this.clickitem.bind(this)
    }
    clickitem() {
        this.props.handleShowFormAddCart()
        console.log(this.props.item._id)
        localStorage.setItem('idsp', this.props.item._id)
    }
    render() {
        return (
            <div className='itemsearch' onClick={this.clickitem}>
                <div className="img">
                    <img src={this.props.item.img} />
                </div>
                <div className="tensp">
                    <p>{this.props.item.TenSP}</p>
                </div>
            </div>
        )
    }
}

class FormInfoProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            tenloai: "",
            loading: true
        }
        this.closeInfoProduct = this.closeInfoProduct.bind(this)
    }
    closeInfoProduct() {
        this.props.closeInfoProduct()
    }
    componentDidMount() {
        axios({
            method: 'GET',
            url: `https://tttn.herokuapp.com/api/product/${localStorage.getItem('idsp')}`

        }).then(response => {
            this.setState({
                product: response.data.productget
            })
            console.log(response.data.productget.loaisp)
            axios({
                method: 'GET',
                url: `https://tttn.herokuapp.com/api/category/${response.data.productget.loaisp}`

            }).then(response => {
                this.setState({
                    tenloai: response.data.categories.TenLoai,
                    loading: false
                })
            })

        })

    }
    render() {
        let { product, tenloai, loading } = this.state
        console.log(this.state)
        return (
            <div className='addCartOverlay'>
                {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                    <div className="forminfoproduct">
                        <div className="info__title">
                            <h3>Thông tin sản phẩm</h3>
                        </div>
                        <div className="info__content">
                            <div className="content__main">
                                <div className="img">
                                    <img src={product.img}></img>
                                </div>
                                <div className="mainproduct">
                                    <p>Tên sách: {product.TenSP}</p>
                                    <p>Tác giả: {product.TacGia}</p>
                                    <p>Thể loại: {tenloai}</p>
                                </div>
                            </div>
                            <div className="content_describe">
                                <p>Mô tả: {product.Mota}</p>
                            </div>


                        </div>
                        <div className="groupbtn">
                            <button onClick={this.closeInfoProduct}><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg></button>
                        </div>
                    </div>}
            </div>
        )
    }
}