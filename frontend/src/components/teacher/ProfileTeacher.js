import {Component} from "react";
import "./ProfileTeacher.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import {jwtDecode} from "jwt-decode";

class ProfileTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : {},
            showPassword: false
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails = () => {
        const token = sessionStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userInfo = {
            username : decodedToken.username,
            password : decodedToken.password,
            email : decodedToken.email,
            phone : decodedToken.phone
        }

        this.setState({user : userInfo});
    }

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    render() {
        return (
            <div className="profile-teacher">
                <div className="navbar">
                    <div className="logo">
                        <img src={logo} alt="Logo"/>
                    </div>
                    <div className="search-field">
                        <div className="input-box">
                            <input type="text" placeholder="Search" required value={this.state.search}
                                   onChange={(e) => this.setState({search: e.target.value})}/>
                        </div>
                    </div>
                    <div className="lists">
                        <ul>
                            <li><Link to="/home/teacher/profile" className="links">Profile</Link></li>
                            <li><Link to="/home/teacher" className="links">Home</Link></li>
                            <li><Link to="/home/teacher/statistics" className="links">Statistics</Link></li>
                            <li><Link to="/home/teacher/contact" className="links">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="account-info-box">
                    <h2 className="account-title">Account Information</h2>
                    <div className="info-row">
                        <FaUser className="info-icon"/>
                        <input type="text" value={this.state.user?.username || ""} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaLock className="info-icon"/>
                        <input
                            type={this.state.showPassword ? "text" : "password"}
                            value={this.state.user?.password || ""}
                            readOnly
                        />
                        {this.state.showPassword ? (
                            <FaEyeSlash
                                className="toggle-password-icon"
                                onClick={this.togglePasswordVisibility}
                                role="button"
                            />
                        ) : (
                            <FaEye
                                className="toggle-password-icon"
                                onClick={this.togglePasswordVisibility}
                                role="button"
                            />
                        )}
                    </div>
                    <div className="info-row">
                        <FaEnvelope className="info-icon"/>
                        <input type="text" value={this.state.user?.email || "contact@exemplu.ro"} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaPhoneAlt className="info-icon"/>
                        <input type="text" value={this.state.user?.phone || "+40 721 123 456"} readOnly/>
                    </div>
                </div>
                <Link to="/login" className="sign-out">Sign Out</Link>
            </div>
        )
    }
}

export default ProfileTeacher;