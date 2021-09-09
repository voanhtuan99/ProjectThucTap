import axios from 'axios'
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { storage } from '../firebase/index'

export default class AddProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            setImage: '',
            LoaiSP: [],
            TenSP: '',
            Gia: '',
            SoLuong: '',
            KhuyenMai: '',
            Loai: '60fbecaf0a96e32480b86275',
            MoTa: '',
            TacGia: '',
            img: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
        this.handleChangeTenSP = this.handleChangeTenSP.bind(this)
        this.handleChangeGia = this.handleChangeGia.bind(this)
        this.handleChangeSoLuong = this.handleChangeSoLuong.bind(this)
        this.handleChangeKhuyenMai = this.handleChangeKhuyenMai.bind(this)
        this.handleChangeLoai = this.handleChangeLoai.bind(this)
        this.handleChangeTacGia = this.handleChangeTacGia.bind(this)
        this.handleChangeMoTa = this.handleChangeMoTa.bind(this)
        this.addnewProduct = this.addnewProduct.bind(this)
        this.handleCloseaddproduct = this.handleCloseaddproduct.bind(this)
    }

    handleChange(e) {
        if (e.target.files[0]) {
            this.setState({
                setImage: e.target.files[0],
            })
        }
        const uploadTask = storage.ref(`images/${this.state.setImage.name}`).put(this.state.setImage)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(this.state.setImage.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            img: url
                        })
                    })
            }
        )
    }

    handleCloseaddproduct() {
        this.props.handleCloseaddproduct()
    }


    handleUpload() {
        const uploadTask = storage.ref(`images/${this.state.setImage.name}`).put(this.state.setImage)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(this.state.setImage.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            img: url
                        })
                    })
            }
        )
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/category/all"
        }).then(response => {
            this.setState({
                LoaiSP: response.data.categories
            })
        })
    }




    handleChangeTenSP(e) {
        this.setState({
            TenSP: e.target.value
        })
    }

    handleChangeGia(e) {
        this.setState({
            Gia: e.target.value
        })
    }

    handleChangeSoLuong(e) {
        this.setState({
            SoLuong: e.target.value
        })
    }

    handleChangeKhuyenMai(e) {
        this.setState({
            KhuyenMai: e.target.value
        })
    }

    handleChangeMoTa(e) {
        this.setState({
            MoTa: e.target.value
        })
    }

    handleChangeLoai(e) {
        console.log(e.target.value)
        this.setState({
            Loai: e.target.value
        })
    }

    handleChangeTacGia(e) {
        this.setState({
            TacGia: e.target.value
        })
    }


    addnewProduct() {
        const config = {
            headers: {
                Authorization: `Bearer `
            }
        }
        axios({
            method: "POST",
            url: "https://tttn.herokuapp.com/api/product/insert",
            data: {
                TenSP: this.state.TenSP,
                SoLuong: this.state.SoLuong,
                DonGia: this.state.Gia,
                KhuyenMai: this.state.KhuyenMai,
                Mota: this.state.MoTa,
                img: this.state.img,
                loaisp: this.state.Loai,
                TacGia: this.state.TacGia
            },
            // config
        }).then(response => {
            this.props.addproducttolist(response.data.newProduct)
            alert('Thêm thành công')
        }).catch(error => {
            alert(error)
        })
    }

    backAdmin() {
        sessionStorage.setItem('page', 'listproduct')
    }

    render() {
        console.log(this.state.KhuyenMai)
        let types = this.state.LoaiSP.map((type, index) => {
            return <option value={type._id} key={index}>{type.TenLoai}</option>
        })
        return (
            <div className="addProductoverlay">
                <div className="addProductForm">
                    <div className="addproduct__title">
                        <h3>Thêm sản phẩm mới</h3>
                    </div>
                    <div className="infoaddproduct">
                        <div className="addproduct__content">
                            <div className="addproduct__row">
                                <input type="text" className="addproduct__input" placeholder="Tên sản phẩm" onChange={this.handleChangeTenSP} />
                            </div>
                            <div className="addproduct__row">
                                <input type="text" className="addproduct__input" placeholder="Giá" onChange={this.handleChangeGia} />
                            </div>
                            <div className="addproduct__row">
                                <input type="text" className="addproduct__input" placeholder="Số lượng" onChange={this.handleChangeSoLuong} />
                            </div>
                            <div className="addproduct__row">
                                <input type="text" className="addproduct__input" placeholder="Khuyến mãi" onChange={this.handleChangeKhuyenMai} />
                            </div>
                            <div className="addproduct__row">
                                <input type="text" className="addproduct__input" placeholder="Mô tả" onChange={this.handleChangeMoTa} />
                            </div>
                            <div className="addproduct__row">
                                <select id="typesinadd" onChange={this.handleChangeLoai}>
                                    {types}
                                </select>
                            </div>
                            <div className="addproduct__row">
                                <input type="text" className="addproduct__input" placeholder="Tác giả" onChange={this.handleChangeTacGia} />
                            </div>

                        </div>
                        <div className="addProduct__img">
                            <img src={this.state.img || "https://iweb.tatthanh.com.vn/pic/3/blog/images/logo-sach(77).jpg"} alt="firebase-image" id="img" />

                            <div className="buttonaddimg">
                                <input className="inputaddImg" type="file" onChange={this.handleChange} />
                                {/* <button onClick={this.handleUpload}>Upload</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="addproduct__btn">
                        <button className="btnThem" onClick={this.addnewProduct}>Thêm mới</button>
                        <button className="btnThoat" onClick={this.handleCloseaddproduct}>Thoát</button>

                    </div>
                </div>
            </div>
        );
    }
}