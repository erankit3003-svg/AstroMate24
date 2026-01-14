import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import { getToken, getUser } from '../utils/auth';
import { Button } from '../components/ui/button';
import { FileText, Calendar, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${API}/reports/my-reports`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });
      setReports(response.data);
    } catch (error) {
      toast.error('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-secondary mb-2" data-testid="dashboard-heading">
            Welcome, {user?.name}!
          </h1>
          <p className="text-secondary/70">Manage your astrology reports</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="w-16 h-16 text-secondary/30 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-secondary mb-2">No Reports Yet</h2>
            <p className="text-secondary/70 mb-8">Get your first astrology report now</p>
            <Button
              onClick={() => navigate('/birth-details')}
              className="bg-primary text-white rounded-full px-8 py-6"
              data-testid="get-first-report-button"
            >
              Get Your Report
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-secondary">My Reports</h2>
              <Button
                onClick={() => navigate('/birth-details')}
                className="bg-primary text-white rounded-full"
                data-testid="get-new-report-button"
              >
                Get New Report
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white border border-primary/10 rounded-2xl p-6 hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => navigate(`/report/${report.id}`)}
                  data-testid={`report-card-${report.id}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      report.status === 'completed' ? 'bg-green-100 text-green-700' :
                      report.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">
                    {report.birth_data.full_name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-secondary/70">
                    <Calendar className="w-4 h-4" />
                    {formatDate(report.created_at)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
