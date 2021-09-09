import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import BackHomepage from "./backHomepage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isShowQuenMK: false,
            isShowMaXN: false,
            isShowMKMoi: false,
            loading: false
        }
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.btnClickLogin = this.btnClickLogin.bind(this)
        this.handleQuenMK = this.handleQuenMK.bind(this)
        this.closeQuenMK = this.closeQuenMK.bind(this)
        this.handleMaXN = this.handleMaXN.bind(this)
        this.closeMaXN = this.closeMaXN.bind(this)
        this.handleMKMoi = this.handleMKMoi.bind(this)
        this.closeMKMoi = this.closeMKMoi.bind(this)
        this.doimkthanhcong = this.doimkthanhcong.bind(this)
    }


    componentDidMount() {

    }

    handleQuenMK() {
        this.setState({
            isShowQuenMK: true
        })
    }
    closeQuenMK() {
        this.setState({
            isShowQuenMK: false
        })
    }
    handleMaXN() {
        this.setState({
            isShowMaXN: true
        })
    }
    closeMaXN() {
        this.setState({
            isShowMaXN: false
        })
    }
    handleMKMoi() {
        this.setState({
            isShowMKMoi: true
        })
    }
    closeMKMoi() {
        this.setState({
            isShowMKMoi: false
        })
    }

    btnClickLogin() {
        this.setState({
            loading: true
        })
        if (this.state.email === "") {
            document.querySelector(".gmailerr").innerHTML = "<p>Vui lòng điền gmail</p>"
        }
        if (this.state.password === "") {
            document.querySelector(".passerr").innerHTML = "<p>Vui lòng điền mật khẩu</p>"
        }
        if (this.state.email !== '' && this.state.password !== '') {
            axios({
                method: "POST",
                url: 'https://tttn.herokuapp.com/api/auth/login',
                data: {
                    email: this.state.email,
                    password: this.state.password
                }
            }).then(response => {

                if (response.data.user.active === "block") {
                    document.querySelector(".passerr").innerHTML = "<p>Tài khoản này đã bị khóa</p>"
                }
                else {
                    if (response.data.user.role === 'customer') {
                        console.log(response.data.user.accessToken)
                        localStorage.setItem("accessToken", response.data.accessToken)
                        localStorage.setItem("name", response.data.user.name)
                        localStorage.setItem("id", response.data.user._id)
                        localStorage.setItem("role", response.data.user.role)
                        localStorage.setItem("diachi", response.data.user.diachi)
                        this.props.history.push("/")
                    }
                    else if (response.data.user.role === 'admin') {
                        localStorage.setItem("accessToken", response.data.accessToken)
                        localStorage.setItem("name", response.data.user.name)
                        localStorage.setItem("id", response.data.user._id)
                        localStorage.setItem("role", response.data.user.role)

                        this.props.history.push("/admin")
                    }
                    this.setState({
                        loading: false
                    })
                }

            }).catch(err => {
                this.setState({
                    loading: false
                })
                document.querySelector(".passerr").innerHTML = "<p>Gmail hoặc mật khẩu không chính xác</p>"
            })
        }
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    handleChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    doimkthanhcong() {
        this.setState({
            isShowMKMoi: false,
            isShowMaXN: false,
            isShowQuenMK: false
        })
        toast.success('Đổi mật khẩu thành công!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    render() {
        let { isShowMKMoi, isShowMaXN, isShowQuenMK, loading } = this.state
        let formquenmk, formmaxn, formmkmoi
        if (isShowQuenMK === true) {
            formquenmk = <FormQuenMatKhau closeQuenMK={this.closeQuenMK} handleMaXN={this.handleMaXN} />
        }
        if (isShowMaXN === true) {
            formmaxn = <FormMaXNQuenMK closeMaXN={this.closeMaXN} handleMKMoi={this.handleMKMoi} />
        }
        if (isShowMKMoi === true) {
            formmkmoi = <FormNhapMKMoi closeMKMoi={this.closeMKMoi} doimkthanhcong={this.doimkthanhcong} />
        }
        return (<div>
            <BackHomepage />
            <ToastContainer />
            {/* <FormNhapMKMoi /> */}
            {/* <FormMaXNQuenMK /> */}
            {formquenmk}
            {formmaxn}
            {formmkmoi}
            <div className="dangnhap" style={{ backgroundImage: 'url(https://th.bing.com/th/id/R.17bacde7417ced8892d5257d7eae082e?rik=G1bJcb6dCfA3gA&riu=http%3a%2f%2ffile.vforum.vn%2fhinh%2f2016%2f08%2fhinh-anh-quyen-sach-dep-9.jpg&ehk=LNiVzdZFW2yx%2blD8tTamGKilqgD1%2bdQdcRVX2vrxyaA%3d&risl=&pid=ImgRaw)' }}>
                <div className="formdangnhap">
                    <div className="form__title">
                        <h3>LOGIN</h3>
                    </div>
                    <div className="form__input">
                        <input type="text" placeholder="USERNAME" onChange={this.handleChangeEmail} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err gmailerr"><br></br></div>
                    <div className="form__input">
                        <input type="password" placeholder="PASSWORD" onChange={this.handleChangePassword} />
                        <div className="form__icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z">
                                </path>
                            </svg>
                        </div>
                    </div>
                    <div className="err passerr"><br></br></div>

                    <h5 onClick={this.handleQuenMK}>Quên mật khẩu</h5>
                    <div className="loaddoimk">
                        {loading ? (<ClipLoader size={20} color={"#F37A24"} loading={loading} />) :
                            <br></br>}</div>
                    <button className="btn-green" onClick={this.btnClickLogin}>Đăng nhập</button>
                    <div className="form__regis">
                        <div className="contain">
                            <p className="regis__title">Bạn chưa có tài khoản? Click</p>
                            <Link to="/regis">
                                <button className="button-DN">Đăng ký</button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div></div>)
    }
}

class FormQuenMatKhau extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.checkgmail = this.checkgmail.bind(this)
        this.closeQuenMK = this.closeQuenMK.bind(this)
    }

    checkgmail() {
        this.setState({
            loading: true
        })
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/auth/kiemtragmail`,
            data: {
                email: this.state.input
            }
        })
            .then(response => {
                document.querySelector(".saimxn").innerHTML = "<p>Email không tồn tại</p>"
                this.setState({
                    loading: false
                })
            })
            .catch((err) => {
                this.props.closeQuenMK()
                this.props.handleMaXN()
                axios({
                    method: "POST",
                    url: `https://tttn.herokuapp.com/api/select/otpUser`,
                    data: {
                        email: this.state.input

                    }
                })
                    .then(response => {
                        sessionStorage.setItem('maxnquenmk', response.data.otp)
                        sessionStorage.setItem('email', this.state.input)
                        this.setState({
                            loading: false
                        })
                    })
                    .catch(err => {

                    })
            })
    }
    closeQuenMK() {
        this.props.closeQuenMK()
        sessionStorage.removeItem('maxnquenmk')
        sessionStorage.removeItem('email')
    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }
    render() {
        let { loading } = this.state
        return (
            <div className="addProductoverlay">
                <div className="formxacnhantk">
                    <h3>Quên mật khẩu</h3>
                    <input type="text" placeholder="Mời nhập gmail" onChange={this.handleChange} />
                    <div className="err saimxn"><br /></div>
                    <div className="loaddoimk">
                        {loading ? (<ClipLoader size={20} color={"#F37A24"} loading={loading} />) :
                            <br></br>}
                    </div>
                    <div className="groupbtn">
                        <button onClick={this.checkgmail}>Xác nhận</button>
                        <button onClick={this.closeQuenMK}>Thoát</button>
                    </div>
                </div>
            </div>
        )
    }
}

class FormMaXNQuenMK extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.closeMaXN = this.closeMaXN.bind(this)
        this.handleMKMoi = this.handleMKMoi.bind(this)
    }


    closeMaXN() {
        this.props.closeMaXN()
        sessionStorage.removeItem('maxnquenmk')
        sessionStorage.removeItem('email')
    }
    handleMKMoi() {
        if (sessionStorage.getItem("maxnquenmk") === this.state.input) {
            this.props.handleMKMoi()
        }
        else document.querySelector(".saimxnmk").innerHTML = "<p>Sai mã xác nhận</p>"

    }
    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return (
            <div className="addProductoverlay">
                <div className="formxacnhantk">
                    <h3>Nhập mã xác nhận</h3>
                    <input type="text" placeholder="Mời nhập mã xác nhận" onChange={this.handleChange} />
                    <div className="err saimxnmk"><br /></div>
                    <div className="groupbtn">
                        <button onClick={this.handleMKMoi}>Xác nhận</button>
                        <button onClick={this.closeMaXN}>Thoát</button>
                    </div>
                </div>
            </div>
        )
    }
}

class FormNhapMKMoi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mk1: '',
            mk2: '',
            user: {},
        }
        this.handleChangeMK1 = this.handleChangeMK1.bind(this)
        this.handleChangeMK2 = this.handleChangeMK2.bind(this)
        this.doimkthanhcong = this.doimkthanhcong.bind(this)
        this.closeMKMoi = this.closeMKMoi.bind(this)
    }
    handleChangeMK1(e) {
        this.setState({
            mk1: e.target.value
        })
        if (e.target.value !== '') {
            document.querySelector('.saimxn1').innerHTML = '<br></br>'
        }
    }
    handleChangeMK2(e) {
        this.setState({
            mk2: e.target.value
        })
        if (e.target.value !== '') {
            document.querySelector('.saimxn2').innerHTML = '<br></br>'
        }
    }
    componentDidMount() {
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/auth/selectgmaildoimk`,
            data: {
                email: sessionStorage.getItem('email')
            }
        })
            .then(response => {
                this.setState({
                    user: response.data.userselect
                })
            })
    }
    doimkthanhcong() {
        if (this.state.mk1 === '') {
            document.querySelector('.saimxn1').innerHTML = '<p>Không được để trống mật khẩu</p>'
        }
        if (this.state.mk2 === '') {
            document.querySelector('.saimxn2').innerHTML = '<p>Không được để trống xác nhận mật khẩu</p>'
        }
        if (this.state.mk2 !== this.state.mk1) {
            document.querySelector('.saimxn2').innerHTML = '<p>Mật khẩu và xác nhận mật khẩu phải giống nhau</p>'
        }
        if (this.state.mk1 !== '' && this.state.mk2 !== '' && this.state.mk2 === this.state.mk1) {
            axios({
                method: "PUT",
                url: `https://tttn.herokuapp.com/api/auth/doimk`,
                data: {
                    email: this.state.user.email,
                    name: this.state.user.name,
                    sdt: this.state.user.sdt,
                    diachi: this.state.user.diachi,
                    role: this.state.user.role,
                    password: this.state.mk1,
                    active: this.state.user.active
                }
            })
                .then(response => {
                    this.props.doimkthanhcong()
                    sessionStorage.removeItem('maxnquenmk')
                    sessionStorage.removeItem('email')
                })
                .catch(err => {
                    document.querySelector('.saimxn2').innerHTML = '<p>Đổi mk thất bại</p>'
                    sessionStorage.removeItem('maxnquenmk')
                    sessionStorage.removeItem('email')
                })
        }
        // this.props.doimkthanhcong()
    }

    closeMKMoi() {
        this.props.closeMKMoi()
        sessionStorage.removeItem('maxnquenmk')
        sessionStorage.removeItem('email')
    }

    render() {
        console.log(this.state.user)
        return (
            <div className="addProductoverlay">
                <div className="formnhapmkmoi">
                    <h3>Nhập mật khẩu mới</h3>
                    <p>Gmail: {sessionStorage.getItem('email')}</p>
                    <input type="password" placeholder="Mời nhập mật khẩu mới" onChange={this.handleChangeMK1} />
                    <div className="err saimxn1"><br /></div>
                    <input type="password" placeholder="Xác nhận mật khẩu" onChange={this.handleChangeMK2} />
                    <div className="err saimxn2"><br /></div>
                    <div className="groupbtn">
                        <button onClick={this.doimkthanhcong}>Xác nhận</button>
                        <button onClick={this.closeMKMoi}>Thoát</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login