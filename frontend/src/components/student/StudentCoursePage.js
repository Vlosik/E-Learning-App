import {Component} from "react";
import "./StudentCoursePage.css";
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
import axiosInstance from "../../axios";

class StudentCoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course : JSON.parse(sessionStorage.getItem("studentCurrentCourse")),
            user : JSON.parse(sessionStorage.getItem("currentUser")),
        }
    }

    goToHomePage = () => {
        window.history.back()
    }

    addEnroll = () => {
        const {course, user} = this.state;

        const enroll = {
            studentId : user.id,
            courseId : course.id,
        };

        axiosInstance.post("/api/enrolls/create", enroll).then((response) => {
            history.push("/home/student");
            window.location.reload();
        }).catch((error) => {
            console.error("Error during login:", error);
            alert(error.response.data.message);
        });
    }

    render() {
        return (
            <div className="student-course-page">
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
                <div className="course">
                    <div className="top-side">
                        <img src={`data:image/png;base64,${this.state.course.image}`} alt={this.state.course.title} className="course-image"/>
                        <div className="course-details">
                            <IoExitOutline className="exit-icon" role="button" onClick={this.goToHomePage}/>
                            <h1 className="course-title">{this.state.course.Title}</h1>
                            <div className="course-stats">
                                <h3 className="text stats-right"><FaRegClock className="icon"/> Sessions
                                    : {this.state.course.sessions}</h3>
                                <h3 className="text stats-right"><FaRegCalendar className="icon"/> Date
                                    : {this.state.course.startDate} to {this.state.course.endDate}</h3>
                                <h3 className="text stats-right"><LuGlobe className="icon"/> Language
                                    : {this.state.course.language}</h3>
                                <h3 className="text stats-right"><FaTag className="icon"/> Price
                                    : {this.state.course.price} $</h3>
                                <h3 className="text stats-right"><FaUserGroup className="icon"/> Slots Available
                                    : {this.state.course.slots}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-side">
                        <h2 className="text"><MdOutlineInfo className="icon"/> About this course</h2>
                        <h1 className="text">• {this.state.course.description}</h1>
                        <button className="enroll-link" onClick={this.addEnroll}>Enroll me</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentCoursePage;