import React, { useState } from "react";

const CreatePostForm = ({ type, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    description: "",
  });

  const isMentorship = type === "mentorship";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.duration) return;
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm mb-6 animate-fadeIn relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-600"></div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        {isMentorship
          ? "Create New Mentorship Program"
          : "Post New Opportunity"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isMentorship ? "Duration (e.g., 6 months)" : "Closing Date"}
            </label>
            <input
              type="text"
              required
              placeholder={isMentorship ? "6 months" : "Oct 31, 2026"}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            required
            rows="3"
            placeholder={`Describe the ${isMentorship ? "mentorship program objectives" : "opportunity details and requirements"}...`}
            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
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
            className="px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 shadow-sm transition-colors"
          >
            {isMentorship ? "Create Program" : "Post Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
