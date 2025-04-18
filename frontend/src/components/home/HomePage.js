import {Component} from "react";
import "./HomePage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaTag } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import history from "../../history";
import CalendarPicker from "./CalendarPicker";
import axiosInstance from "../../axios";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search : '',
            discountActive : false,
            field : '',
            startDate : '',
            endDate : '',
            showCalendar : false,
            courses : [],
            currentPage: 1,
            coursesPerPage: 6,
            language: ""
        }
    }

    componentDidMount() {
        this.getLocation();
        this.getCourses();
    }

    getLocation() {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.showCoords,this.notAvailable);
        }
    }

    getCourses() {
        axiosInstance.get("/api/courses/getAll").then((response) => {
            this.setState({courses: response.data});
            console.log(response.data);
        }).catch((error) => {
            console.error("Error during login:", error);
            alert(error.response.data.message);
        });
    }

    showCoords = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        sessionStorage.setItem("positionCoords", JSON.stringify(position));


        const isInRomania =
            lat >= 43.6 && lat <= 48.3 &&
            lon >= 20.2 && lon <= 29.7;

        if (isInRomania) {
            this.setState({language: "romanian"});
        } else {
            this.setState({language: "english"});
        }
    };


    notAvailable = () => {
        alert("Not Available");
    }

    handleNextPage = () => {
        const totalPages = Math.ceil(this.state.courses.length / this.state.coursesPerPage);
        if (this.state.currentPage < totalPages) {
            this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
        }
    }

    handlePrevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState(prev => ({ currentPage: prev.currentPage - 1 }));
        }
    }

    handleFieldChange = (e) => {
        this.setState({ field: e.target.value, currentPage: 1 });
    };

    handleResetFilters = (e) => {
        this.setState({
            search : '',
            discountActive : false,
            field : '',
            startDate : '',
            endDate : '',
            showCalendar : false,
            currentPage: 1, });
    };

    handleGoToCourse = (course) => {
        sessionStorage.setItem("currentCourse", JSON.stringify(course));
        history.push("/course");
        window.location.reload();
    }

    getPaginatedCourses = () => {
        const { currentPage, coursesPerPage, courses, search, field, language,startDate,endDate } = this.state;

        const filteredCourses = courses.filter(course => {
            const matchesTitle = course.title.toLowerCase().includes(search.toLowerCase());
            const matchesField = field === '' || course.field.toLowerCase() === field.toLowerCase();

            let matchesDate = true;
            if (startDate && endDate) {
                const courseStart = new Date(course.startDate);
                const courseEnd = new Date(course.endDate);
                matchesDate =
                    courseStart >= startDate &&
                    courseEnd <= endDate;
            }

            return matchesTitle && matchesField && matchesDate;
        });

        const sortedCourses = filteredCourses.sort((a, b) => {
            if (a.slots === 0 && b.slots !== 0) return 1;
            if (a.slots !== 0 && b.slots === 0) return -1;

            const langA = a.language.toLowerCase();
            const langB = b.language.toLowerCase();
            const selectedLang = language.toLowerCase();

            if (langA === selectedLang && langB !== selectedLang) return -1;
            if (langA !== selectedLang && langB === selectedLang) return 1;

            return a.title.localeCompare(b.title);
        });

        const startIndex = (currentPage - 1) * coursesPerPage;
        const endIndex = startIndex + coursesPerPage;
        return sortedCourses.slice(startIndex, endIndex);
    };


    render() {
        return (
            <div className="home">
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
                            <li><Link to="/login" className="links">Courses</Link></li>
                            <li><Link to="/contact" className="links">Contact</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="search-fields">
                    <div className="left-side">
                        <button className="discount-button"><FaTag className="tag"/> Discount</button>
                        <select value={this.state.field} onChange={this.handleFieldChange} className="select-field">
                            <option value="">Field</option>
                            <option value="economic">Economic</option>
                            <option value="it">IT</option>
                            <option value="arts">Arts</option>
                            <option value="human">Human Science</option>
                            <option value="arts">Arts</option>
                        </select>
                        <MdRefresh className="reset-icons" role="button" onClick={this.handleResetFilters}/>
                    </div>
                    <div className="right-side">
                        <CalendarPicker onDateChange={(start, end) => {
                            this.setState({
                                startDate: start,
                                endDate: end
                            });
                        }} />
                        <FaArrowLeft className="right-icons" role="button" onClick={this.handlePrevPage}/>
                        <FaArrowRight className="right-icons" role="button" onClick={this.handleNextPage}/>
                    </div>
                </div>
                <div className="courses">
                    {this.getPaginatedCourses().length > 0 ? (
                        this.getPaginatedCourses().map((course) => (
                            <div key={course.id} className={`course-card ${course.slots === 0 ? 'unavailable' : ''}`}
                                 role="button" onClick={() => this.handleGoToCourse(course)}>
                                <CiStar className="star" role="button" onClick={this.handleAddFavourite}/>
                                <img src={`data:image/png;base64,${course.image}`} alt={course.title}
                                     className="course-image"/>
                                <h3 className="course-title">{course.title}</h3>
                            </div>
                        ))
                    ) : (
                        <div className="no-courses">
                            <h2>Nu exista cursuri disponibile</h2>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default HomePage;