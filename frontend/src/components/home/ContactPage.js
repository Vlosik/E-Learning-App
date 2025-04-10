import {Component} from "react";
import "./ContactPage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaRegClock , FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Observatorului 123, Cluj-Napoca',
            phone: '+40 721 123 456',
            email: 'contact.uplearn@gmail.com',
            hour: 'Mon-Fri : 9AM - 6PM'
        }
    }

    render() {
        return (
            <div className="contact-page">
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
                            <li><Link to="/login" className="links">Sign In</Link></li>
                            <li><Link to="/" className="links">Home</Link></li>
                            <li><Link to="/" className="links">Courses</Link></li>
                            <li><Link to="/contact" className="links">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="account-info-box">
                    <h2 className="account-title">Contact Information</h2>
                    <div className="info-row">
                        <FaLocationDot className="info-icon"/>
                        <input type="text" value={this.state.location} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaPhoneAlt className="info-icon"/>
                        <input type="text" value={this.state.phone} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaEnvelope className="info-icon"/>
                        <input type="text" value={this.state.email} readOnly/>
                    </div>
                    <div className="info-row">
                        <FaRegClock className="info-icon"/>
                        <input type="text" value={this.state.hour} readOnly/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactPage;