import React, { useState, useEffect } from "react";
import axios from "axios";

function RestaurantList() {
  const [data, setData] = useState([]); // store

  useEffect(() => {
    axios
      .get("/restaurants")
      .then((res) => setData(res.data)) // load
      .catch((err) => console.error("fetch err", err)); // report
  }, []);

  return (
    <ul>
      {data.map((r) => (
        <li key={r._id}>
          {r.name}
          {r.phone && ` — ${r.phone}`}
        </li>
      ))}
    </ul>
  );
}

export default RestaurantList;
