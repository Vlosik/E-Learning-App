import {Component} from "react";
import "./StatisticsTeacher.css";
import logo from "../../images/logo.png";
import {Link} from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import enrolls from "../data/enroll.json"
import DatePicker from "react-datepicker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


class StatisticsTeacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { month: "March", students: 12 },
                { month: "April", students: 18 },
                { month: "May", students: 10 },
                { month: "June", students: 23 },
                { month: "July", students: 16 },
                { month: "August", students: 9 }
            ],
            enrollments : enrolls
        }
    }

    getChartData = () => {
        return {
            labels: this.state.data.map(e => e.month),
            datasets: [
                {
                    label: 'Students Enrolled',
                    data: this.state.data.map(e => e.students),
                    backgroundColor: 'rgba(102, 153, 255, 0.7)',
                    borderRadius: 6,
                }
            ]
        };
    };

    getChartOptions = () => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Monthly Enrollments'
                }
            },
            scales: {
                y: { beginAtZero: true }
            }
        };
    };

    getStudentsForSelectedDate = () => {
        const { enrollments, selectedDate } = this.state;

        if (!selectedDate) return [];

        return enrollments.filter(e => e.joinDate === selectedDate);
    };


    render() {
        return (
            <div className="statistics">
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
                <div className="stats">

                    <div className="chart-section">
                        <div className="chart-wrapper">
                            <Bar data={this.getChartData()} options={this.getChartOptions()}/>
                        </div>
                    </div>

                    <div className="calendar-student-wrapper">
                        <div className="calendar-left">
                            <DatePicker
                                selected={this.state.selectedDate ? new Date(this.state.selectedDate) : null}
                                onChange={(date) => {
                                    const formatted = date.toISOString().split("T")[0];
                                    this.setState({selectedDate: formatted});
                                }}
                                inline
                                calendarClassName="custom-calendar"
                            />
                        </div>

                        <div className="calendar-right">
                            <h4>Students enrolled for this date</h4>
                            {this.getStudentsForSelectedDate().length > 0 ? (
                                <ul>
                                    {this.getStudentsForSelectedDate().map((e, index) => (
                                        <li key={index}>
                                            {e.username} — {e.course}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No students enrolled on this date.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default StatisticsTeacher;