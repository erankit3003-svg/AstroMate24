import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config';
import { getToken } from '../utils/auth';
import { Loader2, MapPin, Calendar, User } from 'lucide-react';
import { toast } from 'sonner';

const ReportView = () => {
  const { reportId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingIframe, setLoadingIframe] = useState(true);

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`${API}/reports/${reportId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      });

      console.log("API RESPONSE 👉", response.data);
      setReport(response.data);
    } catch (error) {
      toast.error('Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-secondary/70">Report not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white border border-primary/10 rounded-2xl p-8 shadow-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-secondary mb-4" data-testid="report-heading">
              Astrology Report
            </h1>
            <span className={`inline-block text-sm px-4 py-2 rounded-full ${
              report.status === 'completed' ? 'bg-green-100 text-green-700' :
              report.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {report.status}
            </span>
          </div>

          <div className="space-y-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-secondary/70">Name</p>
                  <p className="font-semibold text-secondary">{report?.birthData?.full_name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-secondary/70">Birth Place</p>
                  <p className="font-semibold text-secondary">{report?.birthData?.place}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-secondary/70">Date of Birth</p>
                  <p className="font-semibold text-secondary">
                    {report?.birthData?.day}/{report?.birthData?.month}/{report?.birthData?.year}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-secondary/70">Time of Birth</p>
                  <p className="font-semibold text-secondary">
                    {String(report?.birthData?.hour).padStart(2, '0')}:{String(report?.birthData?.min).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-primary/10 pt-8">
  <h2 className="text-2xl font-semibold text-secondary mb-6">
    Report Details
  </h2>

 {report.status === "completed" ? (

  <div className="bg-background/50 rounded-lg p-6 text-center">
    <a
      href={report.report_url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
    >
      📄 Open Astrology Report
    </a>
  </div>

) : report.status === "processing" ? (

  <div className="text-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
    <p className="text-secondary/70">
      Your report is being generated...
    </p>
  </div>

) : (

  <div className="text-center py-12">
    <p className="text-red-600">
      Report generation failed. Please contact support.
    </p>
  </div>

)}

</div>


          
        </div>
      </div>
    </div>
  );
};

export default ReportView;
