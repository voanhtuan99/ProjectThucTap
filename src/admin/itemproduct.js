import axios from "axios";
import { Component } from "react";
import EditProduct from "./editproduct";

export default class ItemProduct extends Component {
    constructor(props) {
        super(props)
        this.state = {
            types: []
        }
        this.XuLyLoai = this.XuLyLoai.bind(this)
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "https://tttn.herokuapp.com/api/category/all",
        }).then(response => {
            this.setState({
                types: response.data.categories
            })
        })
    }

    XuLyLoai(maloai) {
        let tenloai;
        for (var i = 0; i < this.state.types.length; i++) {
            if (this.state.types[i]._id === maloai) {
                tenloai = this.state.types[i].TenLoai
            }
        }
        return tenloai
    }

    clickEdit(id) {
        console.log(id)
        document.querySelector(".editProduct").style.display = "flex"
    }

    render() {
        let num
        if (this.props.num % 2 === 0) {
            num = 'chan'
        }
        else num = 'le'
        return (
            <ul className="list__item" id={num}>
                <li className="item__name">{this.props.product.TenSP}</li>
                <li className="item__quantity"><p>{this.props.product.SoLuong}</p></li>
                <li className="item__price"><p>{this.props.product.DonGia}</p></li>
                <li className="item__discount"><p>{this.props.product.KhuyenMai}%</p></li>
                <li className="item__desc"><p>{this.props.product.Mota}</p></li>
                <li className="item__img"><div className="imgproduct"><img src={this.props.product.img} alt="" /></div></li>
                <li className="item__type"><p>{this.XuLyLoai(this.props.product.loaisp)}</p></li>
                <li className="item__edit"> <EditProduct handleShowDelProduct={this.props.handleShowDelProduct} product={this.props.product} handleShowEditproduct={this.props.handleShowEditproduct} /></li>



            </ul>
        )
    }
}