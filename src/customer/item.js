import axios from 'axios'
import { Component } from 'react'
class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.clickAddCart = this.clickAddCart.bind(this)
        this.handleShowFormInfoProduct = this.handleShowFormInfoProduct.bind(this)
    }


    clickAddCart(id) {
        localStorage.setItem('idsp', id)
        this.props.handleShowFormAddCart()
    }

    handleShowFormInfoProduct() {
        this.props.handleShowFormInfoProduct()
        localStorage.setItem('idsp', this.props.product._id)
    }

    render() {
        let { product } = this.props
        let KhuyenMai
        if (product.KhuyenMai > 0) {
            KhuyenMai = <div className="giamgia">
                <p>{product.KhuyenMai}%</p>
                <h5>Giảm</h5>
            </div>
        }
        let giamgia = parseInt(this.props.product.DonGia) - parseInt((this.props.product.KhuyenMai / 100) * this.props.product.DonGia)
        return (<div className="col-md-3">
            <div className="product__item">
                {KhuyenMai}
                <div className="product__img">
                    <img src={this.props.product.img} alt="#" />
                </div>
                <div className="product__content">
                    <div>
                        <h4>{this.props.product.TenSP}</h4>
                    </div>
                    <div className="giasp">
                        <h6>{giamgia}đ</h6>
                        <h5>${this.props.product.DonGia}đ</h5>
                    </div>
                    <p>{this.props.product.Mota}</p>
                </div>
                <div className="product__button">
                    <button className="button__info" onClick={this.handleShowFormInfoProduct}><p><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="question-circle" className="svg-inline--fa fa-question-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path></svg></p></button>
                    <button className="button__buy" onClick={() => this.clickAddCart(this.props.product._id)}><p><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" className="svg-inline--fa fa-shopping-cart fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" /></svg></p></button>
                </div>
            </div>
        </div >)
    }
}
export default Item
