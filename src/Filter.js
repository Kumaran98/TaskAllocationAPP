import React from 'react';

const Filter = ({ handleFilter }) => {
  return (
    <div>
      <h3>Filter Tasks</h3>
      <button onClick={() => handleFilter('pending')}>Pending</button>
      <button onClick={() => handleFilter('in-progress')}>In Progress</button>
      <button onClick={() => handleFilter('completed')}>Completed</button>
    </div>
  );
};

export default Filter;

