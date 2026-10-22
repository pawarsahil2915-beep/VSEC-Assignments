
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="card home">
      <h2>Welcome to Campus Lost &amp; Found</h2>
      <p>
        Report lost belongings or view items found by other students
        on campus.
      </p>

      <Link className="button" to="/report">
        Report an Item
      </Link>

      <Link className="button" to="/items">
        View Reported Items
      </Link>
    </main>
  );
}

export default Home;
