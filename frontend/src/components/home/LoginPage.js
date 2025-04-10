import {Component} from "react";
import "./LoginPage.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import users from "../data/login.json";
import history from "../../history";
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username : '',
            password : '',
            users : users
        }
    }

    login = (e) => {
        e.preventDefault();
        const { username, password, users } = this.state;

        const foundUser = users.find(
            user => user.username === username && user.password === password
        );

        if (foundUser) {
            if(foundUser.role === "student"){
                sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
                history.push("/home/student");
                window.location.reload();
            }
            else{
                sessionStorage.setItem("currentTeacher", JSON.stringify(foundUser));
                history.push("/home/teacher");
                window.location.reload();
            }
        } else {
            alert("Date invalide");
        }
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