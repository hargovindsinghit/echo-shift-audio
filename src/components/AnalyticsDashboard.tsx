
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Download, Calendar } from 'lucide-react';

const AnalyticsDashboard = () => {
  // Mock data for demonstration
  const stats = {
    totalExports: 42,
    thisMonth: 15,
    referrals: 3,
    creditsEarned: 15
  };

  const recentActivity = [
    { date: '2024-01-15', action: 'Voice transformed', style: 'Podcast Voice' },
    { date: '2024-01-14', action: 'Voice transformed', style: 'Movie Trailer' },
    { date: '2024-01-13', action: 'Friend referred', credits: '+5' },
    { date: '2024-01-12', action: 'Voice transformed', style: 'Deep Voice' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Your Analytics</h2>
        <p className="text-gray-300">Track your usage and performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Download className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.totalExports}</div>
            <p className="text-gray-400 text-sm">Total Exports</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.thisMonth}</div>
            <p className="text-gray-400 text-sm">This Month</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.referrals}</div>
            <p className="text-gray-400 text-sm">Referrals</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{stats.creditsEarned}</div>
            <p className="text-gray-400 text-sm">Credits Earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Chart Placeholder */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            Usage Over Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Chart visualization coming soon</p>
              <p className="text-sm">Track your daily and monthly usage patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                <div>
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs">{activity.date}</p>
                </div>
                <div className="text-right">
                  {activity.style && (
                    <span className="text-purple-400 text-sm">{activity.style}</span>
                  )}
                  {activity.credits && (
                    <span className="text-green-400 text-sm font-semibold">{activity.credits}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
