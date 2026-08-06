import React, { useState, useEffect, useRef } from "react";
import { updateUserProfile, uploadProfileImage } from "../api/userApi";
import { useAuth } from "../hooks/AuthContext";
import { Pencil, X, Upload } from "lucide-react";

/**
 * EditProfileModal
 * A slide-in drawer for editing the current user's profile in dark mode.
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
      setImagePreview(null);
      setImageError("");
    }
  }, [user, isOpen]);

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

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    setImageError("");
    setImageUploading(true);

    try {
      const result = await uploadProfileImage(file, token);
      setUser((prev) => ({ ...prev, profileImage: result.profileImage }));
    } catch (err) {
      setImageError(err.message || "Image upload failed. Please try again.");
      setImagePreview(null);
    } finally {
      setImageUploading(false);
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

      setUser((prev) => ({
        ...prev,
        ...updated,
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
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-lg bg-[#111622] text-slate-100 z-[1001] flex flex-col shadow-2xl border-l border-slate-800 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/90 bg-[#0d121c]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-950/80 border border-sky-800/50 flex items-center justify-center text-sky-400">
              <Pencil size={18} />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-none">
                Edit Profile
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Changes update your profile instantly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#161d2b] border border-slate-800 text-slate-400 hover:text-white transition flex items-center justify-center cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          id="edit-profile-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6 text-left"
        >
          {/* Profile Picture */}
          <Section title="Profile Picture">
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 flex-shrink-0">
                <img
                  src={imagePreview || user?.profileImage}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover border-2 border-slate-700"
                />
                {imageUploading && (
                  <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
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
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#161d2b] border border-slate-800 hover:bg-[#1f2838] text-xs font-semibold text-slate-200 rounded-xl transition cursor-pointer"
                >
                  <Upload size={14} />
                  {imageUploading ? "Uploading…" : "Change Photo"}
                </button>
                <p className="text-[11px] text-slate-400">
                  JPG or PNG &mdash; uploaded instantly on select
                </p>
                {imageError && (
                  <p className="text-xs text-red-400 mt-1">{imageError}</p>
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
                rows={4}
                className="w-full px-3.5 py-2.5 bg-[#161d2b] border border-slate-800/90 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition resize-y font-sans leading-relaxed"
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
                  placeholder="e.g. React, Python… (Press Enter)"
                  className="flex-1 px-3.5 py-2.5 bg-[#161d2b] border border-slate-800/90 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Add
                </button>
              </div>
            </Field>

            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#17202e] border border-slate-800 text-slate-300 rounded-lg text-xs font-medium"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-slate-400 hover:text-white transition cursor-pointer"
                      aria-label={`Remove ${tag}`}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Section>

          {/* Alumni Employment */}
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

          {/* Messages */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-400 rounded-xl text-xs text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-xl text-xs text-center">
              Profile updated successfully!
            </div>
          )}
        </form>

        {/* Footer Actions */}
        <div className="p-4 px-6 border-t border-slate-800/90 bg-[#0d121c] flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#161d2b] border border-slate-800 hover:bg-[#1f2838] text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            className="flex-[2] py-2.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold rounded-xl transition shadow-lg shadow-sky-600/20 cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-[11px] font-bold tracking-wider uppercase text-slate-400 pb-2 border-b border-slate-800/80">
      {title}
    </h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({ label, required, children }) => (
  <label className="block space-y-1">
    <span className="text-xs font-medium text-slate-400">
      {label}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </span>
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-3.5 py-2.5 bg-[#161d2b] border border-slate-800/90 rounded-xl text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
  />
);

export default EditProfileModal;
