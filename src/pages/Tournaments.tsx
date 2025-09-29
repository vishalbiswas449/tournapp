import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Users, Calendar } from 'lucide-react';

const Tournaments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const tournaments = [
    {
      id: 1,
      name: 'Summer Championship 2024',
      status: 'Active',
      participants: 64,
      startDate: '2024-06-15',
      endDate: '2024-06-30',
      prize: '$5,000',
      format: 'Single Elimination'
    },
    {
      id: 2,
      name: 'Pro League Season 3',
      status: 'Registration',
      participants: 32,
      startDate: '2024-07-01',
      endDate: '2024-07-15',
      prize: '$10,000',
      format: 'Round Robin'
    },
    {
      id: 3,
      name: 'Winter Cup 2024',
      status: 'Completed',
      participants: 128,
      startDate: '2024-01-10',
      endDate: '2024-01-25',
      prize: '$3,000',
      format: 'Double Elimination'
    },
    {
      id: 4,
      name: 'Spring Invitational',
      status: 'Scheduled',
      participants: 16,
      startDate: '2024-08-01',
      endDate: '2024-08-05',
      prize: '$2,500',
      format: 'Single Elimination'
    }
  ];

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || tournament.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'registration':
        return 'bg-warning-100 text-warning-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Tournaments</h1>
          <p className="text-text-secondary">Manage your tournament competitions</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Create Tournament</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search tournaments..."
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
              <option value="active">Active</option>
              <option value="registration">Registration</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.map((tournament) => (
          <div key={tournament.id} className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-text-primary">{tournament.name}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tournament.status)}`}>
                  {tournament.status}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-text-secondary">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{tournament.participants} participants</span>
                </div>
                
                <div className="flex items-center text-sm text-text-secondary">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{tournament.startDate} - {tournament.endDate}</span>
                </div>
                
                <div className="text-sm text-text-secondary">
                  <span className="font-medium">Prize:</span> {tournament.prize}
                </div>
                
                <div className="text-sm text-text-secondary">
                  <span className="font-medium">Format:</span> {tournament.format}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-border">
                <button className="p-2 text-text-muted hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="p-2 text-text-muted hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTournaments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-text-muted mb-4">
            <Trophy className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-text-primary mb-2">No tournaments found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default Tournaments;