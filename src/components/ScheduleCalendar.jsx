import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import AdminBackground from '../Images/AdminBackground.jpg';

const ScheduleCalendar = () => {
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch schedule data from the API
  const fetchSchedule = async () => {
    try {
      const response = await fetch('http://localhost:8080/hello/getSchedule?classParam=8');
      const data = await response.json();
      setSchedule(data);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  // Filter the schedule based on the selected date
  const filteredSchedule = schedule.filter((item) => {
    const start = moment(item.start);
    const end = moment(item.end);
    const selected = moment(selectedDate);

    // Check if the selected date falls within the start and end date range (inclusive)
    return selected.isSameOrAfter(start) && selected.isSameOrBefore(end);
  });

  return (
    <>
      <style>
        {`
          body {
            background-image: url(${AdminBackground});
            background-size: cover;
            margin: 0;
            padding: 0;
          }

          .calendar-container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            height: 600px; /* Set a fixed height for the container */
            overflow-y: auto; /* Allow vertical scrolling when content overflows */
          }

          .event-list {
            list-style-type: none;
            padding: 0;
            margin-top: 20px;
          }

          .event-item {
            border: 1px solid #ccc;
            border-radius: 5px;
            margin: 10px 0;
            padding: 10px;
          }

          @media (max-width: 600px) {
            .event-item {
              width: 100%;
            }

            .event-list {
              margin-top: 40px;
            }

            .calendar-container {
              padding-top: 40px;
            }
          }
        `}
      </style>

      <div className="calendar-container">
        <h2>Class Schedule Calendar</h2>
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <div>
          <h3>Schedule for {moment(selectedDate).format('MMMM D, YYYY')}</h3>
          {filteredSchedule.length === 0 ? (
            <p>No classes scheduled for this date.</p>
          ) : (
            <ul className="event-list">
              {filteredSchedule.map((item) => (
                <li key={item.title} className="event-item">
                  <strong>{item.title}</strong> with {item.teacher} from {moment(item.start).format('h:mm A')} to{' '}
                  {moment(item.end).format('h:mm A')}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default ScheduleCalendar;
