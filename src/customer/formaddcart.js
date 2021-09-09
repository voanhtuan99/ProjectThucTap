import axios from "axios";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class FormAddCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            _id: '',
            TenSP: '',
            DonGia: '',
            SoLuong: 1,
            img: '',
            Mota: '',
            soluongtrongkho: 0,
            loaisp: '',
            TacGia: '',
            KhuyenMai: 0
        }
        this.closeaddcart = this.closeaddcart.bind(this)
        this.addcart = this.addcart.bind(this)
        this.increase = this.increase.bind(this)
        this.decrease = this.decrease.bind(this)
        this.onchangesl = this.onchangesl.bind(this)
    }
    closeaddcart() {
        this.props.closeaddcart()
    }




    addcart(product) {
        if (product.SoLuong > product.soluongtrongkho) {
            alert("Số lượng trong kho không đủ")
        }
        else {
            if (localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === '') {
                this.props.history.push('/login')

            }
            else {
                let list;
                let listproduct = JSON.parse(sessionStorage.getItem('listproductincart'))
                if (listproduct === null) {
                    list = []
                } else list = listproduct
                let check = false
                console.log(list)
                for (let i = 0; i < list.length; i++) {
                    if (list[i]._id === product._id) {
                        check = true
                        toast.error("Sản phẩm đã có trong giỏ hàng",
                            {
                                position: "top-right",
                                autoClose: 1500,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            })
                    }
                }
                if (check === false) {
                    list.push(product)
                    toast.success('Thêm vào giỏ hàng thành công!', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                sessionStorage.setItem('listproductincart', JSON.stringify(list))

            }
        }

    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: `https://tttn.herokuapp.com/api/product/${localStorage.getItem('idsp')}`
        }).then(response => {
            this.setState({

                _id: response.data.productget._id,
                TenSP: response.data.productget.TenSP,
                img: response.data.productget.img,
                Mota: response.data.productget.Mota,
                DonGia: response.data.productget.DonGia,
                soluongtrongkho: response.data.productget.SoLuong,
                loaisp: response.data.productget.loaisp,
                TacGia: response.data.productget.TacGia,
                KhuyenMai: response.data.productget.KhuyenMai,
                loading: false
            })
        })
    }

    decrease() {

        if (this.state.SoLuong <= 1) {
            toast.error("Số lượng không được nhỏ hơn 0",
                {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            return
        }
        this.setState({
            SoLuong: this.state.SoLuong - 1,
        })
    }

    increase() {
        if (this.state.SoLuong > this.state.soluongtrongkho - 1) {
            toast.error("Không đủ hàng trong kho",
                {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            return
        }
        this.setState({
            SoLuong: this.state.SoLuong + 1,
        })
    }
    onchangesl(e) {
        if (e.target.value < 0) {
            toast.error(`Số lượng sản phẩm không hợp lệ`,
                {
                    position: "top-right",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            this.setState({
                SoLuong: 1
            })
        }
        else {
            if (parseInt(e.target.value) > parseInt(this.state.soluongtrongkho)) {
                console.log(e.target.value)

                toast.error(`Không đủ hàng trong kho. Chỉ còn ${this.state.soluongtrongkho} sản phẩm`,
                    {
                        position: "top-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
            }
            else {
                this.setState({
                    SoLuong: e.target.value
                })
            }
        }
    }
    render() {
        console.log(this.state.SoLuong)
        let product = {
            _id: this.state._id,
            TenSP: this.state.TenSP,
            img: this.state.img,
            Mota: this.state.Mota,
            DonGia: this.state.DonGia,
            SoLuong: this.state.SoLuong,
            soluongtrongkho: this.state.soluongtrongkho,
            loaisp: this.state.loaisp,
            TacGia: this.state.TacGia,
            KhuyenMai: this.state.KhuyenMai,
            GiaBan: parseInt(this.state.DonGia) - parseInt(this.state.DonGia * (this.state.KhuyenMai / 100))
        }
        let giaban = parseInt(this.state.DonGia) - parseInt(this.state.DonGia * (this.state.KhuyenMai / 100))
        let { loading } = this.state
        return (<div className='addCartOverlay'>
            <ToastContainer />
            {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                <div className="formAddCarrt">
                    <div className="addcart__title">
                        <h3>Thêm vào giỏ hàng</h3>
                        <div className="addcart__img"><img src={this.state.img} /></div>
                    </div>
                    <div className='addcart__info'>
                        <div className="info__content"><h5>Tên sản phẩm: </h5><p>{this.state.TenSP}</p></div>
                        <div className="info__content"><h5>Giá: </h5><p>{giaban * this.state.SoLuong}</p></div>
                        <div className="info__content">
                            <h5>Số lượng</h5>
                            <button className="btntru" onClick={this.decrease}>-</button>
                            {/* <span>{this.state.SoLuong}</span> */}
                            <input type="number" value={this.state.SoLuong} onChange={this.onchangesl} id="slcart" />
                            <button className="btntru" onClick={this.increase}>+</button>

                        </div>

                    </div>
                    <div className='groupbtn'>
                        <button className="add" onClick={() => this.addcart(product)}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" className="svg-inline--fa fa-shopping-cart fa-w-18" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z" /></svg>
                        </button>
                        <button className="back" onClick={this.closeaddcart}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" className="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                        </button>
                    </div>
                </div>
            }

        </div>)
    }
}



export default withRouter(FormAddCart)