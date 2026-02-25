import React, { useState } from "react";

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

// AI Chatbot component for AI-Driven Warfare section
const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hello! I\'m your AI Defense Assistant. How can I help you with military AI applications today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      let botResponse = '';
      
      // Simple keyword-based responses
      const lowercaseInput = input.toLowerCase();
      if (lowercaseInput.includes('drone') || lowercaseInput.includes('uav')) {
        botResponse = 'Our autonomous drone systems use advanced AI for target recognition, threat assessment, and mission planning without human intervention. They can operate in swarms for coordinated attacks or surveillance.'
      } else if (lowercaseInput.includes('decision') || lowercaseInput.includes('command')) {
        botResponse = 'Our AI decision support systems analyze battlefield data in real-time, providing commanders with optimal tactical options based on current conditions, historical outcomes, and predictive modeling.';
      } else if (lowercaseInput.includes('weapon') || lowercaseInput.includes('missile')) {
        botResponse = 'Smart weapons in our arsenal use AI for target selection, flight path optimization, and damage assessment. They can autonomously adjust to countermeasures and changing battlefield conditions.';
      } else if (lowercaseInput.includes('cyber') || lowercaseInput.includes('network')) {
        botResponse = 'Our AI-powered cyber defense systems can detect, analyze, and counter digital threats in milliseconds, protecting critical military infrastructure from sophisticated attacks.';
      } else {
        botResponse = 'I understand you\'re interested in AI military applications. Could you specify which aspect you\'d like to know more about? For example: autonomous drones, decision support systems, smart weapons, or cyber defense.';
      }
      
      setMessages([...newMessages, { role: 'bot', content: botResponse }]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mt-8 border border-gray-200">
      <h3 className="text-lg font-semibold mb-3 text-center">AI Defense Assistant</h3>
      <div className="h-80 overflow-y-auto mb-4 p-3 bg-gray-50 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div 
              className={`inline-block p-3 rounded-lg ${msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about AI military applications..."
          className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const StrategicSolutions = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  
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
            className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition border relative"
            onClick={() => item.title === "AI-Driven Warfare" && setShowChatbot(!showChatbot)}
          >
            <div className="text-4xl mb-4 overflow-hidden">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-700 text-sm">{item.desc}</p>
            
            {item.title === "AI-Driven Warfare" && (
              <button 
                className="mt-3 text-blue-600 text-sm font-medium hover:underline focus:outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChatbot(!showChatbot);
                }}
              >
                {showChatbot ? "Close AI Assistant" : "Talk to AI Assistant"}
              </button>
            )}
          </div>
        ))}
      </div>
      
      {showChatbot && <AIChatbot />}


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
