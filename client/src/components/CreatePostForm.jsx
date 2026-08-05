import React, { useState } from "react";

const CreatePostForm = ({ type, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    durationInWeeks: "",
    description: "",
    companyName: "",
    opportunityType: "full-time",
    location: "on site",
    applicationEmail: "",
    tags: "",
  });

  const isMentorship = type === "mentorship";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    if (isMentorship && !formData.durationInWeeks) return;
    if (!isMentorship && (!formData.companyName || !formData.applicationEmail))
      return;
    onSubmit(formData);
  };

  const inputClass =
    "w-full border border-border rounded px-3 py-2 text-sm bg-surface text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-primary transition-colors";
  const selectClass =
    "w-full border border-border rounded px-3 py-2 text-sm bg-surface text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer";
  const labelClass = "block text-sm font-semibold text-text-primary mb-1";

  return (
    <div className="bg-surface rounded border border-border p-8 shadow-sm mb-6 animate-fadeIn relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
      <h3 className="text-2xl font-bold text-text-primary mb-6">
        {isMentorship
          ? "Create New Mentorship Program"
          : "Post New Opportunity"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>
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
              className={inputClass}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className={labelClass}>
              {isMentorship ? "Duration (in weeks)" : "Closing Date"}
            </label>
            {isMentorship ? (
              <input
                type="number"
                required
                min="1"
                placeholder="e.g., 12"
                className={inputClass}
                value={formData.durationInWeeks}
                onChange={(e) =>
                  setFormData({ ...formData, durationInWeeks: e.target.value })
                }
              />
            ) : (
              <input
                type="text"
                placeholder="Oct 31, 2026 (Optional display)"
                className={inputClass}
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              />
            )}
          </div>
        </div>

        {!isMentorship && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Company Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., MAS Holdings"
                  className={inputClass}
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className={labelClass}>Application Email</label>
                <input
                  type="email"
                  required
                  placeholder="careers@example.com"
                  className={inputClass}
                  value={formData.applicationEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      applicationEmail: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Opportunity Type</label>
                <select
                  required
                  className={selectClass}
                  value={formData.opportunityType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      opportunityType: e.target.value,
                    })
                  }
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Location</label>
                <select
                  required
                  className={selectClass}
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
            </div>
            <div>
              <label className={labelClass}>Tags (Comma Separated)</label>
              <input
                type="text"
                required
                placeholder="React, Node.js, Frontend"
                className={inputClass}
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
            </div>
          </>
        )}

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            required
            rows="4"
            placeholder={`Describe the ${isMentorship ? "mentorship program objectives" : "opportunity details and requirements"}...`}
            className={`${inputClass} resize-none`}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-text-secondary bg-surface border border-border rounded hover:bg-surface-hover hover:text-text-primary transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-hover transition-colors focus:outline-none"
          >
            {isMentorship ? "Create Program" : "Post Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
