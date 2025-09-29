import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

const Matches = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const matches = [
    {
      id: 1,
      player1: 'John Doe',
      player2: 'Jane Smith',
      tournament: 'Summer Championship 2024',
      status: 'Live',
      score: '2-1',
      scheduledTime: '2024-06-20 14:30',
      round: 'Quarter Final',
      court: 'Court A'
    },
    {
      id: 2,
      player1: 'Mike Johnson',
      player2: 'Sarah Wilson',
      tournament: 'Pro League Season 3',
      status: 'Completed',
      score: '3-2',
      scheduledTime: '2024-06-19 16:00',
      round: 'Semi Final',
      court: 'Court B'
    },
    {
      id: 3,
      player1: 'Alex Brown',
      player2: 'Emma Davis',
      tournament: 'Spring Invitational',
      status: 'Scheduled',
      score: '-',
      scheduledTime: '2024-06-21 10:00',
      round: 'Round 1',
      court: 'Court C'
    },
    {
      id: 4,
      player1: 'Chris Lee',
      player2: 'Lisa Garcia',
      tournament: 'Winter Cup 2024',
      status: 'Cancelled',
      score: '-',
      scheduledTime: '2024-06-20 12:00',
      round: 'Final',
      court: 'Court A'
    }
  ];

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.player1.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.player2.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         match.tournament.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || match.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return 'bg-danger-100 text-danger-800';
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'scheduled':
        return 'bg-warning-100 text-warning-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'live':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Matches</h1>
          <p className="text-text-secondary">Schedule and manage tournament matches</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Schedule Match</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-text-muted" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="live">Live</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Matches List */}
      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <div key={match.id} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(match.status)}`}>
                      {getStatusIcon(match.status)}
                      <span className="ml-1">{match.status}</span>
                    </span>
                    <span className="text-sm text-text-secondary">{match.round}</span>
                    <span className="text-sm text-text-secondary">•</span>
                    <span className="text-sm text-text-secondary">{match.court}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-semibold text-text-primary">
                      {match.player1} <span className="text-text-muted">vs</span> {match.player2}
                    </div>
                    {match.score !== '-' && (
                      <div className="text-lg font-bold text-primary-600">
                        {match.score}
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-text-secondary mb-2">
                    <span className="font-medium">Tournament:</span> {match.tournament}
                  </div>
                  
                  <div className="flex items-center text-sm text-text-secondary">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(match.scheduledTime).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                  <button className="p-2 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-text-muted hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="text-center py-12">
          <div className="text-text-muted mb-4">
            <Calendar className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No matches found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Matches;