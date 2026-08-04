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
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(520px, 100vw)",
          background: "#ffffff",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 24px",
            borderBottom: "1px solid #e5e7eb",
            background: "linear-gradient(135deg, #172b4d 0%, #1e3a5f 100%)",
            color: "white",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 18, height: 18 }}
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.158 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
              </svg>
            </div>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                Edit Profile
              </h2>
              <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>
                Changes are saved immediately
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              color: "white",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              style={{ width: 16, height: 16 }}
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
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {/* Profile Picture */}
          <Section title="Profile Picture">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              {/* Avatar preview */}
              <div
                style={{
                  position: "relative",
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                }}
              >
                <img
                  src={imagePreview || user?.profileImage}
                  alt="Profile"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #e5e7eb",
                  }}
                />
                {imageUploading && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.45)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 22,
                        height: 22,
                        border: "3px solid rgba(255,255,255,0.3)",
                        borderTop: "3px solid white",
                        borderRadius: "50%",
                        animation: "ep-spin 0.7s linear infinite",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Upload controls */}
              <div style={{ flex: 1 }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="profile-image-input"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                  style={{
                    padding: "8px 16px",
                    background: "white",
                    border: "1.5px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#374151",
                    cursor: imageUploading ? "not-allowed" : "pointer",
                    opacity: imageUploading ? 0.6 : 1,
                    transition: "background 0.2s",
                    display: "block",
                    marginBottom: 6,
                  }}
                  onMouseEnter={(e) => {
                    if (!imageUploading)
                      e.currentTarget.style.background = "#f3f4f6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                  }}
                >
                  {imageUploading ? "Uploading…" : "Change Photo"}
                </button>
                <p style={{ fontSize: 11, color: "#9ca3af", margin: 0 }}>
                  JPG or PNG &mdash; uploaded instantly on select
                </p>
                {imageError && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "#b91c1c",
                      marginTop: 6,
                    }}
                  >
                    {imageError}
                  </p>
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
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: "1.5px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#111827",
                  background: "white",
                  outline: "none",
                  transition: "border-color 0.2s",
                  resize: "vertical",
                  fontFamily: "inherit",
                  lineHeight: 1.6,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#172b4d")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
            </Field>
          </Section>

          {/* Skills / Interests */}
          <Section title="Skills & Interests">
            <Field label="Add a skill or tag">
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  ref={tagInputRef}
                  value={form.tagInput}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, tagInput: e.target.value }))
                  }
                  onKeyDown={handleTagKeyDown}
                  placeholder="e.g. React, Python…  (Enter to add)"
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    border: "1.5px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#111827",
                    background: "white",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#172b4d")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
                <button
                  type="button"
                  onClick={addTag}
                  style={{
                    padding: "9px 16px",
                    background: "#172b4d",
                    color: "white",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "background 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#1e3a5f")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#172b4d")
                  }
                >
                  Add
                </button>
              </div>
            </Field>

            {form.tags.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      background: "#e8f0fe",
                      color: "#1a56db",
                      borderRadius: 999,
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1a56db",
                        cursor: "pointer",
                        fontSize: 16,
                        lineHeight: 1,
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                      }}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                color: "#b91c1c",
                fontSize: 13,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 16, height: 16, flexShrink: 0 }}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                background: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: 8,
                color: "#15803d",
                fontSize: 13,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: 16, height: 16, flexShrink: 0 }}
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

        {/*  sticky footer actions */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            gap: 12,
            flexShrink: 0,
            background: "#f9fafb",
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: "10px 0",
              background: "white",
              border: "1.5px solid #d1d5db",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: "#374151",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            disabled={saving}
            style={{
              flex: 2,
              padding: "10px 0",
              background: "#172b4d",
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              color: "white",
              transition: "background 0.2s, opacity 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: saving ? 0.7 : 1,
              cursor: saving ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (!saving) e.currentTarget.style.background = "#1e3a5f";
            }}
            onMouseLeave={(e) => {
              if (!saving) e.currentTarget.style.background = "#172b4d";
            }}
          >
            {saving ? (
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "ep-spin 0.7s linear infinite",
                  }}
                />
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
    <h3
      style={{
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "#6b7280",
        marginBottom: 14,
        paddingBottom: 8,
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      {title}
    </h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {children}
    </div>
  </div>
);

const Field = ({ label, required, children }) => (
  <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>
      {label}
      {required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
    </span>
    {children}
  </label>
);

const Input = ({ ...props }) => (
  <input
    style={{
      width: "100%",
      padding: "9px 12px",
      border: "1.5px solid #d1d5db",
      borderRadius: 8,
      fontSize: 14,
      color: "#111827",
      background: "white",
      outline: "none",
      transition: "border-color 0.2s",
    }}
    onFocus={(e) => (e.target.style.borderColor = "#172b4d")}
    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
    {...props}
  />
);

/* inject spinner keyframe once */
if (
  typeof document !== "undefined" &&
  !document.getElementById("ep-spin-style")
) {
  const s = document.createElement("style");
  s.id = "ep-spin-style";
  s.textContent = "@keyframes ep-spin { to { transform: rotate(360deg); } }";
  document.head.appendChild(s);
}

export default EditProfileModal;
