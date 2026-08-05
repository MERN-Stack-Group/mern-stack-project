import {
  Building,
  GraduationCap,
  MapPin,
  Clock,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchCard({ item, linkTo }) {
  // Determine the layout style based on whether the item has an image (Mentors/Students)
  const isProfile = Boolean(item.imageUrl);

  return (
    <>
      <Link to={linkTo} className="block h-full group">
        <div className="bg-surface p-6 rounded border border-border hover:border-primary hover:bg-surface-hover transition-colors shadow-sm flex flex-col h-full cursor-pointer relative">
          {isProfile ? (
            // --- PROFILE LAYOUT (Mentors & Students) ---
            <div className="flex items-start gap-4 mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 rounded object-cover border border-border"
              />
              <div>
                <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                  {item.name}
                </h2>

                {/* Conditional Sub-headers based on Mentor vs Student */}
                {item.jobTitle && (
                  <p className="text-primary text-sm font-semibold mt-1">
                    {item.jobTitle}
                  </p>
                )}
                {item.degree && (
                  <p className="text-primary text-sm font-semibold mt-1 leading-tight">
                    {item.degree}
                  </p>
                )}

                {/* Extra details (Company or Graduation Year) */}
                {item.company && (
                  <div className="flex items-center gap-1.5 text-text-secondary text-xs mt-2.5 font-medium">
                    <Building size={14} /> <span>{item.company}</span>
                  </div>
                )}
                {item.gradYear && (
                  <div className="flex items-center gap-1.5 text-text-secondary text-xs mt-2.5 font-medium">
                    <GraduationCap size={14} />{" "}
                    <span>Class of {item.gradYear}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // --- LISTING LAYOUT (Opportunities & Programs) ---
            <div className="mb-4">
              <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                {item.name}
              </h2>

              <div className="flex flex-wrap gap-x-5 gap-y-2.5 mt-4">
                {item.postedBy && (
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
                    <div className="w-6 h-6 rounded bg-surface flex items-center justify-center text-[10px] font-bold text-text-secondary border border-border">
                      {item.postedBy?.charAt(0)}
                    </div>
                    <span>{item.postedBy}</span>
                  </div>
                )}

                {item.company && (
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium">
                    <Building size={16} className="text-text-muted" />{" "}
                    <span>{item.company}</span>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium">
                    <MapPin size={16} className="text-text-muted" />{" "}
                    <span>{item.location}</span>
                  </div>
                )}

                {item.duration && (
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium">
                    <Clock size={16} className="text-text-muted" />{" "}
                    <span>{item.duration}</span>
                  </div>
                )}
                {item.employmentType && (
                  <div className="flex items-center gap-1.5 text-text-secondary text-sm font-medium">
                    <Briefcase size={16} className="text-text-muted" />{" "}
                    <span>{item.employmentType}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- SHARED TAGS (Pushed to the bottom) --- */}
          <div className="mt-auto pt-5 flex flex-wrap gap-2 border-t border-border">
            {item.faculty && (
              <span className="px-2 py-1 rounded bg-surface-hover text-text-secondary text-[11px] font-bold uppercase tracking-widest border border-border">
                {item.faculty}
              </span>
            )}
            {item.industry && (
              <span className="px-2 py-1 rounded bg-surface-hover text-text-secondary text-[11px] font-bold uppercase tracking-widest border border-border">
                {item.industry}
              </span>
            )}
            {item.type && (
              <span className="px-2 py-1 rounded bg-surface text-primary text-[11px] font-bold uppercase tracking-widest border border-primary">
                {item.type}
              </span>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
