import { Component } from "react";

class ItemInCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: this.props.product.img,
            TenSP: this.props.product.TenSP,
            Mota: this.props.product.Mota,
            SoLuong: this.props.product.SoLuong,
            TongGia: this.props.product.GiaBan * this.props.product.SoLuong
        }
        this.handleIncrease = this.handleIncrease.bind(this)
        this.handleDecrease = this.handleDecrease.bind(this)
        this.xoasanpham = this.xoasanpham.bind(this)
        this.onChangeSoLuong = this.onChangeSoLuong.bind(this)
        this.kiemtrasoluong = this.kiemtrasoluong.bind(this)
    }

    componentDidUpdate(pP, pS) {
        if (JSON.stringify(pS) !== JSON.stringify(this.state)) {
            this.setState({
                img: this.props.product.img,
                TenSP: this.props.product.TenSP,
                Mota: this.props.product.Mota,
                SoLuong: this.props.product.SoLuong,
                TongGia: this.props.product.GiaBan * this.props.product.SoLuong
            })
        }
    }

    handleIncrease() {
        if (this.props.product.SoLuong > this.props.product.soluongtrongkho - 1) {
            this.props.sltrongkhokhongdu()
        }
        else {
            this.setState({
                SoLuong: this.state.SoLuong + 1,
                TongGia: this.props.product.GiaBan * (this.state.SoLuong + 1)
            })
            let product = {
                _id: this.props.product._id,
                TenSP: this.props.product.TenSP,
                img: this.props.product.img,
                Mota: this.props.product.Mota,
                DonGia: this.props.product.DonGia,
                SoLuong: this.state.SoLuong + 1,
                soluongtrongkho: this.props.product.soluongtrongkho,
                loaisp: this.props.product.loaisp,
                TacGia: this.props.product.TacGia,
                KhuyenMai: this.props.product.KhuyenMai,
                GiaBan: parseInt(this.props.product.DonGia) - parseInt(this.props.product.DonGia * (this.props.product.KhuyenMai / 100))
            }
            this.props.thaydoisoluong(product)
        }
    }
    handleDecrease() {
        if (this.state.SoLuong <= 1) {

        }
        else {
            this.setState({
                SoLuong: this.state.SoLuong - 1,
                TongGia: this.props.product.GiaBan * (this.state.SoLuong - 1)

            })
            let product = {
                _id: this.props.product._id,
                TenSP: this.props.product.TenSP,
                img: this.props.product.img,
                Mota: this.props.product.Mota,
                DonGia: this.props.product.DonGia,
                SoLuong: this.state.SoLuong - 1,
                soluongtrongkho: this.props.product.soluongtrongkho,
                loaisp: this.props.product.loaisp,
                TacGia: this.props.product.TacGia,
                KhuyenMai: this.props.product.KhuyenMai,
                GiaBan: parseInt(this.props.product.DonGia) - parseInt(this.props.product.DonGia * (this.props.product.KhuyenMai / 100))
            }
            this.props.thaydoisoluong(product)

        }
    }

    onChangeSoLuong(e) {
        if (e.target.value < 0) {
            alert("so luong khong hop le")
        }
        else {
            this.setState({
                SoLuong: e.target.value,
                TongGia: this.props.product.GiaBan * (this.state.SoLuong - 1)

            })
            let product = {
                _id: this.props.product._id,
                TenSP: this.props.product.TenSP,
                img: this.props.product.img,
                Mota: this.props.product.Mota,
                DonGia: this.props.product.DonGia,
                SoLuong: e.target.value,
                soluongtrongkho: this.props.product.soluongtrongkho,
                loaisp: this.props.product.loaisp,
                TacGia: this.props.product.TacGia,
                KhuyenMai: this.props.product.KhuyenMai,
                GiaBan: parseInt(this.props.product.DonGia) - parseInt(this.props.product.DonGia * (this.props.product.KhuyenMai / 100))
            }
            this.props.thaydoisoluong(product)
        }
    }

    xoasanpham() {
        this.props.xoasanpham(this.props.product)
    }


    kiemtrasoluong() {
        if (this.props.product.SoLuong > this.props.product.soluongtrongkho - 1) {

            this.props.sltrongkhokhongdu(this.props.product.soluongtrongkho)

        }
    }

    render() {
        console.log(this.state.SoLuong)
        return (
            <li className="cart__item">
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div className="cart__img">
                        <img src={this.props.product.img} />
                    </div>
                </div>
                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                    <div className="cart__info">
                        <div className="info__name">{this.props.product.TenSP}</div>
                        <div className="info__describe">{this.props.product.Mota}</div>
                    </div>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="cart__quantity">
                        <button className="btn-white" onClick={this.handleDecrease}>-</button>
                        <input type="number" value={this.props.product.SoLuong} onChange={this.onChangeSoLuong} id="slcart" onBlur={this.kiemtrasoluong} />
                        <button className="btn-white" onClick={this.handleIncrease}>+</button>
                    </div>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div className="cart__amount">
                        <p>{this.props.product.GiaBan * this.props.product.SoLuong} đ</p>
                        <div className="cart__remove" onClick={this.xoasanpham}>remove</div>
                    </div>
                </div>
            </li>
        )
    }
}

export default ItemInCart