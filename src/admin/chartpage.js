
import axios from "axios";
import { Component } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
export default class ChartPage extends Component {
    constructor(props) {
        super(props);
        var fromdate = new Date(Date.now())
        fromdate.setDate(fromdate.getDate() - 5)
        var today = new Date(Date.now())
        today.setDate(today.getDate() + 1)

        fromdate = fromdate.toISOString().split('T')[0]
        today = today.toISOString().split('T')[0]

        this.state = {
            data: [

            ],
            COLORS: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#345678"],
            ngaybatdau: fromdate,
            ngayketthuc: today,
            tongtiennhap: 0,
            tongtienxuat: 0,
            loading: true,
            data2: [],
            data3: [],
            data4: [],
            strSearch: '',
            strSearch2: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChange2 = this.handleChange2.bind(this)
        this.inthongke = this.inthongke.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleSearch2 = this.handleSearch2.bind(this)
    }

    handleChange(e) {
        this.setState({
            ngaybatdau: e.target.value
        })
    }
    handleChange2(e) {

        this.setState({
            ngayketthuc: e.target.value
        })
    }
    componentDidMount() {
        let firstday = new Date(this.state.ngaybatdau)
        let lastday = new Date(this.state.ngayketthuc)
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/top5sach`,
            data: {
                ngaybatdau: firstday,
                ngayketthuc: lastday
            }
        })
            .then(response => {
                if (response.data !== this.state.data) {
                    this.setState({
                        data: response.data
                    })
                }
            })
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/chartnhapxuat`,
            data: {
                ngaybatdau: firstday,
                ngayketthuc: lastday
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                if (response.data.tongtiennhap !== this.state.tongtiennhap || response.data.tongtienxuat !== this.state.tongtienxuat) {
                    this.setState({
                        tongtiennhap: response.data.tongtiennhap,
                        tongtienxuat: response.data.tongtienxuat,
                        loading: false

                    })
                }
            })
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/tkesoluongbantatca`,
            data: {
                ngaybatdau: firstday,
                ngayketthuc: lastday
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    data2: response.data,
                })

            })
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/tkeloilo`,
            data: {
                ngaybatdau: firstday,
                ngayketthuc: lastday
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    data3: response.data,
                })

            })
        axios({
            method: "POST",
            url: `https://tttn.herokuapp.com/api/select/tketop5tienloi`,
            data: {
                ngaybatdau: firstday,
                ngayketthuc: lastday
            },
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then(response => {
                console.log(response.data)
                this.setState({
                    data4: response.data,
                })

            })


    }

    inthongke() {
        this.setState({
            loading: true
        })
        let firstday = new Date(this.state.ngaybatdau)
        let lastday = new Date(this.state.ngayketthuc)
        if (this.state.ngaybatdau === '' || this.state.ngayketthuc === '') {
            toast.error('Ngày không hợp lệ. Chọn lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return
        }
        if (firstday.getTime() > lastday.getTime()) {
            toast.error('Ngày không hợp lệ. Chọn lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/select/top5sach`,
                data: {
                    ngaybatdau: firstday,
                    ngayketthuc: lastday
                }
            })
                .then(response => {
                    if (response.data !== this.state.data) {
                        this.setState({
                            data: response.data
                        })
                    }
                })
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/select/chartnhapxuat`,
                data: {
                    ngaybatdau: firstday,
                    ngayketthuc: lastday
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(response => {
                    if (response.data.tongtiennhap !== this.state.tongtiennhap || response.data.tongtienxuat !== this.state.tongtienxuat) {
                        this.setState({
                            tongtiennhap: response.data.tongtiennhap,
                            tongtienxuat: response.data.tongtienxuat,

                        })
                    }
                })
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/select/tkesoluongbantatca`,
                data: {
                    ngaybatdau: firstday,
                    ngayketthuc: lastday
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        data2: response.data,
                        loading: false
                    })

                })
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/select/tkeloilo`,
                data: {
                    ngaybatdau: firstday,
                    ngayketthuc: lastday
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        data3: response.data,
                    })

                })
            axios({
                method: "POST",
                url: `https://tttn.herokuapp.com/api/select/tketop5tienloi`,
                data: {
                    ngaybatdau: firstday,
                    ngayketthuc: lastday
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        data4: response.data,
                    })

                })
        }
    }
    handleSearch(strSearch) {
        this.setState({
            strSearch: strSearch
        })
    }
    handleSearch2(strSearch) {
        this.setState({
            strSearch2: strSearch
        })
    }
    render() {
        const { data, loading, data2, data3, data4 } = this.state;
        console.log(data4)
        let listmau = data.map((inf, key) => {
            return <ItemGT inf={inf} key={key} />
        })
        let mau = this.state.COLORS.map((color, key) => {
            return <ListMau color={color} key={key} />
        })
        const search = this.state.strSearch
        const search2 = this.state.strSearch2

        let items = []
        let items2 = []

        if (search.length > 0) {
            data2.forEach(item => {
                if (item.product.TenSP.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                    items.push(item)
                }
            })
        }
        else items = data2
        if (search2.length > 0) {
            data3.forEach(item => {
                if (item.product.TenSP.toLowerCase().indexOf(search2.toLowerCase()) !== -1) {
                    items2.push(item)
                }
            })
        }
        else items2 = data3
        let listdata2 = items.map((sp, index) => {
            return <ItemChart2 key={index} product={sp} />
        })
        let listdata3 = items2.map((sp, index) => {
            return <ItemChart3 key={index} product={sp} />
        })
        return (
            <div className="listproductadmin showwithsidebar">
                <ToastContainer />

                <div className="chart thongkethang">
                    <div className="title"><h3>Thống kê tháng: </h3></div>
                    <div className="thongke__ngay">
                        <p>Ngày bắt đầu: </p>
                        <input type="date" onChange={this.handleChange} value={this.state.ngaybatdau} />
                    </div>
                    <div className="thongke__ngay">
                        <p>Ngày kết thúc: </p>
                        <input type="date" onChange={this.handleChange2} value={this.state.ngayketthuc} />
                    </div>
                    <button onClick={this.inthongke}>Load</button>
                </div>
                <div className="tabledoanhthu">
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) : <>
                        <div className="tke tiennhap">
                            <p>Tổng tiền nhập: </p>
                            <span>{this.state.tongtiennhap}đ</span>
                        </div></>}
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) : <><div className="tke tienxuat">
                        <p>Tổng tiền xuất: </p>
                        <span>{this.state.tongtienxuat}đ</span>
                    </div></>}
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) : <><div className="tke tienloi">
                        <p>Tiền lời: </p>
                        <span>{this.state.tongtienxuat - this.state.tongtiennhap}đ</span>
                    </div></>}
                </div>
                <div className="chart so1">
                    <div className="title"><h3>Top 5 sách bán chạy nhất tháng {this.state.optionthang}</h3></div>
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                        <>
                            <div className="content">
                                <PieChart width={400} height={400} onMouseEnter={this.onPieEnter}>
                                    <Pie
                                        data={this.state.data}
                                        cx={150}
                                        cy={200}
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="sum"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={this.state.COLORS[index % this.state.COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                                <div className="content__all">

                                    <div className="content__data">
                                        <h4>Giải thích:</h4>
                                        <div className="bangmau">
                                            <div className='listmau'>
                                                {mau}
                                            </div>
                                            <div className="tensach">
                                                {listmau}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>}
                </div>
                <div className="chart so1">
                    <div className="title"><h3>Top 5 sách bán chạy nhất tháng {this.state.optionthang}</h3></div>
                    {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                        <>
                            <div className="content">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={data4}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                        barSize={20}
                                    >
                                        <XAxis dataKey="TenSP" scale="point" padding={{ left: 10, right: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="tienloi" fill="#8884d8" background={{ fill: '#eee' }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </>}
                </div>
                <div className="chart so2">
                    <div className="title"><h3>Tổng số lượt bán của tất cả các sách {this.state.optionthang}</h3></div>
                    <FormSearch handleSearch={this.handleSearch} />
                    <div className="tableThongKe">
                        <div className="column-name">
                            <div className="img"><p>Hình ảnh</p></div>
                            <div className="tensp"><p>Tên sản phẩm</p></div>
                            <div className="dongia"><p>Đơn giá</p></div>
                            <div className="khuyenmai"><p>Khuyến mãi</p></div>
                            <div className="sum"><p>Số lần bán</p></div>
                        </div>
                        <div className="listpthongke">
                            {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                                <>{listdata2}</>}
                        </div>
                    </div>

                </div>
                <div className="chart so2">
                    <div className="title"><h3>Tổng doanh thu của tất cả các sách</h3></div>
                    <FormSearch2 handleSearch2={this.handleSearch2} />
                    <div className="tableThongKe">
                        <div className="column-name">
                            <div className="img"><p>Hình ảnh</p></div>
                            <div className="tensp"><p>Tên sản phẩm</p></div>
                            <div className="dongia"><p>Tiền nhập</p></div>
                            <div className="khuyenmai"><p>Tiền xuất</p></div>
                            <div className="sum"><p>Tiền lời</p></div>
                        </div>
                        <div className="listpthongke">
                            {loading ? (<ClipLoader size={30} color={"#F37A24"} loading={loading} />) :
                                <>{listdata3}</>}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

class FormSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            strSearch: ''
        }
        this.onchangeSearch = this.onchangeSearch.bind(this)
        this.onClickSeearch = this.onClickSeearch.bind(this)
        this.onClickclear = this.onClickclear.bind(this)


    }
    onchangeSearch(e) {
        this.setState({
            strSearch: e.target.value
        })
    }
    onClickclear() {
        this.setState({
            strSearch: ''
        })
        this.props.handleSearch('')
    }
    onClickSeearch() {
        this.props.handleSearch(this.state.strSearch)
    }
    render() {
        return (
            <div className="searchform">
                <input type="text" value={this.state.strSearch} onChange={this.onchangeSearch} placeholder="Nhập tên sp muốn tìm" />
                <button className="nut1" onClick={this.onClickSeearch}>Tìm</button>
                <button className="nut2" onClick={this.onClickclear}>Clear</button>
            </div>
        )
    }
}
class FormSearch2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            strSearch: ''
        }
        this.onchangeSearch = this.onchangeSearch.bind(this)
        this.onClickSeearch = this.onClickSeearch.bind(this)
        this.onClickclear = this.onClickclear.bind(this)


    }
    onchangeSearch(e) {
        this.setState({
            strSearch: e.target.value
        })
    }
    onClickclear() {
        this.setState({
            strSearch: ''
        })
        this.props.handleSearch2('')
    }
    onClickSeearch() {
        this.props.handleSearch2(this.state.strSearch)
    }
    render() {
        return (
            <div className="searchform">
                <input type="text" value={this.state.strSearch} onChange={this.onchangeSearch} placeholder="Nhập tên sp muốn tìm" />
                <button className="nut1" onClick={this.onClickSeearch}>Tìm</button>
                <button className="nut2" onClick={this.onClickclear}>Clear</button>
            </div>
        )
    }
}
class ItemChart2 extends Component {
    render() {
        return (<div className="column-item">
            <div className="img"><img src={this.props.product.product.img} /></div>
            <div className="tensp"><p>{this.props.product.product.TenSP}</p></div>
            <div className="dongia"><p>{this.props.product.product.DonGia}</p></div>
            <div className="khuyenmai"><p>{this.props.product.product.KhuyenMai}</p></div>
            <div className="sum"><p>{this.props.product.sum}</p></div>
        </div>)
    }
}

class ItemChart3 extends Component {
    render() {
        return (<div className="column-item">
            <div className="img"><img src={this.props.product.product.img} /></div>
            <div className="tensp"><p>{this.props.product.product.TenSP}</p></div>
            <div className="dongia"><p>{this.props.product.tn}</p></div>
            <div className="khuyenmai"><p>{this.props.product.tx}</p></div>
            <div className="sum"><p>{this.props.product.tx - this.props.product.tn}</p></div>
        </div>)
    }
}
class ItemGT extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <p>{this.props.inf.product.TenSP}</p>
            </div>
        )
    }
}

class ListMau extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className='mau' style={{ backgroundColor: this.props.color }}>

            </div>
        )
    }
}