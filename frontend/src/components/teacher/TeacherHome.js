import {Component} from "react";
import "./TeacherHome.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaTag } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import courses from "../data/courses.json";
import { HiMiniTrash } from "react-icons/hi2";
import { MdRefresh } from "react-icons/md";
import history from "../../history";
import { GrDocumentText } from "react-icons/gr";

class TeacherHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search : '',
            discountActive : false,
            field : '',
            startDate : '',
            endDate : '',
            showCalendar : false,
            courses : courses,
            currentPage: 1,
            coursesPerPage: 6,
            teacher : JSON.parse(sessionStorage.getItem("currentTeacher"))
        }
    }

    componentDidMount() {
        this.getUserCourses();
    }

    getUserCourses() {
        const {teacher,courses} = this.state;

        const filteredCourses = courses.filter(course => {
            const matchesTeacher = teacher.username.toLowerCase() === course.Teacher.toLowerCase();

            return matchesTeacher;
        });

        this.setState({courses : filteredCourses});
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
        sessionStorage.setItem("studentCurrentCourse", JSON.stringify(course));
        history.push("/home/course/student");
        window.location.reload();
    }

    handleAddCourse = () => {
        history.push("/home/teacher/add");
        window.location.reload();
    }

    getPaginatedCourses = () => {
        const { currentPage, coursesPerPage, courses, search, field,startDate,endDate } = this.state;

        const filteredCourses = courses.filter(course => {
            const matchesTitle = course.Title.toLowerCase().includes(search.toLowerCase());
            const matchesField = field === '' || course.Field.toLowerCase() === field.toLowerCase();

            let matchesDate = true;
            if (startDate && endDate) {
                const courseStart = new Date(course.StartDate);
                const courseEnd = new Date(course.EndDate);
                matchesDate =
                    courseStart >= startDate &&
                    courseEnd <= endDate;
            }

            return matchesTitle && matchesField && matchesDate;
        });

        const sortedCourses = filteredCourses.sort((a, b) => {
            if (a.Slots === 0 && b.Slots !== 0) return 1;
            if (a.Slots !== 0 && b.Slots === 0) return -1;

            return b.Slots - a.Slots;
        });

        const startIndex = (currentPage - 1) * coursesPerPage;
        const endIndex = startIndex + coursesPerPage;
        return sortedCourses.slice(startIndex, endIndex);
    };


    render() {
        return (
            <div className="teacher-courses">
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
                        <GrDocumentText className="right-icons" role="button" onClick={this.handleAddCourse}/>
                        <FaArrowLeft className="right-icons" role="button" onClick={this.handlePrevPage}/>
                        <FaArrowRight className="right-icons" role="button" onClick={this.handleNextPage}/>
                    </div>
                </div>
                <div className="courses">
                    {this.getPaginatedCourses().length > 0 ? (
                        this.getPaginatedCourses().map((course) => (
                            <div key={course.id} className={`course-card `} role="button" onClick={() => this.handleGoToCourse(course)}>
                                <HiMiniTrash className="delete" role="button" onClick={this.handleAddFavourite}/>
                                <img src={`/${course.Image}`} alt={course.Title} className="course-image" />
                                <h3 className="course-title">{course.Title}</h3>
                            </div>
                        ))
                    ) : (
                        <div className="no-courses">Nu exista cursuri disponibile</div>
                    )}
                </div>
            </div>
        )
    }
}

export default TeacherHome;