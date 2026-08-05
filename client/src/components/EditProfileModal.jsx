import React, { useState, useEffect, useRef } from "react";
import { updateUserProfile, uploadProfileImage } from "../api/userApi";
import { useAuth } from "../hooks/AuthContext";

/**
 * EditProfileModal
 * A slide-in drawer for editing the current user's profile.
 *
 * Props:
 *   isOpen  – boolean controlling visibility
 *   onClose – callback to close the modal
 */
const EditProfileModal = ({ isOpen, onClose }) => {
  const { user, setUser, token } = useAuth();

  const [form, setForm] = useState({
    name: "",
    degree: "",
    faculty: "",
    about: "",
    tagInput: "",
    tags: [],
    // alumni employment
    jobTitle: "",
    employer: "",
    location: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageError, setImageError] = useState("");

  const fileInputRef = useRef(null);
  const tagInputRef = useRef(null);

  const isAlumni =
    user?.userType === "alumni" || user?.role?.includes("alumni");

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        degree: user.degree ?? "",
        faculty: user.faculty ?? "",
        about: user.aboutText ?? user.about ?? "",
        tagInput: "",
        tags: Array.isArray(user.tags) ? [...user.tags] : [],
        jobTitle:
          user.jobTitle ?? user.alumniProfile?.employment?.jobTitle ?? "",
        employer:
          user.companyName ?? user.alumniProfile?.employment?.employer ?? "",
        location:
          user.jobLocation ?? user.alumniProfile?.employment?.location ?? "",
      });
      // Reset image preview to the current saved image when modal opens
      setImagePreview(null);
      setImageError("");
    }
  }, [user, isOpen]);

  //stopes the main webpage scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addTag = () => {
    const tag = form.tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tag], tagInput: "" }));
    }
    tagInputRef.current?.focus();
  };

  const removeTag = (tag) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setImageError("");
    setImageUploading(true);

    try {
      const result = await uploadProfileImage(file, token);
      // Update AuthContext so the avatar refreshes everywhere instantly
      setUser((prev) => ({ ...prev, profileImage: result.profileImage }));
    } catch (err) {
      setImageError(err.message || "Image upload failed. Please try again.");
      setImagePreview(null);
    } finally {
      setImageUploading(false);
      // Clean up the object URL to free browser memory
      URL.revokeObjectURL(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);

    try {
      const payload = {
        name: form.name,
        degree: form.degree,
        faculty: form.faculty,
        about: form.about,
        tags: form.tags,
        ...(isAlumni && {
          alumniProfile: {
            ...user?.alumniProfile,
            employment: {
              ...user?.alumniProfile?.employment,
              jobTitle: form.jobTitle,
              employer: form.employer,
              location: form.location,
            },
          },
        }),
      };

      const updated = await updateUserProfile(payload, token);

      // Reflect changes in AuthContext so Profile page updates instantly
      setUser((prev) => ({
        ...prev,
        ...updated,
        // normalise fields the Profile page reads
        aboutText: updated.about ?? form.about,
        companyName:
          updated.alumniProfile?.employment?.employer ?? form.employer,
        jobTitle: updated.alumniProfile?.employment?.jobTitle ?? form.jobTitle,
        jobLocation:
          updated.alumniProfile?.employment?.location ?? form.location,
      }));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/45 z-50 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[520px] bg-surface z-[51] flex flex-col shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-hover flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary m-0">
                Edit Profile
              </h2>
              <p className="text-xs text-text-secondary m-0">
                Changes are saved immediately
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-border transition-colors border-none cursor-pointer focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* scrollable form body */}
        <form
          id="edit-profile-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-background"
        >
          {/* Profile Picture */}
          <Section title="Profile Picture">
            <div className="flex items-center gap-5">
              {/* Avatar preview */}
              <div className="relative w-20 h-20 flex-shrink-0">
                <img
                  src={imagePreview || user?.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-[3px] border-border"
                />
                {imageUploading && (
                  <div className="absolute inset-0 rounded-full bg-black/45 flex items-center justify-center">
                    <span className="inline-block w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div className="flex-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-image-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                  className={`px-4 py-2 bg-surface hover:bg-surface-hover border border-border rounded text-sm font-semibold text-text-primary transition-colors block mb-1.5 focus:outline-none ${
                    imageUploading
                      ? "opacity-60 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {imageUploading ? "Uploading…" : "Change Photo"}
                </button>
                <p className="text-[11px] text-text-secondary m-0">
                  JPG or PNG &mdash; uploaded instantly on select
                </p>
                {imageError && (
                  <p className="text-xs text-danger mt-1.5">{imageError}</p>
                )}
              </div>
            </div>
          </Section>

          {/* Basic Info */}
          <Section title="Basic Information">
            <Field label="Full Name" required>
              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Kalana Dasanayaka"
                required
              />
            </Field>
            <Field label="Degree / Programme" required>
              <Input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="e.g. BSc (Hons) Computer Science"
                required
              />
            </Field>
            <Field label="Faculty" required>
              <Input
                name="faculty"
                value={form.faculty}
                onChange={handleChange}
                placeholder="e.g. Faculty of Computing"
                required
              />
            </Field>
          </Section>

          {/* About */}
          <Section title="About">
            <Field label="Bio">
              <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="Tell others about yourself, your interests, and goals..."
                rows={5}
                className="w-full px-3 py-2 border border-border rounded text-sm text-text-primary bg-surface outline-none transition-colors resize-y leading-relaxed focus:border-primary"
              />
            </Field>
          </Section>

          {/* Skills / Interests */}
          <Section title="Skills & Interests">
            <Field label="Add a skill or tag">
              <div className="flex gap-2">
                <input
                  ref={tagInputRef}
                  value={form.tagInput}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, tagInput: e.target.value }))
                  }
                  onKeyDown={handleTagKeyDown}
                  placeholder="e.g. React, Python…  (Enter to add)"
                  className="flex-1 px-3 py-2 border border-border rounded text-sm text-text-primary bg-surface outline-none transition-colors focus:border-primary"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-primary hover:bg-primary-hover text-white border border-transparent rounded text-sm font-bold cursor-pointer transition-colors whitespace-nowrap focus:outline-none"
                >
                  Add
                </button>
              </div>
            </Field>

            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="bg-transparent border-none text-primary cursor-pointer text-base leading-none p-0 flex items-center focus:outline-none"
                      aria-label={`Remove ${tag}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* Alumni Employment (conditional) */}
          {isAlumni && (
            <Section title="Employment">
              <Field label="Job Title">
                <Input
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Senior Software Engineer"
                />
              </Field>
              <Field label="Employer / Company">
                <Input
                  name="employer"
                  value={form.employer}
                  onChange={handleChange}
                  placeholder="e.g. MAS Holdings"
                />
              </Field>
              <Field label="Location">
                <Input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Colombo, Sri Lanka"
                />
              </Field>
            </Section>
          )}

          {/* feedback messages */}
          {error && (
            <div className="flex items-center gap-2.5 px-3 py-2 bg-danger/10 border border-danger/30 rounded text-danger text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 px-3 py-2 bg-success/10 border border-success/30 rounded text-success text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
              Profile updated successfully!
            </div>
          )}
        </form>

        {/* sticky footer actions */}
        <div className="px-6 py-4 border-t border-border flex gap-3 flex-shrink-0 bg-surface">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 bg-surface hover:bg-surface-hover border border-border rounded text-sm font-semibold text-text-primary cursor-pointer transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            className={`flex-[2] py-2 bg-primary hover:bg-primary-hover border border-transparent rounded text-sm font-bold text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none ${
              saving ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving&hellip;
              </span>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

/* sub-components  */

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-[11px] font-bold tracking-[0.08em] uppercase text-text-secondary mb-3 pb-2 border-b border-border">
      {title}
    </h3>
    <div className="flex flex-col gap-3.5">{children}</div>
  </div>
);

const Field = ({ label, required, children }) => (
  <label className="flex flex-col gap-1.5">
    <span className="text-sm font-semibold text-text-primary">
      {label}
      {required && <span className="text-danger ml-1">*</span>}
    </span>
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input
    className="w-full px-3 py-2 border border-border rounded text-sm text-text-primary bg-surface outline-none transition-colors focus:border-primary"
    {...props}
  />
);

export default EditProfileModal;
