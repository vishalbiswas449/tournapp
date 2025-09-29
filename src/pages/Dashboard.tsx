import React from 'react';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const stats = [
    {
      name: 'Active Tournaments',
      value: '12',
      change: '+2.5%',
      changeType: 'positive',
      icon: Trophy,
    },
    {
      name: 'Total Players',
      value: '1,247',
      change: '+12.3%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Matches Today',
      value: '24',
      change: '+4.1%',
      changeType: 'positive',
      icon: Calendar,
    },
    {
      name: 'Revenue',
      value: '$12,450',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const chartData = [
    { name: 'Jan', tournaments: 4, players: 240 },
    { name: 'Feb', tournaments: 6, players: 380 },
    { name: 'Mar', tournaments: 8, players: 520 },
    { name: 'Apr', tournaments: 12, players: 680 },
    { name: 'May', tournaments: 10, players: 890 },
    { name: 'Jun', tournaments: 14, players: 1247 },
  ];

  const recentMatches = [
    { id: 1, player1: 'John Doe', player2: 'Jane Smith', tournament: 'Summer Cup', status: 'Live', score: '2-1' },
    { id: 2, player1: 'Mike Johnson', player2: 'Sarah Wilson', tournament: 'Pro League', status: 'Completed', score: '3-2' },
    { id: 3, player1: 'Alex Brown', player2: 'Emma Davis', tournament: 'Championship', status: 'Scheduled', score: '-' },
    { id: 4, player1: 'Chris Lee', player2: 'Lisa Garcia', tournament: 'Winter Series', status: 'Live', score: '1-0' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">Welcome back! Here's what's happening with your tournaments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-card p-6 rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-secondary">{stat.name}</p>
                  <p className="text-2xl font-bold text-text-primary mt-1">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-primary-50 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <span className="text-sm font-medium text-success-600">{stat.change}</span>
                <span className="text-sm text-text-muted ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Tournament Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tournaments" fill="#027CBA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Player Registration</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="players" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-card rounded-xl border border-border shadow-sm">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-text-primary">Recent Matches</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Tournament
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentMatches.map((match) => (
                <tr key={match.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {match.player1} vs {match.player2}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                    {match.tournament}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      match.status === 'Live' 
                        ? 'bg-danger-100 text-danger-800'
                        : match.status === 'Completed'
                        ? 'bg-success-100 text-success-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {match.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                    {match.score}
                  </td>
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