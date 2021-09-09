import axios from "axios";
import { Component } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class UserPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isShowFormAdd: false,
            isShowFormDel: false,
            isShowblock: false,
            strSearch: '',
            loading: true
        }
        this.showFormAdd = this.showFormAdd.bind(this)
        this.closeFormAdd = this.closeFormAdd.bind(this)
        this.add1user = this.add1user.bind(this)
        this.delUser = this.delUser.bind(this)
        this.closeDel = this.closeDel.bind(this)
        this.suathongtinthanhcong = this.suathongtinthanhcong.bind(this)
        this.blockUser = this.blockUser.bind(this)
        this.closeblockUser = this.closeblockUser.bind(this)
        this.dablock = this.dablock.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: 'https://tttn.herokuapp.com/api/auth/',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },

        }).then(response => {
            this.setState({
                users: response.data.Users,
                loading: false
            })
        })
        console.log('componentDidMount')
    }

    // componentDidUpdate(pP, pS) {
    //     if (JSON.stringify(pS) !== JSON.stringify(this.state)) {
    //         axios({
    //             method: "GET",
    //             url: 'https://tttn.herokuapp.com/api/auth/',
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             },

    //         }).then(response => {
    //             this.setState({
    //                 users: response.data.Users,
    //                 loading: false
    //             })
    //         })
    //     }
    //     console.log('componentDidMount')
    // }
    showFormAdd() {
        this.setState({
            isShowFormAdd: true
        })
    }

    add1user(user) {
        let arrUser = this.state.users;
        arrUser.push(user)
        console.log(arrUser)
        this.setState({
            users: arrUser
        })
    }
    blockUser() {
        this.setState({
            isShowblock: true
        })
    }
    closeblockUser() {
        this.setState({
            isShowblock: false
        })
    }
    delUser(userdel) {
        this.setState({
            isShowFormDel: true,
        })
    }
    dablock(usernew) {
        let arrUser = this.state.users
        arrUser.forEach((user, key) => {
            if (user.email === usernew.email) {
                console.log(usernew)
                arrUser[key].active = usernew.active
            }
        })
        console.log(arrUser)
        this.setState({
            user: arrUser,
            isShowblock: false
        })

        toast.success(`Đã khóa tài khoản ${usernew.email}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    closeDel() {
        this.setState({
            isShowFormDel: false,
        })
    }

    closeFormAdd() {
        this.setState({
            isShowFormAdd: false
        })
    }
    handleSearch(strsearch) {
        this.setState({
            strSearch: strsearch
        })
    }
    suathongtinthanhcong(usernew) {
        let arrUser = this.state.users
        arrUser.forEach((user, key) => {
            if (user.email === usernew.email) {
                arrUser[key] = usernew
            }
        })
        this.setState({
            user: arrUser,
            isShowFormDel: false,
        })
        toast.success('Sửa thông tin tài khoản thành công', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    render() {
        const search = this.state.strSearch
        let items = []
        let role = localStorage.getItem("role")
        let { users, loading } = this.state
        if (search.length > 0) {
            users.forEach(item => {
                if (item.email.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    items.push(item)
                }
            })
        }
        else items = users

        let listuser = items.map((user, index) => {
            return <User user={user} key={index} delUser={this.delUser} num={index} role={role} blockUser={this.blockUser}></User>
        })

        console.log(sessionStorage.getItem('iddeluser'))
        let grpbtn
        if (role === "admin") {
            grpbtn = <li className="quanly">
                <p>Quản lý</p>
            </li>
        }
        else grpbtn = ''

        let formAdd, formdel, formkhoatk
        if (this.state.isShowFormDel === true) {
            formdel = <FormAcceptDelete suathongtinthanhcong={this.suathongtinthanhcong} closeDel={this.closeDel} />
        }
        if (this.state.isShowFormAdd === true) {
            formAdd = <FormAddUser closeFormAdd={this.closeFormAdd} add1user={this.add1user} />
        }
        if (this.state.isShowblock === true) {
            formkhoatk = <FormKhoaTK closeblockUser={this.closeblockUser} dablock={this.dablock} />
        }

        return (
            <div className="listproductadmin showwithsidebar">
                {formAdd}
                {formdel}
                <ToastContainer />
                {formkhoatk}
                <ul className="productadmin__navbar">
                    <li className="navbar__item">
                        <div className="nav__iconList"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="book" className="svg-inline--fa fa-book fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" className="svg-inline--fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>
                        </svg></div>
                        <h3>USER</h3>
                    </li>
                </ul>

                <div className="groupbtnuserlist">
                    <div className="btnadduser">
                        <button onClick={this.showFormAdd}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
                            <p>+1 user</p>
                        </button>
                    </div>

                </div>
                <SearchUser handleSearch={this.handleSearch} />
                <div className="listUserTable">
                    <ul className="column namecol">
                        <li className="name khong">
                            <p>Họ Tên</p>
                        </li>
                        <li className="Email khong">
                            <p>Email</p>
                        </li>
                        <li className="password khong">
                            <p>Password</p>
                        </li>
                        <li className="sdt khong">
                            <p>SĐT</p>
                        </li>
                        <li className="diachia khong">
                            <p>Địa chỉ</p>
                        </li>
                        <li className="trangthai giua">
                            <p>Trạng thái</p>
                        </li>
                        <li className="role khong">
                            <p>Role</p>
                        </li>
                        {grpbtn}
                    </ul>
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                        <div className="listuserall">
                            {listuser}

                        </div>}

                </div>
            </div>
        )
    }
}

class SearchUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            strSearch: ''
        }
        this.searchuser = this.searchuser.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }
    searchuser(e) {
        this.setState({
            strSearch: e.target.value
        })
    }
    handleSearch() {
        this.props.handleSearch(this.state.strSearch)
    }
    handleClear() {
        this.setState({
            strSearch: ''
        })
        this.props.handleSearch('')

    }
    render() {
        return (
            <div className="searchForm user">
                <input type="text" value={this.state.strSearch} onChange={this.searchuser} placeholder="Nhập địa chỉ gmail" />
                <button onClick={this.handleSearch} className="btn1">Search</button>
                <button onClick={this.handleClear} className="btn2">Clear</button>
            </div>
        )
    }
}
class User extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.delUser = this.delUser.bind(this)
        this.blockUser = this.blockUser.bind(this)
    }

    delUser(id) {
        this.props.delUser()
        sessionStorage.setItem('iddeluser', id)
    }
    blockUser(id) {
        sessionStorage.setItem('idblock', id)
        this.props.blockUser()
    }
    render() {
        let active = this.props.user.active
        console.log(this.props)

        let grpbtn, btnblock
        let activetext
        if (active === "block") {
            activetext = <span style={{ color: "red", fontWeight: 500, marginLeft: 30, fontSize: 16 }}>Block</span>
        } else {
            activetext = <span style={{ color: "blue", fontWeight: 500, marginLeft: 30, fontSize: 16 }}>Active</span>

        }
        if (this.props.user.role === "customer") {
            grpbtn =
                <p className="update" style={{ marginLeft: 3 }}><svg onClick={() => this.delUser(this.props.user._id)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-cog" class="svg-inline--fa fa-user-cog fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M610.5 373.3c2.6-14.1 2.6-28.5 0-42.6l25.8-14.9c3-1.7 4.3-5.2 3.3-8.5-6.7-21.6-18.2-41.2-33.2-57.4-2.3-2.5-6-3.1-9-1.4l-25.8 14.9c-10.9-9.3-23.4-16.5-36.9-21.3v-29.8c0-3.4-2.4-6.4-5.7-7.1-22.3-5-45-4.8-66.2 0-3.3.7-5.7 3.7-5.7 7.1v29.8c-13.5 4.8-26 12-36.9 21.3l-25.8-14.9c-2.9-1.7-6.7-1.1-9 1.4-15 16.2-26.5 35.8-33.2 57.4-1 3.3.4 6.8 3.3 8.5l25.8 14.9c-2.6 14.1-2.6 28.5 0 42.6l-25.8 14.9c-3 1.7-4.3 5.2-3.3 8.5 6.7 21.6 18.2 41.1 33.2 57.4 2.3 2.5 6 3.1 9 1.4l25.8-14.9c10.9 9.3 23.4 16.5 36.9 21.3v29.8c0 3.4 2.4 6.4 5.7 7.1 22.3 5 45 4.8 66.2 0 3.3-.7 5.7-3.7 5.7-7.1v-29.8c13.5-4.8 26-12 36.9-21.3l25.8 14.9c2.9 1.7 6.7 1.1 9-1.4 15-16.2 26.5-35.8 33.2-57.4 1-3.3-.4-6.8-3.3-8.5l-25.8-14.9zM496 400.5c-26.8 0-48.5-21.8-48.5-48.5s21.8-48.5 48.5-48.5 48.5 21.8 48.5 48.5-21.7 48.5-48.5 48.5zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm201.2 226.5c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6c-6 3.4-12.8 5.3-19.6 5.3-10.9 0-21.4-4.6-28.9-12.6-18.3-19.8-32.3-43.9-40.2-69.6-5.5-17.7 1.9-36.4 17.9-45.7l7.9-4.6c-.1-2.6-.1-5.2 0-7.8l-7.9-4.6c-16-9.2-23.4-28-17.9-45.7.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c10.1 0 19.5-3.2 27.2-8.5-1.2-3.8-2-7.7-2-11.8v-9.2z"></path></svg></p>

        }
        else {
            grpbtn = ''
        }
        if (this.props.user.active === "active" && this.props.user.role === "customer") {
            btnblock = <p className="delete" style={{ marginLeft: 10 }}><svg onClick={() => this.blockUser(this.props.user._id)} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" className="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg></p>
        }
        let num
        if (this.props.num % 2 === 0) {
            num = 'chan'
        }
        else num = 'le'
        return (
            <div>
                <ul className="column item" id={num}>
                    <li className="name khong">
                        <p>{this.props.user.name}</p>
                    </li>
                    <li className="Email khong">
                        <p>{this.props.user.email}</p>
                    </li>
                    <li className="password khong">
                        <p>************</p>
                    </li>
                    <li className="sdt khong">
                        <p>{this.props.user.sdt}</p>
                    </li>
                    <li className="diachia khong">
                        <p>{this.props.user.diachi}</p>
                    </li>
                    <li className="trangthai giua">
                        {activetext}
                    </li>
                    <li className="role giua">
                        <p>{this.props.user.role}</p>
                    </li>
                    <li className="quanly khong">
                        {grpbtn}
                        {btnblock}
                    </li>
                </ul>

            </div>
        )
    }
}


class FormAddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            sdt: '',
            diachi: '',
            role: 'admin'
        }

        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleSdt = this.handleSdt.bind(this)
        this.handleDiachi = this.handleDiachi.bind(this)
        this.handleRole = this.handleRole.bind(this)
        this.closeFormAdd = this.closeFormAdd.bind(this)
        this.addNewUser = this.addNewUser.bind(this)
    }


    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    handleSdt(e) {
        this.setState({
            sdt: e.target.value
        })
    }

    handleDiachi(e) {
        this.setState({
            diachi: e.target.value
        })
    }

    handleRole(e) {
        this.setState({
            role: e.target.value
        })
    }

    closeFormAdd() {
        this.props.closeFormAdd()
    }


    addNewUser() {
        if (this.state.password !== this.state.confirmpassword) {
            alert("sai")
        }
        else {
            let user = {
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                sdt: this.state.sdt,
                diachi: this.state.diachi,
                role: this.state.role,
                active: "active"
            }
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/auth/register`,
                data: user
            }).then(response => {
                alert('Thanh cong')
                this.props.add1user(user)
            })
                .catch(err => {
                    alert(err)
                })
        }
    }

    render() {
        return (
            <div className="addProductoverlay">
                <div className="addUserform">
                    <div className="adduser__title">
                        <h3>Thêm 1 USER</h3>
                    </div>
                    <div className="adduser__form">
                        <div className="adduser__field">
                            <input type="text" placeholder="Nhập họ tên" onChange={this.handleName} value={this.state.name} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="email" placeholder="Nhập email" onChange={this.handleEmail} value={this.state.email} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="password" placeholder="Nhập mật khẩu" onChange={this.handlePassword} value={this.state.password} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="password" placeholder="Xác nhận mật khẩu" onChange={this.handleConfirmPassword} value={this.state.confirmpassword} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="text" placeholder="Nhập số điện thoại" onChange={this.handleSdt} value={this.state.sdt} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <input type="text" placeholder="Nhập địa chỉ" onChange={this.handleDiachi} value={this.state.diachi} />
                        </div>
                        <div className="err"></div>
                        <div className="adduser__field">
                            <p>role</p>
                            <select onChange={this.handleRole} value={this.state.role} disabled>
                                <option value='customer'>customer</option>
                                <option value='admin'>admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="groupbtn">
                        <button className="add" onClick={this.addNewUser}>Thêm</button>
                        <button className="closeformadd" onClick={this.closeFormAdd}>Thoát</button>
                    </div>
                </div>
            </div>
        )
    }
}

class FormKhoaTK extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
        this.closeblockUser = this.closeblockUser.bind(this)
        this.blockuser = this.blockuser.bind(this)
    }
    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${sessionStorage.getItem('idblock')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(response => {
                this.setState({
                    user: response.data.UserSelect
                })
            })
    }
    closeblockUser() {
        sessionStorage.removeItem('idblock')

        this.props.closeblockUser()
    }
    blockuser() {
        let usernew = {
            email: this.state.user.email,
            password: this.state.user.password,
            name: this.state.user.name,
            sdt: this.state.user.sdt,
            diachi: this.state.user.diachi,
            role: this.state.user.role,
            active: "block"
        }
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/auth/doiactive`,
            data: {
                email: this.state.user.email,
                password: this.state.user.password,
                name: this.state.user.name,
                sdt: this.state.user.sdt,
                diachi: this.state.user.diachi,
                role: this.state.user.role,
                active: "block"
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }

        })
            .then(response => {
                this.props.dablock(usernew)
                sessionStorage.removeItem('idblock')
            })
    }
    render() {
        return (<div className="addProductoverlay">
            <div className="deleteProductForm">
                <div className="editproduct__title">Bạn muốn khóa tài khoản {this.state.user.email}? </div>
                <div className="editProduct__logo">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg></div>
                <div className="groupbtn">
                    <button className='btn xoa' onClick={this.blockuser}>Đồng ý</button>
                    <button className='btn thoat' onClick={this.closeblockUser}>Thoát</button>
                </div>

            </div></div>
        )
    }
}
class FormAcceptDelete extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            name: '',
            email: '',
            password: '',
            confirmpassword: '',
            sdt: '',
            diachi: '',
            role: 'customer',
            active: ''
        }
        this.closeDel = this.closeDel.bind(this)
        this.edituser = this.edituser.bind(this)
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
        this.handleConfirmPassword = this.handleConfirmPassword.bind(this)
        this.handleSdt = this.handleSdt.bind(this)
        this.handleDiachi = this.handleDiachi.bind(this)
        this.handleRole = this.handleRole.bind(this)
    }

    closeDel() {
        sessionStorage.removeItem('iddeluser')

        this.props.closeDel()
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${sessionStorage.getItem('iddeluser')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    id: response.data.UserSelect._id,
                    email: response.data.UserSelect.email,
                    // password: response.data.UserSelect.password,
                    name: response.data.UserSelect.name,
                    sdt: response.data.UserSelect.sdt,
                    diachi: response.data.UserSelect.diachi,
                    role: response.data.UserSelect.role,
                    active: response.data.UserSelect.active
                })
            })
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmpassword: e.target.value
        })
    }

    handleSdt(e) {
        this.setState({
            sdt: e.target.value
        })
    }

    handleDiachi(e) {
        this.setState({
            diachi: e.target.value
        })
    }

    handleRole(e) {
        this.setState({
            role: e.target.value
        })
    }



    edituser() {
        let user = {
            _id: this.state.id,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            sdt: this.state.sdt,
            diachi: this.state.diachi,
            role: this.state.role,
            active: this.state.active
        }
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/auth/doimk`,
            data: {
                email: this.state.email,
                name: this.state.name,
                sdt: this.state.sdt,
                diachi: this.state.diachi,
                role: this.state.role,
                password: this.state.password,
                active: this.state.active
            }
        })
            .then(response => {
                this.props.suathongtinthanhcong(user)
                sessionStorage.removeItem('iddeluser')
            })
    }

    render() {


        return (<div className="addProductoverlay">
            <div className="addUserform">
                <div className="adduser__title">
                    <h3>Sửa thông tin USER</h3>
                </div>
                <div className="adduser__form">
                    <div className="adduser__field">
                        <input type="text" placeholder="Nhập họ tên" onChange={this.handleName} value={this.state.name} />
                    </div>
                    <div className="err"></div>
                    <div className="adduser__field">
                        <input type="email" placeholder="Nhập email" onChange={this.handleEmail} value={this.state.email} />
                    </div>
                    <div className="err"></div>
                    <div className="adduser__field">
                        <input type="password" placeholder="Nhập mật khẩu" onChange={this.handlePassword} value={this.state.password} />
                    </div>
                    <div className="err"></div>

                    <div className="err"></div>
                    <div className="adduser__field">
                        <input type="text" placeholder="Nhập số điện thoại" onChange={this.handleSdt} value={this.state.sdt} />
                    </div>
                    <div className="err"></div>
                    <div className="adduser__field">
                        <input type="text" placeholder="Nhập địa chỉ" onChange={this.handleDiachi} value={this.state.diachi} />
                    </div>
                    <div className="err"></div>
                    <div className="adduser__field">
                        <p>role</p>
                        <select onChange={this.handleRole} value={this.state.role} disabled>
                            <option value='customer'>customer</option>
                            <option value='admin'>admin</option>
                        </select>
                    </div>
                </div>
                <div className="groupbtn">
                    <button className="add" onClick={this.edituser}>Cập nhật</button>
                    <button className="closeformadd" onClick={this.closeDel}>Thoát</button>
                </div>
            </div>
        </div>)
    }
}