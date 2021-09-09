import { Component } from 'react'
import ContactPage from './contactpage'
import Homepage from './homepage'
import ProductPage from './productpage'
import AboutUs from './aboutus'
import CartPage from './cartpage'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import InfoUser from './infouser'
import axios from 'axios'
import HistoryPage from './history'
class CustomerUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowHomepage: true,
            isShowProductpage: false,
            isShowContactpage: false,
            isShowAboutus: false,
            isShowCart: false,
            isShowHistory: false,
            user: {}
        }
        this.onclickHomepage = this.onclickHomepage.bind(this)
        this.onclickProductpage = this.onclickProductpage.bind(this)
        this.onclickContactpage = this.onclickContactpage.bind(this)
        this.onclickAboutus = this.onclickAboutus.bind(this)
        this.onclickCartpage = this.onclickCartpage.bind(this)
        this.onclickHistoryPage = this.onclickHistoryPage.bind(this)


    }

    onclickHomepage(id) {
        this.setState({
            isShowHomepage: true,
            isShowProductpage: false,
            isShowContactpage: false,
            isShowAboutus: false,
            isShowHistory: false,
            isshowCart: false
        })
        var list = ['home', 'product', 'contact', 'about', 'cartpage', 'history']
        var listoption = []
        list.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.getElementById(id).classList.add('active')
        document.getElementById(listoption[0]).classList.remove('active')
        document.getElementById(listoption[1]).classList.remove('active')
        document.getElementById(listoption[2]).classList.remove('active')
        document.getElementById(listoption[3]).classList.remove('active')
        document.getElementById(listoption[4]).classList.remove('active')
    }


    onclickHistoryPage(id) {
        this.setState({
            isShowHomepage: false,
            isShowProductpage: false,
            isShowContactpage: false,
            isShowAboutus: false,
            isShowHistory: true,
            isshowCart: false

        })
        var list = ['home', 'product', 'contact', 'about', 'cartpage', 'history']
        var listoption = []
        list.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.getElementById(id).classList.add('active')
        document.getElementById(listoption[0]).classList.remove('active')
        document.getElementById(listoption[1]).classList.remove('active')
        document.getElementById(listoption[2]).classList.remove('active')
        document.getElementById(listoption[3]).classList.remove('active')
        document.getElementById(listoption[4]).classList.remove('active')
    }

    onclickProductpage(id) {
        this.setState({
            isShowHomepage: false,
            isShowProductpage: true,
            isShowContactpage: false,
            isShowHistory: false,
            isShowAboutus: false,
            isshowCart: false

        })
        var list = ['home', 'product', 'contact', 'about', 'cartpage', 'history']
        var listoption = []
        list.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.getElementById(id).classList.add('active')
        document.getElementById(listoption[0]).classList.remove('active')
        document.getElementById(listoption[1]).classList.remove('active')
        document.getElementById(listoption[2]).classList.remove('active')
        document.getElementById(listoption[3]).classList.remove('active')
        // document.getElementById(listoption[4]).classList.remove('active')
    }

    onclickContactpage(id) {
        this.setState({
            isShowHomepage: false,
            isShowProductpage: false,
            isShowContactpage: true,
            isShowHistory: false,
            isShowAboutus: false,
            isshowCart: false

        })
        var list = ['home', 'product', 'contact', 'about', 'cartpage', 'history']
        var listoption = []
        list.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.getElementById(id).classList.add('active')
        document.getElementById(listoption[0]).classList.remove('active')
        document.getElementById(listoption[1]).classList.remove('active')
        document.getElementById(listoption[2]).classList.remove('active')
        document.getElementById(listoption[3]).classList.remove('active')
        document.getElementById(listoption[4]).classList.remove('active')
    }

    onclickCartpage(id) {
        this.setState({
            isShowHomepage: false,
            isShowProductpage: false,
            isShowContactpage: false,
            isShowHistory: false,
            isShowAboutus: false,
            isshowCart: true

        })
        var list = ['home', 'product', 'contact', 'about', 'cartpage', 'history']
        var listoption = []
        list.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.getElementById(id).classList.add('active')
        document.getElementById(listoption[0]).classList.remove('active')
        document.getElementById(listoption[1]).classList.remove('active')
        document.getElementById(listoption[2]).classList.remove('active')
        document.getElementById(listoption[3]).classList.remove('active')
        document.getElementById(listoption[4]).classList.remove('active')

    }


    onclickAboutus(id) {
        this.setState({
            isShowHomepage: false,
            isShowProductpage: false,
            isShowContactpage: false,
            isShowHistory: false,
            isShowAboutus: true,
            isshowCart: false

        })
        var list = ['home', 'product', 'contact', 'about', 'cartpage', 'history']
        var listoption = []
        list.map((option) => {
            if (option !== id) {
                listoption.push(option)
            }
        })
        document.getElementById(id).classList.add('active')
        document.getElementById(listoption[0]).classList.remove('active')
        document.getElementById(listoption[1]).classList.remove('active')
        document.getElementById(listoption[2]).classList.remove('active')
        document.getElementById(listoption[3]).classList.remove('active')
        document.getElementById(listoption[4]).classList.remove('active')
    }

    clickOption() {
        document.querySelector('.user__option').classList.toggle('active')
    }

    componentDidMount() {
        let id = localStorage.getItem('id')
        axios({
            method: 'GET',
            url: `https://tttn.herokuapp.com/api/auth/${id}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(response => {
            this.setState({
                user: response.data.UserSelect
            })
        })
    }

    clickInfo() {
        document.querySelector('.infoUser').style.display = 'flex'
        document.querySelector('.user__option').classList.toggle('active')
    }


    clickLogout() {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("name")
        localStorage.removeItem("id")
        localStorage.removeItem("diachi")

    }

    render() {
        console.log(localStorage.getItem('accessToken'))
        var homepage, productpage, contactpage, aboutus, cartpage, historypage
        if (this.state.isShowHomepage === true) {
            homepage = <Homepage />
        }
        if (this.state.isShowProductpage === true) {
            productpage = <ProductPage />
        }
        if (this.state.isShowContactpage === true) {
            contactpage = <ContactPage />
        }
        if (this.state.isShowAboutus === true) {
            aboutus = <AboutUs />
        }
        if (this.state.isshowCart === true) {
            cartpage = <CartPage />
        }
        if (this.state.isShowHistory === true) {
            historypage = <HistoryPage />
        }
        let loginBtn = localStorage.getItem("name")
        let btn
        if (loginBtn === null || loginBtn === "") {
            btn = <Link to="login">
                <div className='nav__login' id='login'>
                    <div> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-in-alt" className="svg-inline--fa fa-sign-in-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"></path></svg>Login</div>
                </div>
            </Link>
        }
        else {
            btn = <div className='user__icon' onClick={this.clickOption}>
                <div className='user__logo'><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" className="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg></div>
                <p>{localStorage.getItem("name")}</p>
                <ul className='user__option'>
                    <li className='option__item' onClick={this.clickInfo}>Thông tin cá nhân</li>
                    <li className='option__item'>Chỉnh sửa thông tin</li>
                    <Link to="/login"><li className='option__item' onClick={this.clickLogout}>Đăng xuất</li></Link>
                </ul>
            </div>
        }
        return (<div className='ui'>

            <header className="">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="navbar-brand" href="index.html"><h2>Sach99 <em>Shop</em></h2></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active" id="home">
                                    <div className="nav-link" onClick={() => this.onclickHomepage("home")}>Trang chủ
                                        <span className="sr-only">(current)</span>
                                    </div>
                                </li>
                                <li className="nav-item" id="product">
                                    <div className="nav-link" onClick={() => this.onclickProductpage("product")}>Sản phẩm</div>
                                </li>
                                <li className="nav-item" id="about">
                                    <div className="nav-link" onClick={() => this.onclickAboutus("about")}>Thông tin</div>
                                </li>
                                <li className="nav-item" id="contact">
                                    <div className="nav-link" onClick={() => this.onclickContactpage("contact")}>Liên hệ</div>
                                </li>
                                <li className="nav-item" id="cartpage">
                                    <div className="nav-link" onClick={() => this.onclickCartpage("cartpage")}>Giỏ hàng</div>
                                </li>
                                <li className="nav-item" id="history">
                                    <div className="nav-link" onClick={() => this.onclickHistoryPage("history")}>Lịch sử mua</div>
                                </li>

                            </ul>
                        </div>
                        {btn}

                    </div>
                </nav>
            </header>

            {cartpage}
            {homepage}
            {productpage}
            {contactpage}
            {aboutus}
            {historypage}
            <InfoUser user={this.state.user} />
        </div>)
    }
}
export default CustomerUI