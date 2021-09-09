import axios from "axios";
import { Component } from "react";
import { remove } from "lodash";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class PhieuNhapXuatPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            companies: [],
            coupons: [],
            isShowSelect: false,
            isShowInfoCou: false,
            isShowAddCT: false,
            isShowAddPN: false,
            loading1: true,
            loading2: true,
            isShowFormXoaPhieu: false
        }
        this.timcongty = this.timcongty.bind(this)
        this.handleShowSelect = this.handleShowSelect.bind(this)
        this.xemctphieu = this.xemctphieu.bind(this)
        this.thoatctphieu = this.thoatctphieu.bind(this)
        this.showformcongty = this.showformcongty.bind(this)
        this.closeformcongty = this.closeformcongty.bind(this)
        this.themcongtymoi = this.themcongtymoi.bind(this)
        this.showformthempn = this.showformthempn.bind(this)
        this.closeformthempn = this.closeformthempn.bind(this)
        this.addcoupon = this.addcoupon.bind(this)
        this.locloaiphieu = this.locloaiphieu.bind(this)
        this.showformxoaphieu = this.showformxoaphieu.bind(this)
        this.closeformxoaphieu = this.closeformxoaphieu.bind(this)
        this.xoaphieu = this.xoaphieu.bind(this)
    }

    handleShowSelect() {
        this.setState({
            isShowSelect: !this.state.isShowSelect
        })
    }

    showformthempn() {
        this.setState({
            isShowAddPN: true
        })
    }

    xoaphieu(id) {
        let listPhieu = this.state.coupons
        let evens = remove(listPhieu, (item) => {
            return item._id === id
        })
        this.setState({
            isShowFormXoaPhieu: false,
            coupons: listPhieu
        })
        toast.success('Xóa thành công', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    closeformthempn() {
        console.log("thoat form them")
        this.setState({
            isShowAddPN: false
        })
    }

    themcongtymoi(congty) {
        let arrCongty = this.state.companies
        arrCongty.push(congty)
        this.setState({
            companies: arrCongty
        })
    }


    addcoupon(pn) {
        let listph = this.state.coupons
        listph.unshift(pn)
        this.setState({
            coupons: listph
        })
        toast.success('Thêm phiếu nhập thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    // componentDidUpdate(pP, pS) {
    //     if (JSON.stringify(pS) !== JSON.stringify(this.state)) {
    //         console.log(pS)
    //         axios({
    //             method: "GET",
    //             url: `https://tttn.herokuapp.com/api/phieuxuatnhap`,
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         }).then(response => {
    //             this.setState({
    //                 coupons: response.data.listphieu,
    //                 loading1: false
    //             })
    //         })
    //         axios({
    //             method: "GET",
    //             url: `https://tttn.herokuapp.com/api/congty`,
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             }
    //         }).then(response => {
    //             this.setState({
    //                 companies: response.data.listCongty,
    //                 loading2: false
    //             })
    //         })
    //     }
    // }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/phieuxuatnhap`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                coupons: response.data.listphieu,
                loading1: false
            })
        })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/congty`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                companies: response.data.listCongty,
                loading2: false
            })
        })
    }

    xemctphieu() {
        this.setState({
            isShowInfoCou: true
        })

    }

    thoatctphieu() {
        this.setState({
            isShowInfoCou: false
        })
    }

    showformcongty() {
        this.setState({
            isShowAddCT: true
        })
    }

    closeformcongty() {
        this.setState({
            isShowAddCT: false
        })
    }

    showformxoaphieu() {
        this.setState({
            isShowFormXoaPhieu: true
        })
    }

    closeformxoaphieu() {
        this.setState({
            isShowFormXoaPhieu: false
        })
    }

    timcongty(id) {
        let ct
        let cts = this.state.companies
        ct = cts.map(company => {
            if (company._id === id) {
                return company.TenCongTy
            }
        })
        return ct
    }


    locloaiphieu(loaiphieu) {
        console.log(loaiphieu)
        if (loaiphieu === "Tất cả phiếu") {
            axios({
                method: "GET",
                url: `https://tttn.herokuapp.com/api/phieuxuatnhap`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(response => {
                this.setState({
                    coupons: response.data.listphieu
                })
            })
        }
        else {
            axios({
                method: "GET",
                url: `https://tttn.herokuapp.com/api/phieuxuatnhap/${loaiphieu}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },

            }).then(response => {
                this.setState({
                    coupons: response.data.listphieunhap
                })
            })
        }

    }


    render() {
        let { companies, coupons, isShowSelect, isShowInfoCou, isShowAddCT, isShowAddPN, loading1, loading2, isShowFormXoaPhieu } = this.state
        let listcongty = companies.map((company, index) => {
            return <ItemCongTy congty={company} key={index} />
        })
        let listphieu = coupons.map((coupon, index) => {
            return <ItemPhieu xemctphieu={this.xemctphieu} phieu={coupon} key={index} tenct={this.timcongty(coupon.CongTy)} showformxoaphieu={this.showformxoaphieu} />
        })
        let locphieu, infocou, formaddcongty, formthempn, formxoaphieu
        if (isShowSelect === true) {
            locphieu = <LocPhieu locloaiphieu={this.locloaiphieu} />
        } else locphieu = ''
        if (isShowInfoCou === true) {
            infocou = <FormThongTinPhieu thoatctphieu={this.thoatctphieu} />
        }
        else infocou = ''
        if (isShowAddCT === true) {
            formaddcongty = <FormAddCompany themcongtymoi={this.themcongtymoi} closeformcongty={this.closeformcongty} />
        }
        else formaddcongty = ''
        if (isShowAddPN === true) {
            formthempn = <FormThemPN closeformthempn={this.closeformthempn} addcoupon={this.addcoupon} />
        }
        else formthempn = ''
        if (isShowFormXoaPhieu === true) {
            formxoaphieu = <FormXoaPhieu closeformxoaphieu={this.closeformxoaphieu} xoaphieu={this.xoaphieu} />
        }
        else isShowFormXoaPhieu = ''
        return (
            <div className="listproductadmin showwithsidebar">
                {infocou}
                {formaddcongty}
                {formthempn}
                {formxoaphieu}
                <ToastContainer />
                <ul className="productadmin__navbar">
                    <li className="navbar__item">
                        <div className="nav__iconList"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="file-alt" className="svg-inline--fa fa-file-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z"></path></svg>
                        </svg></div>
                        <h3>Phiếu nhập xuất</h3>
                    </li>
                </ul>
                <div className="groupbtnuserlist">
                    <div className="btnadduser" onClick={this.handleShowSelect}>
                        <button>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="svg-inline--fa fa-search fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                            <p>Lọc phiếu</p>
                        </button>

                    </div>
                    {locphieu}
                    <div className="btnadduser" onClick={this.showformcongty}>
                        <button>

                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="warehouse" className="svg-inline--fa fa-warehouse fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z"></path></svg>
                            <p>Thêm công ty</p>
                        </button>
                    </div>
                    <div className="btnadduser" onClick={this.showformthempn}>
                        <button>

                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="warehouse" className="svg-inline--fa fa-warehouse fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z"></path></svg>
                            <p>Tạo PN</p>
                        </button>
                    </div>
                </div>
                <div className="alltable">
                    <div className="listphieu">
                        <ul className="column phieunhapxuat">
                            <li className="tencongty"><p>Công ty</p></li>
                            <li className="ngaynhap"><p>Ngày nhập</p></li>
                            <li className="loaiphieu"><p>Loại phiếu</p></li>
                            <li className="chinhsua"><p>Chỉnh sửa</p></li>
                        </ul>
                        {loading1 ? (<ClipLoader size={30} color={"#F37A24"} loading={loading1} />) :
                            <div className="listphieuall">
                                {listphieu}
                            </div>}
                    </div>
                    <div className="listcongty">
                        <ul className="column congty">
                            <li className="tencongty"><p>Tên công ty</p></li>
                            <li className="sdt"><p>Số điện thoại</p></li>
                            <li className="diachi"><p>Địa chỉ</p></li>

                        </ul>
                        {loading2 ? (<ClipLoader size={30} color={"#F37A24"} loading={loading2} />) :
                            <div className="listcongtyall">
                                {listcongty}
                            </div>}
                    </div>
                </div>
            </div>
        )
    }
}

class FormXoaPhieu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            check: true
        }
        this.closeformxoaphieu = this.closeformxoaphieu.bind(this)
        this.xoaphieu = this.xoaphieu.bind(this)
    }

    xoaphieu() {
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/kiemtrasoluongton`,
            data: {
                MaPhieu: sessionStorage.getItem('iddelphieu')
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        }).then(response => {
            axios({
                method: "PUT",
                url: `https://tttn.herokuapp.com/api/select/xoaphieuxuat`,
                data: {
                    MaPhieu: sessionStorage.getItem('iddelphieu')
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(response => {

                })
                .catch(err => {
                    console.log(err)

                })
            axios({
                method: "DELETE",
                url: `https://tttn.herokuapp.com/api/phieuxuatnhap/${sessionStorage.getItem('iddelphieu')}`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(response => {
                    this.props.xoaphieu(sessionStorage.getItem('iddelphieu'))
                    sessionStorage.removeItem('iddelphieu')
                })
        })
            .catch(err => {
                toast.error('Số lượng tồn của sản phẩm trong kho không đủ', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })



    }

    closeformxoaphieu() {
        this.props.closeformxoaphieu()
        sessionStorage.removeItem('iddelphieu')

    }
    render() {
        return (
            <div className="addProductoverlay">
                <ToastContainer />
                <div className="deleteProductForm">
                    <div className="editproduct__title">Bạn muốn xóa phiếu {sessionStorage.getItem('iddelphieu')} </div>
                    <div className="editProduct__logo">
                        <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg></div>
                    <div className="groupbtn">
                        <button className='btn xoa' onClick={this.xoaphieu}>Đồng ý</button>
                        <button className='btn thoat' onClick={this.closeformxoaphieu}>Thoát</button>
                    </div>

                </div>
            </div>
        )
    }
}

class ItemPhieu extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.xemctphieu = this.xemctphieu.bind(this)
        this.showformxoaphieu = this.showformxoaphieu.bind(this)
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

    xemctphieu() {
        sessionStorage.setItem("idphieu", this.props.phieu._id)
        sessionStorage.setItem("ngaylapphieu", this.props.phieu.NgayNhap)
        sessionStorage.setItem("tencongty", this.props.tenct)
        this.props.xemctphieu()
    }

    showformxoaphieu() {
        sessionStorage.setItem('iddelphieu', this.props.phieu._id)
        this.props.showformxoaphieu()
    }

    render() {
        let btnxoa;
        if (this.props.phieu.LoaiPhieu === "Phiếu nhập") {
            btnxoa = <span onClick={this.showformxoaphieu}>Xóa</span>

        }
        return (
            <ul className="item phieu">
                <li className="tencongty1"><p>{this.props.tenct}</p></li>
                <li className="ngaynhap1"><p>{this.convertDate(this.props.phieu.NgayNhap)}</p></li>
                <li className="loaiphieu1"><p>{this.props.phieu.LoaiPhieu}</p></li>
                <li className="chinhsua1"><span onClick={this.xemctphieu}>Xem</span>
                    {btnxoa}
                </li>
            </ul>
        )
    }
}

class LocPhieu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 'Tất cả phiếu'
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(e) {
        this.setState({
            value: e.target.value
        })
        this.props.locloaiphieu(e.target.value)
    }

    render() {
        console.log(this.state.value)
        return (
            <div className="locphieu" >
                <div className='groupbtn'>
                    <p>Chọn loại phiếu</p>
                    <select onChange={this.handleSelect}>
                        <option value="Tất cả phiếu">Tất cả phiếu</option>
                        <option value="Phiếu nhập">Phiếu nhập</option>
                        <option value="Phiếu xuất">Phiếu xuất</option>
                    </select>
                </div>
            </div>
        )
    }
}
class ItemCongTy extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ul className="item itemcongty">
                <li className="tencongty"><p>{this.props.congty.TenCongTy}</p></li>
                <li className="sdt1"><p>{this.props.congty.sdt}</p></li>
                <li className="diachi1"><span>{this.props.congty.DiaChi}</span></li>
            </ul>
        )
    }
}

class FormThongTinPhieu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: [],
            loading: true
        }
        this.thoatctphieu = this.thoatctphieu.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/ctphieu/${sessionStorage.getItem("idphieu")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                details: response.data.listCTPhieu,
                loading: false
            })
        })
    }

    thoatctphieu() {
        this.props.thoatctphieu()
        sessionStorage.removeItem("ngaylapphieu")
        sessionStorage.removeItem("tencongty")
        sessionStorage.removeItem("idphieu")
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

    render() {
        let { details, loading } = this.state
        let listctphieu = details.map((ctphieu, index) => {
            return <ItemCTPhieu ctphieu={ctphieu} key={index} />
        })
        return (
            <div className="addProductoverlay">
                {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                    <div className="formthongtinphieu">
                        <div className="thongtinphieu__title">
                            <div className="content">
                                <h3>Thông tin phiếu:</h3>
                                <h4>{sessionStorage.getItem("idphieu")}</h4>
                            </div>
                        </div>
                        <div className="thongtinphieu__info">
                            <div className="allcontent">
                                <div className="content">
                                    <p>Ngày tạo phiếu:</p>
                                    <span>{this.convertDate(sessionStorage.getItem("ngaylapphieu"))}</span>
                                </div>
                                <div className="content">
                                    <p>Công ty:</p>
                                    <span>{sessionStorage.getItem("tencongty")}</span>
                                </div>
                            </div>
                        </div>
                        <div className="listCTPhieu">
                            <ul className="column">
                                <li className="img"><p>Hình ảnh</p></li>
                                <li className="tensp"><p>Tên sản phẩm</p></li>
                                <li className="soluong"><p>Số lượng</p></li>
                                <li className="gia"><p>Giá</p></li>
                            </ul>
                            <div className="listItemCTPhieu">
                                {listctphieu}
                            </div>
                        </div>
                        <div className="groupbtn">
                            <button onClick={this.thoatctphieu}>Thoát</button>
                        </div>
                    </div>}
            </div>
        )
    }
}

class ItemCTPhieu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: {}
        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/product/${this.props.ctphieu.MaSP}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    product: response.data.productget
                })
            })
    }

    render() {
        return (
            <ul className="item">
                <li className="img"><img src={this.state.product.img} /></li>
                <li className="tensp"><p>{this.state.product.TenSP}</p></li>
                <li className="soluong"><p>{this.props.ctphieu.SoLuong}</p></li>
                <li className="gia"><p>{this.props.ctphieu.Gia}</p></li>
            </ul>
        )
    }
}

class FormAddCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TenCongTy: '',
            DiaChi: '',
            SDT: '',
            LoaiCongTy: 'Nhà Xuất Bản'
        }
        this.closeformcongty = this.closeformcongty.bind(this)
        this.handleTenCT = this.handleTenCT.bind(this)
        this.handleDiaChi = this.handleDiaChi.bind(this)
        this.handleLoaiCT = this.handleLoaiCT.bind(this)
        this.handleSDT = this.handleSDT.bind(this)
        this.themcongty = this.themcongty.bind(this)
    }
    closeformcongty() {
        this.props.closeformcongty()
    }

    themcongty() {
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/congty/insert`,
            data: {
                TenCongTy: this.state.TenCongTy,
                DiaChi: this.state.DiaChi,
                sdt: this.state.SDT,
                LoaiCongTy: this.state.LoaiCongTy
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                toast.success(`Thêm công ty thành công`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(() => {
                    this.props.themcongtymoi(response.data.newcongty)
                    this.props.closeformcongty()
                }, 500)

            })
    }

    handleTenCT(event) {
        this.setState({
            TenCongTy: event.target.value
        })
    }
    handleDiaChi(event) {
        this.setState({
            DiaChi: event.target.value
        })
    } handleSDT(event) {
        this.setState({
            SDT: event.target.value
        })
    } handleLoaiCT(event) {
        this.setState({
            LoaiCongTy: event.target.value
        })
    }

    render() {
        return (<div className="addProductoverlay">
            <div className="formthemcongty">
                <div className="themcongty__title">
                    <div className="content"><h3>Thêm công ty</h3>
                    </div>
                </div>
                <div className="icon">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="warehouse" className="svg-inline--fa fa-warehouse fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M504 352H136.4c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0 96H136.1c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm0-192H136.6c-4.4 0-8 3.6-8 8l-.1 48c0 4.4 3.6 8 8 8H504c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm106.5-139L338.4 3.7a48.15 48.15 0 0 0-36.9 0L29.5 117C11.7 124.5 0 141.9 0 161.3V504c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V256c0-17.6 14.6-32 32.6-32h382.8c18 0 32.6 14.4 32.6 32v248c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V161.3c0-19.4-11.7-36.8-29.5-44.3z"></path></svg>
                </div>
                <div className="themcongty__info">
                    <div className="content">
                        <p>Tên công ty</p>
                        <input type="text" placeholder="Nhập tên công ty" onChange={this.handleTenCT} value={this.state.TenCongTy} />
                    </div>
                    <div className="err"><p><br></br></p></div>

                    <div className="content">
                        <p>Số điện thoại</p>
                        <input type="text" placeholder="Số điện thoại" onChange={this.handleSDT} value={this.state.SDT} />
                    </div>
                    <div className="err"><p><br></br></p></div>


                    <div className="content">
                        <p>Địa chỉ</p>
                        <input type="text" placeholder="Địa chỉ" onChange={this.handleDiaChi} value={this.state.DiaChi} />
                    </div>
                    <div className="err"><p><br></br></p></div>
                    <div className="content">
                        <p>Loại công ty</p>
                        <select onChange={this.handleLoaiCT} value={this.state.LoaiCongTy}>
                            <option value="Nhà xuất bản">Nhà Xuất Bản</option>
                            <option value="Vận Chuyển">Vận Chuyển</option>
                        </select>
                    </div>
                </div>
                <div className="groupbtn">
                    <div className="group">
                        <button onClick={this.themcongty}>Thêm mới</button>
                        <button onClick={this.closeformcongty}>Thoát</button>
                    </div>
                </div>
            </div>
        </div>)
    }
}

class FormThemPN extends Component {
    constructor(props) {
        super(props)
        this.state = {
            details: [],
            congty: {},
        }
        this.closeformthempn = this.closeformthempn.bind(this)
        this.adddetailtolist = this.adddetailtolist.bind(this)
        this.chonct = this.chonct.bind(this)
        this.taophieunhap = this.taophieunhap.bind(this)
        this.popkhoilist = this.popkhoilist.bind(this)
    }


    popkhoilist(ctpn) {
        let listdetail = this.state.details
        remove(listdetail, (item) => {
            return item === ctpn
        })
        this.setState({
            details: listdetail
        })
    }

    taophieunhap() {
        if (this.state.details.length > 0) {
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/phieuxuatnhap/insert`,
                data: {
                    LoaiPhieu: "Phiếu nhập",
                    CongTy: this.state.congty._id
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(response => {

                    for (let i = 0; i < this.state.details.length; i++) {
                        axios({
                            method: "POST",
                            url: `https://tttn.herokuapp.com/api/ctphieu/insert`,
                            data: {
                                SoLuong: this.state.details[i].soluong,
                                Gia: this.state.details[i].gianhap,
                                MaPhieu: response.data.phieunhapnew._id,
                                MaSP: this.state.details[i].idsp
                            },
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        })
                        axios({
                            method: "PUT",
                            url: `https://tttn.herokuapp.com/api/product/${this.state.details[i].idsp}`,
                            data: {
                                TenSP: this.state.details[i].tensp,
                                SoLuong: parseInt(this.state.details[i].slcu) + parseInt(this.state.details[i].soluong),
                                DonGia: this.state.details[i].giagoc,
                                KhuyenMai: this.state.details[i].KhuyenMai,
                                Mota: this.state.details[i].Mota,
                                img: this.state.details[i].img,
                                loaisp: this.state.details[i].loaisp,
                                TacGia: this.state.details[i].tacgia
                            },
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                            }
                        })
                    }
                    setTimeout(() => {
                        this.props.addcoupon(response.data.phieunhapnew)
                        this.props.closeformthempn()
                    }, 500)
                })
        }
        else alert("Chưa có sản phẩm nào")
    }




    closeformthempn() {
        this.props.closeformthempn()
    }

    adddetailtolist(ctpn) {
        let arrdetail = this.state.details

        arrdetail.push(ctpn)
        this.setState({
            details: arrdetail
        })
    }

    chonct(cty) {
        this.setState({
            congty: cty
        })
    }

    render() {
        let { details, congty } = this.state
        let listdetail = details.map((detail, index) => {
            return <ItemCTPN detail={detail} key={index} popkhoilist={this.popkhoilist} />
        })
        return (
            <div className="addProductoverlay">
                <div className="formthempn">
                    <div className="thempn__title">
                        <h3>Tạo 1 phiếu nhập</h3>
                    </div>
                    <Search adddetailtolist={this.adddetailtolist} chonct={this.chonct} />
                    <div className="tencongty">
                        <div className="content">
                            <p>Tên công ty: </p><span> {congty.TenCongTy}</span>
                        </div>
                    </div>
                    <div className="listctpn">
                        <ul className="column">
                            <li className="img"><p>Hình ảnh</p></li>
                            <li className="tensanpham"><p>Tên sản phẩm</p></li>
                            <li className="soluong"><p>Số lượng</p></li>
                            <li className="gia"><p>Giá</p></li>
                            <li className="tuychon"><p>Tuỳ chọn</p></li>
                        </ul>
                        <div className="listctpnitem" >
                            {listdetail}
                        </div>
                    </div>
                    <div className="groupbtn">
                        <button onClick={this.taophieunhap}>Tạo phiếu</button>
                        <button onClick={this.closeformthempn}>Thoát</button>
                    </div>
                </div>

            </div>
        )
    }
}

class ItemCTPN extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.popkhoilist = this.popkhoilist.bind(this)
    }

    popkhoilist() {
        this.props.popkhoilist(this.props.detail)
        console.log(this.props.detail)
    }

    render() {
        return (
            <ul className="item">
                <li className="img"><img src={this.props.detail.img} /></li>
                <li className="tensanpham"><p>{this.props.detail.tensp}</p></li>
                <li className="soluong"><p>{this.props.detail.soluong}</p></li>
                <li className="gia"><p>{this.props.detail.gianhap}</p></li>
                <li className="tuychon" onClick={this.popkhoilist}><p><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash" class="svg-inline--fa fa-trash fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg></p></li>
            </ul>
        )
    }
}

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tenct: '',
            tensp: '',
            listSP: [],
            listCT: [],
            timct: [],
            timsp: [],
            isShowSearchSP: false,
            isShowSearchCT: false,
            isShowFormAddDetail: false
        }
        this.handleTenCT = this.handleTenCT.bind(this)
        this.handleTenSP = this.handleTenSP.bind(this)
        this.timtenct = this.timtenct.bind(this)
        this.blurct = this.blurct.bind(this)
        this.timtensp = this.timtensp.bind(this)
        this.blursp = this.blursp.bind(this)
        this.showadddetail = this.showadddetail.bind(this)
        this.closeadddetail = this.closeadddetail.bind(this)
        this.clickchon = this.clickchon.bind(this)
    }
    handleTenCT(e) {
        this.setState({
            tenct: e.target.value,
            isShowSearchCT: false,
            isShowSearchSP: false
        })
    }

    showadddetail() {
        this.setState({
            isShowFormAddDetail: true,
            isShowSearchCT: false,
            isShowSearchSP: false
        })
    }

    closeadddetail() {
        this.setState({
            isShowFormAddDetail: false,
            isShowSearchCT: false,
            isShowSearchSP: false
        })
    }

    closeformsearchsp() {
        this.setState({
            isShowSearchSP: false
        })
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/product/all`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    listSP: response.data.products
                })
            })
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/congty/Nhà Xuất Bản`,
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

    handleTenSP(e) {
        this.setState({
            tensp: e.target.value,
            isShowSearchSP: false,
            isShowSearchCT: false

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



    timtensp() {
        let selectct = []
        this.state.listSP.filter((item) => {
            if (item.TenSP.toLowerCase().includes(this.state.tensp.toLowerCase()))
                selectct.push(item)
        })
        this.setState({
            timsp: selectct,
            isShowSearchSP: true,
            isShowSearchCT: false
        })
    }

    blursp() {
        this.setState({
            timsp: [],
            isShowSearchSP: false,
            isShowSearchCT: false
        })
    }

    clickchon() {
        this.setState({
            isShowSearchSP: false,
            isShowSearchCT: false
        })
    }


    render() {
        let { timsp, isShowSearchSP, isShowSearchCT, timct, isShowFormAddDetail } = this.state
        let formsearchsp, formsearchct, formadddetail
        if (isShowSearchSP === true) {
            formsearchsp = <FormSelectSP listsp={timsp} clickchon={this.clickchon} showadddetail={this.showadddetail} adddetailtolist={this.props.adddetailtolist} />
        }
        if (isShowSearchCT === true) {
            formsearchct = <FormSelectCT listct={timct} chonct={this.props.chonct} clickchon={this.clickchon} />
        }
        if (isShowFormAddDetail === true) {
            formadddetail = <FormAddCTPN closeadddetail={this.closeadddetail} adddetailtolist={this.props.adddetailtolist} />
        }
        else formadddetail = ""
        return (
            <div className="luachon">
                {formadddetail}
                <div className="luachon__input">
                    <p>Tên công ty: </p>
                    <input type="text" placeholder="Nhập tên công ty" onBlur={this.blurct} onChange={this.handleTenCT} value={this.state.tenct} />
                    <button onClick={this.timtenct}>Tìm</button>
                    {formsearchct}
                </div>

                <div className="luachon__input">
                    <p>Sản phẩm: </p>
                    <input type="text" placeholder="Nhập tên sản phẩm" onBlur={this.blursp} onChange={this.handleTenSP} value={this.state.tensp} />
                    <button onClick={this.timtensp}>Tìm</button>
                    {formsearchsp}
                </div>
            </div>
        )
    }
}

class FormAddCTPN extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soluong: 0,
            gianhap: 0,
            tensp: '',
            idsp: '',
            giagoc: 0,
            img: '',
            slcu: 0,
            tacgia: '',
            Mota: '',
            loaisp: '',
            KhuyenMai: 0
        }
        this.handleSL = this.handleSL.bind(this)
        this.handleGia = this.handleGia.bind(this)
        this.closeadddetail = this.closeadddetail.bind(this)
        this.adddetailtolist = this.adddetailtolist.bind(this)
    }

    handleSL(e) {
        this.setState({
            soluong: e.target.value
        })
    }

    handleGia(e) {
        this.setState({
            gianhap: e.target.value
        })
    }

    closeadddetail() {
        this.props.closeadddetail()
    }


    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/product/${sessionStorage.getItem('idsppn')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    tensp: response.data.productget.TenSP,
                    idsp: response.data.productget._id,
                    giagoc: response.data.productget.DonGia,
                    img: response.data.productget.img,
                    tacgia: response.data.productget.TacGia,
                    Mota: response.data.productget.Mota,
                    loaisp: response.data.productget.loaisp,
                    KhuyenMai: response.data.productget.KhuyenMai,
                    slcu: response.data.productget.SoLuong
                })
            })
    }
    adddetailtolist() {
        sessionStorage.removeItem("idsppn")
        // if (this.state.gianhap > this.state.giagoc || this.state.gianhap === 0) {
        //     toast.error('Giá nhập phải nhỏ hơn giá gốc', {
        //         position: "top-right",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }
        // else {
        this.props.adddetailtolist(this.state)
        toast.success(`Thêm ${this.state.tensp} thành công`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        this.props.closeadddetail()
        // }


    }

    render() {
        return (
            <div className="addProductoverlay">
                <div className="forminfoctpn">
                    <div className="infoctpn__title">
                        <h3>Tạo CTPN</h3>
                    </div>
                    <div className="infoctpn__contentall">
                        <div className="content">
                            <p>Tên sản phẩm: </p>
                            <span>{this.state.tensp}</span>
                        </div>
                        <div className="content">
                            <p>Số lượng: </p>
                            <input type="Number" onChange={this.handleSL} value={this.state.soluong} />
                        </div>
                        <div className="content">
                            <p>Giá nhập: </p>
                            <input type="Number" onChange={this.handleGia} value={this.state.gianhap} />
                        </div>
                    </div>
                    <div className="groupbtn">
                        <button onClick={this.adddetailtolist}>Thêm</button>
                        <button onClick={this.closeadddetail}>Thoát</button>
                    </div>
                </div>
            </div>

        )
    }
}

class FormSelectSP extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
    render() {
        let listsp = this.props.listsp.map((sp, index) => {
            return <ItemsearchSp sp={sp} key={index} showadddetail={this.props.showadddetail} clickchon={this.props.clickchon} />
        })
        return (
            <div className="search__tensp">
                {listsp}

            </div>
        )
    }
}

class ItemsearchSp extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.themctplist = this.themctplist.bind(this)
    }

    themctplist() {
        sessionStorage.setItem("idsppn", this.props.sp._id)
        this.props.showadddetail()
        this.props.clickchon()
    }

    render() {
        return (
            <ul className="item">
                <li className="img"><img src={this.props.sp.img} /></li>
                <li className="tensp"><p>{this.props.sp.TenSP}</p></li>
                <li className="tuychon" onClick={this.themctplist}><button>Thêm</button></li>

            </ul>
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