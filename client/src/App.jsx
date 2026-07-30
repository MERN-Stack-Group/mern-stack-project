import { useState } from "react";
import "./App.css";

function App() {
  
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: "Maya Lin",
      role: "Student",
      message:
        "Hi Sarah! I would love guidance on React architecture and transitioning from student projects to production web applications.",
      date: "2 hours ago",
    },
    {
      id: 2,
      name: "Alex Perera",
      role: "Student",
      message:
        "I am looking for some career guidance and advice on preparing for software engineering internships.",
      date: "Yesterday",
    },
  ]);

 
  const [mentorships, setMentorships] = useState([
    {
      id: 1,
      mentee: "Maya Lin",
      role: "Student",
      topic: "React Architecture",
      status: "Active",
      message:
        "Guidance on React architecture and transitioning to production applications.",
    },
    {
      id: 2,
      mentee: "Daniel Silva",
      role: "Student",
      topic: "Career Guidance",
      status: "Accepted",
      message:
        "Looking for guidance on software engineering careers and internships.",
    },
    {
      id: 3,
      mentee: "Emma Wilson",
      role: "Student",
      topic: "Web Development",
      status: "Completed",
      message:
        "Help with building full-stack web applications.",
    },
  ]);

  
  const handleAccept = (request) => {
    const newMentorship = {
      id: Date.now(),
      mentee: request.name,
      role: request.role,
      topic: "Mentorship Guidance",
      status: "Accepted",
      message: request.message,
    };

    setMentorships((prev) => [...prev, newMentorship]);

    setRequests((prev) =>
      prev.filter((item) => item.id !== request.id)
    );
  };

  
  const handleReject = (id) => {
    setRequests((prev) =>
      prev.filter((request) => request.id !== id)
    );
  };

 
  const updateStatus = (id, newStatus) => {
    setMentorships((prev) =>
      prev.map((mentorship) =>
        mentorship.id === id
          ? { ...mentorship, status: newStatus }
          : mentorship
      )
    );
  };

  return (
    <div className="app">

      
      
      
      <nav className="navbar">

        <div className="logo-section">
          <div className="logo-box">GB</div>
          <span className="logo-text">GradBridge</span>
        </div>

        <div className="nav-links">
          <a href="#" className="active-link">
            Mentorships
          </a>

          <a href="#">
            Opportunities
          </a>
        </div>

        <div className="profile-section">

          <div className="role-selector">
            <span>Role:</span>
            <strong>Alumni</strong>
            <span className="arrow">⌄</span>
          </div>

          <div className="profile">
            <div className="profile-icon">
              SJ
            </div>

            <span>Sarah Jenkins</span>

            <span className="logout-icon">
              ↪
            </span>
          </div>

        </div>
      </nav>


    
      <main className="dashboard">

        
        <section className="dashboard-header">

          <h1>Mentorship Dashboard</h1>

          <p>
            Track active mentorships and respond to connection requests
          </p>

        </section>


        {/* =========================
            INCOMING REQUESTS
        ========================== */}
        <section className="section">

          <div className="section-title-row">

            <h2>
              Incoming Requests
              <span className="count">
                {requests.length}
              </span>
            </h2>

          </div>


          {requests.length === 0 ? (

            <div className="empty-card">

              <div className="empty-icon">
                ✓
              </div>

              <h3>No pending requests</h3>

              <p>
                You currently have no incoming mentorship requests.
              </p>

            </div>

          ) : (

            <div className="request-list">

              {requests.map((request) => (

                <div className="request-card" key={request.id}>

                  <div className="request-user">

                    <div className="avatar">
                      {request.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                    </div>

                    <div>

                      <h3>{request.name}</h3>

                      <span className="user-role">
                        {request.role}
                      </span>

                      <span className="request-date">
                        {request.date}
                      </span>

                    </div>

                  </div>


                  <div className="request-message">

                    <p>
                      {request.message}
                    </p>

                  </div>


                  <div className="request-actions">

                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(request)}
                    >
                      ✓ Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() => handleReject(request.id)}
                    >
                      ✕ Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* =========================
            MENTORSHIP CONNECTIONS
        ========================== */}
        <section className="section">

          <div className="section-title-row">

            <div>

              <h2>
                Your Mentorship Connections
              </h2>

              <p className="section-description">
                Manage your current and completed mentorships.
              </p>

            </div>

            <div className="connection-count">

              {mentorships.length} Connections

            </div>

          </div>


          {/* PROGRESS LEGEND */}

          <div className="status-legend">

            <div className="legend-item">

              <span className="legend-number">
                1
              </span>

              Requested

            </div>


            <div className="legend-line"></div>


            <div className="legend-item">

              <span className="legend-number">
                2
              </span>

              Accepted

            </div>


            <div className="legend-line"></div>


            <div className="legend-item">

              <span className="legend-number">
                3
              </span>

              Active

            </div>


            <div className="legend-line"></div>


            <div className="legend-item">

              <span className="legend-number">
                4
              </span>

              Completed

            </div>

          </div>


          {/* MENTORSHIP CARDS */}

          <div className="mentorship-list">

            {mentorships.map((mentorship) => (

              <div
                className="mentorship-card"
                key={mentorship.id}
              >

                {/* LEFT SIDE */}

                <div className="mentee-section">

                  <span className="small-label">
                    MENTEE · STUDENT SIDE
                  </span>

                  <div className="mentee-info">

                    <div className="large-avatar">

                      {mentorship.mentee
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}

                    </div>

                    <div>

                      <h3>
                        {mentorship.mentee}
                      </h3>

                      <span className="student-label">
                        {mentorship.role}
                      </span>

                    </div>

                  </div>

                  <div className="topic">

                    <strong>
                      {mentorship.topic}
                    </strong>

                    <p>
                      {mentorship.message}
                    </p>

                  </div>

                </div>


                {/* RIGHT SIDE */}

                <div className="mentor-section">

                  <span className="small-label">
                    MENTOR · ALUMNI SIDE
                  </span>

                  <div className="mentor-info">

                    <div className="large-avatar mentor-avatar">
                      SJ
                    </div>

                    <div>

                      <h3>
                        Sarah Jenkins
                      </h3>

                      <span className="student-label">
                        Alumni
                      </span>

                    </div>

                  </div>


                  {/* STATUS */}

                  <div className="status-area">

                    <span className="status-label">
                      Current Status
                    </span>

                    <span
                      className={`status-badge ${mentorship.status.toLowerCase()}`}
                    >

                      <span className="status-dot"></span>

                      {mentorship.status}

                    </span>

                  </div>


                  {/* STATUS CONTROL */}

                  <div className="status-control">

                    <label>
                      Update status
                    </label>

                    <select
                      value={mentorship.status}
                      onChange={(e) =>
                        updateStatus(
                          mentorship.id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Accepted">
                        Accepted
                      </option>

                      <option value="Active">
                        Active
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                    </select>

                  </div>

                </div>


                {/* PROGRESS TRACKER */}

                <div className="progress-container">

                  <div
                    className={`progress-step ${
                      ["Accepted", "Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "completed-step"
                        : ""
                    }`}
                  >

                    <span>1</span>

                    <small>
                      Requested
                    </small>

                  </div>


                  <div
                    className={`progress-line ${
                      ["Accepted", "Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "filled"
                        : ""
                    }`}
                  ></div>


                  <div
                    className={`progress-step ${
                      ["Accepted", "Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "current-step"
                        : ""
                    }`}
                  >

                    <span>
                      {["Accepted", "Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "✓"
                        : "2"}
                    </span>

                    <small>
                      Accepted
                    </small>

                  </div>


                  <div
                    className={`progress-line ${
                      ["Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "filled"
                        : ""
                    }`}
                  ></div>


                  <div
                    className={`progress-step ${
                      ["Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "current-step"
                        : ""
                    }`}
                  >

                    <span>
                      {["Active", "Completed"].includes(
                        mentorship.status
                      )
                        ? "✓"
                        : "3"}
                    </span>

                    <small>
                      Active
                    </small>

                  </div>


                  <div
                    className={`progress-line ${
                      mentorship.status === "Completed"
                        ? "filled"
                        : ""
                    }`}
                  ></div>


                  <div
                    className={`progress-step ${
                      mentorship.status === "Completed"
                        ? "current-step"
                        : ""
                    }`}
                  >

                    <span>
                      {mentorship.status === "Completed"
                        ? "✓"
                        : "4"}
                    </span>

                    <small>
                      Completed
                    </small>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;