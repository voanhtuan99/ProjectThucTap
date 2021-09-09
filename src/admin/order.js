import axios from "axios";
import { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class OrderPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            xemctdonhang: false,
            isShowAcceptOrder: false,
            isShowCancelOrder: false,
            loading: true,
            strsearch: ''
        }
        this.xemformctdonhang = this.xemformctdonhang.bind(this)
        this.closeformctdonhang = this.closeformctdonhang.bind(this)
        this.handleCloseAcceptOrder = this.handleCloseAcceptOrder.bind(this)
        this.handleShowAcceptorder = this.handleShowAcceptorder.bind(this)
        this.xacnhandonhang = this.xacnhandonhang.bind(this)
        this.handleShowCancelorder = this.handleShowCancelorder.bind(this)
        this.handleCloseCancelOrder = this.handleCloseCancelOrder.bind(this)
        this.handleOption = this.handleOption.bind(this)
    }

    xemformctdonhang() {
        this.setState({
            xemctdonhang: true
        })
    }

    closeformctdonhang() {
        this.setState({
            xemctdonhang: false
        })
    }

    handleShowAcceptorder() {
        this.setState({
            isShowAcceptOrder: true
        })
    }

    handleCloseAcceptOrder() {
        this.setState({
            isShowAcceptOrder: false
        })
    }

    handleShowCancelorder() {
        this.setState({
            isShowCancelOrder: true
        })
    }

    handleCloseCancelOrder() {
        this.setState({
            isShowCancelOrder: false
        })
    }

    componentDidMount() {

        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/order`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                orders: response.data.Orders,
                loading: false
            })
        })


    }

    componentDidUpdate(pP, pS) {
        if (JSON.stringify(pS) !== JSON.stringify(this.state)) {
            console.log(pS)
            axios({
                method: "GET",
                url: `https://tttn.herokuapp.com/api/order`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => {
                this.setState({
                    orders: response.data.Orders
                })
            })
        }
    }

    xacnhandonhang(ordernew) {
        console.log(ordernew)
        let arrOrder = this.state.orders
        arrOrder.forEach((order, key) => {
            if (order._id === ordernew._id) {
                arrOrder[key].TrangThai = ordernew.TrangThai
            }
        })

        this.setState({
            orders: arrOrder
        })
    }
    handleOption(strsearch) {
        // console.log(strsearch)
        this.setState({
            strSearch: strsearch
        })
    }
    render() {
        let { orders, xemctdonhang, isShowAcceptOrder, isShowCancelOrder, loading } = this.state
        const search = this.state.strSearch
        let items = []
        console.log(this.state.strSearch)
        // if (search.length > 0) {
        if (search === undefined) items = orders
        if (search !== 0) {
            orders.forEach(item => {
                // console.log(item)
                if (JSON.stringify(item.TrangThai) === JSON.stringify(search)) {
                    console.log(item)
                    items.push(item)
                }
            })
        }
        if (search === '') items = orders

        let listorder = items.map((order, index) => {
            return <Item order={order} key={index}
                xemformctdonhang={this.xemformctdonhang}
                handleShowAcceptorder={this.handleShowAcceptorder}
                handleShowCancelorder={this.handleShowCancelorder}
            />
        })
        let formdetailorder, formacceptorder, formcancelorder
        if (xemctdonhang === true) {
            formdetailorder = <FormDetailOrder closeformctdonhang={this.closeformctdonhang} />
        }
        else formdetailorder = ''
        if (isShowAcceptOrder === true) {
            formacceptorder = <FormAcceptOrder
                handleCloseAcceptOrder={this.handleCloseAcceptOrder}
                xacnhandonhang={this.xacnhandonhang} />
        }
        else formacceptorder = ''
        if (isShowCancelOrder === true) {
            formcancelorder = <FormCancelOrder
                xacnhandonhang={this.xacnhandonhang}
                handleCloseCancelOrder={this.handleCloseCancelOrder} />
        }
        else formcancelorder = ''
        return (
            <div className="listproductadmin showwithsidebar">
                {formdetailorder}
                {formacceptorder}
                {formcancelorder}
                <ToastContainer handleOption={this.handleOption} />
                <ul className="productadmin__navbar">
                    <li className="navbar__item">
                        <div className="nav__iconList"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" className="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>
                        </svg></div>
                        <h3>Đơn đặt hàng</h3>
                    </li>
                </ul>
                <LocDDH handleOption={this.handleOption} />
                {/* <div className="groupbtnuserlist">
                    <div className="btnadduser">
                        <button>
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" className="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>
                            <p>+1 đơn hàng</p>
                        </button>
                    </div>
                    <div className="btnadduser">
                        <button>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                            <p>Tìm kiếm</p>
                        </button>
                    </div>
                </div> */}
                <div className="listUserTable">
                    <ul className="column order">
                        <li className="nguoidat"><p>ID người đặt</p></li>
                        <li className="diachinhan"><p>Địa chỉ nhận hàng</p></li>
                        <li className="ngaydat"><p>Ngày đặt</p></li>
                        <li className="tongtien"><p>Tổng tiền</p></li>
                        <li className="trangthai"><p>Trạng thái</p></li>
                        <li className="chinhsua"><p>Chỉnh sửa</p></li>
                    </ul>
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                        <div className="listuserall">
                            {listorder}

                        </div>}
                </div>
            </div>
        )
    }
}
class LocDDH extends Component {
    constructor(props) {
        super(props)
        this.state = {
            option: ''
        }
        this.handleOption = this.handleOption.bind(this)
    }
    handleOption(e) {
        this.setState({
            option: e.target.value
        })
        this.props.handleOption(e.target.value)
    }
    render() {
        return (
            <div className="formloc">
                <select onChange={this.handleOption} className="locddhselect" value={this.state.option}>
                    <option value="">Tất cả</option>
                    <option value="Chưa xác nhận">Chưa xác nhận</option>
                    <option value="Đã xác nhận">Đang vận chuyển</option>
                    <option value="Thanh Toán Online">Thanh toán online</option>ư
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value="Đã hủy">Đã hủy</option>
                </select>
            </div>
        )
    }
}
class Item extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {}
        }
        this.handleShowAcceptorder = this.handleShowAcceptorder.bind(this)
        this.xemformctdonhang = this.xemformctdonhang.bind(this)
        this.huydonhang = this.huydonhang.bind(this)
    }



    convertDate(ngaydat) {
        var ngay = ngaydat.split('')

        var ngaynew = '';
        for (var i = 0; i < 10; i++) {

            ngaynew += ngay[i].toString()
        }
        var ngaytemp = ngaynew.split('-')
        var ngaynew = `${ngaytemp[2]}/${ngaytemp[1]}/${ngaytemp[0]}`


        return ngaynew;
    }

    handleShowAcceptorder() {
        this.props.handleShowAcceptorder()
        sessionStorage.setItem("idorder", this.props.order._id)
        sessionStorage.setItem("userorder", this.props.order.user)
    }


    xemformctdonhang() {
        this.props.xemformctdonhang()
        sessionStorage.setItem("idorder", this.props.order._id)
        sessionStorage.setItem("userorder", this.props.order.user)
        sessionStorage.setItem('ngaydattemp', this.props.order.ngaydat)

    }

    huydonhang() {
        this.props.handleShowCancelorder()
        sessionStorage.setItem("userorder", this.props.order.user)
        sessionStorage.setItem("idorder", this.props.order._id)
    }

    render() {
        let { order } = this.props
        let columntrangthai, btnxacnhan, btnhuy
        if (order.TrangThai === 'Chưa xác nhận' || order.TrangThai === 'Thanh Toán Online') {
            btnxacnhan = <p onClick={this.handleShowAcceptorder} className="btnblue"><span >Xác nhận</span></p>
            columntrangthai = <li className="trangthai "><span className='green'>{this.props.order.TrangThai}</span></li>
            btnhuy = <p onClick={this.huydonhang} className="btnbrown"><span >Hủy</span></p>
        }

        else if (order.TrangThai === "Đã xác nhận") {
            columntrangthai = <li className="trangthai"><span className='blue'>Đang vận chuyển</span></li>
            btnxacnhan = ''
            btnhuy = <p onClick={this.huydonhang} className="btnbrown"><span >Hủy</span></p>
        }
        else if (order.TrangThai === "Đã thanh toán") {
            btnxacnhan = ''
            columntrangthai = <li className="trangthai "><span className='orange'>{this.props.order.TrangThai}</span></li>
        }
        else if (order.TrangThai === "Đã hủy") {
            btnxacnhan = ''
            btnhuy = ''
            columntrangthai = <li className="trangthai "><span className='brown'>{this.props.order.TrangThai}</span></li>
        }
        return (<div>
            <ul className="item orderitem">
                <li className="nguoidat"><p>{this.props.order.user}</p></li>
                <li className="diachinhan"><p>{this.props.order.diachinhanhang}</p></li>
                <li className="ngaydat"><p>{this.convertDate(this.props.order.ngaydat)}</p></li>
                <li className="tongtien"><p>{this.props.order.TongTien}</p></li>
                {columntrangthai}
                <li className="chinhsua">
                    <p onClick={this.xemformctdonhang} className="btnorange"><span>Xem</span></p>
                    {btnhuy}
                    {btnxacnhan}
                </li>
            </ul>
        </div>)
    }
}

class FormDetailOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            details: [],
            tenuser: '',
            ngaydat: sessionStorage.getItem('ngaydattemp'),
            loading: true

        }
        this.closeformctdonhang = this.closeformctdonhang.bind(this)
        this.convertDate = this.convertDate.bind(this)
        this.thanhtoandonhang = this.thanhtoandonhang.bind(this)
    }

    closeformctdonhang() {
        this.props.closeformctdonhang()
        sessionStorage.removeItem("idorder")
        sessionStorage.removeItem("userorder")
        sessionStorage.removeItem('ngaydattemp')
    }


    convertDate(ngaydat) {
        var ngay = ngaydat.split('')

        var ngaynew = '';
        for (var i = 0; i < 10; i++) {

            ngaynew += ngay[i].toString()
        }
        var ngaytemp = ngaynew.split('-')
        var ngaynew = `${ngaytemp[2]}/${ngaytemp[1]}/${ngaytemp[0]}`


        return ngaynew;
    }
    thanhtoandonhang() {
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/order/${this.state.order._id}`,
            data: {
                TrangThai: "Đã thanh toán",
                user: this.state.order.user,
                diachinhanhang: this.state.order.diachinhanhang,
                TongTien: this.state.order.TongTien,
            }
        }).then(response => {
            console.log(response.data.updateOrder)
            sessionStorage.removeItem("idorder")
            sessionStorage.removeItem("userorder")
            this.props.closeformctdonhang()
        })
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/detailorder/${sessionStorage.getItem("idorder")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                details: response.data.listDetail,
                loading: false

            })
        })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/order/${sessionStorage.getItem("idorder")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                order: response.data.OrderGet,
            })
        })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${sessionStorage.getItem('userorder')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                tenuser: response.data.UserSelect.name
            })
        })
    }


    render() {

        let { details, order, loading } = this.state
        let listdetail = details.map((detail, index) => {
            return <ItemDetail detail={detail} key={index} />
        })
        let btnChuyenDonHang
        if (order.TrangThai === "Đã xác nhận") {
            btnChuyenDonHang = <button onClick={this.thanhtoandonhang} >Chốt đơn hàng</button>
        }
        return (
            <div className="addProductoverlay">
                {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                    <div className="formDetailOrder">
                        <div className="detailOrder__title">
                            <div className="title">
                                <h3>Chi tiết đơn hàng:</h3>
                                <h4>{sessionStorage.getItem("idorder")}</h4>
                            </div>
                        </div>
                        <div className="orderInfo">
                            <div className="nguoidat">
                                <p>Người đặt: </p>
                                <span>{this.state.tenuser}</span>
                            </div>
                            <div className="ngaydat">
                                <p>Tổng tiền: </p>
                                <span>{this.convertDate(this.state.ngaydat)}</span>
                            </div>
                            <div className="tongtien">
                                <p>Tổng tiền: </p>
                                <span>{this.state.order.TongTien}đ</span>
                            </div>
                        </div>
                        <div className="listDetailOrder">
                            <ul className="column">
                                <li className="img"><p>Hình ảnh</p></li>
                                <li className="tensp"><p>Tên sản phẩm</p></li>
                                <li className="soluong"><p>Số lượng</p></li>
                                <li className="gia"><p>Giá</p></li>
                            </ul>
                            <div className="listitem">
                                {listdetail}
                            </div>
                        </div>
                        <div className="groupbtn">
                            {btnChuyenDonHang}
                            <button onClick={this.closeformctdonhang}>Thoát</button>
                        </div>
                    </div>}
            </div>
        )
    }
}

class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}

        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/product/${this.props.detail.idsp}`
        }).then(response => {
            this.setState({
                product: response.data.productget
            })
        })
    }
    render() {
        console.log()
        return (
            <ul className="item">
                <li className="img"><p><img src={this.state.product.img} /></p></li>
                <li className="tensp"><p>{this.state.product.TenSP}</p></li>
                <li className="soluong"><p>{this.props.detail.SoLuong}</p></li>
                <li className="gia"><p>{parseInt(this.props.detail.SoLuong * this.state.product.DonGia) - parseInt(this.props.detail.SoLuong * this.state.product.DonGia * (this.state.product.KhuyenMai / 100))}</p></li>
            </ul>
        )
    }
}

class FormAcceptOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            user: {},
            detailorder: [],
            product: [],
            congty: null
        }
        this.handleCloseAcceptOrder = this.handleCloseAcceptOrder.bind(this)
        this.xacnhandonhang = this.xacnhandonhang.bind(this)
        this.chonct = this.chonct.bind(this)
    }
    chonct(cty) {
        this.setState({
            congty: cty
        })
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/order/${sessionStorage.getItem("idorder")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                order: response.data.OrderGet
            })
        })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/detailorder/${sessionStorage.getItem("idorder")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            console.log(response.data.listDetail)
            this.setState({
                detailorder: response.data.listDetail
            })
            for (let i = 0; i < response.data.listDetail.length; i++) {
                axios({
                    method: "GET",
                    url: `https://tttn.herokuapp.com/api/product/${response.data.listDetail[i].idsp}`,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }).then(response => {
                    console.log(response.data.productget)
                    let productnew = this.state.product
                    productnew.push(response.data.productget)
                    this.setState({
                        product: productnew
                    })
                })
            }

        })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${sessionStorage.getItem('userorder')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                user: response.data.UserSelect
            })
        })
    }
    handleCloseAcceptOrder() {
        sessionStorage.removeItem("idorder")
        sessionStorage.removeItem("userorder")
        this.props.handleCloseAcceptOrder()
    }

    xacnhandonhang() {
        if (this.state.congty === null) {
            toast.error(`Chưa chọn đơn vị giao hàng`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            console.log("aaaa")

        } else {
            axios({
                method: "PUT",
                url: `https://tttn.herokuapp.com/api/order/${this.state.order._id}`,
                data: {
                    TrangThai: "Đã xác nhận",
                    user: this.state.order.user,
                    diachinhanhang: this.state.order.diachinhanhang,
                    TongTien: this.state.order.TongTien
                }
            }).then(response => {
                console.log(response.data.updateOrder)
                this.props.xacnhandonhang(response.data.updateOrder)
                sessionStorage.removeItem("idorder")
                sessionStorage.removeItem("userorder")

            })
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/phieuxuatnhap/insert`,
                data: {
                    LoaiPhieu: "Phiếu xuất",
                    CongTy: this.state.congty._id
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => {

                for (let i = 0; i < this.state.detailorder.length; i++) {

                    for (let j = 0; j < this.state.product.length; j++) {
                        if (this.state.detailorder[i].idsp === this.state.product[j]._id) {
                            axios({
                                method: "POST",
                                url: `https://tttn.herokuapp.com/api/ctphieu/insert`,
                                data: {
                                    SoLuong: this.state.detailorder[i].SoLuong,
                                    Gia: this.state.product[j].DonGia,
                                    MaPhieu: response.data.phieunhapnew._id,
                                    MaSP: this.state.detailorder[i].idsp
                                },
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                                }
                            })
                        }
                    }
                }
                toast.success(`Đã xác nhận đơn hàng ${this.state.order._id}`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    this.props.handleCloseAcceptOrder()
                }, 700)
            }
            )
        }
    }

    render() {
        console.log(this.state)
        return (<div className="addProductoverlay">
            <div className="formacceptorder">
                <div className="acceptorder__title">
                    <div className='title__content'>
                        <p>Xác nhận đơn: </p>
                        <span>{this.state.order._id}</span>
                    </div>
                </div>
                <div className="acceptorder__icon">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="receipt" className="svg-inline--fa fa-receipt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"></path></svg>
                </div>
                <div className="acceptorder__info">
                    <div className="content">
                        <p>Người nhận: </p>
                        <span>{this.state.user.name}</span>
                    </div>
                    <div className="content">
                        <p>Địa chỉ: </p>
                        <span>{this.state.order.diachinhanhang}</span>
                    </div>
                    <div className="content">
                        <p>Số điện thoại: </p>
                        <span>{this.state.user.sdt}</span>
                    </div>
                    <div className="content">
                        <p>Tổng tiền: </p>
                        <span>{this.state.order.TongTien}</span>
                    </div>
                    <Search chonct={this.chonct} />
                    <div className="content">
                        <p>Công ty đã chọn: </p>
                        <span>{this.state.congty ? this.state.congty.TenCongTy : ''}</span>
                    </div>
                </div>
                <div className="groupbtn">
                    <button onClick={this.xacnhandonhang}>Xác nhận</button>
                    <button onClick={this.handleCloseAcceptOrder}>Thoát</button>
                </div>
            </div>
        </div>)
    }
}

class FormCancelOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            user: {},
            loading: true
        }
        this.handleCloseCancelOrder = this.handleCloseCancelOrder.bind(this)
        this.huydonhang = this.huydonhang.bind(this)
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/order/${sessionStorage.getItem("idorder")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                order: response.data.OrderGet,
                loading: false
            })
        })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${sessionStorage.getItem('userorder')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                user: response.data.UserSelect
            })
        })
    }
    handleCloseCancelOrder() {
        sessionStorage.removeItem("idorder")
        sessionStorage.removeItem("userorder")
        this.props.handleCloseCancelOrder()
    }

    huydonhang() {
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/order/${this.state.order._id}`,
            data: {
                TrangThai: "Đã hủy",
                user: this.state.order.user,
                diachinhanhang: this.state.order.diachinhanhang,
                TongTien: this.state.order.TongTien
            }
        }).then(response => {
            console.log(response.data.updateOrder)
            this.props.xacnhandonhang(response.data.updateOrder)
            // sessionStorage.removeItem("idorder")
            // sessionStorage.removeItem("userorder")
            toast.success(`Đã hủy đơn hàng ${this.state.order._id}!`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                this.props.handleCloseCancelOrder()
            }, 1000)
        })
        axios({
            method: `PUT`,
            url: `https://tttn.herokuapp.com/api/select/xoadondathang`,
            data: {
                idorder: this.state.order._id
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                sessionStorage.removeItem("idorder")
                sessionStorage.removeItem("userorder")
            })
    }

    render() {
        let { loading } = this.state
        return (<div className="addProductoverlay">
            {loading ? (<ClipLoader size={20} color={"#F37A24"} loading={loading} />) :
                <div className="formacceptorder">
                    <div className="acceptorder__title">
                        <div className='title__content'>
                            <p>Xác nhận đơn: </p>
                            <span>{this.state.order._id}</span>
                        </div>
                    </div>
                    <div className="acceptorder__icon">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="receipt" className="svg-inline--fa fa-receipt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M358.4 3.2L320 48 265.6 3.2a15.9 15.9 0 0 0-19.2 0L192 48 137.6 3.2a15.9 15.9 0 0 0-19.2 0L64 48 25.6 3.2C15-4.7 0 2.8 0 16v480c0 13.2 15 20.7 25.6 12.8L64 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L192 464l54.4 44.8a15.9 15.9 0 0 0 19.2 0L320 464l38.4 44.8c10.5 7.9 25.6.4 25.6-12.8V16c0-13.2-15-20.7-25.6-12.8zM320 360c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H72c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h240c4.4 0 8 3.6 8 8v16z"></path></svg>
                    </div>
                    <div className="acceptorder__info">
                        <div className="content">
                            <p>Người nhận: </p>
                            <span>{this.state.user.name}</span>
                        </div>
                        <div className="content">
                            <p>Địa chỉ: </p>
                            <span>{this.state.order.diachinhanhang}</span>
                        </div>
                        <div className="content">
                            <p>Số điện thoại: </p>
                            <span>{this.state.user.sdt}</span>
                        </div>
                        <div className="content">
                            <p>Tổng tiền: </p>
                            <span>{this.state.order.TongTien}</span>
                        </div>
                    </div>
                    <div className="huydonhangbtn">
                        <button onClick={this.huydonhang}>Hủy đơn hàng</button>
                        <button onClick={this.handleCloseCancelOrder}>Thoát</button>
                    </div>
                </div>}
        </div>)
    }
}

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenct: '',
            listCT: [],
            isShowSearchCT: false,
            timct: [],
        }
        this.handleTenCT = this.handleTenCT.bind(this)
        this.timtenct = this.timtenct.bind(this)
        this.blurct = this.blurct.bind(this)
        this.clickchon = this.clickchon.bind(this)
    }
    handleTenCT(e) {
        this.setState({
            tenct: e.target.value,
            isShowSearchCT: false,
        })
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/congty/Vận Chuyển`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    listCT: response.data.listCongty
                })
            })
    }
    timtenct() {
        let selectct = []
        this.state.listCT.filter((item) => {
            if (item.TenCongTy.toLowerCase().includes(this.state.tenct.toLowerCase()))
                selectct.push(item)
        })
        this.setState({
            timct: selectct,
            isShowSearchCT: true,
            isShowSearchSP: false
        })
    }
    blurct() {
        this.setState({
            timct: [],
            isShowSearchCT: false,
            isShowSearchSP: false
        })
    }
    clickchon() {
        this.setState({
            isShowSearchCT: false
        })
    }

    render() {
        let { isShowSearchCT, timct } = this.state
        let formsearchct
        if (isShowSearchCT === true) {
            formsearchct = <FormSelectCT listct={timct} chonct={this.props.chonct} clickchon={this.clickchon} />
        }
        return (
            <div className="content">

                <div className="luachon">
                    <div className="luachon__input">
                        <p>Tên công ty: </p>
                        <input type="text" placeholder="Nhập tên công ty" onBlur={this.blurct} onChange={this.handleTenCT} value={this.state.tenct} />
                        <button onClick={this.timtenct}>Tìm</button>

                    </div>
                    {formsearchct}


                </div>
            </div>
        )
    }
}
class FormSelectCT extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
        let listct = this.props.listct.map((ct, index) => {
            return <ItemsearchCT ct={ct} key={index} chonct={this.props.chonct} clickchon={this.props.clickchon} />
        })
        return (
            <div className="search__tenct">
                {listct}

            </div>
        )
    }
}

class ItemsearchCT extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.chonct = this.chonct.bind(this)
    }

    chonct() {
        this.props.chonct(this.props.ct)
        this.props.clickchon()
    }

    render() {
        return (
            <ul className="item">
                <li className="tenct"><p>{this.props.ct.TenCongTy}</p></li>
                <li className="tuychon"><button onClick={this.chonct}>Chọn</button></li>

            </ul>
        )
    }
}