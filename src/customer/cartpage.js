import axios from 'axios'
import { Component } from 'react'
import ItemInCart from './itemincart'
import FormSuccess from './formSuccess'
import { remove } from 'lodash'
import { withRouter } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PayPal from './paypal'
class CartPage extends Component {
  constructor(props) {
    let list = JSON.parse(sessionStorage.getItem('listproductincart'))
    console.log(list)
    super(props)
    let listt
    if (list === null) {
      listt = []
    }
    else listt = list
    console.log(list)
    let TongTien = listt.reduce((acc, curr) => {
      return acc + curr.GiaBan * curr.SoLuong
    }, 0)
    let GiaGoc = listt.reduce((acc, curr) => {
      return acc + curr.DonGia * curr.SoLuong
    }, 0)
    this.state = {
      listproduct: list,
      isShowFormSuccess: false,
      TongTien: TongTien,
      diachitt: localStorage.getItem('diachi'),
      GiaGoc: GiaGoc,
      checkout: false
    }
    this.taodondathang = this.taodondathang.bind(this)
    this.ClickBackFormSuccess = this.ClickBackFormSuccess.bind(this)
    this.handleDiachitt = this.handleDiachitt.bind(this)
    this.xoasanpham = this.xoasanpham.bind(this)
    this.thaydoisoluong = this.thaydoisoluong.bind(this)
    this.taodondathangonline = this.taodondathangonline.bind(this)
    this.sltrongkhokhongdu = this.sltrongkhokhongdu.bind(this)
  }

  xoasanpham(product) {
    let list = JSON.parse(sessionStorage.getItem('listproductincart'))
    console.log(list)
    let evens = remove(list, (item) => {
      return item._id === product._id
    })
    console.log(evens)
    console.log(list)

    toast.success(`Đã xóa ${product.TenSP} khỏi giỏ hàng`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    let TongTien = list.reduce((acc, curr) => {
      return acc + curr.GiaBan * curr.SoLuong
    }, 0)
    let GiaGoc = list.reduce((acc, curr) => {
      return acc + curr.DonGia * curr.SoLuong
    }, 0)
    console.log(list)
    this.setState({
      listproduct: list,
      TongTien: TongTien,
      GiaGoc: GiaGoc
    })
    sessionStorage.setItem("listproductincart", JSON.stringify(list))
  }

  thaydoisoluong(product) {
    let arrproduct = this.state.listproduct
    console.log(arrproduct)
    arrproduct.forEach((element, key) => {
      if (element._id === product._id) {
        arrproduct[key] = product
      }
    });
    console.log(arrproduct)
    sessionStorage.setItem('listproductincart', JSON.stringify(arrproduct))
    let TongTien = arrproduct.reduce((acc, curr) => {
      return acc + curr.GiaBan * curr.SoLuong
    }, 0)
    let GiaGoc = arrproduct.reduce((acc, curr) => {
      return acc + curr.DonGia * curr.SoLuong
    }, 0)
    this.setState({
      listproduct: arrproduct,
      TongTien: TongTien,
      GiaGoc: GiaGoc
    })

  }


  taodondathang() {
    if (this.state.diachitt !== '') {
      axios({
        method: 'POST',
        url: 'https://tttn.herokuapp.com/api/order/insert',
        data: {
          TrangThai: 'Chưa xác nhận',
          user: localStorage.getItem('id'),
          diachinhanhang: this.state.diachitt,
          TongTien: this.state.TongTien
        }
      }).then(response => {
        for (let i = 0; i < this.state.listproduct.length; i++) {
          axios({
            method: 'POST',
            url: 'https://tttn.herokuapp.com/api/detailorder/insert',
            data: {
              SoLuong: this.state.listproduct[i].SoLuong,
              idorder: response.data.newOrder._id,
              idsp: this.state.listproduct[i]._id

            }
          }).then(require => {

          })
            .catch(err => {
              alert(err)
            })
          axios({
            method: 'PUT',
            url: `https://tttn.herokuapp.com/api/product/${this.state.listproduct[i]._id}`,
            data: {
              TenSP: this.state.listproduct[i].TenSP,
              SoLuong: this.state.listproduct[i].soluongtrongkho - this.state.listproduct[i].SoLuong,
              DonGia: this.state.listproduct[i].DonGia,
              KhuyenMai: this.state.listproduct[i].KhuyenMai,
              Mota: this.state.listproduct[i].Mota,
              img: this.state.listproduct[i].img,
              TacGia: this.state.listproduct[i].TacGia,
              loaisp: this.state.listproduct[i].loaisp
            }
          })
            .then(response => {

            })
            .catch(err => {
              alert(err)
            })
        }
        sessionStorage.removeItem('listproductincart')
        this.setState({
          listproduct: [],
          isShowFormSuccess: true
        })
      }).catch(err => {
        alert(`err123 ${err}`)
      })
    }
    else {
      document.querySelector('.err').innerHTML = "<p>Nhập địa chỉ</p>"
    }
  }

  taodondathangonline() {
    if (this.state.diachitt !== '') {
      axios({
        method: 'POST',
        url: 'https://tttn.herokuapp.com/api/order/insert',
        data: {
          TrangThai: 'Thanh Toán Online',
          user: localStorage.getItem('id'),
          diachinhanhang: this.state.diachitt,
          TongTien: this.state.TongTien
        }
      }).then(response => {
        for (let i = 0; i < this.state.listproduct.length; i++) {
          axios({
            method: 'POST',
            url: 'https://tttn.herokuapp.com/api/detailorder/insert',
            data: {
              SoLuong: this.state.listproduct[i].SoLuong,
              idorder: response.data.newOrder._id,
              idsp: this.state.listproduct[i]._id

            }
          }).then(require => {

          })
            .catch(err => {
              alert(err)
            })
          axios({
            method: 'PUT',
            url: `https://tttn.herokuapp.com/api/product/${this.state.listproduct[i]._id}`,
            data: {
              TenSP: this.state.listproduct[i].TenSP,
              SoLuong: this.state.listproduct[i].soluongtrongkho - this.state.listproduct[i].SoLuong,
              DonGia: this.state.listproduct[i].DonGia,
              KhuyenMai: this.state.listproduct[i].KhuyenMai,
              Mota: this.state.listproduct[i].Mota,
              img: this.state.listproduct[i].img,
              TacGia: this.state.listproduct[i].TacGia,
              loaisp: this.state.listproduct[i].loaisp
            }
          })
            .then(response => {

            })
            .catch(err => {
              alert(err)
            })
        }
        sessionStorage.removeItem('listproductincart')
        toast.success('Đặt hàng thành công', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.setState({
          listproduct: []
        })
      }).catch(err => {
        alert(`err123 ${err}`)
      })
    }
    else {
      document.querySelector('.err').innerHTML = "<p>Nhập địa chỉ</p>"
    }
  }


  ClickBackFormSuccess() {
    this.setState({
      isShowFormSuccess: false
    })
  }

  handleDiachitt(e) {
    this.setState({
      diachitt: e.target.value
    })
  }
  sltrongkhokhongdu(soluong) {

    toast.error(`Trong kho không đủ hàng, Chỉ còn ${soluong} sản phẩm`, {
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
    console.log(this.state.diachitt)
    let list
    if (this.state.listproduct === null) {
      list = []
    }
    else list = this.state.listproduct
    let showList
    let cartpayment;
    console.log(list)
    if (list.length !== 0) {
      showList = list.map((productincart, index) => {
        return <ItemInCart
          sltrongkhokhongdu={this.sltrongkhokhongdu}
          thaydoisoluong={this.thaydoisoluong}
          xoasanpham={this.xoasanpham} product={productincart} key={index} />
      })
      cartpayment = <div className="cart__payment">
        <div className="cart__content">
          <div className="cart__price">
            <h4>Giá gốc: </h4>
            <p>{this.state.GiaGoc}đ</p>
          </div>
          <div className="cart__price discount">
            <h4>Giảm giá: </h4>
            <p>{this.state.GiaGoc - this.state.TongTien}đ</p>
          </div>
          <div className="cart__price total">
            <h4>Tổng: </h4>
            <p>{this.state.TongTien}đ</p>
          </div>
        </div>
        <div className="payment__diachinhanhang">
          <p>Địa chỉ nhận hàng</p>
          <textarea type="text" className="inputdiachinhanhang" onChange={this.handleDiachitt} value={this.state.diachitt} />
          <div className="err"><br></br></div>
        </div>

        <div className="payment__button" >
          <button onClick={this.taodondathang}>Thanh toán trực tiếp</button>
          {this.state.checkout ? (<div className="thanhtoanpaypal"><PayPal TongTien={this.state.TongTien} taodondathangonline={this.taodondathangonline} /></div>) : (
            <button onClick={() => {
              if (this.state.diachitt !== '') {
                this.setState({
                  checkout: true
                })
              }
              else document.querySelector('.err').innerHTML = "<p>Nhập địa chỉ</p>"

            }}>Thanh toán online</button>)}
        </div>
      </div>
    }
    else if (list.length === 0) {
      showList = <GioHangTrong />
      cartpayment = ''
      console.log('giohangtrong')
    }
    let formSuccess

    if (this.state.isShowFormSuccess === true) formSuccess = <FormSuccess ClickBackFormSuccess={this.ClickBackFormSuccess} />
    else formSuccess = ''
    return (
      <div className="customercart">
        {formSuccess}
        <ToastContainer

        />

        <div className="cart__box">
          <div className="customercart__title">
            <h3>Sản phẩm trong giỏ hàng</h3>
          </div>

          <div className="cart__list">
            {showList}
          </div>


          {cartpayment}
        </div>
      </div >)
  }
}

class GioHangTrong extends Component {
  render() {
    return (
      <div className="giohangtrong">
        <img src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/9bdd8040b334d31946f49e36beaf32db.png" />
        <p>Chưa có sản phẩm trong giỏ hàng</p>
      </div>
    )
  }
}



export default withRouter(CartPage)