import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const jumlahCafePerKategori = {
    labels: ["Cafe Modern", "Cafe Tradisional", "Cafe Outdoor"],
    datasets: [
      {
        label: "Jumlah",
        data: [20, 35, 30],
        backgroundColor: "rgb(16, 185, 129)",
      },
    ],
  };

  const jumlahRating = [
    { rating: "⭐⭐⭐⭐⭐", jumlah: 6 },
    { rating: "⭐⭐⭐⭐", jumlah: 5 },
    { rating: "⭐⭐⭐", jumlah: 4 },
    { rating: "⭐⭐", jumlah: 3 },
    { rating: "⭐", jumlah: 1 },
  ];

  const cafeBanyakReview = [
    { nama: "Warkop Seru", review: 40 },
    { nama: "Kopi Asik", review: 35 },
    { nama: "Local Hijau", review: 27 },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold text-center mb-6">Dashboard Admin</h2>

        {/* Ringkasan */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <div className="bg-white shadow rounded-lg p-4 w-40 text-center">
            <p className="text-sm text-gray-600">Total Cafe</p>
            <h3 className="text-xl font-bold">26</h3>
          </div>
          <div className="bg-white shadow rounded-lg p-4 w-40 text-center">
            <p className="text-sm text-gray-600">Total User</p>
            <h3 className="text-xl font-bold">112</h3>
          </div>
        </div>

        {/* Grafik dan Rating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 justify-center">
          <div className="bg-white shadow rounded-lg p-4 max-w-md mx-auto">
            <h3 className="text-sm font-medium mb-2">Cafe per Kategori</h3>
            <div className="h-48">
              <Bar data={jumlahCafePerKategori} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4 max-w-md mx-auto">
            <h3 className="text-sm font-medium mb-2">Rating Cafe</h3>
            {jumlahRating.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between mb-2 text-xs">
                <span className="w-16">{item.rating}</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded h-2">
                  <div
                    className="bg-emerald-400 h-2 rounded"
                    style={{ width: `${item.jumlah * 10}%` }}
                  ></div>
                </div>
                <span className="w-6 text-right">{item.jumlah}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cafe dengan review terbanyak */}
        <div className="bg-white shadow rounded-lg p-4 max-w-lg mx-auto">
          <h3 className="text-sm font-medium mb-2">Cafe Paling Banyak Review</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left">Nama Cafe</th>
                <th className="py-2 text-left">Review</th>
              </tr>
            </thead>
            <tbody>
              {cafeBanyakReview.map((cafe, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-2">{cafe.nama}</td>
                  <td className="py-2">{cafe.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
