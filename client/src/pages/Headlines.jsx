import React from "react";
import sindoor from "../assets/sindoor.png";

const headlines = [
    {
        img: "/images/headline1.jpg",
        title: "Army Upgrades Precision Arsenal",
        desc: "Post-SINDOOR upgrades include smart bombs, drone-guided artillery, and high-res satellite coordination."
    },
    {
        img: "/images/headline2.jpg",
        title: "Diplomatic Reactions",
        desc: "Nations call for restraint while acknowledging India’s right to self-defense."
    },
    {
        img: "/images/headline3.jpg",
        title: "Cross-border Tensions Rise",
        desc: "Skirmishes reported at LOC after Operation SINDOOR; India maintains defensive posture."
    },
    {
        img: "/images/headline4.jpg",
        title: "Veteran Voices on SINDOOR",
        desc: "Military veterans call Operation SINDOOR 'a masterstroke of deterrence'."
    }
];

const Heading = () => {
    return (
        <section className="px-6 md:px-20 bg-white text-gray-900">
            {/* Banner */}
            <img
                src={sindoor}
                alt="Operation SINDOOR Banner"
                className="mx-auto h-60 rounded-lg shadow mb-12"
            />


            {/* Introduction */}
            <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
                <div className="md:w-1/2">
                    <h1 className="text-3xl font-extrabold mb-4">
                        OPERATION SINDOOR: India's Tactical Strike on Terror
                    </h1>
                    <p className="text-gray-700 mb-4">
                        Operation SINDOOR was a calculated precision strike launched by the Indian Armed Forces against terrorist camps located across the Line of Control (LoC) and in Pakistan.
                        It was a direct response to a series of cross-border terror attacks that claimed the lives of Indian soldiers and civilians.
                    </p>
                    <div className="space-x-4">
                        <a
                            href="https://www.youtube.com/results?search_query=operation+sindoor+strike"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                        >
                            Watch Coverage
                        </a>
                        <button className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">
                            Share Story
                        </button>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img
                        src="/images/strike-pears.jpg"
                        alt="Strike Operation Visual"
                        className="rounded-lg shadow"
                    />
                </div>
            </div>

            {/* Section 2: Cause & Targeting */}
            <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
                <div className="md:w-1/2">
                    <img
                        src="/images/watermelon.jpg"
                        alt="Target Mapping"
                        className="rounded-lg shadow"
                    />
                </div>
                <div className="md:w-1/2">
                    <h2 className="text-xl font-bold mb-2">Cause: What Led to Operation SINDOOR?</h2>
                    <p className="text-gray-700">
                        he 2025 Pahalgam attack was a terrorist attack on tourists by five armed terrorists near Pahalgam in Indian-administered Jammu and Kashmir in which 26 civilians were killed on 22 April 2025. The militants mainly targeted Hindu tourists.
                        <br />
                        Intelligence agencies reported the presence of multiple high-value terror cells operating near the LoC. These camps were directly linked to attacks in Pahalgam.
                        Evidence confirmed imminent cross-border infiltrations and arms movement. The Indian Cabinet Committee on Security (CCS) authorized a limited military response under strict rules of engagement.
                    </p>
                </div>
            </div>

            {/* Section 3: Action Phase */}
            <h2 className="text-2xl font-bold mb-6">Execution: How Operation SINDOOR Was Conducted</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                <div className="md:col-span-2">
                    <img
                        src="/images/pear-main.jpg"
                        alt="Drone Footage"
                        className="rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg">Joint Tactical Command</h3>
                    <p className="text-sm text-gray-600">
                        The operation was conducted using a mix of special forces, armed drones, and real-time satellite intel. Targets included weapon depots, sleeper cells, and launchpads.
                    </p>
                </div>
                <div className="flex flex-col gap-6">
                    {[
                        {
                            img: "/images/pear1.jpg",
                            title: "Drone Strike",
                            desc: "Silent precision UAVs neutralized key bunkers before ground forces moved in.",
                            price: "Zero Indian casualties"
                        },
                        {
                            img: "/images/mushroom.jpg",
                            title: "Ground Sweep",
                            desc: "Para SF units swept through 3 locations to clear remnants and gather intel.",
                            price: "Operation time: 5 hours"
                        }
                    ].map((item, i) => (
                        <div key={i}>
                            <img
                                src={item.img}
                                alt={item.title}
                                className="rounded-lg mb-2"
                            />
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                            <p className="font-bold">{item.price}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section 4: Aftermath & Impact */}
            <div className="mb-20">
                <h2 className="text-2xl font-bold mb-4">Aftermath & Impact</h2>
                <p className="text-gray-700 text-md max-w-4xl mb-4">
                    Operation SINDOOR sent a strong message to terror sponsors and the global community.
                    India reaffirmed its stance on zero tolerance for terrorism. The international community largely supported the operation as a defensive measure, with calls for de-escalation.
                    Surveillance has been heightened and intelligence-sharing with allies has expanded since.
                </p>
                <p className="text-gray-700 text-md">
                    Internally, the operation boosted morale across military ranks and the citizenry, while also exposing vulnerabilities in cross-border security.
                </p>
            </div>

            {/* Section 5: Headlines */}
            <h2 className="text-2xl font-bold mb-6">Latest Headlines</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {headlines.map((news, i) => (
                    <div
                        key={i}
                        className="border rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                        onClick={() => window.open("https://news.google.com/search?q=" + news.title, "_blank")}
                    >
                        <img
                            src={news.img}
                            alt={news.title}
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-md font-semibold mb-1">{news.title}</h3>
                            <p className="text-sm text-gray-600">{news.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Heading;
