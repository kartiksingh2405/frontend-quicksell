/* eslint react/prop-types: 0 */
import TicketCard from "./TicketCard";
import "./KanbanBoard.css";
import backlogIcon from "../assets/Backlog.svg";
import todoIcon from "../assets/To-do.svg";
import inProgressIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import canceledIcon from "../assets/Cancelled.svg";
import addIcon from "../assets/add.svg";
import menuIcon from "../assets/3 dot menu.svg";
import noPriority from "../assets/No-priority.svg";
import medPriority from "../assets/Img - Medium Priority.svg";
import highPriority from "../assets/Img - High Priority.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import urgentPriorityGray from "../assets/SVG - Urgent Priority grey.svg";
import { useEffect, useState } from "react";
import profile1 from "../assets/user1.webp";
import profile2 from "../assets/user2.webp";
import profile3 from "../assets/profile3.webp";
import profile4 from "../assets/profile4.webp";
import profile5 from "../assets/profile5.webp";

const STATUS_COLUMNS = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
const PRIORITY_COLUMNS = ["urgent", "high", "medium", "low", "no priority"];

const PRIORITY_MAP = {
  4: "urgent",
  3: "high",
  2: "medium",
  1: "low",
  0: "no priority",
};

const STATUS_ICONS = {
  Backlog: backlogIcon,
  Todo: todoIcon,
  "In progress": inProgressIcon,
  Done: doneIcon,
  Canceled: canceledIcon,
  urgent: urgentPriority,
  high: highPriority,
  medium: medPriority,
  low: lowPriority,
  "no priority": noPriority,
  "usr-1": profile1,
  "usr-2": profile2,
  "usr-3": profile3,
  "usr-4": profile4,
  "usr-5": profile5,
};

const KanbanBoard = ({ tickets, users, grouping, sortOptions }) => {
  const [statusIcon, setStatusIcon] = useState(grouping === "status");
  const [priorityIcon, setPriorityIcon] = useState(grouping === "priority");
  const [userIcon, setUserIcon] = useState(grouping === "user");

  useEffect(() => {
    setPriorityIcon(grouping === "priority");
    setStatusIcon(grouping === "status");
    setUserIcon(grouping === "user");
  }, [grouping]);

  const groupTickets = () => {
    switch (grouping) {
      case "status":
        return groupBy(tickets, "status", STATUS_COLUMNS);
      case "user":
        return groupBy(tickets, "userId");
      case "priority":
        return groupBy(tickets, "priority", PRIORITY_COLUMNS, PRIORITY_MAP);
      default:
        return groupBy(tickets, "status", STATUS_COLUMNS);
    }
  };

  const groupBy = (list, key, predefinedColumns = [], map = null) => {
    const grouped = list.reduce((acc, item) => {
      let groupKey = item[key];

      if (key === "priority" && map) {
        groupKey = map[item[key]] || "No Group";
      }

      if (!groupKey) {
        groupKey = "No Group";
      }

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    }, {});

    predefinedColumns.forEach((col) => {
      if (!grouped[col]) {
        grouped[col] = [];
      }
    });

    return grouped;
  };

  const sortTickets = (group) => {
    switch (sortOptions) {
      case "priority":
        return group.sort((a, b) => b.priority - a.priority);
      case "title":
        return group.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return group;
    }
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      {(grouping === "priority"
        ? PRIORITY_COLUMNS
        : Object.keys(groupedTickets)
      ).map((group) => (
        <div key={group} className="kanban-group">
          <div className="group-header">
            <div className="group-title-left">
              <img
                src={STATUS_ICONS[group]}
                alt={`${group} icon`}
                className="status-icon"
              />
              <div className="group-title">
                {grouping === "user"
                  ? users.find((u) => u.id === group)?.name
                  : group}
              </div>
            </div>
            <div className="group-title-right">
              <img src={addIcon} alt="Add" className="icon" />
              <img src={menuIcon} alt="Menu" className="icon" />
            </div>
          </div>
          <div className="ticket-list">
            {groupedTickets[group].length > 0 ? (
              sortTickets(groupedTickets[group]).map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  statusIcon={statusIcon}
                  priorityIcon={priorityIcon}
                  userIcon={userIcon}
                />
              ))
            ) : (
              <p>No tickets in this column</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
