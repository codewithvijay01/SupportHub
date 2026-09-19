import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [profile, setProfile] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [adminTickets, setAdminTickets] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [editingTicketId, setEditingTicketId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [selectedTicket, setSelectedTicket] = useState(null);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://supporthub-aau2.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);

        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://supporthub-aau2.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful ✅ Please login.");

        setIsRegister(false);
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // FETCH PROFILE
  // =========================

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://supporthub-aau2.onrender.com/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setProfile(data.user);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Profile error:", error);
    }
  };

  // =========================
  // FETCH USER TICKETS
  // =========================

  const fetchTickets = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://supporthub-aau2.onrender.com/api/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setTickets(data.tickets);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Tickets error:", error);
    }
  };

  // =========================
  // FETCH ADMIN TICKETS
  // =========================

  const fetchAdminTickets = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://supporthub-aau2.onrender.com/api/admin/tickets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setAdminTickets(data.tickets);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Admin tickets error:", error);
    }
  };

  // =========================
  // UPDATE STATUS
  // =========================

  const updateTicketStatus = async (ticketId, newStatus) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://supporthub-aau2.onrender.com/api/admin/tickets/${ticketId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        fetchAdminTickets();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  // =========================
  // CREATE TICKET
  // =========================

  const handleCreateTicket = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "https://supporthub-aau2.onrender.com/api/tickets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            priority,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Ticket created successfully ✅");

        setTitle("");
        setDescription("");
        setPriority("medium");

        fetchTickets();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Create ticket error:", error);
    }
  };
  const handleEditTicket = (ticket) => {
    setEditingTicketId(ticket._id);
    setEditTitle(ticket.title);
    setEditDescription(ticket.description);
    setEditPriority(ticket.priority);
  };

  const handleCancelEdit = () => {
    setEditingTicketId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
  };

  const handleUpdateTicket = async (ticketId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `https://supporthub-aau2.onrender.com/api/tickets/${ticketId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editTitle,
            description: editDescription,
            priority: editPriority,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Ticket updated successfully ✅");
        handleCancelEdit();
        fetchTickets();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Update ticket error:", error);
      alert("Something went wrong");
    }
  };
  // =========================
  // DELETE TICKET
  // =========================

  const handleDeleteTicket = async (ticketId) => {
    const token = localStorage.getItem("token");

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `https://supporthub-aau2.onrender.com/api/tickets/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Ticket deleted successfully");
        fetchTickets();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Delete ticket error:", error);
      alert("Something went wrong");
    }
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setProfile(null);
    setTickets([]);
    setAdminTickets([]);
  };

  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  // =========================
  // LOAD TICKETS
  // =========================

  useEffect(() => {
    if (isLoggedIn && profile) {
      if (profile.role === "admin") {
        fetchAdminTickets();
      } else {
        fetchTickets();
      }
    }
  }, [isLoggedIn, profile]);

  // =========================
  // ADMIN COUNTS
  // =========================

  const totalTickets = adminTickets.length;

  const openTickets = adminTickets.filter(
    (ticket) => ticket.status === "open",
  ).length;

  const inProgressTickets = adminTickets.filter(
    (ticket) => ticket.status === "in-progress",
  ).length;

  const resolvedTickets = adminTickets.filter(
    (ticket) => ticket.status === "resolved",
  ).length;

  const closedTickets = adminTickets.filter(
    (ticket) => ticket.status === "closed",
  ).length;

  // =========================
  // ADMIN DASHBOARD
  // =========================

  if (isLoggedIn && profile?.role === "admin") {
    return (
      <div className="dashboard">
        <nav className="navbar">
          <div>
            <h2>SupportHub</h2>
            <span className="admin-label">Admin Panel</span>
          </div>

          <div className="nav-right">
            <span>👤 {profile.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <main className="dashboard-content">
          <div className="page-heading">
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage and monitor customer support tickets.</p>
            </div>
          </div>

          {/* STATISTICS */}

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🎫</span>
              <div>
                <p>Total Tickets</p>
                <h2>{totalTickets}</h2>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">🟢</span>
              <div>
                <p>Open</p>
                <h2>{openTickets}</h2>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">🟡</span>
              <div>
                <p>In Progress</p>
                <h2>{inProgressTickets}</h2>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">✅</span>
              <div>
                <p>Resolved</p>
                <h2>{resolvedTickets}</h2>
              </div>
            </div>

            <div className="stat-card">
              <span className="stat-icon">🔴</span>
              <div>
                <p>Closed</p>
                <h2>{closedTickets}</h2>
              </div>
            </div>
          </div>

          {/* TICKETS */}

          <div className="admin-ticket-section">
            <div className="section-header">
              <h2>All Support Tickets</h2>

              <button className="refresh-button" onClick={fetchAdminTickets}>
                🔄 Refresh
              </button>
            </div>

            {adminTickets.length === 0 ? (
              <div className="empty-state">
                <h3>No tickets found</h3>
                <p>There are currently no customer tickets.</p>
              </div>
            ) : (
              <div className="ticket-list">
                {adminTickets.map((ticket) => (
                  <div className="admin-ticket-card" key={ticket._id}>
                    <div className="ticket-header">
                      <div>
                        <h3>{ticket.title}</h3>

                        <span className="ticket-id">ID: {ticket._id}</span>
                      </div>

                      <span className={`priority priority-${ticket.priority}`}>
                        {ticket.priority}
                      </span>
                    </div>

                    <p className="ticket-description">{ticket.description}</p>

                    <div className="ticket-user">
                      <div>
                        <strong>👤 Customer</strong>

                        <p>{ticket.user?.name}</p>
                      </div>

                      <div>
                        <strong>📧 Email</strong>

                        <p>{ticket.user?.email}</p>
                      </div>
                    </div>

                    <div className="ticket-footer">
                      <div>
                        <strong>Status:</strong>

                        <span className={`status status-${ticket.status}`}>
                          {ticket.status}
                        </span>
                      </div>

                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          updateTicketStatus(ticket._id, e.target.value)
                        }
                      >
                        <option value="open">Open</option>

                        <option value="in-progress">In Progress</option>

                        <option value="resolved">Resolved</option>

                        <option value="closed">Closed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // USER DASHBOARD
  // =========================

  if (isLoggedIn) {
    return (
      <div className="dashboard">
        <nav className="navbar">
          <div>
            <h2>SupportHub</h2>
            <span className="admin-label">Customer Portal</span>
          </div>

          <div className="nav-right">
            <span>👤 {profile?.name}</span>

            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <main className="dashboard-content">
          <div className="page-heading">
            <div>
              <h1>Welcome, {profile?.name} 👋</h1>

              <p>Manage your support tickets from your dashboard.</p>
            </div>
          </div>

          <div className="dashboard-cards">
            {/* MY TICKETS */}

            <div className="dashboard-card">
              <h3>🎫 My Tickets</h3>

              {tickets.length === 0 ? (
                <p>No tickets found.</p>
              ) : (
                tickets.map((ticket) => (
                  <div className="user-ticket" key={ticket._id}>
                    {editingTicketId === ticket._id ? (
                      <div>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          placeholder="Ticket title"
                        />

                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Ticket description"
                        />

                        <select
                          value={editPriority}
                          onChange={(e) => setEditPriority(e.target.value)}
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>

                        <br />
                        <br />

                        <button
                          onClick={() => handleUpdateTicket(ticket._id)}
                          style={{
                            marginRight: "10px",
                            padding: "8px 14px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#16a34a",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          💾 Save Changes
                        </button>

                        <button
                          onClick={handleCancelEdit}
                          style={{
                            padding: "8px 14px",
                            border: "none",
                            borderRadius: "6px",
                            background: "#6b7280",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <h4>{ticket.title}</h4>
                        <p>{ticket.description}</p>
                        <p>
                          <strong>Priority:</strong> {ticket.priority}
                        </p>
                        <p>
                          <strong>Status:</strong> {ticket.status}
                        </p>
                      </>
                    )}
                    <button
                      onClick={() => handleEditTicket(ticket)}
                      style={{
                        marginRight: "10px",
                        padding: "8px 14px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#2563eb",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      ✏️ Edit Ticket
                    </button>
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      style={{
                        marginRight: "10px",
                        padding: "8px 14px",
                        border: "none",
                        borderRadius: "6px",
                        background: "#7c3aed",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      👁️ View Details
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket._id)}
                      style={{
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginBottom: "15px",
                      }}
                    >
                      🗑️ Delete Ticket
                    </button>

                    <hr />
                  </div>
                ))
              )}
            </div>
            {selectedTicket && (
              <div
                onClick={() => setSelectedTicket(null)}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    width: "90%",
                    maxWidth: "500px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  }}
                >
                  <h2>🎫 Ticket Details</h2>
                  <p>
                    <strong>Ticket ID:</strong> {selectedTicket._id}
                  </p>

                  <p>
                    <strong>Title:</strong> {selectedTicket.title}
                  </p>

                  <p>
                    <strong>Description:</strong> {selectedTicket.description}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          selectedTicket.priority === "high"
                            ? "#fee2e2"
                            : selectedTicket.priority === "medium"
                              ? "#fef3c7"
                              : "#dcfce7",
                        color:
                          selectedTicket.priority === "high"
                            ? "#b91c1c"
                            : selectedTicket.priority === "medium"
                              ? "#92400e"
                              : "#166534",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedTicket.priority}
                    </span>
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        background:
                          selectedTicket.status === "open"
                            ? "#dbeafe"
                            : selectedTicket.status === "in-progress"
                              ? "#fef3c7"
                              : selectedTicket.status === "resolved"
                                ? "#dcfce7"
                                : "#f3f4f6",
                        color:
                          selectedTicket.status === "open"
                            ? "#1d4ed8"
                            : selectedTicket.status === "in-progress"
                              ? "#92400e"
                              : selectedTicket.status === "resolved"
                                ? "#166534"
                                : "#374151",
                        fontWeight: "600",
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedTicket.status}
                    </span>
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {new Date(selectedTicket.createdAt).toLocaleString()}
                  </p>

                  <button
                    onClick={() => setSelectedTicket(null)}
                    style={{
                      marginTop: "15px",
                      padding: "10px 18px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#374151",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    ✖ Close
                  </button>
                </div>
              </div>
            )}

            {/* CREATE TICKET */}

            <div className="dashboard-card">
              <h3>➕ Create Ticket</h3>

              <form onSubmit={handleCreateTicket}>
                <div className="form-group">
                  <label>Title</label>

                  <input
                    type="text"
                    placeholder="Enter ticket title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Description</label>

                  <textarea
                    placeholder="Describe your problem"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Priority</label>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <button className="login-button" type="submit">
                  Create Ticket
                </button>
              </form>
            </div>

            {/* PROFILE */}

            <div className="dashboard-card">
              <h3>👤 Profile</h3>

              {profile ? (
                <>
                  <p>
                    <strong>Name:</strong> {profile.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>

                  <p>
                    <strong>Role:</strong> {profile.role}
                  </p>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // LOGIN / REGISTER
  // =========================

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>SupportHub</h1>

        <p>
          {isRegister
            ? "Create your SupportHub account"
            : "Customer Support Ticket System"}
        </p>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-button" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              border: "none",
              background: "none",
              color: "#2563eb",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default App;
