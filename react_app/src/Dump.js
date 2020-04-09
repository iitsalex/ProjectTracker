// src/components/dump.js

import React from 'react'

const Dump = ({ dump }) => {
  return (
    <div>
      <center><h1>Dump</h1></center>
      {dump.map((user) => (
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{user.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{user.email}</h6>
            <p class="card-text">{user.password}</p>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Dump
