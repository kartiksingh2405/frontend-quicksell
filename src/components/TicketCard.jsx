import React from "react";
import "./TicketCard.css";
import noPriority from "../assets/No-priority.svg";
import medPriority from "../assets/Img - Medium Priority.svg";
import highPriority from "../assets/Img - High Priority.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import urgentPriorityGray from "../assets/SVG - Urgent Priority grey.svg";
import backlogIcon from "../assets/Backlog.svg";
import todoIcon from "../assets/To-do.svg";
import inProgressIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import canceledIcon from "../assets/Cancelled.svg";
import profile1 from "../assets/user1.webp";
import profile2 from "../assets/user2.webp";
import profile3 from "../assets/profile3.webp";
import profile4 from "../assets/profile4.webp";
import profile5 from "../assets/profile5.webp";

const TicketCard = ({ ticket, statusIcon, priorityIcon, userIcon }) => {
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
  const priorityIcons = [
    noPriority,
    lowPriority,
    medPriority,
    highPriority,
    urgentPriorityGray,
  ];

  const statusIcons = {
    Backlog: backlogIcon,
    Todo: todoIcon,
    "In progress": inProgressIcon,
    Done: doneIcon,
    Canceled: canceledIcon,
  };

  const userIcons = {
    "usr-1": profile1,
    "usr-2": profile2,
    "usr-3": profile3,
    "usr-4": profile4,
    "usr-5": profile5,
  };

  return (
    <div className="ticket-card">
      <div className="card-top">
        <div className="ticket-id">{ticket.id}</div>
        <div className="user-icon-container">
          {!userIcon && (
            <img
              className="user-icon"
              src={userIcons[ticket.userId]}
              alt="User Icon"
            />
          )}
        </div>
      </div>
      <div className="card-title">
        {!statusIcon && (
          <img
            className="status-icon"
            src={statusIcons[ticket.status]}
            alt="Status Icon"
          />
        )}
        <div className="title">{ticket.title}</div>
      </div>
      <div className="card-bottom">
        {!priorityIcon && (
          <img
            className="priority-icon"
            src={priorityIcons[ticket.priority]}
            alt="Priority Icon"
          />
        )}
        <div className="tags">{ticket.tag}</div>
      </div>
    </div>
  );
};

export default TicketCard;
