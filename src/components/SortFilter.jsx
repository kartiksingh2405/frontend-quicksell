import React, { useState } from "react";
import icon from '../assets/Display.svg';
import './SortFilter.css'; // Import the CSS file

const SortFilter = ({ grouping, setGrouping, sortOptions, setSortOptions }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleVisibility} className="btn">
        <img src={icon} alt="toggle" style={{ width: '15px', marginRight: '8px' }} />
        {isVisible ? "Hide" : "Display"}
      </button>
      {isVisible && (
        <div className="sort-filter">
          <div className="grouping-section filter-section">
            <label>Group By:</label>
            <select
              value={grouping}
              onChange={(e) => setGrouping(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="sorting-section filter-section">
            <label>Sort By:</label>
            <select
              value={sortOptions}
              onChange={(e) => setSortOptions(e.target.value)}
            >
              <option value="">None</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortFilter;
