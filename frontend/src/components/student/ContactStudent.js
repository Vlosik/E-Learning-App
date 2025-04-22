import React, { Component } from "react";
import "./ContactStudent.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { FaRegClock, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import axiosInstance from "../../axios";

class ContactStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: 'Observatorului 123, Cluj-Napoca',
            phone: '+40 721 123 456',
            email: 'contact.uplearn@gmail.com',
            hour: 'Mon-Fri : 9AM - 6PM',
            isChatOpen: false,
            newMessage: '',
            chat: []
        };
        this.chatEndRef = React.createRef();
    }

    toggleChat = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen }, this.scrollToBottom);
    };

    scrollToBottom = () => {
        if (this.chatEndRef.current) {
            this.chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    sendMessage = () => {
        const { newMessage, chat } = this.state;

        if (newMessage.trim() !== '') {
            const updatedChat = [...chat, { sender: 'Student', message: newMessage }];

            this.setState({ chat: updatedChat, newMessage: '' }, () => {
                axiosInstance.post("/api/ollama/chat", { chat: updatedChat })
                    .then((response) => {
                        this.setState(prevState => ({
                            chat: [...prevState.chat, { sender: 'AI', message: response.data.response }]
                        }), this.scrollToBottom);
                    })
                    .catch((error) => {
                        console.error("Error during chat:", error);
                        alert(error.response?.data?.error || "Something went wrong.");
                    });
            });
        }
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.chat.length !== this.state.chat.length) {
            this.scrollToBottom();
        }
    }

    render() {
        return (
            <div className="contact-student">
                <div className="navbar">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="search-field">
                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Search"
                                required
                                value={this.state.search || ''}
                                onChange={(e) => this.setState({ search: e.target.value })}
                            />
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

                <div className="account-info-box">
                    <h2 className="account-title">Contact Information</h2>
                    <div className="info-row">
                        <FaLocationDot className="info-icon" />
                        <input type="text" value={this.state.location} readOnly />
                    </div>
                    <div className="info-row">
                        <FaPhoneAlt className="info-icon" />
                        <input type="text" value={this.state.phone} readOnly />
                    </div>
                    <div className="info-row">
                        <FaEnvelope className="info-icon" />
                        <input type="text" value={this.state.email} readOnly />
                    </div>
                    <div className="info-row">
                        <FaRegClock className="info-icon" />
                        <input type="text" value={this.state.hour} readOnly />
                    </div>
                </div>

                {!this.state.isChatOpen && (
                    <div className="chat-icon" onClick={this.toggleChat}>
                        <FaComments />
                    </div>
                )}

                {this.state.isChatOpen && (
                    <div className="chat-popup">
                        <div className="chat-header">
                            Live Chat
                            <span className="close-chat" onClick={this.toggleChat}>×</span>
                        </div>
                        <div className="chat-body">
                            {this.state.chat.length === 0 ? (
                                <div className="no-messages">No messages yet. Start the conversation!</div>
                            ) : (
                                <div className="chat-messages">
                                    {this.state.chat.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`chat-message ${msg.sender === 'Student' ? 'student' : 'ai'}`}
                                        >
                                            <div className="chat-sender">{msg.sender}</div>
                                            <div className="chat-text">{msg.message}</div>
                                        </div>
                                    ))}
                                    <div ref={this.chatEndRef}/>
                                </div>
                            )}
                        </div>
                        <div className="chat-input-area">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={this.state.newMessage}
                                onChange={(e) => this.setState({newMessage: e.target.value})}
                                onKeyDown={(e) => e.key === 'Enter' && this.sendMessage()}
                            />
                            <button onClick={this.sendMessage} className="send-icon">
                                <IoIosSend/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ContactStudent;
