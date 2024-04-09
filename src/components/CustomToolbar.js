// CustomToolbar.js
import React from 'react';

const CustomToolbar = ({ localizer: { messages }, onNavigate, onView }) => (
  <div className="rbc-toolbar">
    <button type="button" onClick={() => onNavigate('TODAY')}>
      {messages.today}
    </button>
    <button type="button" onClick={() => onNavigate('PREV')}>
      {messages.previous}
    </button>
    <span className="rbc-toolbar-label">{messages.month}</span>
    <button type="button" onClick={() => onNavigate('NEXT')}>
      {messages.next}
    </button>
    <button type="button" onClick={() => onView('month')}>
      {messages.month}
    </button>
    <button type="button" onClick={() => onView('day')}>
      {messages.day}
    </button>
  </div>
);

export default CustomToolbar;
