import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { FaRegCalendar } from 'react-icons/fa6';
import 'react-datepicker/dist/react-datepicker.css';
import './CalendarPicker.css';

class CalendarPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCalendar: false,
            dateRange: [null, null],
        };
    }

    handleDateChange = (update) => {
        this.setState({ dateRange: update });

        const [start, end] = update;
        if (this.props.onDateChange) {
            this.props.onDateChange(start, end);
        }
    };

    toggleCalendar = () => {
        this.setState((prev) => ({ showCalendar: !prev.showCalendar }));
    };

    render() {
        const [startDate, endDate] = this.state.dateRange;

        return (
            <div className="calendar-wrapper">
                <FaRegCalendar
                    className="right-icons"
                    id="calendar"
                    role="button"
                    onClick={this.toggleCalendar}
                />
                {this.state.showCalendar && (
                    <div className="datepicker-popup">
                        <DatePicker
                            selected={startDate}
                            onChange={this.handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline
                            calendarClassName="custom-calendar"
                        />
                    </div>
                )}
            </div>
        );
    }
}

export default CalendarPicker;
