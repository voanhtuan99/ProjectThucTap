import axios from 'axios'
import { Component } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class SelectOption extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            diachi: '',
            sdt: '',
            role: '',
            password: '',
            active: '',
            loading: false
        }
        this.handleChangeUsername = this.handleChangeUsername.bind(this)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangesdt = this.handleChangesdt.bind(this)
        this.handleChangediachi = this.handleChangediachi.bind(this)
        this.suattadmin = this.suattadmin.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/auth/${localStorage.getItem('id')}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    username: response.data.UserSelect.name,
                    email: response.data.UserSelect.email,
                    diachi: response.data.UserSelect.diachi,
                    sdt: response.data.UserSelect.sdt,
                    role: response.data.UserSelect.role,
                    password: response.data.UserSelect.password,
                    active: response.data.UserSelect.active
                })
            })
    }

    handleChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }


    handleChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }
    handleChangesdt(e) {
        this.setState({
            sdt: e.target.value
        })
    }
    handleChangediachi(e) {
        this.setState({
            diachi: e.target.value
        })
    }
    suattadmin() {
        this.setState({
            loading: true
        })
        axios({
            method: "PUT",
            url: `https://tttn.herokuapp.com/api/auth/suatt`,
            data: {
                email: this.state.email,
                name: this.state.username,
                sdt: this.state.sdt,
                diachi: this.state.diachi,
                role: this.state.role,
                password: this.state.password,
                active: this.state.active
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                this.setState({
                    loading: false
                })
                toast.success(`Thay đổi thông tin user thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            })
    }
    render() {
        let { loading } = this.state
        console.log(this.state.user)
        return (<div className="listproductadmin showwithsidebar">
            <ToastContainer />
            <div className="profile">
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 ">
                    <div className="profile__header">
                        <h3>Edit Profile</h3>
                        <h4>Complete your profile</h4>
                    </div>
                    <div className="profile__info">
                        <input type="text" aria-invalid="false" className="input__username" placeholder="USERNAME" onChange={this.handleChangeUsername} value={this.state.username} />
                        <input type="text" aria-invalid="false" className="input__username" placeholder="Email" onChange={this.handleChangeEmail} value={this.state.email} />
                        <div className="profile__name">
                            <input type="text" aria-invalid="false" className="input__username" placeholder="SDT" onChange={this.handleChangesdt} value={this.state.sdt} />
                            <input type="text" aria-invalid="false" className="input__username" placeholder="Địa chỉ" onChange={this.handleChangediachi} value={this.state.diachi} />
                        </div>
                        <div className="profile__role">
                            <p>Role: </p>
                            <span>{this.state.role}</span>
                        </div>
                    </div>
                </div>

            </div>

            <button className="btnupdatetkadmin" onClick={this.suattadmin}>{loading ? (<><ClipLoader size={10} color={"#0cf0a4"} loading={loading} />Update</>) : <>Update</>}</button>
        </div>)
    }
}

export default SelectOption