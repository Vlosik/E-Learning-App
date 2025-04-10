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
                <div className="course">
                    <div className="top-side">
                        <img src={`/${this.state.course.Image}`} alt={this.state.course.Title}
                             className="course-image"/>
                        <div className="course-details">
                            <IoExitOutline className="exit-icon" role="button" onClick={this.goToHomePage}/>
                            <h1 className="course-title">{this.state.course.Title}</h1>
                            <div className="course-stats">
                                <h3 className="text stats-right"><FaRegClock className="icon"/> Sessions : {this.state.course.Sessions}</h3>
                                <h3 className="text stats-right"><FaRegCalendar className="icon"/> Date : {this.state.course.StartDate} to {this.state.course.EndDate}</h3>
                                <h3 className="text stats-right"><LuGlobe className="icon"/> Language : {this.state.course.Language}</h3>
                                <h3 className="text stats-right"><FaTag className="icon"/> Price : {this.state.course.Price} $</h3>
                                <h3 className="text stats-right"><FaUserGroup className="icon"/> Slots Available : {this.state.course.Slots}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-side">
                        <h2 className="text"><MdOutlineInfo className="icon"/> About this course</h2>
                        <h1 className="text">• {this.state.course.Description}</h1>
                        <Link to="/login" className="enroll-link">Enroll me</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoursePage;