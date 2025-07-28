import React from "react";

const solutions = [
  {
    title: "Integrated Missile Shield",
    desc: "A multi-layered defense system combining ground-to-air interceptors, radar arrays, and space-based tracking to neutralize incoming threats.",
    icon: "🛡️"
  },
  {
    title: "Cyber Defense Grid",
    desc: "A national-scale cybersecurity initiative that uses AI and real-time threat intelligence to defend against hacking, espionage, and digital sabotage.",
    icon: "💻"
  },
  {
    title: "AI-Driven Warfare",
    desc: "Autonomous drones, decision-support systems, and smart weapons driven by artificial intelligence to enhance response speed and accuracy.",
    icon: "🤖"
  },
  {
    title: "Space Surveillance Network",
    desc: "Satellites and space-based radars used for early warning, border surveillance, and enemy troop movement tracking across terrain and oceans.",
    icon: "🛰️"
  },
  {
    title: "Joint Tactical Command System",
    desc: "An interoperable communication and command structure for coordinated operations across Army, Navy, Air Force, and Cyber units.",
    icon: "📡"
  }
];

const StrategicSolutions = () => {
  return (
    <section className="bg-gray-50 px-6 md:px-20 py-16 text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-center">Strategic Defence Solutions</h2>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        Our integrated defence vision combines cutting-edge technology, real-time data, and
        inter-force coordination to ensure maximum preparedness against conventional and
        non-conventional threats.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {solutions.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border"
          >
            <div className="text-4xl mb-4 overflow-hidden">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href="https://mod.gov.in" // Or your own detail page
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-700 text-white font-semibold rounded hover:bg-blue-800 transition"
        >
          Explore Full Strategic Framework
        </a>
      </div>
    </section>
  );
};

export default StrategicSolutions;
