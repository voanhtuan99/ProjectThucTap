import { Component } from 'react'
class ContactPage extends Component {
    render() {
        return (<div>
            {/* Page Content */}
            <div className="page-heading contact-heading header-text">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-content">
                                <h4>Thông tin liên hệ</h4>
                                <h2>Liên hệ với chúng tôi</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="find-us">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Vị trí</h2>
                            </div>
                        </div>
                        <div className="col-md-8">
                            {/* How to change your own map point
        1. Go to Google Maps
        2. Click on your location point
        3. Click "Share" and choose "Embed map" tab
        4. Copy only URL and paste it within the src="" field below
    */}
                            <div id="map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.261208731215!2d106.78490560802435!3d10.847813332349352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527131ae8b249%3A0x4d2d3c8fab7d3c2e!2zOTcgxJDGsOG7nW5nIE1hbiBUaGnhu4duLCBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1627142386503!5m2!1svi!2s" style={{ border: 0 }} allowFullScreen width="100%" height="330px" frameBorder={0} title="map" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="left-content">
                                <h4>Trụ sở của chúng tôi</h4>
                                <p>97 Man Thien, Quan 9, TPHCM.</p>
                                <p>https://www.facebook.com/tuan.vo.99/</p>
                                <ul className="social-icons">
                                    <li><div><i className="fa fa-facebook" /></div></li>
                                    <li><div><i className="fa fa-twitter" /></div></li>
                                    <li><div><i className="fa fa-linkedin" /></div></li>
                                    <li><div><i className="fa fa-behance" /></div></li>
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

export default ContactPage