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
        <div className="group bg-white dark:bg-[#111622] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:bg-slate-50 dark:hover:bg-[#161d2b] transition-all duration-300 shadow-sm dark:shadow-md hover:shadow-xl dark:hover:shadow-sky-900/20 hover:-translate-y-1 flex flex-col h-full cursor-pointer">
          {isProfile ? (
            // --- PROFILE LAYOUT (Mentors & Students) ---
            <div className="flex items-start gap-4 mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700 shadow-inner"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {item.name}
                </h2>

                {/* Conditional Sub-headers based on Mentor vs Student */}
                {item.jobTitle && (
                  <p className="text-sky-600 dark:text-sky-400 text-sm font-medium mt-0.5">
                    {item.jobTitle}
                  </p>
                )}
                {item.degree && (
                  <p className="text-sky-600 dark:text-sky-400 text-sm font-medium mt-0.5 leading-tight">
                    {item.degree}
                  </p>
                )}

                {/* Extra details (Company or Graduation Year) */}
                {item.company && (
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-2">
                    <Building size={12} /> <span>{item.company}</span>
                  </div>
                )}
                {item.gradYear && (
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs mt-2">
                    <GraduationCap size={12} />{" "}
                    <span>Class of {item.gradYear}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // --- LISTING LAYOUT (Opportunities & Programs) ---
            <div className="mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {item.name}
              </h2>

              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
                {item.postedBy && (
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300 text-sm">
                    <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {item.postedBy?.charAt(0)}
                    </div>
                    <span>{item.postedBy}</span>
                  </div>
                )}

                {item.company && (
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                    <Building size={14} /> <span>{item.company}</span>
                  </div>
                )}

                {item.location && (
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                    <MapPin size={14} /> <span>{item.location}</span>
                  </div>
                )}

                {item.duration && (
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                    <Clock size={14} /> <span>{item.duration}</span>
                  </div>
                )}
                {item.employmentType && (
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm">
                    <Briefcase size={14} /> <span>{item.employmentType}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- SHARED TAGS (Pushed to the bottom) --- */}
          <div className="mt-auto pt-5 flex flex-wrap gap-2 border-t border-slate-200 dark:border-slate-800/80">
            {item.faculty && (
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                {item.faculty}
              </span>
            )}
            {item.industry && (
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200 dark:border-slate-700">
                {item.industry}
              </span>
            )}
            {item.type && (
              <span className="px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 text-xs font-medium border border-sky-200 dark:border-sky-800/50">
                {item.type}
              </span>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
