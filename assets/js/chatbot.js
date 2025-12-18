/**
 * NovaGen AI Assistant
 * Powered by Google Gemini 2.5 Flash API
 * Intelligent chatbot for NovaGen Automation website
 */

// Configuration - Replace with your actual Gemini API key
const GEMINI_API_KEY = 'AIzaSyB2koYb2sMAP3ppVLiCltYp7PQSq5jocqw';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// NovaGen Knowledge Base - Comprehensive website data
const NOVAGEN_KNOWLEDGE = {
    company: {
        name: "NovaGen Automation Systems & Solution",
        tagline: "Your one-stop solution for all automation needs from sensors to cloud",
        motto: "STAY INSPIRED. NEVER STOP CREATING.",
        certification: "ISO 9001:2015 Certified",
        description: "We are focused on bringing the best Automation technology in the world to our customers and creating innovative solutions tailored to the local market needs.",
        expertise: [
            "System Design & Integration",
            "Installation & Commissioning",
            "Maintenance & Servicing",
            "Repair & Spares Supply",
            "Customized Control Panels",
            "Cloud Integration Solutions",
            "PLC Programming",
            "HMI/SCADA Development"
        ]
    },
    contact: {
        email: "ng@novagenautomation.com",
        salesEmail: "sales@novagenautomation.com",
        phone: "+91-7417360330",
        website: "www.novagenautomation.com",
        address: "F-8/25, Sector-15, Rohini, Delhi-110089, India"
    },
    products: {
        brands: {
            siemens: {
                name: "Siemens",
                description: "Comprehensive solutions for industrial automation and digitalization with TIA concept",
                products: [
                    "SIMATIC S7-1500, S7-1200, S7-400, S7-300 PLCs",
                    "SINAMICS V20, G120 VFDs",
                    "SIMATIC HMI Panels",
                    "Servo Motors and Drives"
                ],
                highlights: ["TIA Portal Integration", "Industry 4.0 Ready", "Digital Twin Technology"]
            },
            mitsubishi: {
                name: "Mitsubishi Electric",
                description: "Vast range of factory automation technologies - 'Automating the World' globally",
                products: [
                    "MELSEC FX5U, iQ-R, FX-3U/3G Series PLCs",
                    "MELSERVO J5, MR-JE Series Servo Drives",
                    "GOT2000, GS Series HMI Panels",
                    "FR-E800, FR-D700 Series VFDs"
                ],
                highlights: ["Global Factory Automation Leader", "Reliable Performance", "Easy Programming"]
            },
            delta: {
                name: "Delta Electronics",
                description: "Efficient motor control, energy savings, and reliable operation through comprehensive VFD and PLC solutions",
                products: [
                    "AS Series, DVP Series PLCs",
                    "VFD-C, VFD-MS, VFD-EL Series Drives",
                    "DOP Series HMI Panels",
                    "ASDA Series Servo Systems"
                ],
                highlights: ["Energy Efficient", "Cost Effective", "Wide Power Range"]
            },
            yaskawa: {
                name: "Yaskawa",
                description: "AC drives with advanced technology, quality, versatility, and energy efficiency",
                products: [
                    "GA700, GA500 Series VFDs",
                    "A1000, J1000 Series Drives",
                    "Sigma-7 Servo Systems",
                    "MP Controllers"
                ],
                highlights: ["Motion Control Excellence", "High Precision", "Energy Saving"]
            },
            omron: {
                name: "Omron",
                description: "Innovative automation solutions for industrial and commercial applications",
                products: [
                    "CP/CJ Series PLCs",
                    "NX/NJ Controllers",
                    "NA/NB Series HMI",
                    "Sensors and Safety Components"
                ],
                highlights: ["Innovation Leader", "Complete Automation Solutions", "Smart Sensors"]
            }
        },
        categories: [
            "PLCs (Programmable Logic Controllers)",
            "VFDs (Variable Frequency Drives)",
            "Servo Motors & Drives",
            "HMI (Human Machine Interface)",
            "SCADA Systems",
            "Control Panels",
            "Sensors",
            "Industrial Motors"
        ]
    },
    services: {
        amc: {
            name: "Annual Maintenance Contract (AMC)",
            description: "Comprehensive preventive and corrective maintenance for all automation equipment",
            preventive: [
                "Regular scheduled inspections",
                "Component cleaning and calibration",
                "Software updates and backups",
                "Performance optimization",
                "Wear and tear assessment",
                "Spare parts replacement planning"
            ],
            corrective: [
                "Rapid fault diagnosis",
                "Emergency repair services",
                "Component replacement",
                "System debugging and testing",
                "Performance restoration"
            ],
            equipment: ["PLC Systems", "VFD Systems", "Servo Systems", "HMI & SCADA"],
            benefits: ["Reduced Downtime", "Cost Savings", "Extended Equipment Life", "Expert Support", "Priority Service"]
        },
        engineering: {
            name: "Engineering Services",
            description: "End-to-end automation solutions from concept to commissioning",
            services: [
                "Automation system architecture design",
                "PLC programming and configuration",
                "HMI/SCADA development",
                "Network and communication design",
                "Safety system integration",
                "Control panel design and manufacturing",
                "Equipment installation supervision",
                "Functional testing and validation",
                "Operator training and handover"
            ]
        },
        industries: [
            "Manufacturing (Automotive, Food & Beverage, Pharmaceutical, Textile)",
            "Power & Energy (Thermal, Solar, Wind, Grid Automation)",
            "Infrastructure (Buildings, Malls, Hospitals, Hotels)",
            "Transportation (Traffic Management, Parking, Warehouses, Conveyors)"
        ]
    }
};

// System prompt for Gemini
const SYSTEM_PROMPT = `You are the official AI Assistant for NovaGen Automation Systems & Solution, an ISO 9001:2015 certified industrial automation company based in Delhi, India.

COMPANY INFORMATION:
${JSON.stringify(NOVAGEN_KNOWLEDGE, null, 2)}

YOUR ROLE:
- You are a helpful, professional customer service representative for NovaGen Automation
- Provide accurate information about NovaGen's products, services, and capabilities
- Help customers understand which products or services best fit their needs
- Guide customers to contact the sales team for quotes and detailed inquiries
- Be friendly, concise, and helpful

GUIDELINES:
1. Always be professional and courteous
2. If you don't know something specific, direct them to contact the team
3. For pricing or quotes, always direct to sales@novagenautomation.com or +91-7417360330
4. Highlight NovaGen's ISO 9001:2015 certification when relevant
5. Keep responses concise but informative (2-4 sentences for simple queries)
6. For product inquiries, mention relevant brands and suggest contacting for specifications
7. Always offer to help with anything else at the end

Remember: You represent NovaGen Automation. Be helpful, knowledgeable, and professional.`;

// Chat history for context
let chatHistory = [];

// DOM Elements
let chatbotToggle, chatbotWindow, chatbotClose, chatbotForm, chatbotInput, chatbotMessages;

// Initialize chatbot on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    injectChatbotHTML();
    initializeChatbot();
});

// Inject chatbot HTML into page
function injectChatbotHTML() {
    const chatbotHTML = `
        <div class="chatbot-widget">
            <button class="chatbot-toggle" id="chatbotToggle" aria-label="Open Chat Assistant">
                <span class="icon">💬</span>
                <span class="pulse-ring"></span>
            </button>
            <div class="chatbot-window" id="chatbotWindow">
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-avatar">🤖</div>
                        <div>
                            <h3>NovaGen Assistant</h3>
                            <span class="chatbot-status">
                                <span class="status-dot"></span>
                                Powered by AI
                            </span>
                        </div>
                    </div>
                    <button id="closeChat" class="chatbot-close-btn" aria-label="Close chat">×</button>
                </div>
                <div class="chatbot-messages" id="chatbotMessages">
                    <div class="message bot">
                        <div class="message-content">
                            👋 Hello! I'm your NovaGen AI Assistant. I can help you with:
                            <ul style="margin: 0.5rem 0 0 1rem; padding: 0;">
                                <li>Product information (Siemens, Mitsubishi, Delta, Yaskawa, Omron)</li>
                                <li>Services (AMC, Engineering, System Integration)</li>
                                <li>Contact details and location</li>
                                <li>General inquiries</li>
                            </ul>
                            <br>How can I help you today?
                        </div>
                    </div>
                </div>
                <div class="chatbot-suggestions" id="chatbotSuggestions">
                    <button class="suggestion-chip" data-query="What products do you offer?">Products</button>
                    <button class="suggestion-chip" data-query="Tell me about your services">Services</button>
                    <button class="suggestion-chip" data-query="How can I contact you?">Contact</button>
                    <button class="suggestion-chip" data-query="Get a quote">Quote</button>
                </div>
                <form class="chatbot-input" id="chatbotForm">
                    <input type="text" id="chatbotInput" placeholder="Ask me anything about NovaGen..." aria-label="Chat input" autocomplete="off">
                    <button type="submit" aria-label="Send message" id="sendBtn">
                        <span class="send-icon">➔</span>
                    </button>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// Initialize chatbot event listeners
function initializeChatbot() {
    chatbotToggle = document.getElementById('chatbotToggle');
    chatbotWindow = document.getElementById('chatbotWindow');
    chatbotClose = document.getElementById('closeChat');
    chatbotForm = document.getElementById('chatbotForm');
    chatbotInput = document.getElementById('chatbotInput');
    chatbotMessages = document.getElementById('chatbotMessages');

    // Toggle chat window
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    // Close chat
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Handle form submission
    chatbotForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = chatbotInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatbotInput.value = '';
        chatbotInput.disabled = true;

        // Show typing indicator
        showTypingIndicator();

        try {
            const response = await getAIResponse(text);
            hideTypingIndicator();
            addMessage(response, 'bot');
        } catch (error) {
            hideTypingIndicator();
            console.error('Chatbot error:', error);
            // Fallback to rule-based response
            const fallbackResponse = getFallbackResponse(text);
            addMessage(fallbackResponse, 'bot');
        }

        chatbotInput.disabled = false;
        chatbotInput.focus();
    });

    // Handle suggestion chips
    document.querySelectorAll('.suggestion-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.dataset.query;
            chatbotInput.value = query;
            chatbotForm.dispatchEvent(new Event('submit'));
        });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
        }
    });
}

// Get AI response from Gemini API
async function getAIResponse(userMessage) {
    // Add user message to history
    chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });

    // Check if API key is configured
    if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
        console.warn('Gemini API key not configured. Using fallback responses.');
        return getFallbackResponse(userMessage);
    }

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
                    ...chatHistory
                ],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 500,
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        // Add AI response to history
        chatHistory.push({ role: 'model', parts: [{ text: aiResponse }] });

        // Keep history manageable (last 10 exchanges)
        if (chatHistory.length > 20) {
            chatHistory = chatHistory.slice(-20);
        }

        return aiResponse;
    } catch (error) {
        console.error('Gemini API error:', error);
        return getFallbackResponse(userMessage);
    }
}

// Fallback rule-based response when API is unavailable
function getFallbackResponse(text) {
    const query = text.toLowerCase();

    // Product queries
    if (query.includes('siemens')) {
        return "We offer a comprehensive range of Siemens products including SIMATIC S7-1500, S7-1200, S7-400, S7-300 PLCs, SINAMICS V20/G120 VFDs, and SIMATIC HMI panels. All integrated with the TIA Portal for seamless engineering. Would you like a quote or more details?";
    }
    if (query.includes('mitsubishi')) {
        return "Our Mitsubishi Electric lineup includes MELSEC FX5U, iQ-R, FX-3U series PLCs, MELSERVO drives, GOT2000 HMI panels, and FR-E800 series VFDs. These are known for their reliability and global factory automation excellence. Contact us for specifications!";
    }
    if (query.includes('delta')) {
        return "Delta Electronics products we offer include AS/DVP series PLCs, VFD-C/MS/EL series drives, DOP HMI panels, and ASDA servo systems. Known for energy efficiency and cost-effectiveness. Want to know more?";
    }
    if (query.includes('yaskawa')) {
        return "We supply Yaskawa drives including GA700, GA500, A1000, and J1000 series VFDs, plus Sigma-7 servo systems. Yaskawa is renowned for motion control excellence and energy efficiency. How can we help you?";
    }
    if (query.includes('omron')) {
        return "Omron products available include CP/CJ series PLCs, NX/NJ controllers, NA/NB HMI panels, and comprehensive sensor solutions. Great for innovative automation applications!";
    }
    if (query.includes('product') || query.includes('plc') || query.includes('vfd') || query.includes('servo') || query.includes('hmi')) {
        return "We offer automation products from top brands: Siemens, Mitsubishi Electric, Delta, Yaskawa, and Omron. This includes PLCs, VFDs, Servo Motors, HMIs, SCADA systems, and Control Panels. Which brand or product category interests you?";
    }

    // Service queries
    if (query.includes('amc') || query.includes('maintenance') || query.includes('annual')) {
        return "Our AMC (Annual Maintenance Contract) services cover PLCs, VFDs, Servo Systems, and HMI/SCADA equipment. We provide both preventive and corrective maintenance to minimize downtime and extend equipment life. Contact us at sales@novagenautomation.com for a customized AMC quote!";
    }
    if (query.includes('service') || query.includes('engineering')) {
        return "Our services include: System Design & Integration, PLC Programming, HMI/SCADA Development, Panel Fabrication, Installation & Commissioning, and AMC services. We handle projects from concept to completion. What type of project are you working on?";
    }
    if (query.includes('panel') || query.includes('control panel')) {
        return "We design and manufacture custom control panels including VFD panels, PLC panels, and MCC panels. Our team handles electrical design, component selection, wiring, testing, and documentation. Need a custom panel? Contact our engineering team!";
    }

    // Contact queries
    if (query.includes('contact') || query.includes('email') || query.includes('phone') || query.includes('call')) {
        return "📞 Contact us at:\n• Phone: +91-7417360330\n• Email: ng@novagenautomation.com\n• Sales: sales@novagenautomation.com\n• Website: www.novagenautomation.com\n\nWe're happy to help with any inquiries!";
    }
    if (query.includes('where') || query.includes('location') || query.includes('address') || query.includes('office')) {
        return "📍 Visit us at: F-8/25, Sector-15, Rohini, Delhi-110089, India. You can find us on Google Maps. Feel free to schedule a visit!";
    }
    if (query.includes('quote') || query.includes('price') || query.includes('cost')) {
        return "For pricing and quotes, please contact our sales team:\n• Email: sales@novagenautomation.com\n• Phone: +91-7417360330\n\nProvide details about your requirements and we'll get back with a competitive quote!";
    }

    // About company
    if (query.includes('about') || query.includes('company') || query.includes('who')) {
        return "NovaGen Automation Systems & Solution is an ISO 9001:2015 certified company providing complete automation solutions. We specialize in PLCs, VFDs, Servo Systems, Control Panels, and offer professional engineering services. Our motto: 'STAY INSPIRED. NEVER STOP CREATING.' How can we help you today?";
    }
    if (query.includes('certified') || query.includes('iso') || query.includes('quality')) {
        return "Yes! NovaGen is ISO 9001:2015 certified, ensuring quality standards in all our automation solutions and services. Quality and reliability are our top priorities.";
    }

    // Greetings
    if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('good')) {
        return "Hello! 👋 Welcome to NovaGen Automation. I'm here to help you with information about our products (Siemens, Mitsubishi, Delta, Yaskawa, Omron), services (AMC, Engineering), or any other inquiries. What would you like to know?";
    }
    if (query.includes('thank') || query.includes('thanks')) {
        return "You're welcome! 😊 Is there anything else I can help you with? Feel free to ask about our products, services, or contact us directly at +91-7417360330.";
    }
    if (query.includes('bye') || query.includes('goodbye')) {
        return "Goodbye! Thank you for visiting NovaGen Automation. Don't hesitate to reach out if you need any automation solutions. Have a great day! 👋";
    }

    // Default response
    return "I'd be happy to help! I can provide information about:\n• Products (Siemens, Mitsubishi, Delta, Yaskawa, Omron)\n• Services (AMC, Engineering, Panel Fabrication)\n• Contact details and location\n\nOr contact our team directly at +91-7417360330 or ng@novagenautomation.com for specific inquiries!";
}

// Add message to chat
function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;

    const content = document.createElement('div');
    content.className = 'message-content';
    content.innerHTML = text.replace(/\n/g, '<br>');

    msg.appendChild(content);
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // Hide suggestions after first user message
    const suggestions = document.getElementById('chatbotSuggestions');
    if (suggestions && sender === 'user') {
        suggestions.style.display = 'none';
    }
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'message bot typing-indicator';
    indicator.id = 'typingIndicator';
    indicator.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatbotMessages.appendChild(indicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}
