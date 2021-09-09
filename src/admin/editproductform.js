import axios from 'axios'
import { Component } from 'react'
import { storage } from '../firebase/index'
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class EditProductForm extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            setImage: '',
            LoaiSP: [],
            TenSP: '',
            Gia: '',
            SoLuong: '',
            KhuyenMai: '',
            Loai: '',
            MoTa: '',
            TacGia: '',
            img: '',
            loading: true
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
        this.editProduct = this.editProduct.bind(this)
        this.handleCloseEditproduct = this.handleCloseEditproduct.bind(this)
    }

    handleChange(e) {
        if (e.target.files[0]) {
            this.setState({
                setImage: e.target.files[0]
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
            url: `https://tttn.herokuapp.com/api/product/${sessionStorage.getItem("ideditproduct")}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                TenSP: response.data.productget.TenSP,
                Gia: response.data.productget.DonGia,
                SoLuong: response.data.productget.SoLuong,
                KhuyenMai: response.data.productget.KhuyenMai,
                Loai: response.data.productget.loaisp,
                MoTa: response.data.productget.Mota,
                TacGia: response.data.productget.TacGia,
                img: response.data.productget.img,

            })
            console.log(response.data.productget)
        })
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/category/all"
        }).then(response => {
            this.setState({
                LoaiSP: response.data.categories,
                loading: false
            })
        })
    }

    handleCloseEditproduct() {
        sessionStorage.removeItem("ideditproduct")
        this.handleCloseEditproduct = this.props.handleCloseEditproduct()
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

    editProduct() {
        console.log(this.state)
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/product/${sessionStorage.getItem("ideditproduct")}`,
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
        }).then(response => {
            toast.success('Sửa sản phẩm thành công', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }).catch(error => {
            toast.error('Sửa sản phẩm thất bại', {
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


    render() {
        let types = this.state.LoaiSP.map((type, index) => {
            return <option value={type._id} key={index}>{type.TenLoai}</option>
        })
        let { loading } = this.state
        return (
            <div className="editProductoverlay">
                <ToastContainer />
                {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :

                    <div className="editProductForm">
                        <div className="addproduct__title">
                            <h3>Chỉnh sửa thông tin sản phẩm</h3>
                        </div>
                        <div className="infoaddproduct">
                            <div className="addproduct__content">
                                <div className="addproduct__row">
                                    <input type="text" className="addproduct__input" placeholder="Tên sản phẩm" onChange={this.handleChangeTenSP} value={this.state.TenSP} />
                                </div>
                                <div className="addproduct__row">
                                    <input type="text" className="addproduct__input" placeholder="Giá" onChange={this.handleChangeGia} value={this.state.Gia} />
                                </div>
                                <div className="addproduct__row">
                                    <input type="text" className="addproduct__input" placeholder="Số lượng" onChange={this.handleChangeSoLuong} value={this.state.SoLuong} />
                                </div>
                                <div className="addproduct__row">
                                    <input type="text" className="addproduct__input" placeholder="Khuyến mãi" onChange={this.handleChangeKhuyenMai} value={this.state.KhuyenMai} />
                                </div>
                                <div className="addproduct__row">
                                    <input type="text" className="addproduct__input" placeholder="Mô tả" onChange={this.handleChangeMoTa} value={this.state.MoTa} />
                                </div>
                                <div className="addproduct__row">
                                    <select id="typesinadd" onChange={this.handleChangeLoai}>
                                        {types}
                                    </select>
                                </div>
                                <div className="addproduct__row">
                                    <input type="text" className="addproduct__input" placeholder="Tác giả" onChange={this.handleChangeTacGia} value={this.state.TacGia} />
                                </div>

                            </div>
                            <div className="addProduct__img">
                                <img src={this.state.img || "https://iweb.tatthanh.com.vn/pic/3/blog/images/logo-sach(77).jpg"} alt="firebase-image" />

                                <div className="buttonaddimg">
                                    <input className="inputaddImg" type="file" onChange={this.handleChange} />
                                    {/* <button onClick={this.handleUpload}>Upload</button> */}
                                </div>
                            </div>
                        </div>
                        <div className="addproduct__btn">
                            <button className="btnThem" onClick={this.editProduct}>Update</button>
                            <button className="btnThoat" onClick={this.handleCloseEditproduct}>Thoát</button>
                        </div>
                    </div>}
            </div>
        );
    }
}