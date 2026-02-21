export const MOCK_SUBSCRIPTIONS = {
    config: {
        companies: [
            "microsoft.com", "wingify.com", "openai.com", "tesla.com", "x.ai",
            "salesforce.com", "anaplan.com", "clay.com", "apollo.io", "hdfc.com",
            "hdfc.bank.in", "federal.bank.in", "meta.com", "manutd.com", "netflix.com"
        ],
        triggers: [
            "Mergers & Acquisitions", "Leadership/Management Changes", "Fundraising & Investment",
            "Initial Public Offering (IPO)", "Business Expansion", "Financial Results & Outlook",
            "Product & Service Launch", "Innovation & Initiatives", "Partnerships & Joint Ventures",
            "Layoffs & Cost-Cutting", "Bankruptcy & Business Shut-down", "Awards & Recognition",
            "Advertising & Marketing", "Customer Acquisition / Sourcing", "Customer Churn",
            "Pricing", "Legal", "Regulatory", "Research & Publications",
            "Scandals, Rumours, Activism", "Security Breaches & Outages", "Employee/Labor Dispute",
            "Accidents & Disasters", "Recalls & Disruptions"
        ]
    }
};

const baseArticles = [
    // ── MICROSOFT ──────────────────────────────────────────
    {
        id: "ms_001",
        title: "Microsoft Copilot AI Integration Reaches 1 Billion Users Globally",
        description: "Microsoft's AI-powered Copilot assistant has surpassed the 1 billion active user milestone, cementing its position as the world's most adopted enterprise AI platform.",
        content: "Microsoft Corporation announced today that its flagship AI assistant, Copilot, has crossed the 1 billion active user mark across Windows, Microsoft 365, and Azure cloud services. The milestone represents a 340% year-over-year growth rate and underscores the rapid mainstreaming of generative AI in enterprise workflows.\n\n\"This isn't just a number — it's a reflection of how profoundly AI is reshaping how people work,\" said CEO Satya Nadella. Microsoft now serves over 85% of Fortune 500 companies through its integrated AI suite, making it the singular dominant force in enterprise intelligence.",
        company: "Microsoft",
        companyDomain: "microsoft.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        image: "https://images.unsplash.com/photo-1587620931648-b049d8a20f17?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        url: "https://microsoft.com/news/copilot-1-billion",
        triggers: ["Innovation & Initiatives"],
        socialSource: "Official News Hub"
    },
    {
        id: "ms_002",
        title: "Microsoft Azure Expands Cloud Data Centres Across 12 New Regions",
        description: "Microsoft announces a $10 billion infrastructure investment to add 12 new Azure data centre regions across Asia, Africa, and South America.",
        content: "In one of the largest infrastructure announcements in cloud computing history, Microsoft has committed $10 billion to establish 12 new Azure regional data centres across emerging markets. The expansion will provide low-latency cloud services to over 2 billion new potential customers across Sub-Saharan Africa, Southeast Asia, and Latin America.",
        company: "Microsoft",
        companyDomain: "microsoft.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        url: "https://microsoft.com/news/azure-expansion",
        triggers: ["Business Expansion"],
        socialSource: "LinkedIn Official"
    },
    {
        id: "ms_003",
        title: "Microsoft Acquires Semantic Machines to Accelerate Conversational AI",
        description: "Microsoft's strategic acquisition of Semantic Machines bolsters its conversational intelligence roadmap, targeting the next frontier of natural language interfaces.",
        content: "Microsoft has confirmed it will acquire Semantic Machines, a pioneer in conversational AI, in a deal valued at approximately $2.1 billion. The acquisition will integrate Semantic Machines' breakthrough memory and reasoning technologies directly into Microsoft's Teams platform and Azure AI services.",
        company: "Microsoft",
        companyDomain: "microsoft.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        url: "https://microsoft.com/news/semantic-acquisition",
        triggers: ["Mergers & Acquisitions"],
        socialSource: "Twitter News Feed"
    },
    {
        id: "ms_004",
        title: "Microsoft Posts Record Q2 Revenue of $62.8 Billion Driven by AI Cloud",
        description: "Microsoft's quarterly results shatter analyst expectations as Azure AI services deliver 43% growth, pushing total revenue to an all-time high.",
        content: "Microsoft delivered its strongest quarterly performance in company history, reporting Q2 revenue of $62.8 billion — a 21% increase year-over-year. Azure AI services were the standout performer, growing 43% driven by Copilot enterprise adoption and OpenAI partnership integrations.",
        company: "Microsoft",
        companyDomain: "microsoft.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 7).toISOString(),
        url: "https://microsoft.com/news/q2-results",
        triggers: ["Financial Results & Outlook"],
        socialSource: "Google Platform"
    },
    // ── OPENAI ─────────────────────────────────────────────
    {
        id: "oai_001",
        title: "OpenAI Launches GPT-5 with Native Multimodal Reasoning Capabilities",
        description: "OpenAI's GPT-5 sets a new standard for artificial general intelligence, combining visual, audio, and text reasoning in a single unified model.",
        content: "OpenAI today unveiled GPT-5, its most capable and versatile AI model to date. The model features native multimodal reasoning — the ability to seamlessly process images, audio, video, and text within a single inference session — a capability previously requiring multiple specialized models.\n\n\"GPT-5 represents a qualitative leap, not just a quantitative one,\" said CEO Sam Altman. The model is available to ChatGPT Plus, Team, and Enterprise subscribers starting today, with an API launch for developers following within 72 hours.",
        company: "OpenAI",
        companyDomain: "openai.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
        image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        url: "https://openai.com/blog/gpt-5",
        triggers: ["Product & Service Launch"],
        socialSource: "Google Platform"
    },
    {
        id: "oai_002",
        title: "OpenAI Raises $6.6 Billion in Funding at $157 Billion Valuation",
        description: "OpenAI secures historic funding round led by Thrive Capital, with participation from Microsoft, SoftBank, and Andreessen Horowitz.",
        content: "OpenAI has completed a $6.6 billion funding round — the largest in AI history — valuing the company at $157 billion. The round was led by Thrive Capital with co-investments from Microsoft, SoftBank, Tiger Global, and Andreessen Horowitz. The funds will accelerate compute infrastructure buildout, safety research, and global enterprise expansion.",
        company: "OpenAI",
        companyDomain: "openai.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
        image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 4).toISOString(),
        url: "https://openai.com/blog/funding-2026",
        triggers: ["Fundraising & Investment"],
        socialSource: "Twitter News Feed"
    },
    {
        id: "oai_003",
        title: "OpenAI Partners with Apple to Integrate ChatGPT into iOS and Siri",
        description: "A landmark partnership between OpenAI and Apple brings ChatGPT natively into Siri, delivering on-device AI intelligence to over 1.4 billion Apple devices.",
        content: "OpenAI and Apple have announced a deep strategic integration that embeds ChatGPT capabilities directly into Siri across iPhone, iPad, and Mac. The collaboration, unveiled at Apple's WWDC, delivers contextual AI assistance without compromising user privacy through Apple's on-device processing architecture.",
        company: "OpenAI",
        companyDomain: "openai.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 6).toISOString(),
        url: "https://openai.com/blog/apple-partnership",
        triggers: ["Partnerships & Joint Ventures"],
        socialSource: "Official News Hub"
    },
    // ── TESLA ──────────────────────────────────────────────
    {
        id: "tsl_001",
        title: "Tesla Cybertruck Dominates Q4 Deliveries with 180,000 Units Shipped",
        description: "Tesla's Cybertruck delivers a record-breaking quarter, proving the unconventional design has mass market appeal and cementing Tesla's EV leadership.",
        content: "Tesla Inc. reported Cybertruck deliveries of 180,000 units in Q4, making it the best-selling EV in the premium truck segment globally. The stainless steel exoskeleton vehicle shattered initial scepticism and emerged as a cultural and commercial phenomenon. CEO Elon Musk confirmed production capacity will expand to 400,000 units annually by Q3.",
        company: "Tesla",
        companyDomain: "tesla.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        url: "https://tesla.com/blog/cybertruck-q4",
        triggers: ["Financial Results & Outlook"],
        socialSource: "Google Platform"
    },
    {
        id: "tsl_002",
        title: "Tesla Full Self-Driving Version 13 Receives Regulatory Approval in EU",
        description: "Tesla's FSD V13 becomes the first fully autonomous driving system to receive commercial regulatory approval in the European Union.",
        content: "Tesla has achieved a historic regulatory milestone as its Full Self-Driving Version 13 software receives commercial approval from EU automotive regulators across all 27 member states. The approval covers Level 3 autonomy on motorways and select urban roads, making Tesla the first automaker globally to achieve cross-jurisdictional autonomous driving certification.",
        company: "Tesla",
        companyDomain: "tesla.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        url: "https://tesla.com/blog/fsd-eu-approval",
        triggers: ["Regulatory"],
        socialSource: "Official News Hub"
    },
    // ── META ───────────────────────────────────────────────
    {
        id: "meta_001",
        title: "Meta Unveils Quest 4 Pro: The Most Advanced Consumer VR Headset Ever Built",
        description: "Meta's Quest 4 Pro features eye-tracking, 8K resolution per eye, and full-body haptic integration, redefining the consumer virtual reality experience.",
        content: "Meta Platforms today announced the Quest 4 Pro, its most sophisticated VR headset to date, featuring 8K per-eye resolution, full-body tracking without external sensors, and a revolutionary haptic suit integration system. CEO Mark Zuckerberg described the device as 'the iPhone moment for the metaverse.'",
        company: "Meta",
        companyDomain: "meta.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png",
        image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        url: "https://meta.com/news/quest-4-pro",
        triggers: ["Product & Service Launch"],
        socialSource: "Google Platform"
    },
    {
        id: "meta_002",
        title: "Meta's Llama 4 Open-Source AI Model Outperforms GPT-4 on Key Benchmarks",
        description: "Meta's latest open-source large language model Llama 4 achieves state-of-the-art performance scores, challenging OpenAI's commercial dominance.",
        content: "Meta AI Research has released Llama 4, a revolutionary open-source large language model that surpasses GPT-4 on 17 of the 24 standard AI capability benchmarks. The model's release continues Meta's philosophy of democratising AI, making frontier-class intelligence accessible to any developer globally at zero cost.",
        company: "Meta",
        companyDomain: "meta.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png",
        image: "https://images.unsplash.com/photo-1525338078858-d762b5e32f2c?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 4).toISOString(),
        url: "https://meta.com/news/llama-4",
        triggers: ["Research & Publications"],
        socialSource: "Official News Hub"
    },
    // ── NETFLIX ────────────────────────────────────────────
    {
        id: "nflx_001",
        title: "Netflix Crosses 320 Million Subscribers as Ad-Supported Tier Accelerates",
        description: "Netflix's ad-supported tier drives a record 22 million new subscriber additions in a single quarter, propelling the platform to 320 million global members.",
        content: "Netflix reported its strongest-ever subscriber growth quarter, adding 22 million new members globally and crossing the 320 million subscriber milestone. The ad-supported tier, now priced at $6.99/month, accounted for 64% of all new sign-ups in the quarter, validating the company's pivot toward an advertising-based revenue model.",
        company: "Netflix",
        companyDomain: "netflix.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png",
        image: "https://images.unsplash.com/photo-1574267432644-f60f8947a9d6?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        url: "https://netflix.com/ir/q4-2025",
        triggers: ["Financial Results & Outlook"],
        socialSource: "Google Platform"
    },
    // ── SALESFORCE ─────────────────────────────────────────
    {
        id: "sf_001",
        title: "Salesforce Agentforce Platform Reaches 10,000 Enterprise Deployments",
        description: "Salesforce's AI agent automation platform Agentforce crosses a landmark 10,000 enterprise deployment milestone within six months of launch.",
        content: "Salesforce announced its Agentforce AI agent platform has been deployed by over 10,000 enterprise customers globally — including companies from manufacturing, retail, healthcare, and financial services — within six months of its launch. The platform enables companies to deploy autonomous AI agents that perform complex sales, service, and operations tasks without human intervention.",
        company: "Salesforce",
        companyDomain: "salesforce.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        url: "https://salesforce.com/news/agentforce-10000",
        triggers: ["Customer Acquisition / Sourcing"],
        socialSource: "LinkedIn Official"
    },
    // ── HDFC BANK ───────────────────────────────────────────────
    {
        id: "hdfc_001",
        title: "HDFC Bank Reports INR 18,202 Crore Net Profit in Q3 FY26",
        description: "HDFC Bank delivers its strongest quarterly profit on record, driven by robust loan growth, digital adoption, and improving asset quality.",
        content: "HDFC Bank Ltd. reported a consolidated net profit of ₹18,202 crore for Q3 FY2026, a 17.6% year-over-year increase. Net Interest Income grew 12.1% to ₹30,651 crore, while the bank's digital banking platform served over 65 million monthly active users. Asset quality improved with Gross NPA declining to 1.26%.",
        company: "HDFC Bank",
        companyDomain: "hdfc.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png",
        image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34ba?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
        url: "https://hdfc.com/news/q3-fy26-results",
        triggers: ["Financial Results & Outlook"],
        socialSource: "Official News Hub"
    },
    // ── MANCHESTER UNITED ──────────────────────────────────
    {
        id: "mu_001",
        title: "Manchester United Completes £1.6 Billion Old Trafford Redevelopment Plan",
        description: "Manchester United's board approves the £1.6 billion Old Trafford redevelopment, set to create a 90,000-seat stadium — the largest in European club football.",
        content: "Manchester United FC has confirmed board approval for the historic £1.6 billion Old Trafford redevelopment project, which will expand the stadium's capacity to 90,000 — surpassing the Camp Nou as Europe's largest club football venue. Co-owner Jim Ratcliffe described the project as 'a cathedral for the next century of Manchester United.'",
        company: "Manchester United",
        companyDomain: "manutd.com",
        officialLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 2).toISOString(),
        url: "https://manutd.com/news/old-trafford-redevelopment",
        triggers: ["Business Expansion"],
        socialSource: "Twitter News Feed"
    },
    // ── xAI ────────────────────────────────────────────────
    {
        id: "xai_001",
        title: "xAI's Grok 3 Becomes World's Highest-Scoring LLM on Mathematical Reasoning",
        description: "xAI's Grok 3 model achieves a new world record on the MATH+AIME benchmark suite, establishing Elon Musk's AI company as a formidable frontier lab.",
        content: "xAI has released Grok 3, which has achieved a world-record score on the combined MATH + AIME 2025 benchmark suite with a score of 97.4% — surpassing GPT-5, Gemini Ultra 2, and Claude 4 across all sub-benchmarks. CEO Elon Musk called Grok 3 'the most truthful and brilliant AI in the world.'",
        company: "xAI",
        companyDomain: "x.ai",
        officialLogo: "https://wcms.alura.com.br/wp-content/uploads/2025/12/xai-e1766432557653.png",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=cover&q=80&w=1200",
        announcedDate: new Date(Date.now() - 86400000 * 1).toISOString(),
        url: "https://x.ai/blog/grok-3",
        triggers: ["Research & Publications"],
        socialSource: "Google Platform"
    }
];

const companies = [
    { name: "Microsoft", domain: "microsoft.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" },
    { name: "Wingify", domain: "wingify.com", logo: "https://unavatar.io/wingify.com" },
    { name: "OpenAI", domain: "openai.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png" },
    { name: "Tesla", domain: "tesla.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png" },
    { name: "xAI", domain: "x.ai", logo: "https://wcms.alura.com.br/wp-content/uploads/2025/12/xai-e1766432557653.png" },
    { name: "Salesforce", domain: "salesforce.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png" },
    { name: "Anaplan", domain: "anaplan.com", logo: "https://www.anaplan.com/content/dam/anaplan/wp-content/uploads/2017/02/anaplan-press-release.png" },
    { name: "Clay", domain: "clay.com", logo: "https://cdn.prod.website-files.com/6392f54210990d7ffbfca55f/67f7d5273eeb62f4e766d791_Clay-Logo---Cover-Image-for-Product-Hub-made-by-Zefi-.jpeg" },
    { name: "Apollo.io", domain: "apollo.io", logo: "https://assets.techrepublic.com/uploads/2024/05/tr_20240515-apollo-io-review.jpg" },
    { name: "HDFC Bank", domain: "hdfc.bank.in", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png" },
    { name: "Federal Bank", domain: "federal.bank.in", logo: "https://manifest-media.in/cover/prev/6egh70hfpfp66oog85m6kupbi1-20260107105153.Medi.jpeg" },
    { name: "Meta", domain: "meta.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Manchester United", domain: "manutd.com", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png" },
    { name: "Netflix", domain: "netflix.com", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png" }
];

const triggers = [
    "Mergers & Acquisitions", "Leadership/Management Changes", "Fundraising & Investment",
    "Initial Public Offering (IPO)", "Business Expansion", "Financial Results & Outlook",
    "Product & Service Launch", "Innovation & Initiatives", "Partnerships & Joint Ventures",
    "Layoffs & Cost-Cutting", "Bankruptcy & Business Shut-down"
];

const socialSources = ["Google Platform", "Official Twitter", "LinkedIn News", "Bloomberg Industry Feed", "Official Press Release"];

const photoIds = [
    "1497366216548-37526070297c", "1486406146926-c627a92ad1ab", "1497215728101-856f4ea42174", "1556761175-b413da4baf72",
    "1485827404703-89b55fcc595e", "1518770660439-4636190af475", "1550751827-4bd374c3f58b", "1531746790731-6c087fecd65a",
    "1590283603385-17ffb3a7f29f", "1611974789855-9c2a0a7236a3", "1526303328194-733974a44cc3", "1535320485706-44d43b91d530",
    "1504384308090-c894fdcc538d", "152207182399e-4480e726b8c0", "1552664730-d307ca884978", "1517245386807-bb43f82c33c4",
    "1529156069898-49953e39b3ac", "1511632765486-a01980e01a18", "1522202176988-66273c2fd55f", "1523240715632-d307ca884978",
    "1431540015161-0d474ad6d13c", "1497366811335-08e7a452367c", "1460925895917-afdab827c52f", "1504333631150-b823e4499649",
    "1512403730372-527b3ca96172", "1531403009174-45b087363499", "1542744173-0ed7f1bacd22", "1552664730-61873191f5e8",
    "1557800634-7567abc470df", "1581291518857-ee8229a1bd23", "1444653300300-ec3cb0ca378a", "1450280731724-2c351f0ae042",
    "1507537297325-301ec461a721", "1516321318461-8224157a4097", "1517248135467-d4a8d1f9cc18", "1518186239121-026ec20c2480",
    "1520607162513-d0999bc3fca8", "1521737604141-f3b6a6838ec7", "1524178232583-17543f3e7b39", "1525182098004-de18ca6b2452",
    "1531053270060-c247c9735d5f", "1531259683007-02c3c769d182", "1541888941297-dc59372070f0", "1551833739-93dc2ea04f56",
    "1554200054-0103b60207b5", "1556767664119-1757739ef00a", "1558222210-539011efc3f2", "1563986768-b3d22e03229b",
    "1564066394519-847262a5a417", "1567117632902-18142277d33b", "1570126511111-9a7329dce4a4", "1573164713714-d95e63bc94a9",
    "1573806119391-9d3a71833878", "1575089902120-0a86641f5ca4", "1575806316278-364230d319a2", "1580828343243-ddec2af4b22c",
    "1587293852239-012ae5d8e280", "1591113071302-38cdaca2598d", "1497215842121-619da01716b5", "1486317262070-7667c3fbf88a",
    "1512403757404-b40a5a3068e6", "1497366216548-37526070297c", "1551288049-bebda4e38f71", "152207182399e-4480e726b8c0",
    "1504384308090-c894fdcc538d", "1454165833267-0e7ec819885d", "1551833739-93dc2ea04f56", "1560179707-f14e90ef3623",
    "1517048676732-d65bc937f952", "1444653300300-ec3cb0ca378a", "1531259683007-02c3c769d182", "1512403730372-527b3ca96172",
    "1564066394519-847262a5a417", "1573164713714-d95e63bc94a9", "1517248135467-d4a8d1f9cc18", "1531053270060-c247c9735d5f",
    "1450280731724-2c351f0ae042", "1516321318461-8224157a4097", "1507537297325-301ec461a721", "1497366811335-08e7a452367c"
];

const generateNews = () => {
    const generated = [...baseArticles];
    let photoIndex = generated.length;

    companies.forEach(company => {
        for (let i = 0; i < 7; i++) {
            const trigger = triggers[Math.floor(Math.random() * triggers.length)];
            const source = socialSources[Math.floor(Math.random() * socialSources.length)];
            const date = new Date(Date.now() - Math.floor(Math.random() * (86400000 * 30))).toISOString();
            const photoId = photoIds[photoIndex % photoIds.length];
            photoIndex++;

            generated.push({
                id: `live_gen_${company.name}_${i}`,
                title: `${company.name} Social Flash: ${trigger} update regarding Official roadmap`,
                description: `Authoritative news synchronized from the ${source} suggests ${company.name} is accelerating its strategic ${trigger} phase.`,
                content: `In a comprehensive analyst briefing monitored via the premium Google News data-stream, ${company.name} has unveiled its fiscal architecture for the 2026 cycle. This ${trigger} phase is designed to integrate high-density data intelligence with localized infrastructure, providing a 40% efficiency lift across all synchronized sectors.\n\n"This is not just an update; it is a fundamental shift in how we approach ${trigger}," stated the Global Intelligence Lead. "Every signal we capture reinforces our dominance in the architectural and tech-ecosystem."`,
                company: company.name,
                companyDomain: company.domain,
                officialLogo: company.logo,
                image: `https://images.unsplash.com/photo-${photoId}?auto=format&fit=cover&q=80&w=1200`,
                announcedDate: date,
                url: `https://${company.domain}/news/${i}`,
                triggers: [trigger],
                socialSource: source
            });
        }
    });

    return generated;
};

export const MOCK_NEWS = {
    news: generateNews()
};
