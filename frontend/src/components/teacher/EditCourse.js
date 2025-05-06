import {Component} from "react";
import "./EditCourse.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { FaBookOpen, FaPen, FaInfoCircle, FaListUl, FaCalendarDay , FaClock, FaImage, FaUsers, FaGlobe, FaTag } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import axiosInstance from "../../axios";
import history from "../../history";
import {IoExitOutline} from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import {jwtDecode} from "jwt-decode";

class EditCourse extends Component {
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
            courseId : "",
            image: null,
            imageShow: true,
            discount : "",
            editDiscount : false,
            discountId : "",
        };
    }

    componentDidMount() {
        this.initCourse();
        this.getDiscount();
    }

    initCourse = () => {
        const courseData = sessionStorage.getItem("currentEditCourse");
        if (courseData) {
            const course = JSON.parse(courseData);
            this.setState({
                courseId: course.id || "",
                title: course.title || "",
                description: course.description || "",
                field: course.field || "",
                startDate: course.startDate || "",
                finishDate: course.endDate || "",
                sessions: course.sessions || "",
                slots: course.slots || "",
                language: course.language || "",
                price: course.price || "",
                image: course.image || null
            });
        }
    }

    getDiscount = () => {
        const {token} = this.state;
        const courseData = sessionStorage.getItem("currentEditCourse");
        if (courseData) {
            const course = JSON.parse(courseData);
            axiosInstance.get(`/api/discounts/getDiscount/by=${course.id}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => {
                if(response.data){
                    this.setState({ discount : response.data.percentage, editDiscount : true, discountId : response.data.id});
                }
            }).catch((error) => {
                console.error("Error during login:", error);
                alert(error.response.data.message);
            });
        }
    }

    handleEditCourse = (e) => {
        e.preventDefault()
        const { title, description, field, startDate, finishDate, sessions, slots, language, price, image, courseId, token} = this.state;

        const decodedToken = jwtDecode(token);
        const teacherId = decodedToken.id;

        const formDataPut = new FormData();
        formDataPut.append('title', title);
        formDataPut.append('description', description);
        formDataPut.append('field', field);
        formDataPut.append('startDate', startDate);
        formDataPut.append('endDate', finishDate);
        formDataPut.append('sessions', sessions);
        formDataPut.append('slots', slots);
        formDataPut.append('language', language);
        formDataPut.append('price', price);
        formDataPut.append('teacher', teacherId);

        if(image instanceof File){
            formDataPut.append('image', image);
            axiosInstance.put(`/api/courses/update/withImage/${courseId}`, formDataPut, {
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
        }else{
            axiosInstance.put(`/api/courses/update/${courseId}`, formDataPut, {
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

    }

    handleAddDiscount = () => {
        const {discount, courseId, token} = this.state;
        const discountData = {
            percentage : discount,
            courseId
        }

        axiosInstance.post(`/api/discounts/create`,discountData,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            console.log(response.data);
            history.push("/home/teacher");
            window.location.reload();
        }).catch((error) => {
            console.error("Error during login:", error);
            alert(error.response.data.message);
        });
    }

    handleUpdateDiscount = () => {
        const {discountId,discount,token} = this.state;

        axiosInstance.put(`/api/discounts/update/${discountId}-${discount}`,{},{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            history.push("/home/teacher");
            window.location.reload();
        }).catch((error) => {
            console.error("Error during login:", error);
            alert(error.response.data.message);
        });
    }

    handleDelete = () => {
        const {discountId,token} = this.state;

        axiosInstance.delete(`/api/discounts/delete/${discountId}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                history.push("/home/teacher");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error during deletion:", error);
                alert(error.response?.data?.message || "An error occurred.");
            });
    }

    goToHomePage = () => {
        window.history.back()
    }

    render() {
        const { title, description, field, startDate, finishDate, sessions, slots, language, price, image, discount, editDiscount } = this.state;

        return (
            <div className="teacher-edit">
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
                <div className="edit-course">
                    <IoExitOutline className="exit-icon" role="button" onClick={this.goToHomePage}/>
                    <h1><FaBookOpen className="icon-header"/> Edit Course</h1>
                    <form onSubmit={this.handleEditCourse} className="course-form">
                        <div className="left-side-add">
                            <div className="form-row">
                                <FaPen className="form-icon"/>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    name="title"
                                    value={title}
                                    onChange={(e) => this.setState({title: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaInfoCircle className="form-icon"/>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => this.setState({description: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaListUl className="form-icon"/>
                                <input
                                    type="text"
                                    placeholder="Field"
                                    name="field"
                                    value={field}
                                    onChange={(e) => this.setState({field: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaCalendarDay className="form-icon"/>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(e) => this.setState({startDate: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaCalendarDay className="form-icon"/>
                                <input
                                    type="date"
                                    name="finishDate"
                                    value={finishDate}
                                    onChange={(e) => this.setState({finishDate: e.target.value})}
                                />
                            </div>
                        </div>

                        <div className="right-side-add">
                            <div className="form-row">
                                <FaClock className="form-icon"/>
                                <input
                                    type="number"
                                    placeholder="Number of sessions"
                                    name="sessions"
                                    value={sessions}
                                    onChange={(e) => this.setState({sessions: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaImage className="form-icon"/>
                                <label className="image-upload-field">
                                    <span>{image ? image.name || "Image selected" : "Pick an image"}</span>
                                    <FiUpload className="upload-icon"/>
                                    <input
                                        type="file"
                                        name="image"
                                        hidden
                                        onChange={(e) => this.setState({image: e.target.files[0], imageShow: false})}
                                    />
                                </label>
                                {this.state.image && this.state.imageShow && (
                                    <div className="image-preview">
                                        <img src={`data:image/png;base64,${this.state.image}`} alt="Course" style={{ maxWidth: '100%', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                            <div className="form-row">
                                <FaUsers className="form-icon"/>
                                <input
                                    type="number"
                                    placeholder="Number of slots available"
                                    name="slots"
                                    value={slots}
                                    onChange={(e) => this.setState({slots: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaGlobe className="form-icon"/>
                                <input
                                    type="text"
                                    placeholder="Language"
                                    name="language"
                                    value={language}
                                    onChange={(e) => this.setState({language: e.target.value})}
                                />
                            </div>
                            <div className="form-row">
                                <FaTag className="form-icon"/>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    name="price"
                                    value={price}
                                    onChange={(e) => this.setState({price: e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="form-submit">
                            <div className="discount">
                                <div className="input-box">
                                    <input
                                        type="number"
                                        placeholder="Discount"
                                        name="price"
                                        value={discount}
                                        onChange={(e) => this.setState({discount: e.target.value})}
                                    />
                                    <TiDelete className="delete-icon" role="button" onClick={this.handleDelete}/>
                                </div>
                                <button type="button" className="discount-button"
                                        onClick={editDiscount ? this.handleUpdateDiscount : this.handleAddDiscount}>{editDiscount ? "Update" : "Add"}</button>
                            </div>
                            <button type="submit" className="add-btn">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditCourse;