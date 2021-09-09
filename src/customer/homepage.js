import { Component } from 'react'
import Item from './item'
import axios from 'axios'
import FormAddCart from './formaddcart'
import ClipLoader from "react-spinners/ClipLoader";

class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            isShowAddCart: false,
            sachbanchay: [],
            sachmoinhat: [],
            isShowInfoProduct: false,
        }
        this.handleShowFormAddCart = this.handleShowFormAddCart.bind(this)
        this.closeaddcart = this.closeaddcart.bind(this)
        this.handleShowFormInfoProduct = this.handleShowFormInfoProduct.bind(this)
        this.closeInfoProduct = this.closeInfoProduct.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/select/timsachsieusale"
        }).then(response => {
            this.setState({
                products: response.data.listnew
            })
        })
        axios({
            method: `GET`,
            url: `https://tttn.herokuapp.com/api/select/4sachmoinhat`
        })
            .then(response => {
                this.setState({
                    sachmoinhat: response.data.listnew
                })
            })
        axios({
            method: `GET`,
            url: `https://tttn.herokuapp.com/api/select/4sachbanchay`
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    sachbanchay: response.data.listRes
                })
            })
    }



    handleShowFormAddCart(product) {
        this.setState(
            {
                isShowAddCart: true
            }
        )
    }

    closeaddcart() {
        this.setState(
            {
                isShowAddCart: false
            }
        )
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
        let { products, isShowAddCart, sachmoinhat, sachbanchay, isShowInfoProduct } = this.state
        let formaddcart, forminfoproduct
        let listProduct = products.map((product, index) => {
            return <Item handleShowFormInfoProduct={this.handleShowFormInfoProduct} key={index} product={product} handleShowFormAddCart={this.handleShowFormAddCart} />
        })
        if (isShowAddCart === true) {
            formaddcart = <FormAddCart closeaddcart={this.closeaddcart} product={this.props.product} />
        }
        if (isShowInfoProduct === true) {
            forminfoproduct = <FormInfoProduct closeInfoProduct={this.closeInfoProduct} />
        }
        let spmoinhat = sachmoinhat.map((product, index) => {
            return <Item handleShowFormInfoProduct={this.handleShowFormInfoProduct} key={index} product={product} handleShowFormAddCart={this.handleShowFormAddCart} />
        })
        let spbanchay = sachbanchay.map((product, index) => {
            return <Item handleShowFormInfoProduct={this.handleShowFormInfoProduct} key={index} product={product.product} handleShowFormAddCart={this.handleShowFormAddCart} />
        })

        return (
            <div>
                {formaddcart}
                {forminfoproduct}
                <div className="page-heading home-heading header-text">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4>Home</h4>
                                    <h2>Trang chủ</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner Ends Here */}
                <div className="latest-products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Sản phẩm mới nhất</h2>
                                </div>
                            </div>
                            {spmoinhat}

                        </div>
                    </div>
                </div>
                <div className="latest-products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Sản phẩm bán chạy</h2>
                                </div>
                            </div>
                            {spbanchay}

                        </div>
                    </div>
                </div>
                <div className="latest-products">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Sản phẩm ưu đãi cao</h2>
                                </div>
                            </div>
                            {listProduct}

                        </div>
                    </div>
                </div>
                <div className="best-features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>SACH99 SHOP</h2>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="left-content">
                                    <h4>Tìm sách tốt và giá cả hợp lý ở đâu?</h4>
                                    <p>Ghé qua cửa hàng để tham quan và tìm những cuốn sách mà bạn cần</p>
                                    <ul className="featured-list">
                                        <li>Sách mới</li>
                                        <li>Giá cả hợp lí</li>
                                        <li>Nhiều ưu đãi cho khách hàng</li>

                                    </ul>
                                    <div href="about.html" className="filled-button">Thông tin về shop</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="right-image">
                                    <img src="assets/images/feature-image.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
            </div>)
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
export default Homepage