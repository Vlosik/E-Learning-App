import {Component} from "react";
import "./ProfileStudent.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

class ProfileStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : JSON.parse(sessionStorage.getItem("currentUser")),
        }
    }

    render() {
        return (
            <div className="profile-student">
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
                            <li><Link to="/home/student/profile" className="links">Profile</Link></li>
                            <li><Link to="/home/student" className="links">Home</Link></li>
                            <li><Link to="/home/student/courses" className="links">Courses</Link></li>
                            <li><Link to="/home/student/contact" className="links">Contact</Link></li>
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
                        <input type="text" value={this.state.user?.password || ""} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaEnvelope className="info-icon"/>
                        <input type="text" value={this.state.user?.email || "contact@exemplu.ro"} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaPhoneAlt className="info-icon"/>
                        <input type="text" value={this.state.user?.phone || "+40 721 123 456"} readOnly/>
                    </div>
                    <button className="edit-button">Edit</button>
                </div>
                <Link to="/login" className="sign-out">Sign Out</Link>
            </div>
        )
    }
}

export default ProfileStudent;