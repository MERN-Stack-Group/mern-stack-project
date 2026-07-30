function InfoSection() {

    const features = [
        {
            title: "STUDENT BANK",
            subtitle: "Current Students",
            text: "Seek career guidance, project feedback, and internship opportunities from experienced seniors and verified alumni."
        },

        {
            title: "ALUMNI BANK",
            subtitle: "Seniors & Alumni",
            text: "Give back to your alma mater by offering mentorship, sharing industry insights, and posting exclusive job listings."
        },

        {
            title: "Verified Alumni Credentials",
            text: "Admin-verified profiles ensure authentic connections with verified company backgrounds and industry expertise."
        },

        {
            title: "Exclusive Opportunity Board",
            text: "Direct access to internships, full-time jobs, and research projects posted specifically for graduates."
        },

        {
            title: "Structured Mentorship Pipeline",
            text: "Clear stages from initial request to active sessions and mentorship completion."
        }
    ];

    return (
        <section className="px-10 py-20">

            <div className="grid md:grid-cols-2 gap-8">

                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-8 rounded-2xl border"
                    >

                        <h2 className="text-xl font-bold">
                            {feature.title}
                        </h2>


                        {feature.subtitle && (
                            <h3 className="mt-2 font-semibold">
                                {feature.subtitle}
                            </h3>
                        )}


                        <p className="mt-4">
                            {feature.text}
                        </p>

                    </div>
                ))}
                </div>

        </section>
    );
}

export default InfoSection;