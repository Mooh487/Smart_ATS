import React, { useState } from "react";
import { Briefcase, Sparkles, Link as LinkIcon } from "lucide-react";
import { useAnalysisStore } from "../store/analysisStore";

const jobTemplates = [
  {
    title: "Software Engineer",
    description:
      "We are seeking a skilled Software Engineer to join our dynamic team...",
  },
  {
    title: "Data Scientist",
    description:
      "Looking for an experienced Data Scientist to analyze complex datasets...",
  },
  {
    title: "Product Manager",
    description:
      "Seeking a strategic Product Manager to drive product development...",
  },
];

export const JobDescriptionInput: React.FC = () => {
  const { jobDescription, setJobDescription, jobTitle, setJobTitle } =
    useAnalysisStore();
  const [showTemplates, setShowTemplates] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleTemplateSelect = (template: (typeof jobTemplates)[0]) => {
    setJobTitle(template.title);
    setJobDescription(template.description);
    setShowTemplates(false);
  };

  const extractFromUrl = () => {
    // In a real implementation, this would extract job description from URL
    // For now, we'll just show a placeholder
    if (urlInput.trim()) {
      setJobDescription("Job description extracted from: " + urlInput);
      setUrlInput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Job Information
        </h3>
        <p className="text-sm text-gray-600">
          Enter the job title and description you're applying for
        </p>
      </div>

      {/* Job Title Input */}
      <div>
        <label
          htmlFor="job-title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Job Title
        </label>
        <input
          id="job-title"
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="e.g., Senior Software Engineer"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowTemplates(!showTemplates)}
          className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Templates
        </button>
        <div className="flex-1 flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste job posting URL"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={extractFromUrl}
            disabled={!urlInput.trim()}
            className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LinkIcon className="w-4 h-4" />
            Extract
          </button>
        </div>
      </div>

      {showTemplates && (
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Choose a template:
          </p>
          {jobTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateSelect(template)}
              className="w-full text-left p-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900">
                  {template.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      <div>
        <label
          htmlFor="job-description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Job Description
        </label>
        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{jobDescription.length} characters</span>
        <span
          className={
            jobDescription.length < 100 ? "text-orange-500" : "text-green-500"
          }
        >
          {jobDescription.length < 100
            ? "Add more details for better analysis"
            : "Good length for analysis"}
        </span>
      </div>
    </div>
  );
};
