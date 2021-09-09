import { Component } from 'react'
class AboutUs extends Component {
    render() {
        return (<div>
            {/* <div id="preloader">
                <div className="jumper">
                    <div />
                    <div />
                    <div />
                </div>
            </div> */}
            {/* ***** Preloader End ***** */}
            {/* Header */}
            {/* <header className="">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="navbar-brand" href="index.html"><h2>Sach99 <em>Shop</em></h2></div>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickHomepage}>Home
                                        <span className="sr-only">(current)</span>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickProductpage}>Our Products</div>
                                </li>
                                <li className="nav-item active">
                                    <div className="nav-link" onClick={this.props.clickAboutus}>About Us</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickContactpage}>Contact Us</div>
                                </li>
                                <li className="nav-item">
                                    <div className="nav-link" onClick={this.props.clickLoginPage}>Login</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header> */}
            {/* Page Content */}
            <div className="page-heading about-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-content">
                                <h4>about us</h4>
                                <h2>Cửa hàng của tôi</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="best-features about-features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Công việc của chúng tôi</h2>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="right-image">
                                <img src="https://vnwriter.net/wp-content/uploads/2016/10/sach-cu-binh-tinh.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="left-content">
                                <h4>Chúng tôi là ai &amp; Chúng tôi cung cấp những gì</h4>
                                <p>Chúng tôi là sach99. Bán sách với giá cả hợp lý nhất cho mọi người– Đại dịch lần 1 chưa qua thì lần 2 lại đến. Nhà sách tôi thật không thể cầm cự được nữa, nghỉ bán nên thanh lý toàn bộ hơn 1000 đầu sách, chỉ từ 1k/cuốn như lời tri ân bạn đọc đã ủng hộ suốt những năm qua.
                                    – Đọc giả gần xa ghé mua sách #giá_rẻ_xả_kho, nhà sách có ship toàn quốc. bán thu hồi vốn, được đồng nào hay đồng đấy.
                                    Mong anh chị ủng hộ tôi mỗi người một vài cuốn, tôi rất cảm ơn!</p>
                                <ul className="social-icons">
                                    <li><div><i className="fa fa-facebook" /></div></li>
                                    <li><div><i className="fa fa-twitter" /></div></li>
                                    <li><div><i className="fa fa-linkedin" /></div></li>
                                    {/* <li><div><i className="fa fa-behance" /></div></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="inner-content">
                                <p>Cảm ơn đã tin tưởng chúng tôi
                                    - Owner: TUANVO99</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>)
    }
}

export default AboutUs