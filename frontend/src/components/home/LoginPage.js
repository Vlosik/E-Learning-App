import {Component} from "react";
import "./LoginPage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import history from "../../history";
import axiosInstance from "../../axios";
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
        }
    }

    login = (e) => {
        e.preventDefault();
        const { username, password} = this.state;

        const user = {
            username,
            password,
        }

        axiosInstance.post("/api/users/login", user).then((response) => {
            if(response.data.user.role === "student"){
                sessionStorage.setItem("currentUser", JSON.stringify(response.data.user));
                history.push("/home/student");
                window.location.reload();
            }
            else{
                sessionStorage.setItem("currentTeacher", JSON.stringify(response.data.user));
                history.push("/home/teacher");
                window.location.reload();
            }
        }).catch((error) => {
            console.error("Error during login:", error);
            alert(error.response.data.message);
        });
    };


    render() {
        return (
            <div className="login">
                <div className="logo">
                    <img src={logo} alt="Logo"/>
                </div>
                <div className="main-box">
                    <div className="left-box">
                        <form onSubmit={this.login}>
                            <h1>Enter your credentials</h1>
                            <div className="input-box">
                                <input type="text" placeholder="Username" required
                                       onChange={(e) => this.setState({username: e.target.value})}/>
                            </div>
                            <div className="input-box">
                                <input type="text" placeholder="Password" required
                                       onChange={(e) => this.setState({password: e.target.value})}/>
                            </div>
                            <button type="submit" className="login-button">Login</button>
                            <Link to="/register" className="register-link">Don’t have an account? Sign up now</Link>
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

export default LoginPage;