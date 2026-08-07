import React, { useState } from "react";

const CreatePostForm = ({ type, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    durationInWeeks: "",
    description: "",
    companyName: "",
    opportunityType: "full-time",
    location: "remote",
    applicationEmail: "",
    tags: "",
  });

  const isMentorship = type === "mentorship";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    if (isMentorship) {
      if (!formData.durationInWeeks) return;
    } else {
      if (
        !formData.companyName ||
        !formData.opportunityType ||
        !formData.location ||
        !formData.applicationEmail
      )
        return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-[#111622] rounded-2xl border border-sky-900/50 p-6 shadow-xl mb-6 relative overflow-hidden text-left">
      <div className="absolute top-0 left-0 w-1 h-full bg-slate-2000"></div>
      <h3 className="text-lg font-bold text-white mb-4">
        {isMentorship
          ? "Create New Mentorship Program"
          : "Post New Opportunity"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              {isMentorship ? "Program Title / Topic" : "Opportunity Title"}
            </label>
            <input
              type="text"
              required
              placeholder={
                isMentorship
                  ? "e.g., Advanced React Patterns"
                  : "e.g., Junior Frontend Developer"
              }
              className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {isMentorship && (
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Duration (in weeks)
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g., 12"
                className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                value={formData.durationInWeeks}
                onChange={(e) =>
                  setFormData({ ...formData, durationInWeeks: e.target.value })
                }
              />
            </div>
          )}
        </div>

        {!isMentorship && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Tech Corp"
                  className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Opportunity Type
                </label>
                <select
                  required
                  className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  value={formData.opportunityType}
                  onChange={(e) =>
                    setFormData({ ...formData, opportunityType: e.target.value })
                  }
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Location
                </label>
                <select
                  required
                  className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                >
                  <option value="on site">On Site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Application Email / Link
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., apply@company.com"
                  className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  value={formData.applicationEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, applicationEmail: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="e.g., React, Node, Fullstack"
                className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Description
          </label>
          <textarea
            required
            rows="3"
            placeholder={`Describe the ${isMentorship ? "mentorship program objectives" : "opportunity details and requirements"}...`}
            className="w-full bg-[#161d2b] border border-slate-800/90 text-slate-100 px-3.5 py-2.5 rounded-xl text-sm placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition resize-y font-sans"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-[#161d2b] border border-slate-800 rounded-xl hover:bg-[#1f2838] transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 rounded-xl hover:bg-slate-2000 shadow-md shadow-sky-600/20 transition cursor-pointer"
          >
            {isMentorship ? "Create Program" : "Post Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;