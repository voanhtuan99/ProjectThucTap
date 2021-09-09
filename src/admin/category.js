import axios from "axios";
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class CategoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listcate: []
        }
        this.handleClodeCategory = this.handleClodeCategory.bind(this)
    }

    handleClodeCategory() {
        this.props.handleClodeCategory()
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/category/all`
        }).then(response => {
            this.setState({
                listcate: response.data.categories
            })
        })
    }

    componentDidUpdate() {
        axios({
            method: "GET",
            url: `https://tttn.herokuapp.com/api/category/all`
        }).then(response => {
            this.setState({
                listcate: response.data.categories
            })
        })
    }

    render() {
        let { listcate } = this.state
        let catetable = listcate.map((cate, index) => {
            return <ItemCate cate={cate} key={index} />
        })
        return (
            <div className="addProductoverlay">
                <ToastContainer />
                <div className="listcatepage">
                    <div className="list__title">
                        <h3>Loại sản phẩm</h3>
                    </div>
                    <div className="table_cate">
                        <ul className="list__namecolumn">
                            <li className="list__namecolumn-item"><p>Tên loại</p></li>
                            <li className="list__namecolumn-item"><p>Lựa chọn</p></li>
                        </ul>
                        <div className="list__cate">
                            {catetable}
                        </div>
                    </div>

                    <FormAddCate />
                    <div className="thoat">
                        <button onClick={this.handleClodeCategory}><p>Thoát</p></button>
                    </div>
                </div>
            </div>
        )
    }
}

class ItemCate extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.deleteCate = this.deleteCate.bind(this)
    }

    deleteCate(id) {
        console.log(id)
        axios({
            method: "DELETE",
            url: `https://tttn.herokuapp.com/api/category/${id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(require => {
                toast.success('Xóa loại thành công', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                alert('That bai')
            })
    }

    render() {

        return (
            <ul className="list__item">
                <li className="item"><p>{this.props.cate.TenLoai}</p></li>
                <li className="item edit"><p><svg onClick={() => this.deleteCate(this.props.cate._id)} aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" className="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg></p>
                </li>

            </ul>
        )
    }
}

class FormAddCate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            TenLoai: ''
        }
        this.inputTenLoai = this.inputTenLoai.bind(this)
        this.themloai = this.themloai.bind(this)
    }

    inputTenLoai(e) {
        this.setState({
            TenLoai: e.target.value
        })
    }

    themloai() {
        axios({
            method: "POST",
            url: "https://tttn.herokuapp.com/api/category/insert",
            data: {
                TenLoai: this.state.TenLoai
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                toast.success(`Thêm loại ${this.state.TenLoai} thành công`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                this.setState({
                    TenLoai: ''
                })
            })
            .catch(err => {
                alert("that bai")
            })
    }

    render() {
        return (<div className="addcate">
            <div className="addcate__title">
                <h5>Thêm 1 loại sản phẩm</h5>
            </div>
            <div className="addcate_form">
                <h5>Tên loại</h5>
                <input type="text" onChange={this.inputTenLoai} value={this.state.TenLoai} />
                <button onClick={this.themloai}><p>Thêm</p></button>
            </div>
        </div>
        )
    }
}