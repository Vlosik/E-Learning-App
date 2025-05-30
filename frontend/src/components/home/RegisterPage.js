import {Component} from "react";
import "./RegisterPage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import history from "../../history";
import axiosInstance from "../../axios";

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            email : '',
            phone : '',
            role : 'student'
        }
    }

    handleRoleChange = (e) => {
        const selectedRole = e.target.id;
        this.setState({ role: selectedRole });

    }

    register = (e) => {
        e.preventDefault();
        const { username, password, email, role, phone } = this.state;
        const user = {
            username,
            password,
            email,
            phone,
            role
        }

        axiosInstance.post("/api/users/register", user).then((response) => {
            history.push("/login");
            window.location.reload();
        }).catch((error) => {
            console.error("Error during login:", error);
            alert(error.response.data.message);
        });
    };

    render() {
        return (
            <div className="register">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div className="main-box">
                    <div className="left-box">
                        <form onSubmit={this.register}>
                            <h1>Enter your credentials</h1>
                            <div className="input-box">
                                <input type="text" placeholder="Username" required
                                       onChange={(e) => this.setState({username: e.target.value})}/>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Password" required
                                       onChange={(e) => this.setState({password: e.target.value})}/>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Email" required
                                       onChange={(e) => this.setState({email: e.target.value})}/>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Phone" required
                                       onChange={(e) => this.setState({phone: e.target.value})}/>
                            </div>

                            <div className="role-toggle-wrapper">
                                <div className="role-toggle">
                                    <input type="radio" name="role" id="student" checked={this.state.role === 'student'}
                                           onChange={this.handleRoleChange}/>
                                    <label htmlFor="student">Student</label>

                                    <input type="radio" name="role" id="teacher" checked={this.state.role === 'teacher'}
                                           onChange={this.handleRoleChange}/>
                                    <label htmlFor="teacher">Teacher</label>

                                    <div className="selector"></div>
                                </div>
                            </div>
                            <button type="submit" className="login-button">Register</button>
                            <Link to="/login" className="login-link">Already have an account? Log in</Link>
                        </form>
                    </div>
                    <div className="right-box">
                        <h1>Keep learning <br/> Keep growing</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage;