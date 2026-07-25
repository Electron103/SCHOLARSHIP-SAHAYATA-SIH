
/* eslint-disable jsx-a11y/style-props -- CSS custom properties require inline styles for dynamic color values */
import { useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { FileText, CheckCircle, Clock, XCircle, DollarSign, Users, Flag } from 'lucide-react';
import { Student } from '../types';
import { DISTRICTS } from '../constants';
import './dashboardstats-dynamic.css';

interface DashboardStatsProps {
  students: Student[];
  selectedState: string;
  portalName: string;
}

export default function DashboardStats({ students, selectedState, portalName }: DashboardStatsProps) {
  
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const approved = students.filter(s => s.status === 'Approved').length;
    const pending = students.filter(s => s.status === 'Pending').length;
    const rejected = students.filter(s => s.status === 'Rejected').length;
    const totalAmount = students.reduce((sum, s) => sum + s.amount, 0);
    
    // Formatting Amount to Lakhs or Thousands
    const formattedAmount = totalAmount >= 100000 
      ? `₹${(totalAmount / 100000).toFixed(2)}L` 
      : `₹${totalAmount.toLocaleString()}`;

    return {
      totalStudents,
      totalApplications: totalStudents, // Assuming all students in list applied
      approved,
      pending,
      rejected,
      totalAmount,
      formattedAmount
    };
  }, [students]);

  const districtData = useMemo(() => {
    const counts: Record<string, number> = {};
    
    // Initialize all specific districts with 0 to ensure they appear
    DISTRICTS.forEach(d => counts[d] = 0);

    // Count students for these districts
    students.forEach(s => { 
      if (DISTRICTS.includes(s.district)) {
        counts[s.district] = (counts[s.district] || 0) + 1; 
      }
    });

    return Object.entries(counts)
      .map(([name, students]) => ({ name, students }))
      .sort((a, b) => b.students - a.students); // Sort by count descending
  }, [students]);

const categoryData = useMemo(() => {
  const counts: Record<string, number> = {};
  students.forEach(s => {
  const category = s.category === "GEN" ? "EWS" : s.category;
  counts[category] = (counts[category] || 0) + 1;
});


  // Updated colors → GEN removed, EWS added
  const colors: Record<string, string> = { 
    'EWS': '#3b82f6', 
    'OBC': '#8b5cf6', 
    'SC': '#ec4899', 
    'ST': '#f59e0b' 
  };

  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    fill: colors[name] || '#9ca3af'
  }));
}, [students]);


  const monthlyData = useMemo(() => {
    // Dynamically parsing appDate (YYYY-MM-DD)
    const counts: Record<string, number> = {};
    students.forEach(s => {
      const date = new Date(s.appDate);
      const month = date.toLocaleString('default', { month: 'short' });
      counts[month] = (counts[month] || 0) + 1;
    });

    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthsOrder
      .filter(m => counts[m])
      .map(month => ({ month, applications: counts[month] }));
  }, [students]);

  const genderData = useMemo(() => {
    const data: Record<string, { pending: number, approved: number, rejected: number }> = {
      'Male': { pending: 0, approved: 0, rejected: 0 },
      'Female': { pending: 0, approved: 0, rejected: 0 }
    };

    students.forEach(s => {
      if (s.gender === 'Male' || s.gender === 'Female') {
        const statusKey = s.status.toLowerCase() as 'pending' | 'approved' | 'rejected';
        data[s.gender][statusKey]++;
      }
    });

    return Object.entries(data).map(([name, stats]) => ({
      name,
      ...stats
    }));
  }, [students]);

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents, color: 'bg-gradient-to-br from-blue-500 to-blue-600', icon: <Users /> },
    { label: 'Applications', value: stats.totalApplications, color: 'bg-gradient-to-br from-purple-500 to-purple-600', icon: <FileText /> },
    { label: 'Approved', value: stats.approved, color: 'bg-gradient-to-br from-green-500 to-green-600', icon: <CheckCircle /> },
    { label: 'Pending', value: stats.pending, color: 'bg-gradient-to-br from-yellow-500 to-yellow-600', icon: <Clock /> },
    { label: 'Rejected', value: stats.rejected, color: 'bg-gradient-to-br from-red-500 to-red-600', icon: <XCircle /> },
    { label: 'Amount Dist.', value: stats.formattedAmount, color: 'bg-gradient-to-br from-indigo-500 to-indigo-600', icon: <DollarSign /> },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to {portalName}</h2>
        <p className="text-gray-600">State-wise scholarship tracking with Aadhaar & DBT integration for {selectedState}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`${stat.color} rounded-xl p-5 text-white shadow-lg hover:shadow-2xl transition transform hover:scale-105`}>
            <div className="text-3xl mb-2 opacity-80">{stat.icon}</div>
            <p className="text-sm opacity-90 font-medium">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-l-4 border-blue-600 p-6 rounded-xl shadow-md">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Flag size={32} className="text-blue-900" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Aadhaar & DBT Integration - {selectedState}</h3>
            <p className="text-blue-800">
              {stats.totalStudents > 0
                ? `Tracking ${stats.totalStudents} active students in ${selectedState}. Disbursement channel status: Active.`
                : `Select a state with active records (e.g., Chhattisgarh) to view data.`}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* District Wise - Scrollable Horizontally and Vertically */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">📍 Students per District</h3>
            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">{selectedState}</div>
          </div>
          <div className="chartContentWrapper">
            {/* Inner container with min-width (horizontal scroll) and fixed height (vertical scroll) */}
            <div className="scrollableChartContainer">
              {districtData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={districtData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }} barSize={50}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      interval={0} 
                      height={80}
                      tick={{fontSize: 12, fill: '#4b5563'}}
                    />
                    <YAxis tick={{fontSize: 12, fill: '#4b5563'}} />
                    <Tooltip 
                      cursor={{fill: '#f3f4f6'}} 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                    />
                    <Bar dataKey="students" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-500">No data available</div>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Scroll to view all districts</p>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-purple-500">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">📊 Category Distribution</h3>
          {categoryData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name === "GEN" ? "GEN (EWS)" : name}: ${value}`}
>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} students`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {categoryData.map((category, idx) => (
                  <CategoryLegendItem key={idx} category={category} />
                ))}
              </div>
            </>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">No data available</div>
          )}
        </div>

        {/* Monthly Applications */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-indigo-500">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">📈 Monthly Applications</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.5)]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">No data available</div>
          )}
        </div>

        {/* Gender Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition border-t-4 border-emerald-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">👫 Gender-wise Applications</h3>
             <div className="flex gap-2">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div><span className="text-xs text-gray-500">Pending</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-xs text-gray-500">Approved</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div><span className="text-xs text-gray-500">Rejected</span></div>
             </div>
          </div>
          {students.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genderData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Bar dataKey="pending" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="approved" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="rejected" stackId="a" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">No data available</div>
          )}
        </div>

      </div>
    </div>
  );
}

// Helper function to get color name from hex value
function getColorName(hexColor: string): string {
  // Map common colors to names
  const colorMap: Record<string, string> = {
    '#ef4444': 'red',      // red-500
    '#f87171': 'red',      // red-400
    '#3b82f6': 'blue',     // blue-500
    '#60a5fa': 'blue',     // blue-400
    '#10b981': 'green',    // green-500
    '#34d399': 'green',    // green-400
    '#8b5cf6': 'purple',   // purple-500
    '#a78bfa': 'purple',   // purple-400
    '#eab308': 'yellow',   // yellow-400
    '#ea580c': 'orange',   // orange-600
    '#fb7185': 'pink',     // pink-400
    '#ec4899': 'pink',     // pink-500
    '#4f46e5': 'indigo',   // indigo-600
  };
  
  return colorMap[hexColor.toLowerCase()] || 'blue';
}

// Helper component to render category legend items with dynamic colors
function CategoryLegendItem({ category }: { category: { name: string; value: number; fill: string } }) {
  const colorName = getColorName(category.fill);
  
  return (
    <div 
      className="chartDiv"
      data-color={colorName}
    >
      <span className="categoryLabel">
        {category.name === "GEN" ? "GEN (EWS)" : category.name}
      </span>
      <span className="categoryValue">
        {category.value}
      </span>
    </div>
  );
}
