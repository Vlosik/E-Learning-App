import {Component} from "react";
import "./CoursePage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { MdOutlineInfo } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { LuGlobe } from "react-icons/lu";
import { FaTag } from "react-icons/fa6";
import { FaUserGroup } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import history from "../../history";

class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course : JSON.parse(sessionStorage.getItem("currentCourse")),
        }
    }

    goToHomePage = () => {
        history.push("/");
        window.location.reload();
    }

    render() {
        const { course } = this.state;
        const hasDiscount = course.percentage > 0;
        const discountedPrice = (course.price * (1 - course.percentage / 100)).toFixed(2);
        return (
            <div className="course-page">
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
                <div className={`course ${hasDiscount ? "discounted" : ""}`}>
                    {hasDiscount && <div className="discount-ribbon">Sale</div>}
                    <div className="top-side">
                        <img src={`data:image/png;base64,${this.state.course.image}`} alt={this.state.course.title}
                             className="course-image"/>
                        <div className="course-details">
                            <IoExitOutline className="exit-icon" role="button" onClick={this.goToHomePage}/>
                            <h1 className="course-title">{this.state.course.title}</h1>
                            <div className="course-stats">
                                <h3 className="text stats-right"><FaRegClock className="icon"/> Sessions
                                    : {this.state.course.sessions}</h3>
                                <h3 className="text stats-right"><FaRegCalendar className="icon"/> Date
                                    : {this.state.course.startDate} to {this.state.course.endDate}</h3>
                                <h3 className="text stats-right"><LuGlobe className="icon"/> Language
                                    : {this.state.course.language}</h3>
                                <h3 className="text stats-right price-section">
                                    <FaTag className="icon"/> Price:
                                    {hasDiscount ? (
                                        <>
                                            <span className="old-price">{course.price} $</span>
                                            <span className="new-price">{discountedPrice} $</span>
                                        </>
                                    ) : (
                                        <span> {course.price} $</span>
                                    )}
                                </h3>
                                <h3 className="text stats-right"><FaUserGroup className="icon"/> Slots Available
                                    : {this.state.course.slots}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-side">
                        <h2 className="text"><MdOutlineInfo className="icon"/> About this course</h2>
                        <h1 className="text">• {this.state.course.description}</h1>
                        <Link to="/login" className="enroll-link">Enroll me</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoursePage;