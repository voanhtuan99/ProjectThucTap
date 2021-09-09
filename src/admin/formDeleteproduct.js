import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import FormSuccess from "./formSuccess";

export default class FormDeleteProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            showDelSuccess: false
        }
        this.delProduct = this.delProduct.bind(this)
        this.closeformsuccess = this.closeformsuccess.bind(this)
        this.handleCloseDelProduct = this.handleCloseDelProduct.bind(this)
    }

    delProduct() {
        axios({
            method: "DELETE",
            url: `https://tttn.herokuapp.com/api/product/${sessionStorage.getItem("iddelproduct")}`
        }).then(response => {
            this.setState({
                showDelSuccess: true
            })
        }).catch(err => {
            alert("lỗi: " + err)
        })
    }

    handleCloseDelProduct() {
        sessionStorage.removeItem("iddelproduct")
        this.props.handleCloseDelProduct()
    }

    closeformsuccess() {
        this.setState({
            showDelSuccess: false
        })
    }

    render() {
        let formSuccess
        if (this.state.showDelSuccess === true) {
            formSuccess = <FormSuccess closeformsuccess={this.closeformsuccess} handleCloseDelProduct={this.props.handleCloseDelProduct} closeformsuccess={this.closeformsuccess} />
        }
        return (<div className="addProductoverlay">
            {formSuccess}
            <div className="deleteProductForm">
                <div className="editproduct__title">Bạn muốn xóa sản phẩm {sessionStorage.getItem("iddelproduct")}? </div>
                <div className="editProduct__logo">
                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"></path></svg></div>
                <div className="groupbtn">
                    <button className='btn xoa' onClick={this.delProduct}>Đồng ý</button>
                    <button className='btn thoat' onClick={this.handleCloseDelProduct}>Thoát</button>
                </div>

            </div>
        </div>)
    }
}