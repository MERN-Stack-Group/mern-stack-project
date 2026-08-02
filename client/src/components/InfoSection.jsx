import {
    GraduationCap,
    Briefcase,
    ShieldCheck,
    Network
} from "lucide-react";

function InfoSection() {
    return (
        <section className="px-10 py-20">

            {/* Main student/alumni card */}

        <div className="bg-[#24201D] border border-[#4A433E] rounded-3xl p-10">

            <div className="grid md:grid-cols-2 gap-10 relative">

            {/* Student Bank */}        
                <div className="text-center md:border-r md:border-[#4A433E] md:pr-10">
                    <GraduationCap
                        size={45}
                        className="text-[#7E8C54] mx-auto"
                    />

                    <h2 className="text-[#B8B0A8]  mt-5">
                        Student Bank
                    </h2>

                    <h3 className="text-2xl font-bold text-[#F5F1EA] mt-2">
                        Current Students
                    </h3>

                    <p className="text-[#B8B0A8] mt-4">
                        Seek career guidance, project feedback,
                        and internship opportunities from experienced
                        seniors and verified alumni.
                    </p>

                </div>

                {/* Alumni Bank */}

                <div className="text-center md:pl-10">

                    <Network
                        size={45}
                        className="text-[#7E8C54] mx-auto"
                    />

                    <h2 className="text-[#B8B0A8]  mt-5">
                        Alumni Bank
                    </h2>

                    <h3 className="text-2xl font-bold text-[#F5F1EA] mt-2">
                        Seniors & Alumni
                    </h3>

                    <p className="text-[#B8B0A8] mt-4">
                        Give back to your alma mater by offering
                        mentorship, sharing industry insights,
                        and posting opportunities.
                    </p>

                </div>
            </div>
        </div>
            {/* Feature cards */ }

    <div className="grid md:grid-cols-3 gap-6 mt-8">
        <FeatureCard
            icon={<ShieldCheck />}
            title="Verified Alumni Credentials"
            text="Admin-verified profiles ensure authentic connections."
        />
        <FeatureCard
            icon={<Briefcase />}
            title="Opportunity Board"
            text="Access internships, jobs, and research opportunities."
        />
        <FeatureCard
            icon={<Network />}
            title="Mentorship Pipeline"
            text="Structured stages from request to completion."
        />
    </div>
        </section >
    );
}
function FeatureCard({ icon, title, text }) {

    return (
        <div className="bg-[#24201D] border border-[#4A433E] rounded-2xl p-6 hover:border-[#7E8C54] transition">

            <div className="text-[#7E8C54]">
                {icon}
            </div>

            <h3 className="text-[#F5F1EA] font-bold text-xl mt-4">
                {title}
            </h3>

            <p className="text-[#B8B0A8] mt-3">
                {text}
            </p>

        </div>
    );
}

export default InfoSection;