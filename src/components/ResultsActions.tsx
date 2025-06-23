import React from 'react';
import { Download, Share2, RotateCcw, Mail } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

interface ResultsActionsProps {
  onNewAnalysis: () => void;
  analysisData: {
    matchScore: number;
    missingKeywords: string[];
    profileSummary: string;
    timestamp: Date;
  };
}

export const ResultsActions: React.FC<ResultsActionsProps> = ({ 
  onNewAnalysis, 
  analysisData 
}) => {
  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();
      
      // Add header
      pdf.setFontSize(20);
      pdf.text('Smart ATS Analysis Report', 20, 30);
      
      // Add date
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${analysisData.timestamp.toLocaleDateString()}`, 20, 45);
      
      // Add match score
      pdf.setFontSize(16);
      pdf.text('Match Score', 20, 65);
      pdf.setFontSize(14);
      pdf.text(`${analysisData.matchScore}%`, 20, 80);
      
      // Add missing keywords
      pdf.setFontSize(16);
      pdf.text('Missing Keywords', 20, 100);
      pdf.setFontSize(12);
      let yPos = 115;
      analysisData.missingKeywords.forEach((keyword, index) => {
        pdf.text(`• ${keyword}`, 25, yPos);
        yPos += 10;
      });
      
      // Add profile summary
      yPos += 10;
      pdf.setFontSize(16);
      pdf.text('Profile Summary', 20, yPos);
      yPos += 15;
      pdf.setFontSize(12);
      const splitSummary = pdf.splitTextToSize(analysisData.profileSummary, 170);
      pdf.text(splitSummary, 20, yPos);
      
      pdf.save('ats-analysis-report.pdf');
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const shareResults = async () => {
    const shareData = {
      title: 'My ATS Analysis Results',
      text: `I got a ${analysisData.matchScore}% match score on my resume analysis!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Results shared successfully!');
      } catch (error) {
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link. Please try again.');
    });
  };

  const emailResults = () => {
    const subject = encodeURIComponent('My ATS Analysis Results');
    const body = encodeURIComponent(
      `I analyzed my resume and got a ${analysisData.matchScore}% match score!\n\n` +
      `Missing Keywords: ${analysisData.missingKeywords.join(', ')}\n\n` +
      `Analysis Summary: ${analysisData.profileSummary}\n\n` +
      `Generated on: ${analysisData.timestamp.toLocaleDateString()}`
    );
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Share</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          onClick={generatePDF}
          className="flex flex-col items-center space-y-2 p-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
        >
          <Download className="w-6 h-6" />
          <span className="text-sm font-medium">Download PDF</span>
        </button>
        
        <button
          onClick={shareResults}
          className="flex flex-col items-center space-y-2 p-4 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors"
        >
          <Share2 className="w-6 h-6" />
          <span className="text-sm font-medium">Share Results</span>
        </button>
        
        <button
          onClick={emailResults}
          className="flex flex-col items-center space-y-2 p-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors"
        >
          <Mail className="w-6 h-6" />
          <span className="text-sm font-medium">Email Report</span>
        </button>
        
        <button
          onClick={onNewAnalysis}
          className="flex flex-col items-center space-y-2 p-4 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
          <span className="text-sm font-medium">New Analysis</span>
        </button>
      </div>
    </div>
  );
};