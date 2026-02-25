// src/pages/Home.jsx

import React, { useState } from "react";
import TopBar from "../layout/TopBar";
import BottomBar from "../layout/BottomBar";
import s400 from "../assets/s400.png";
import power from "../assets/power.png";
import precision from "../assets/precision.jpg";
import robust from "../assets/robust.png";
import ins from "../assets/ins.jpg";
import globmaster from "../assets/globemaster.jpg";
import submarine from "../assets/submarine.jpg";
import Weapon from "./Weapons";
import ww1 from "../assets/ww1.jpg";
import ww2 from "../assets/ww2.jpeg";
import howitswork from "../assets/howitswork.jpg";
import wikipedia from "../assets/wikipedia.png";
import documentaries from "../assets/documentaries.png";
import radar from "../assets/radar.png";
import lockheed from "../assets/lockheed martin.jpg";
import nasalogo from "../assets/nasalogo.jpg";
import isrologo from "../assets/isrolgo.png";
import spacexlogo from "../assets/spacexlogo.png";
import rafellogo from "../assets/rafellogo.png";
import raytechlogo from "../assets/raytechlogo.png";
import drdologo from "../assets/drdologo.jpg";
import Heading from "./Headlines";
import StrategicSolutions from "./idea.jsx";

const Home = () => {
  const [section, setSection] = useState("HOME");

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <TopBar currentSection={section} setSection={setSection} />
      
      <div className="pt-24 px-8">
        {/* Render based on selected section */}
        {section === "HOME" && (
          <>
            <section className="py-12">
              <div className="flex flex-col md:flex-row items-start justify-start gap-8">

                {/* Left Text Content */}
                <div className="w-full md:w-[45%] flex flex-col text-left">
                  <div className="overflow-hidden text-6xl font-bold mb-4">Welcome to Combat</div>
                  <p className="text-xl text-gray-700 mb-4">Strength, Honor and Vigilance</p>

                  <div>
                    {/* S-400 Triumf Section */}
                    <section className="px-5 w-screen bg-green-100">
                      <h2 className="text-2xl font-semibold mt-10 mb-4">S-400 Triumf Air Defense System</h2>
                      <div className=" gap-15">

                        <ul className="mb-8  mr-25 text-lg px-24 list-disc list-inside text-gray-700 space-y-2">
                          <li>400 km range with 40N6E long-range missiles</li>
                          <li>Hunts 80 targets using phased array radar</li>
                          <li>Trace with 91N6E and 92N6E radar systems</li>
                          <li>Multi-layered defense with various missile types</li>
                          <li>Quick deployment via TEL mobile launchers</li>
                          <li>Detects low-RCS and stealth targets</li>
                          <li>Controlled by 55K6E command & control system</li>
                        </ul>

                      </div>
                    </section>

                  </div>
                </div>


                {/* Right Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={s400}
                    alt="S-400"
                    className="ml-auto w-auto h-[590px] object-contain rounded-md"
                  />
                </div>

              </div>

            </section>


            {/* Values Section */}
            <section className="py-1 ">
              <h2 className="text-3xl font-bold mb-10 text-center">Values</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "POWER",
                    desc: "Engineered for dominance, our weapons and vehicles deliver unmatched force on every front.",
                    img: power, // Replace with actual paths or imports
                  },
                  {
                    title: "PRECISION",
                    desc: "Advanced targeting, flawless performance, built to strike with absolute accuracy.",
                    img: precision,
                  },
                  {
                    title: "ROBUST",
                    desc: "Tested in the toughest conditions, trusted to perform when it matters most.",
                    img: robust,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex flex-col items-center text-center"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-[467px] w-[405px] object-fill mb-4"
                    />
                    <h3 className="text-xl font-bold text-blue-700 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>


            {/* INS Vikrant Section */}
            <div className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-10 bg-white">
              {/* Left side: Image */}
              <div className="w-full  md:w-1/2 mb-6 md:mb-0">
                <img
                  src={ins} // replace with your actual image path
                  alt="INS Vikrant - Indian Aircraft Carrier"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>

              {/* Right side: Text content */}
              <section className="py-10 md:py-0 md:pl-10 w-full md:w-1/2">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">INS Vikrant (IAC-1)</h2>
                <p className="text-sm text-gray-700 mb-2">
                  India’s first indigenous carrier, boosting self-reliant naval strength since 2022.
                </p>
                <h3 className="font-semibold text-gray-800 mt-4">Strategic Presence</h3>
                <p className="text-sm text-gray-600">
                  Enhances India's dominance and security across the Indian Ocean region.
                </p>
                <h3 className="font-semibold text-gray-800 mt-4">Tech & Capability</h3>
                <p className="text-sm text-gray-600">
                  Equipped with STOBAR systems and advanced sensors for modern naval warfare.
                </p>
                <p className="text-sm text-blue-800 mt-2 font-semibold">Indian Aircraft Carrier: Power at Sea</p>
              </section>
            </div>


            {/* C-17 and INS Vagsheer Section */}
            <section className="py-1">
              <h2 className="text-2xl font-bold text-center mb-10 text-gray-900">Tactical Mobility in Motion</h2>
              <div className="grid md:grid-cols-2 gap-8">

                {/* C-17 Globemaster III */}
                <div className="text-center">
                  <img
                    src={globmaster}  // Replace with actual image path
                    alt="C-17 Globemaster III"
                    className="w-full h-[400px] rounded-lg shadow-md mx-auto mb-4"
                  />
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">C-17 Globemaster III</h2>
                  <p className="text-xl text-black">
                    India’s heavy-lift aircraft, capable of rapid deployment of troops and cargo across continents.
                  </p>
                </div>

                {/* INS Vagsheer (S26) */}
                <div className="text-center">
                  <img
                    src={submarine}  // Replace with actual image path
                    alt="INS Vagsheer (S26)"
                    className="w-full h-[400px] rounded-lg shadow-md mx-auto mb-4"
                  />
                  <h2 className="text-xl font-semibold text-blue-900 mb-2">INS Vagsheer (S26)</h2>
                  <p className="text-xl text-black">
                    A stealth Scorpène-class submarine designed for deep-sea attack, surveillance, and anti-submarine warfare.
                  </p>
                </div>

              </div>
            </section>

          </>
        )}

        {/* Other Sections */}
        {section === "WEAPONS" && (
          <Weapon />
        )}


        {section === "DOCUMENT" && (
          <section className="py-0 px-6 md:px-16 bg-white text-gray-800">
            {/* WW1 Heading and Intro */}
            <h1 className="text-3xl font-bold mb-4">World War 1</h1>
            <p className="text-gray-700 max-w-3xl mb-8">
              World War 1, also known as the Great War, was a global conflict that lasted from July 28, 1914, to November 11, 1918.
              It involved major world powers divided into two alliances: the Allies and the Central Powers.
            </p>

            {/* WW1 Image + Timeline */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/2">
                <img
                  src={ww1} // Replace with correct image path
                  alt="WW1 soldiers"
                  className="rounded-lg shadow"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-xl font-semibold mb-2">World War 1 Timeline (1914–1918)</h2>
                <ul className="list-disc list-inside text-lg space-y-1">
                  <li><strong>June 28, 1914</strong> – Assassination of Archduke Franz Ferdinand in Sarajevo</li>
                  <li><strong>July 28, 1914</strong> – Austria-Hungary declares war on Serbia — WWI begins</li>
                  <li><strong>August 1914</strong> – Germany invades Belgium; Britain and France enter the war</li>
                  <li><strong>1915</strong> – First use of poison gas on the Western Front</li>
                  <li><strong>1916</strong> – Battle of the Somme and Verdun; tanks used for the first time</li>
                  <li><strong>April 6, 1917</strong> – United States joins the war on the side of the Allies</li>
                  <li><strong>March 1918</strong> – Russia exits the war after the Treaty of Brest-Litovsk</li>
                  <li><strong>November 11, 1918</strong> – Armistice signed — fighting ends</li>
                  <li><strong>June 28, 1919</strong> – Treaty of Versailles signed, officially ending the war</li>
                </ul>
              </div>
            </div>

            {/* WW1 How it Started, Tech, End */}
            <div className="text-xl space-y-4 max-w-4xl mb-8">
              <div>
                <h3 className="font-semibold">How it Started</h3>
                <p>
                  The war began after the assassination of Archduke Franz Ferdinand of Austria-Hungary in Sarajevo.
                  This triggered a chain reaction of alliances and declarations of war across Europe.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Defense Equipment & Warfare</h3>
                <ul className="list-disc list-inside ml-4">
                  <li>Bolt-action rifles and machine guns</li>
                  <li>Artillery and trench mortars</li>
                  <li>Poison gas and gas masks</li>
                  <li>Tanks (introduced in 1916)</li>
                  <li>Biplanes and Zeppelins for aerial warfare</li>
                  <li>U-boats (submarines) used mainly by Germany</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">End of the War</h3>
                <p>
                  The war ended with the Armistice of November 11, 1918, after years of bloody stalemates and heavy casualties.
                  The Treaty of Versailles in 1919 formally ended the war and imposed harsh penalties on Germany.
                </p>
              </div>
            </div>

            {/* Learn by video WW1 */}
            <div className="mb-16">
              <h3 className="text-xl font-bold">Learn by video</h3>
              <a
                href="https://www.youtube.com/results?search_query=World+War+1+documentary"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-2 bg-gray-100 border border-gray-300 text-sm rounded hover:bg-gray-200 transition"
              >
                Watch WW1 Documentary
              </a>
            </div>

            {/* World War 2 */}
            <h1 className="text-3xl font-bold mb-4">World War 2</h1>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="md:w-1/2">
                <p className="text-gray-700 mb-4">
                  World War 2 was the most widespread and deadliest conflict in history, lasting from September 1, 1939, to September 2, 1945.
                  It involved over 30 countries, including the Allied Powers and the Axis Powers.
                </p>
                <div className="text-lg space-y-4">
                  <div>
                    <h3 className="font-semibold">How It Started</h3>
                    <p>
                      The war began when Nazi Germany, led by Adolf Hitler, invaded Poland on September 1, 1939.
                      Britain and France declared war on Germany soon after, triggering a global conflict.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">🛡️ Defense Equipment & Warfare</h3>
                    <ul className="list-disc list-inside ml-4">
                      <li>Automatic rifles and submachine guns</li>
                      <li>Tanks, armored vehicles, and artillery</li>
                      <li>Fighter and bomber aircraft (e.g., Spitfire, B-17)</li>
                      <li>Naval warships, aircraft carriers, and submarines</li>
                      <li>Radar and code-breaking technologies</li>
                      <li>Atomic bombs (used by the U.S. on Hiroshima and Nagasaki)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">☠️ End of the War</h3>
                    <p>
                      The war ended in 1945 with the surrender of Germany in May and Japan in September, after the atomic bombings.
                      The United Nations was formed to prevent future global conflicts.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src={ww2} // Replace with correct image path
                  alt="WW2 Plane"
                  className="rounded-lg shadow"
                />
              </div>
            </div>

            {/* Learn by video WW2 */}
            <div className="mb-16">
              <h3 className="text-xl font-bold">Learn by video</h3>
              <a
                href="https://www.youtube.com/results?search_query=World+War+2+documentary"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block px-4 py-2 bg-gray-100 border border-gray-300 text-sm rounded hover:bg-gray-200 transition"
              >
                Watch WW2 Documentary
              </a>
            </div>

            {/* Related Articles */}
            <h2 className="text-3xl font-bold text-left mb-6">Related articles or posts</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: "HOW IT WORKS",
                  desc: "Know more...",
                  img: howitswork,
                  link: "https://www.explainthatstuff.com/ww1weapons.html"
                },
                {
                  title: "DOCUMENTARIES",
                  desc: "Know more...",
                  img: documentaries,
                  link: "https://www.history.com/topics/world-war-i/world-war-i-history"
                },
                {
                  title: "WIKIPEDIA",
                  desc: "Know more...",
                  img: wikipedia,
                  link: "https://en.wikipedia.org/wiki/World_War_II"
                }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border rounded-lg overflow-hidden hover:shadow-xl transition"
                >
                  <img src={item.img} alt={item.title} className="h-[346px] w-full object-fill" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}


        {section === "LEGACY" && (
          <StrategicSolutions/>
        )}

        {section === "HEADLINES" && (
          <Heading/>
        )}

        {section === "VigilaxAI" && (
          <section className="py-10 px-6 md:px-16 bg-white text-gray-900">
            <div className="max-w-5xl mx-auto border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
              <h1 className="text-4xl font-bold mb-3">VigilaxAI</h1>
              <p className="text-lg text-gray-600 mb-6">AI-Powered Defense Intelligence Platform</p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Explore tactical insights, rapid threat analysis, and mission-ready intelligence workflows powered by VigilaxAI.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="https://vigilaxai.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Open VigilaxAI
                </a>
                <a
                  href="https://vigilaxai.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100 transition"
                >
                  Visit Live Site
                </a>
              </div>

              <div className="w-full h-[500px] rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  src="https://vigilaxai.onrender.com/"
                  title="VigilaxAI Live Preview"
                  width="100%"
                  height="100%"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>
        )}

        {section === "OTHER" && (
          <section className="px-6 md:px-20 py-12 bg-white text-gray-900 space-y-20">
      
      {/* 1. Radar Section */}
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-4">RADAR</h2>
          <p className="text-gray-700 mb-4">
            Radar (Radio Detection and Ranging) systems are essential for early warning, surveillance, and target tracking. They help detect aircraft, ships, and missiles from great distances, forming the backbone of modern defense.
          </p>
          <div className="space-x-4">
            <a
              href="https://www.flightradar24.com/24.77,75.16/7"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Explore Systems
            </a>
            <button className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100 transition">Live Demo</button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={radar} alt="Radar System" className="w-full h-96 object-contain " />
        </div>
      </div>

      {/* 2. Lockheed Martin */}
      <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">LOCKHEED MARTIN</h2>
          <p className="text-gray-700">
            Lockheed Martin is a global aerospace and defense company, known for manufacturing the F-35 fighter jet, missile defense systems, and space exploration technologies. It works closely with many global militaries including India.
          </p>
          <div className="space-x-4 mt-3">
            <a href="https://www.lockheedmartin.com/en-us/index.html" target="_blank" rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm font-medium">
              Visit Official Site
            </a>
          </div>
        </div>
        <div className="md:w-1/2">
          <img src={lockheed} alt="Lockheed Martin" className="rounded-lg shadow w-full" />
        </div>
      </div>

      {/* 3. NASA + ISRO + SpaceX */}
      <div>
        <h2 className="text-2xl font-bold mb-6">SPACE COLLABORATIONS</h2>
        <div className="flex flex-col md:flex-row gap-10">
          {/* NASA Block */}
          <div className="md:w-1/2">
            <img src={nasalogo} alt="NASA" className="w-full h-64 object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 mb-4" />
            <h3 className="text-lg font-semibold">NASA</h3>
            <p className="text-gray-700">
              NASA plays a critical role in space surveillance and missile early warning systems. It collaborates with defense sectors on satellite tracking, communication, and advanced propulsion.
            </p>
          </div>

          {/* ISRO & SpaceX */}
          <div className="md:w-1/2 flex flex-col gap-6">
            <div>
              <img src={isrologo} alt="ISRO" className="w-full h-40 object-contain rounded-lg shadow-md hover:scale-105 transition-transform duration-300 mb-2" />
              <h3 className="font-semibold">ISRO</h3>
              <p className="text-sm text-gray-700">
                The Indian Space Research Organisation supports strategic defense with satellite imaging, communication and launches for DRDO missions.
              </p>
            </div>
            <div>
              <img src={spacexlogo} alt="SpaceX" className="w-full h-40 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300 mb-2" />
              <h3 className="font-semibold">SpaceX</h3>
              <p className="text-sm text-gray-700">
                SpaceX’s Starlink and Falcon series enhance real-time data transfer, with global implications for defense networking and space-based ISR.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Other Defense Manufacturers */}
      <div>
        <h2 className="text-2xl font-bold mb-4">GLOBAL DEFENSE MANUFACTURERS</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Rafael Advanced Defense",
              desc: "Israeli defense company known for Iron Dome and Spike missile systems.",
              img: rafellogo
            },
            {
              name: "Raytheon Technologies",
              desc: "US-based firm producing Patriot missiles and advanced radar tech.",
              img: raytechlogo
            },
            {
              name: "DRDO (India)",
              desc: "India’s premier research and development agency for defense innovations.",
              img: drdologo
            }
          ].map((item, index) => (
            <div key={index} className="hover:shadow-xl transition border rounded-lg overflow-hidden">
              <img src={item.img} alt={item.name} className="h-40 w-full object-contain" />
              <div className="p-4">
                <h4 className="font-semibold text-lg mb-1">{item.name}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ISS Live Tracker */}
      <div>
        <h2 className="text-2xl font-bold mb-4">ISS Tracker & Live Location</h2>
        <p className="text-gray-700 mb-4">
          Track the real-time position of the International Space Station (ISS) as it orbits Earth every 90 minutes. The ISS supports joint scientific and strategic experiments.
        </p>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow">
          <iframe
            src="https://www.n2yo.com/?s=25544#google_vignette"
            width="100%"
            height="100%"
            title="ISS Live Tracker"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
        )}

        {/* Footer */}
        <BottomBar />
        {/* imported bottombar */}
        <footer className="py-6 text-center text-sm text-gray-400 border-t border-gray-200">
          © 2025 Combat Web Project. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;