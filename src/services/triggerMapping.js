export const TRIGGER_CATEGORY_MAPPING = {
    "KW_518": { name: "Merger & Acquisition", category: "🧩 Mergers & Acquisitions" },
    "KW_519": { name: "Divestment", category: "🧩 Mergers & Acquisitions" },
    "KW_520": { name: "Spin-off", category: "🧩 Mergers & Acquisitions" },
    "KW_534": { name: "Going Private", category: "🧩 Mergers & Acquisitions" },
    "KW_535": { name: "Buyout", category: "🧩 Mergers & Acquisitions" },
    "KW_666": { name: "Merger & Acquisition Termination", category: "🧩 Mergers & Acquisitions" },

    "KW_502": { name: "Executive Change", category: "👥 Leadership/Management Changes" },
    "KW_536": { name: "Organizational Restructuring", category: "👥 Leadership/Management Changes" },
    "KW_591": { name: "Executive Appointment", category: "👥 Leadership/Management Changes" },
    "KW_741": { name: "Executive Demise", category: "👥 Leadership/Management Changes" },

    "KW_514": { name: "Fundraising", category: "💰 Fundraising & Investment" },
    "KW_708": { name: "Investment", category: "💰 Fundraising & Investment" },

    "KW_516": { name: "Initial Public Offering", category: "🏛️ Initial Public Offering (IPO)" },

    "KW_527": { name: "Business Expansion", category: "🌍 Business Expansion" },
    "KW_529": { name: "Hiring", category: "🌍 Business Expansion" },
    "KW_640": { name: "Branch/Store Opening", category: "🌍 Business Expansion" },
    "KW_713": { name: "Relocation", category: "🌍 Business Expansion" },

    "KW_510": { name: "Financial Result", category: "📊 Financial Results & Outlook" },
    "KW_583": { name: "Executive Statement", category: "📊 Financial Results & Outlook" },
    "KW_688": { name: "Business Outlook & Projections", category: "📊 Financial Results & Outlook" },

    "KW_521": { name: "New Product Launch", category: "🚀 Product & Service Launch" },
    "KW_566": { name: "New Service Launch", category: "🚀 Product & Service Launch" },
    "KW_642": { name: "Product Shutdown", category: "🚀 Product & Service Launch" },

    "KW_801": { name: "New Initiatives and Programs", category: "🔬 Innovation & Initiatives" },
    "KW_802": { name: "Experiments / Trials / Pilots", category: "🔬 Innovation & Initiatives" },

    "KW_512": { name: "Alliance & Partnership", category: "🤝 Partnerships & Joint Ventures" },
    "KW_513": { name: "Joint Venture", category: "🤝 Partnerships & Joint Ventures" },

    "KW_528": { name: "Downsizing (Layoff)", category: "📉 Layoffs & Cost-Cutting" },
    "KW_687": { name: "Cost-Cutting", category: "📉 Layoffs & Cost-Cutting" },

    "KW_584": { name: "Bankruptcy", category: "⚖️ Bankruptcy & Business Shut-down" },
    "KW_586": { name: "Business Shut-down", category: "⚖️ Bankruptcy & Business Shut-down" },
    "KW_641": { name: "Branch/Store Closing", category: "⚖️ Bankruptcy & Business Shut-down" },

    "KW_532": { name: "Awards & Recognition", category: "🏅 Awards & Recognition" },
    "KW_610": { name: "Certification", category: "🏅 Awards & Recognition" },

    "KW_143": { name: "Advertisement / Branding / Campaign", category: "📢 Advertising & Marketing" },
    "KW_533": { name: "Promotion & Sale", category: "📢 Advertising & Marketing" },
    "KW_709": { name: "Re-branding / Re-naming", category: "📢 Advertising & Marketing" },

    "KW_556": { name: "Customer Acquisition / Growth", category: "🧲 Customer Acquisition / Sourcing" },
    "KW_571": { name: "Sourcing & Procurement", category: "🧲 Customer Acquisition / Sourcing" },

    "KW_647": { name: "Customer Loss / Growth Decline", category: "👎 Customer Churn" },

    "KW_14": { name: "Pricing", category: "💲 Pricing" },

    "KW_526": { name: "Lawsuit / Judgment / Settlement", category: "⚖️ Legal" },
    "KW_711": { name: "Copyright / Patent / Trademark Dispute", category: "⚖️ Legal" },

    "KW_522": { name: "Regulatory Approval", category: "🏛️ Regulatory" },
    "KW_523": { name: "Regulatory Investigation", category: "🏛️ Regulatory" },
    "KW_585": { name: "Legislation & Regulation", category: "🏛️ Regulatory" },
    "KW_613": { name: "Regulatory Ban & Enforcement", category: "🏛️ Regulatory" },
    "KW_699": { name: "Regulatory Settlement", category: "🏛️ Regulatory" },

    "KW_589": { name: "Research & Publications", category: "📚 Research & Publications" },

    "KW_654": { name: "Scandals & Frauds", category: "🕵️ Scandals, Rumours, Activism" },
    "KW_665": { name: "Rumour & Speculation", category: "🕵️ Scandals, Rumours, Activism" },
    "KW_678": { name: "Shareholder Activism", category: "🕵️ Scandals, Rumours, Activism" },

    "KW_530": { name: "Security Breach & Vulnerability", category: "🔐 Security Breaches & Outages" },
    "KW_601": { name: "Outage", category: "🔐 Security Breaches & Outages" },

    "KW_677": { name: "Employee Dispute & Strike", category: "🧑‍🏭 Employee/Labor Dispute" },

    "KW_531": { name: "Natural Disaster", category: "🌪️ Accidents & Disasters" },
    "KW_616": { name: "Industrial Accident & Disaster", category: "🌪️ Accidents & Disasters" },

    "KW_524": { name: "Recall", category: "⚠️ Recalls & Disruptions" },
    "KW_673": { name: "Project & Operations Status", category: "⚠️ Recalls & Disruptions" },
    "KW_700": { name: "Production Cut", category: "⚠️ Recalls & Disruptions" },
    "KW_737": { name: "Supply Chain Disruption", category: "⚠️ Recalls & Disruptions" }
};

export const getTriggerName = (code) => {
    return TRIGGER_CATEGORY_MAPPING[code]?.name || code;
};

export const getTriggerCategory = (code) => {
    return TRIGGER_CATEGORY_MAPPING[code]?.category || "Other";
};

export const MAPPED_CHANNELS = {
    "microsoft.com": "Microsoft",
    "wingify.com": "Wingify",
    "openai.com": "OpenAI",
    "tesla.com": "Tesla",
    "x.ai": "xAI",
    "salesforce.com": "Salesforce",
    "anaplan.com": "Anaplan",
    "clay.com": "Clay",
    "apollo.io": "Apollo.io",
    "hdfc.com": "HDFC",
    "hdfc.bank.in": "HDFC Bank",
    "federal.bank.in": "Federal Bank",
    "meta.com": "Meta",
    "manutd.com": "Manchester United",
    "netflix.com": "Netflix",
    "nvidia.com": "NVIDIA",
    "apple.com": "Apple",
    "amazon.com": "Amazon",
    "google.com": "Google"
};
