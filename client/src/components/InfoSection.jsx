import { GraduationCap, Briefcase, ShieldCheck, Network } from "lucide-react";

function InfoSection() {
  return (
    <section className="px-6 py-16 max-w-6xl mx-auto">
      {/* Main student/alumni card */}
      <div className="bg-surface border border-border rounded shadow-sm p-10">
        <div className="grid md:grid-cols-2 gap-10 relative">
          {/* Student Bank */}
          <div className="text-center md:border-r md:border-border md:pr-10">
            <GraduationCap size={45} className="text-primary mx-auto" />
            <h2 className="text-text-secondary mt-5 text-sm font-bold uppercase tracking-widest">
              Student Bank
            </h2>
            <h3 className="text-2xl font-bold text-text-primary mt-2">
              Current Students
            </h3>
            <p className="text-text-secondary mt-4 leading-relaxed">
              Seek career guidance, project feedback, and internship
              opportunities from experienced seniors and verified alumni.
            </p>
          </div>

          {/* Alumni Bank */}
          <div className="text-center md:pl-10">
            <Network size={45} className="text-primary mx-auto" />
            <h2 className="text-text-secondary mt-5 text-sm font-bold uppercase tracking-widest">
              Alumni Bank
            </h2>
            <h3 className="text-2xl font-bold text-text-primary mt-2">
              Seniors & Alumni
            </h3>
            <p className="text-text-secondary mt-4 leading-relaxed">
              Give back to your alma mater by offering mentorship, sharing
              industry insights, and posting opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
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
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-surface border border-border rounded p-6 hover:border-primary transition-colors hover:shadow-sm">
      <div className="text-primary">{icon}</div>
      <h3 className="text-text-primary font-bold text-lg mt-4">{title}</h3>
      <p className="text-text-secondary text-sm mt-2 leading-relaxed">{text}</p>
    </div>
  );
}

export default InfoSection;
