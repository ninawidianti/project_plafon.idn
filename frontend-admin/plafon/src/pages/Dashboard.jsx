import React, { useEffect, useState } from "react";
import axios from "axios";

const renderStars = (rating) => {
  const maxStars = 5;
  let stars = "";
  for (let i = 1; i <= maxStars; i++) {
    stars += i <= rating ? "★" : "☆";
  }
  return stars;
};

const AnimatedBar = ({ width }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    let start = 0;
    const animate = () => {
      start += (width - start) * 0.1;
      if (Math.abs(width - start) < 1) {
        setAnimatedWidth(width);
        return;
      }
      setAnimatedWidth(start);
      requestAnimationFrame(animate);
    };
    animate();
  }, [width]);

  return (
    <div
      style={{
        width: `${animatedWidth}px`,
        backgroundColor: "#34d399",
        height: "100%",
        transition: "background-color 0.3s ease",
      }}
    />
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_cafe: 0,
    total_resto: 0,
    total_rekomendasi: 0,
    total_user: 0,
    ratingData: [],
    topReviewedCafes: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = response.data;

        setStats({
          total_rekomendasi: data.total_rekomendasi,
          total_cafe: data.total_cafe,
          total_resto: data.total_resto,
          total_user: data.total_user,
          ratingData: data.ratingData,
          topReviewedCafes: data.topReviewedCafes,
        });
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          paddingLeft: "250px",
          padding: "20px",
          flex: 1,
          minHeight: "100vh",
          backgroundColor: "#f4f4f4",
        }}
      >
        <h2>Dashboard Admin</h2>

        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          <StatCard title="Total Rekomendasi" value={stats.total_rekomendasi} />
          <StatCard title="Total Cafe Terdaftar" value={stats.total_cafe} />
          <StatCard title="Total Resto Terdaftar" value={stats.total_resto} />
          <StatCard title="Total User Terdaftar" value={stats.total_user} />
        </div>

        <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
          <div style={panelStyle}>
            <h3>Jumlah Cafe Berdasarkan Rating</h3>
            {Array.isArray(stats.ratingData) && stats.ratingData.length > 0 ? (
              stats.ratingData.map((item, index) => (
                <div
                  key={index}
                  style={{
                    margin: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      color: "#fbbf24",
                      width: "100px",
                      userSelect: "none",
                    }}
                  >
                    {renderStars(item.rating)}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      background: "#eee",
                      borderRadius: "5px",
                      overflow: "hidden",
                      height: "14px",
                    }}
                  >
                    <AnimatedBar width={Math.min(item.jumlah * 15, 150)} />
                  </div>
                  <small style={{ width: "50px", textAlign: "right" }}>
                    {item.jumlah} cafe
                  </small>
                </div>
              ))
            ) : (
              <p>Tidak ada data rating.</p>
            )}
          </div>

          <div style={panelStyle}>
            <h3>Cafe Paling Banyak Direview</h3>
            <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Nama Cafe</th>
                  <th style={thStyle}>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(stats.topReviewedCafes) && stats.topReviewedCafes.length > 0 ? (
                  stats.topReviewedCafes.map((cafe, idx) => (
                    <tr key={idx}>
                      <td style={tdStyle}>{cafe.nama_cafe}</td>
                      <td style={tdStyle}>{cafe.reviews}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={tdStyle}>Tidak ada data review</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const stepTime = 30;
    const increment = value / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        start = value;
        clearInterval(timer);
      }
      setDisplayValue(Math.floor(start));
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div style={cardStyle}>
      <h5>{title}</h5>
      <p style={{ fontSize: "24px", marginTop: "10px" }}>{displayValue}</p>
    </div>
  );
};

const cardStyle = {
  flex: "1 1 200px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const panelStyle = {
  flex: "1 1 400px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  backgroundColor: "#ffffff",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const thStyle = {
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  padding: "8px",
};

const tdStyle = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};

export default Dashboard;
