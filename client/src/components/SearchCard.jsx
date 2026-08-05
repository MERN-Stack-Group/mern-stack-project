import {
  Building,
  GraduationCap,
  Users,
  MapPin,
  Clock,
  Briefcase,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SearchCard({ item }) {
  // Determine the layout style based on whether the item has an image (Mentors/Students)
  const isProfile = Boolean(item.imageUrl);

  // Determine the correct route based on item type
  let linkPath = "/profile/" + item._id;
  if (item.itemType === "mentorship") {
    linkPath = "/mentorship/" + item._id;
  } else if (item.itemType === "opportunity") {
    linkPath = "/opportunity/" + item._id;
  }

  return (
    <>
      <Link to={linkPath}>
        <div className="group bg-[#091D14] p-6 rounded-2xl border border-[#133826] hover:border-emerald-500/50 hover:bg-[#0B2519] transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-emerald-900/20 flex flex-col h-full cursor-pointer">
          {isProfile ? (
            // --- PROFILE LAYOUT (Mentors & Students) ---
            <div className="flex items-start gap-4 mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-900/50 shadow-inner"
              />
              <div>
                <h2 className="text-xl font-bold text-emerald-50 group-hover:text-emerald-300 transition-colors">
                  {item.name}
                </h2>

                {/* Conditional Sub-headers based on Mentor vs Student */}
                {item.jobTitle && (
                  <p className="text-emerald-400 text-sm font-medium mt-0.5">
                    {item.jobTitle}
                  </p>
                )}
                {item.degree && (
                  <p className="text-emerald-400 text-sm font-medium mt-0.5 leading-tight">
                    {item.degree}
                  </p>
                )}

                {/* Extra details (Company or Graduation Year) */}
                {item.company && (
                  <div className="flex items-center gap-1.5 text-emerald-100/60 text-xs mt-2">
                    <Building size={12} /> <span>{item.company}</span>
                  </div>
                )}
                {item.gradYear && (
                  <div className="flex items-center gap-1.5 text-emerald-100/60 text-xs mt-2">
                    <GraduationCap size={12} />{" "}
                    <span>Class of {item.gradYear}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // --- LISTING LAYOUT (Opportunities & Programs) ---
            <div className="mb-4">
              <h2 className="text-xl font-bold text-emerald-50 group-hover:text-emerald-300 transition-colors">
                {item.name}
              </h2>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                {item.postedBy && (
                  <div className="flex items-center gap-2 text-emerald-100/80 text-sm">
                    <div className="w-6 h-6 rounded-full bg-emerald-900/50 flex items-center justify-center text-[10px] font-bold text-emerald-400 border border-emerald-800/30">
                      {item.postedBy?.charAt(0)}
                    </div>
                    <span>{item.postedBy}</span>
                  </div>
                )}

                {item.company && (
                  <div className="flex items-center gap-1.5 text-emerald-100/60 text-sm">
                    <Building size={14} /> <span>{item.company}</span>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center gap-1.5 text-emerald-100/60 text-sm">
                    <MapPin size={14} /> <span>{item.location}</span>
                  </div>
                )}

                {item.duration && (
                  <div className="flex items-center gap-1.5 text-emerald-100/60 text-sm">
                    <Clock size={14} /> <span>{item.duration}</span>
                  </div>
                )}
                {item.employmentType && (
                  <div className="flex items-center gap-1.5 text-emerald-100/60 text-sm">
                    <Briefcase size={14} /> <span>{item.employmentType}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- SHARED TAGS (Pushed to the bottom) --- */}
          <div className="mt-auto pt-5 flex flex-wrap gap-2 border-t border-[#133826]">
            {item.faculty && (
              <span className="px-2.5 py-1 rounded-md bg-[#133826] text-emerald-100/80 text-xs font-medium">
                {item.faculty}
              </span>
            )}
            {item.industry && (
              <span className="px-2.5 py-1 rounded-md bg-[#133826] text-emerald-100/80 text-xs font-medium">
                {item.industry}
              </span>
            )}
            {item.type && (
              <span className="px-2.5 py-1 rounded-md bg-emerald-900/40 text-emerald-300 text-xs font-medium border border-emerald-800/50">
                {item.type}
              </span>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
