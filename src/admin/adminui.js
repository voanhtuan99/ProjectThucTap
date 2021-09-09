import HomapageAdmin from "./homepageadmin";
import SelectOption from "./selectoption";
import ProductPage from "./productpage";
import { Component } from "react"
import Search from "./search";
import UserPage from "./userpage";
import OrderPage from "./order";
import PhieuNhapXuatPage from "./phieunhapxuatpage";
import ChartPage from "./chartpage";
class AdminUI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowChart: true,
            isShowProfile: false,
            isShowProduct: false,
            hide: true,
            isShowListUser: false,
            isShowOrder: false,
            isShowCoupon: false
        }
        this.handleClickOption = this.handleClickOption.bind(this)
        this.handleShowChart = this.handleShowChart.bind(this)
        this.handleShowProfule = this.handleShowProfule.bind(this)
        this.handleShowProduct = this.handleShowProduct.bind(this)
        this.handleShowUser = this.handleShowUser.bind(this)
        this.iconHide = this.iconHide.bind(this)
        this.handleShowOrder = this.handleShowOrder.bind(this)
        this.handleShowCoupon = this.handleShowCoupon.bind(this)
    }




    handleClickOption(id) {
        var list = ['chart', 'profile', 'listuser', 'listproduct', 'logout', 'orders', 'phieu']
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
        document.getElementById(listoption[5]).classList.remove('active')



    }

    handleShowChart() {
        this.setState({
            isShowChart: true,
            isShowProfile: false,
            isShowProduct: false,
            isShowListUser: false,
            isShowOrder: false,
            isShowCoupon: false
        })
    }

    handleShowUser() {
        this.setState({
            isShowChart: false,
            isShowProfile: false,
            isShowProduct: false,
            isShowListUser: true,
            isShowOrder: false,
            isShowCoupon: false
        })
    }

    handleShowProfule() {
        this.setState({
            isShowChart: false,
            isShowProfile: true,
            isShowProduct: false,
            isShowListUser: false,
            isShowOrder: false,
            isShowCoupon: false
        })
    }

    handleShowCoupon() {
        this.setState({
            isShowChart: false,
            isShowProfile: false,
            isShowProduct: false,
            isShowListUser: false,
            isShowOrder: false,
            isShowCoupon: true
        })
    }

    handleShowProduct() {
        this.setState({
            isShowChart: false,
            isShowProfile: false,
            isShowProduct: true,
            isShowListUser: false,
            isShowOrder: false,
            isShowCoupon: false
        })
    }

    handleShowProduct() {
        this.setState({
            isShowChart: false,
            isShowProfile: false,
            isShowProduct: true,
            isShowListUser: false,
            isShowOrder: false,
            isShowCoupon: false
        })
    }


    handleShowOrder() {
        this.setState({
            isShowChart: false,
            isShowProfile: false,
            isShowProduct: false,
            isShowListUser: false,
            isShowOrder: true,
            isShowCoupon: false
        })
    }


    iconHide() {
        document.querySelector('.admin__option').classList.toggle("hidden")
        if (this.state.hide === true) {
            document.querySelector('.listproductadmin').classList.remove('showwithsidebar')
            document.querySelector('.listproductadmin').classList.add('showall')

        }
        else {
            document.querySelector('.listproductadmin').classList.remove('showall')
            document.querySelector('.listproductadmin').classList.add('showwithsidebar')
        }
        this.setState({
            hide: !this.state.hide
        })
    }


    render() {
        console.log(this.state)
        let profilepage, productpage, dashboardpage, userpage, orderpage, couponpage
        if (this.state.isShowChart === true) {
            dashboardpage = <ChartPage />
        }
        else dashboardpage = ''
        if (this.state.isShowProfile === true) {
            profilepage = <SelectOption />
        }
        else profilepage = ''
        if (this.state.isShowProduct === true) {
            productpage = <ProductPage />
        }
        if (this.state.isShowListUser === true) {
            userpage = <UserPage />
        }
        if (this.state.isShowOrder === true) {
            orderpage = <OrderPage />
        }
        if (this.state.isShowCoupon === true) {
            couponpage = <PhieuNhapXuatPage />
        }
        return (
            <div>
                <div className="headeradmin">
                    <p>SACH99</p>
                    <span>SHOP</span>
                    <svg onClick={this.iconHide} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" className="svg-inline--fa fa-bars fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
                </div>
                <HomapageAdmin
                    handleClickOption={this.handleClickOption}
                    handleShowChart={this.handleShowChart}
                    handleShowProfule={this.handleShowProfule}
                    handleShowProduct={this.handleShowProduct}
                    handleShowUser={this.handleShowUser}
                    handleShowOrder={this.handleShowOrder}
                    handleShowCoupon={this.handleShowCoupon}

                />
                {dashboardpage}
                {profilepage}
                {productpage}
                {userpage}
                {orderpage}
                {couponpage}
            </div>
        )
    }
}
export default AdminUI