import {Component} from "react";
import "./TeacherAddCourse.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaBookOpen, FaPen, FaInfoCircle, FaListUl, FaCalendarDay , FaClock, FaImage, FaUsers, FaGlobe, FaTag } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import axiosInstance from "../../axios";
import history from "../../history";
import {IoExitOutline} from "react-icons/io5";
import {jwtDecode} from "jwt-decode";

class TeacherAddCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token : sessionStorage.getItem("token"),
            title: "",
            description: "",
            field: "",
            startDate: "",
            finishDate: "",
            sessions: "",
            slots: "",
            language: "",
            price: "",
            image: null
        };
    }

    handleAddCourse = () => {
        const { title, description, field, startDate, finishDate, sessions, slots, language, price, image, token} = this.state;

        const decodedToken = jwtDecode(token);
        const teacherId = decodedToken.id;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('field', field);
        formData.append('startDate', startDate);
        formData.append('endDate', finishDate);
        formData.append('sessions', sessions);
        formData.append('slots', slots);
        formData.append('language', language);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('teacher', teacherId);

        console.log(formData);
        axiosInstance.post("/api/courses/insert", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                     Authorization: `Bearer ${token}`
                }
            }).then((response) => {
            history.push("/home/teacher");
            window.location.reload();
        }).catch((error) => {
            console.error("Error during course creation:", error.response?.data || error.message);
            alert(error.response?.data?.message || "An error occurred");
        });
    }

    goToHomePage = () => {
        window.history.back()
    }

    render() {
        return (
            <div className="teacher-adder">
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
                <div className="add-course">
                    <IoExitOutline className="exit-icon" role="button" onClick={this.goToHomePage}/>
                    <h1><FaBookOpen className="icon-header"/> Add a new Course</h1>
                    <form onSubmit={this.handleAddCourse} className="course-form">
                        <div className="left-side-add">
                            <div className="form-row">
                                <FaPen className="form-icon"/>
                                <input type="text" placeholder="Title" name="title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                            </div>
                            <div className="form-row">
                                <FaInfoCircle className="form-icon"/>
                                <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={(e) => this.setState({description: e.target.value})}/>
                            </div>
                            <div className="form-row">
                                <FaListUl className="form-icon"/>
                                <input type="text" placeholder="Field" name="field" value={this.state.field} onChange={(e) => this.setState({field: e.target.value})}/>
                            </div>
                            <div className="form-row">
                                <FaCalendarDay className="form-icon"/>
                                <input type="date" name="startDate" value={this.state.startDate} onChange={(e) => this.setState({startDate: e.target.value})}/>
                            </div>
                            <div className="form-row">
                                <FaCalendarDay className="form-icon"/>
                                <input type="date" name="finishDate" value={this.state.finishDate} onChange={(e) => this.setState({finishDate: e.target.value})}/>
                            </div>
                        </div>

                        <div className="right-side-add">
                        <div className="form-row">
                                <FaClock className="form-icon"/>
                                <input type="number" placeholder="Number of sessions" name="sessions" value={this.state.sessions} onChange={(e) => this.setState({sessions: e.target.value})}/>
                        </div>
                            <div className="form-row">
                                <FaImage className="form-icon"/>
                                <label className="image-upload-field">
                                    <span>{this.state.image ? this.state.image.name : "Pick an image"}</span>
                                    <FiUpload className="upload-icon"/>
                                    <input type="file" name="image" hidden onChange={(e) => this.setState({image: e.target.files[0]})}/>
                                </label>
                            </div>
                            <div className="form-row">
                                <FaUsers className="form-icon"/>
                                <input type="number" placeholder="Number of slots available" name="slots" value={this.state.slots} onChange={(e) => this.setState({slots: e.target.value})}/>
                            </div>
                            <div className="form-row">
                                <FaGlobe className="form-icon"/>
                                <input type="text" placeholder="Language" name="language" value={this.state.language} onChange={(e) => this.setState({language: e.target.value})}/>
                            </div>
                            <div className="form-row">
                                <FaTag className="form-icon"/>
                                <input type="number" placeholder="Price" name="price" value={this.state.price} onChange={(e) => this.setState({price: e.target.value})}/>
                            </div>
                        </div>
                    </form>
                    <div className="form-submit">
                    <button type="submit" className="add-btn" onClick={this.handleAddCourse}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeacherAddCourse;