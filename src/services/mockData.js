export const MOCK_SUBSCRIPTIONS = {
    config: {
        companies: [
            "microsoft.com", "wingify.com", "openai.com", "tesla.com", "x.ai",
            "salesforce.com", "anaplan.com", "clay.com", "apollo.io", "hdfc.com",
            "hdfc.bank.in", "federal.bank.in", "meta.com", "manutd.com", "netflix.com"
        ],
        triggers: [
            "KW_518", "KW_519", "KW_520", "KW_534", "KW_535", "KW_666", "KW_502", "KW_536",
            "KW_591", "KW_741", "KW_514", "KW_708", "KW_516", "KW_527", "KW_529", "KW_640",
            "KW_713", "KW_510", "KW_583", "KW_688", "KW_521", "KW_566", "KW_642", "KW_801",
            "KW_802", "KW_512", "KW_513", "KW_528", "KW_687", "KW_584", "KW_586", "KW_641",
            "KW_532", "KW_610", "KW_143", "KW_533", "KW_709", "KW_556", "KW_571", "KW_647",
            "KW_14", "KW_526", "KW_711", "KW_522", "KW_523", "KW_585", "KW_613", "KW_699",
            "KW_589", "KW_654", "KW_665", "KW_678", "KW_530", "KW_601", "KW_677", "KW_531",
            "KW_616", "KW_524", "KW_673", "KW_700", "KW_737"
        ]
    }
};

// ─────────────────────────────────────────────────────────────────
//  PRIMARY NEWS FEED — 24 unique articles, one per trigger group
//  Each article has:
//    officialLogo : high-res official brand logo (shown in Read More)
//    image        : contextual cover photo for the story
// ─────────────────────────────────────────────────────────────────
export const MOCK_NEWS = {
    news: [
        // ─── 🚀 NVIDIA TRENDING ──────────────────────────────────────────
        {
            id: "nvda_trend_001",
            title: "NVIDIA Unveils 'Rubin' NEXT-GEN AI Platform with HBM4 Memory Architecture",
            description: "Jensen Huang announces the successor to Blackwell, pushing AI compute efficiency to new theoretical limits.",
            content: `NVIDIA has officially unveiled its upcoming AI supercomputing platform, codenamed 'Rubin', scheduled for production in late 2025. The architecture will feature the all-new Rubin GPUs, the Vera CPU, and advanced networking infrastructure.
             
            Rubin will be NVIDIA's first platform to natively support HBM4 (High Bandwidth Memory 4), offering a 3x increase in memory bandwidth over the current Blackwell generation. CEO Jensen Huang confirmed that the company is transitioning to a one-year release cycle for its foundational AI chips to meet the frantic demand from hyperscale cloud providers.
             
            "The era of AI factories is here," Huang said at the keynote. Rubin is designed to power the next trillion-parameter models, providing the efficiency required to train the next generation of generative AI agents.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/512px-Nvidia_logo.svg.png",
            image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2000&auto=format&fit=crop",
            company: "NVIDIA",
            companyDomain: "nvidia.com",
            announcedDate: new Date().toISOString(),
            url: "https://nvidianews.nvidia.com/",
            triggers: ["KW_521", "KW_801"]
        },
        // ─── 🍎 APPLE PRODUCT ───────────────────────────────────────────
        {
            id: "apple_launch_001",
            title: "Apple Announces 'Apple Intelligence 2.0' with On-Device Agentic Capabilities",
            description: "Tim Cook reveals the next phase of Apple's AI strategy, focusing on privacy-first autonomous task execution.",
            content: `Apple has announced Apple Intelligence 2.0, its next-generation personal AI system integrated across iOS, iPadOS, and macOS. The update introduces "Personal Agents"—AI entities that can execute complex tasks across multiple apps on behalf of the user, such as booking travel or organizing financial records.
             
            Unlike competitors, Apple Intelligence 2.0 runs 90% of its models directly on the device's M5 and A19 Pro silicon, ensuring that user data never leaves the device. For larger tasks, it uses Private Cloud Compute, which has now been independently verified by three global cybersecurity firms.
             
            "Privacy and utility are not mutually exclusive," said CEO Tim Cook. "We are building AI that truly understands you, without ever compromising who you are."`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/512px-Apple_logo_black.svg.png",
            image: "https://images.unsplash.com/photo-1611186871348-b1ec696e5237?q=80&w=2000&auto=format&fit=crop",
            company: "Apple",
            companyDomain: "apple.com",
            announcedDate: new Date(Date.now() - 3600000 * 2).toISOString(),
            url: "https://www.apple.com/newsroom/",
            triggers: ["KW_521", "KW_566"]
        },
        // ─── 📦 AMAZON EXPANSION ────────────────────────────────────────
        {
            id: "amzn_expand_001",
            title: "Amazon Web Services to Invest $15 Billion in New Sovereign Cloud Region for Europe",
            description: "AWS accelerates its European localization strategy with a massive investment in secure, compliant cloud infrastructure.",
            content: `Amazon Web Services (AWS) has committed $15 billion toward the establishment of a specialized Sovereign Cloud region in Europe. The infrastructure is designed to meet the continent's stringent data residency and security requirements for government and highly regulated enterprise sectors.
             
            The investment will cover data center construction, high-speed networking, and the hiring of over 3,000 localized technical staff across Germany and France. AWS Sovereign Cloud will be physically and logically separated from existing AWS regions, ensuring full European control over operational data.
             
            "Our European customers are asking for more choice in where their data resides and who operates it," said AWS CEO Adam Selipsky. "This $15 billion commitment is our answer."`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",
            image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?q=80&w=2000&auto=format&fit=crop",
            company: "Amazon",
            companyDomain: "amazon.com",
            announcedDate: new Date(Date.now() - 3600000 * 4).toISOString(),
            url: "https://press.aboutamazon.com/",
            triggers: ["KW_527", "KW_640"]
        },
        // ─── 🔍 GOOGLE REGULATORY ────────────────────────────────────────
        {
            id: "goog_reg_001",
            title: "Google Wins Landmark Antitrust Appeal Against €2.4 Billion EU Fine",
            description: "The European General Court annuls a massive fine against Google, citing flaws in the Commission's evidence.",
            content: `Alphabet subsidiary Google has won a major legal victory as the European General Court annulled a €2.4 billion antitrust fine originally imposed by the European Commission in 2017. The fine was related to Google's comparative shopping service and alleged self-preferencing in search results.
             
            The court ruled that while the Commission correctly identified a dominant position, it failed to prove that Google's conduct actually harmed competition in a way that warranted such a severe penalty.
             
            Google stated that it is "pleased" with the decision, noting that it has already made significant changes to its shopping ad formats over the last seven years to ensure a level playing field. The decision can still be appealed to the EU's highest court, the European Court of Justice.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1024px-Google_2015_logo.svg.png",
            image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=2000&auto=format&fit=crop",
            company: "Google",
            companyDomain: "google.com",
            announcedDate: new Date(Date.now() - 3600000 * 6).toISOString(),
            url: "https://blog.google/",
            triggers: ["KW_522", "KW_526"]
        },
        // ─── 🧩 Mergers & Acquisitions ─────────────────────────────────
        {
            id: "mna_001",
            title: "Microsoft Seals $13 Billion Partnership and Equity Deal with OpenAI",
            description: "Microsoft deepens its tie-up with OpenAI in a landmark deal that reshapes the enterprise AI landscape globally.",
            content: `Microsoft has finalised a comprehensive $13 billion equity-and-partnership agreement with OpenAI, securing exclusive rights to integrate OpenAI's full model suite—including GPT-4o and the upcoming o3 series—across Azure, Microsoft 365 Copilot, and Bing.

The deal grants Microsoft a non-voting observer seat on OpenAI's board and first-right-of-refusal on any future capital rounds. Analysts at Goldman Sachs describe it as "the most structurally significant technology merger of the AI era," noting that the combined Azure + OpenAI infrastructure now serves over 1 million enterprise customers.

Microsoft CEO Satya Nadella stated, "This partnership is not just a financial commitment; it is a commitment to building the safest and most capable AI infrastructure on the planet."`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop",
            company: "Microsoft",
            companyDomain: "microsoft.com",
            announcedDate: new Date(Date.now() - 3600000 * 1).toISOString(),
            url: "https://news.microsoft.com/",
            triggers: ["KW_518"]
        },

        // ─── 👥 Leadership / Management Changes ─────────────────────────
        {
            id: "lead_001",
            title: "Salesforce Names New President of AI Products as Marc Benioff Restructures C-Suite",
            description: "Salesforce announces sweeping executive realignment placing a renowned AI researcher at the top of its product hierarchy.",
            content: `Salesforce has announced the appointment of Dr. Priya Krishnamurthy as President of AI Products, a newly created role reporting directly to CEO Marc Benioff. Dr. Krishnamurthy joins from Google DeepMind, where she led the enterprise research division.

The restructuring also sees the departure of two SVPs and the elevation of three General Managers to C-suite level, reflecting Salesforce's decisive shift toward an AI-first product organisation.

"We are re-architecting how Salesforce builds, ships, and monetises AI," Benioff said at an internal all-hands meeting. "Priya's appointment signals that we are playing to win in the agentic AI market."`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/1024px-Salesforce.com_logo.svg.png",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
            company: "Salesforce",
            companyDomain: "salesforce.com",
            announcedDate: new Date(Date.now() - 3600000 * 3).toISOString(),
            url: "https://www.salesforce.com/news/",
            triggers: ["KW_502", "KW_591"]
        },

        // ─── 💰 Fundraising & Investment ──────────────────────────────────
        {
            id: "fund_001",
            title: "Clay Closes $62 Million Series B Led by Sequoia to Scale AI-Powered GTM Platform",
            description: "Sales data enrichment startup Clay raises its largest round yet, valuing the company at $500 million post-money.",
            content: `Clay, the platform that enables revenue teams to build hyper-personalised outreach using 75+ data enrichment providers, has raised $62 million in a Series B round led by Sequoia Capital with participation from Andreessen Horowitz and Tiger Global.

The fresh capital will be deployed to expand Clay's AI agent capabilities, deepen integrations with Salesforce, HubSpot, and Outreach, and grow international Go-To-Market operations across Europe and India.

Clay reports that its annual recurring revenue has tripled in the past 12 months, driven entirely by product-led growth—the company has never spent a dollar on paid marketing.`,
            officialLogo: "https://cdn.prod.website-files.com/6392f54210990d7ffbfca55f/67f7d5273eeb62f4e766d791_Clay-Logo---Cover-Image-for-Product-Hub-made-by-Zefi-.jpeg",
            image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2000&auto=format&fit=crop",
            company: "Clay",
            companyDomain: "clay.com",
            announcedDate: new Date(Date.now() - 3600000 * 5).toISOString(),
            url: "https://www.clay.com/blog",
            triggers: ["KW_514", "KW_708"]
        },

        // ─── 🏛️ IPO ────────────────────────────────────────────────────────
        {
            id: "ipo_001",
            title: "HDFC Bank's HDB Financial Services Files DRHP for ₹12,500 Crore IPO",
            description: "HDB Financial Services officially kick-starts its IPO journey, aiming to list on BSE and NSE by Q3 FY2026.",
            content: `HDB Financial Services, the NBFC subsidiary of HDFC Bank, has filed its Draft Red Herring Prospectus (DRHP) with SEBI for an initial public offering worth ₹12,500 crore. The offering comprises a fresh issue of ₹2,500 crore and an offer-for-sale of ₹10,000 crore by existing shareholders including HDFC Bank itself.

The IPO is expected to value HDB Financial Services at approximately ₹70,000–80,000 crore, making it one of the largest NBFC listings in Indian market history. The proceeds will be used to augment the company's capital base and support future lending growth.

HDFC Bank's CFO Srinivasan Vaidyanathan confirmed that the listing fulfils a key regulatory requirement from the Reserve Bank of India for upper-layer NBFCs.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2000&auto=format&fit=crop",
            company: "HDFC Bank",
            companyDomain: "hdfc.bank.in",
            announcedDate: new Date(Date.now() - 3600000 * 7).toISOString(),
            url: "https://www.hdfcbank.com/news",
            triggers: ["KW_516"]
        },

        // ─── 🌍 Business Expansion ─────────────────────────────────────────
        {
            id: "expand_001",
            title: "Apollo.io Opens APAC Headquarters in Singapore to Capitalise on Booming Sales-Tech Market",
            description: "Apollo.io plants its flag in Asia-Pacific with a 200-seat Singapore HQ and plans to hire across the region.",
            content: `Apollo.io has officially inaugurated its Asia-Pacific headquarters in Singapore's Raffles Place financial district, marking the company's most significant geographic expansion since launching in 2015.

The new office will serve as the hub for APAC sales, customer success, and engineering operations, with an initial headcount target of 200 employees by end of 2025. Apollo plans to recruit heavily from Singapore's deep talent pool in data engineering and enterprise SaaS.

"Southeast Asia represents the fastest-growing segment of our user base," said CEO Tim Zheng. "Companies here are leapfrogging legacy CRM setups and going straight to AI-native revenue intelligence." Apollo.io's platform now serves over 1.2 million users across 160 countries.`,
            officialLogo: "https://assets.techrepublic.com/uploads/2024/05/tr_20240515-apollo-io-review.jpg",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
            company: "Apollo.io",
            companyDomain: "apollo.io",
            announcedDate: new Date(Date.now() - 3600000 * 9).toISOString(),
            url: "https://www.apollo.io/blog",
            triggers: ["KW_527", "KW_529", "KW_640"]
        },

        // ─── 📊 Financial Results & Outlook ───────────────────────────────
        {
            id: "fin_001",
            title: "Wingify Posts ₹248 Crore Revenue for FY25, Clocks 38% YoY Growth",
            description: "Bootstrapped SaaS leader Wingify delivers its strongest-ever annual performance, powered by VWO's enterprise momentum.",
            content: `Wingify, the Delhi-based SaaS company behind VWO (Visual Website Optimizer), has reported revenue of ₹248 crore for FY2024-25, representing 38% year-on-year growth—the highest in the company's history.

EBITDA margins expanded to 34%, driven by disciplined hiring and a shift toward higher-value enterprise contracts. The company added 320 net new enterprise logos during the year, with an average contract value increase of 22%.

CEO Sparsh Gupta remarked, "We have always believed that great product and customer obsession beats venture-funded growth indefinitely. These numbers are proof." Wingify remains one of India's largest and most profitable bootstrapped SaaS businesses.`,
            officialLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ixh9K5TOP_3zKRkacbFyS0SL8BGF__UXiw&s",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
            company: "Wingify",
            companyDomain: "wingify.com",
            announcedDate: new Date(Date.now() - 3600000 * 11).toISOString(),
            url: "https://wingify.com/news",
            triggers: ["KW_510", "KW_583", "KW_688"]
        },

        // ─── 🚀 Product & Service Launch ──────────────────────────────────
        {
            id: "launch_001",
            title: "OpenAI Launches GPT-4o Realtime API — Enabling Sub-300ms Voice AI Applications",
            description: "OpenAI's new Realtime API lets developers build voice-first AI products with near-zero latency, changing the conversational AI market.",
            content: `OpenAI has released the GPT-4o Realtime API into general availability, enabling developers to build applications that process speech input and generate spoken responses in under 300 milliseconds—faster than human conversational reaction time.

The API supports 8 languages at launch, with native speaker-detection, emotion-aware tone modulation, and interruption handling. Pricing starts at $0.06 per minute of audio input and $0.24 per minute of output.

Early adopters including Klarna, Duolingo, and several Fortune 500 customer service platforms report a 65–80% reduction in customer call handling time after integrating the Realtime API.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/OpenAI_Logo.svg/1024px-OpenAI_Logo.svg.png",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
            company: "OpenAI",
            companyDomain: "openai.com",
            announcedDate: new Date(Date.now() - 3600000 * 13).toISOString(),
            url: "https://openai.com/blog",
            triggers: ["KW_521", "KW_566"]
        },

        // ─── 🔬 Innovation & Initiatives ──────────────────────────────────
        {
            id: "innov_001",
            title: "Tesla Launches 'Dojo 2' Supercomputer Initiative — 10x More Powerful Than Original",
            description: "Tesla unveils its next-generation AI training infrastructure designed to accelerate Full Self-Driving development by an order of magnitude.",
            content: `Tesla has officially launched the Dojo 2 initiative, its second-generation proprietary AI supercomputing programme. The new system uses Tesla's in-house D2 chip, manufactured at 3nm, and is projected to deliver over 100 ExaFLOPS of compute capacity when fully operational in late 2025.

Dojo 2 will be used to train Tesla's neural networks on the petabytes of real-world driving data collected daily from its fleet of over 6 million vehicles. Elon Musk described it as "the most important strategic investment Tesla has ever made" at the company's AI Day event.

Tesla is also exploring licensing Dojo 2 capacity to third-party AI companies, potentially creating a significant new revenue stream.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png",
            image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2000&auto=format&fit=crop",
            company: "Tesla",
            companyDomain: "tesla.com",
            announcedDate: new Date(Date.now() - 3600000 * 15).toISOString(),
            url: "https://www.tesla.com/blog",
            triggers: ["KW_801", "KW_802"]
        },

        // ─── 🤝 Partnerships & Joint Ventures ─────────────────────────────
        {
            id: "partner_001",
            title: "Anaplan and Microsoft Form Strategic Cloud Alliance to Deliver Connected Planning",
            description: "Anaplan and Microsoft announce deep integration across Azure, Teams, and Power BI to create a unified enterprise planning experience.",
            content: `Anaplan and Microsoft have announced a multi-year strategic cloud alliance that will deeply embed Anaplan's planning capabilities into the Microsoft 365 and Azure ecosystem. Users will be able to access Anaplan models, forecasts, and scenario plans directly within Microsoft Teams and Excel — without switching applications.

The partnership also includes co-selling agreements that will expand Anaplan's reach to Microsoft's 300,000+ enterprise Azure customers globally. The integration is powered by Azure OpenAI Service, enabling natural language querying of financial plans and operational models.

"This alliance is the most significant go-to-market acceleration in Anaplan's history," said CEO Mark Anderson.`,
            officialLogo: "https://www.anaplan.com/content/dam/anaplan/wp-content/uploads/2017/02/anaplan-press-release.png",
            image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop",
            company: "Anaplan",
            companyDomain: "anaplan.com",
            announcedDate: new Date(Date.now() - 3600000 * 17).toISOString(),
            url: "https://www.anaplan.com/blog",
            triggers: ["KW_512", "KW_513"]
        },

        // ─── 📉 Layoffs & Cost-Cutting ─────────────────────────────────────
        {
            id: "layoff_001",
            title: "Meta Cuts 3,600 Employees in Latest Performance-Based Reduction",
            description: "Meta begins its sharpest targeted layoff round yet, focusing on low-performers across engineering and product to fund AI hiring.",
            content: `Meta has commenced the termination of approximately 3,600 employees—about 5% of its global workforce—in what the company describes as a performance-based reduction. The move is concentrated in Facebook's legacy engineering divisions, WhatsApp business product teams, and middle management layers across Menlo Park and London.

CEO Mark Zuckerberg explained in an internal memo: "I've decided to raise the bar on performance management and move out our lowest performers faster than we previously would have." The freed headcount budget will fund 2,000+ new AI and infrastructure machine learning roles that Meta intends to fill by Q4 2025.

The affected employees have been notified and will receive 60-day severance packages.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png",
            image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop",
            company: "Meta",
            companyDomain: "meta.com",
            announcedDate: new Date(Date.now() - 3600000 * 19).toISOString(),
            url: "https://about.fb.com/news/",
            triggers: ["KW_528", "KW_687"]
        },

        // ─── ⚖️ Bankruptcy & Business Shut-down ───────────────────────────
        {
            id: "bkr_001",
            title: "xAI Competitor Inflection AI Winds Down Consumer Division After AGI Pivot Fails",
            description: "Inflection AI shuts its consumer-facing Pi assistant and lays off 70% of staff following failed pivot to enterprise AGI research.",
            content: `Inflection AI, once valued at $4 billion, has officially wound down its consumer AI assistant 'Pi' and announced the closure of its consumer products division. The company is laying off approximately 70% of its staff as it attempts a pivotal restructuring toward pure AGI research—a transition that investors have declined to fund.

The shutdown marks one of the most prominent casualties of the post-ChatGPT AI bubble, as large consumer assistants failed to achieve viable monetisation against OpenAI, Google, and Anthropic.

Several key Inflection researchers are reported to have received offers from xAI, Anthropic, and Google DeepMind. The Pi application will remain operational until June 30, 2025, giving users time to export their data.`,
            officialLogo: "https://wcms.alura.com.br/wp-content/uploads/2025/12/xai-e1766432557653.png",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
            company: "xAI",
            companyDomain: "x.ai",
            announcedDate: new Date(Date.now() - 3600000 * 21).toISOString(),
            url: "https://x.ai/blog",
            triggers: ["KW_584", "KW_586"]
        },

        // ─── 🏅 Awards & Recognition ───────────────────────────────────────
        {
            id: "award_001",
            title: "Wingify's VWO Named Gartner Peer Insights Customers' Choice for Digital Experience Analytics",
            description: "VWO earns Gartner's highest peer-reviewed distinction, beating Adobe and Optimizely for the first time.",
            content: `Wingify's VWO platform has been named a Gartner Peer Insights Customers' Choice for Digital Experience Analytics for 2025. The award is based on 847 verified reviews from enterprise IT professionals, with VWO scoring 4.8/5 overall—the highest in the category, surpassing Adobe Analytics and Optimizely.

Reviewers highlighted VWO's intuitive drag-and-drop experiment builder, enterprise-grade audience segmentation, and responsive 24/7 support as key differentiators.

Wingify CEO Sparsh Gupta said: "This recognition belongs entirely to our customers and to the VWO team that builds relentlessly for their success." This is the first time an Indian-origin SaaS company has topped this particular Gartner category.`,
            officialLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Ixh9K5TOP_3zKRkacbFyS0SL8BGF__UXiw&s",
            image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?q=80&w=2000&auto=format&fit=crop",
            company: "Wingify",
            companyDomain: "wingify.com",
            announcedDate: new Date(Date.now() - 3600000 * 23).toISOString(),
            url: "https://wingify.com/news",
            triggers: ["KW_532", "KW_610"]
        },

        // ─── 📢 Advertising & Marketing ────────────────────────────────────
        {
            id: "mkt_001",
            title: "Netflix Launches 'Live Stories' Ad Format — Interactive Ads Inside Original Series",
            description: "Netflix's new ad unit lets brands embed shoppable, interactive product moments directly into original programming.",
            content: `Netflix has unveiled 'Live Stories', a first-of-its-kind advertising format that allows brand partners to embed fully interactive, shoppable product experiences within original series and films. When a character uses a featured product, viewers on the ad-supported tier see a non-intrusive overlay panel that lets them explore the product and purchase it without leaving the show.

The format is launching with partners including Nike, L'Oréal, and Samsung, and will initially be available in the US, UK, Canada, and Australia. Netflix projects the feature will generate over $1 billion in incremental ad revenue in its first full year.

Netflix's chief revenue officer stated it "fundamentally changes the value proposition of streaming advertising."`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png",
            image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=2000&auto=format&fit=crop",
            company: "Netflix",
            companyDomain: "netflix.com",
            announcedDate: new Date(Date.now() - 3600000 * 25).toISOString(),
            url: "https://about.netflix.com/news",
            triggers: ["KW_143", "KW_533"]
        },

        // ─── 🧲 Customer Acquisition / Sourcing ────────────────────────────
        {
            id: "custacq_001",
            title: "Apollo.io Surpasses 1.5 Million Users After Launching Free Tier with AI Prospecting",
            description: "Apollo.io's freemium launch drives an unprecedented user acquisition wave, adding 500,000 users in 90 days.",
            content: `Apollo.io has reached 1.5 million registered users following the launch of its redesigned free tier, which includes an AI-powered prospect recommendation engine that suggests high-fit leads based on a user's ideal customer profile.

The freemium launch added 500,000 new users in just 90 days—the fastest growth in the company's history. Over 30% of free users convert to paid plans within the first 60 days, making the unit economics highly favourable.

Apollo's partnership with LinkedIn data providers has also expanded, giving the platform verified data on over 280 million business professionals worldwide. CEO Tim Zheng confirmed plans for a Series D funding round in H2 2025 to sustain the growth trajectory.`,
            officialLogo: "https://assets.techrepublic.com/uploads/2024/05/tr_20240515-apollo-io-review.jpg",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
            company: "Apollo.io",
            companyDomain: "apollo.io",
            announcedDate: new Date(Date.now() - 3600000 * 27).toISOString(),
            url: "https://www.apollo.io/blog",
            triggers: ["KW_556", "KW_571"]
        },

        // ─── 👎 Customer Churn ─────────────────────────────────────────────
        {
            id: "churn_001",
            title: "Anaplan Loses HSBC Global Contract to SAP IBP After Three-Year Deployment",
            description: "HSBC's global treasury division moves its planning operations to SAP, a significant blow to Anaplan's enterprise banking vertical.",
            content: `Anaplan has confirmed the non-renewal of its contract with HSBC's Global Treasury and Capital Markets division, valued at approximately $18 million annually. HSBC has migrated to SAP Integrated Business Planning (IBP), citing tighter native integration with its existing SAP ERP landscape and lower total cost of ownership.

The departure marks the most significant single customer loss in Anaplan's history and represents a strategic setback in the financial services vertical. Anaplan leadership acknowledged the loss in a note to investors but said the company's pipeline of new financial services prospects remains "robust."

Industry analysts warn that Anaplan faces structural headwinds as ERP giants bundle planning tools into their core suites.`,
            officialLogo: "https://www.anaplan.com/content/dam/anaplan/wp-content/uploads/2017/02/anaplan-press-release.png",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
            company: "Anaplan",
            companyDomain: "anaplan.com",
            announcedDate: new Date(Date.now() - 3600000 * 29).toISOString(),
            url: "https://www.anaplan.com/blog",
            triggers: ["KW_647"]
        },

        // ─── 💲 Pricing ────────────────────────────────────────────────────
        {
            id: "price_001",
            title: "Microsoft 365 Copilot Price Drops to $20 Per User After Global Backlash",
            description: "Microsoft slashes its AI Copilot add-on price by 50% in response to enterprise adoption resistance and competitive pressure from Google.",
            content: `Microsoft has announced a significant price reduction for Microsoft 365 Copilot, lowering the per-user monthly fee from $30 to $20 for enterprise customers with existing Microsoft 365 E3/E5 subscriptions. The 33% price cut reverses Microsoft's initial premium AI pricing strategy and comes after widespread enterprise adoption stagnated over the first 12 months.

The reduction follows aggressive pricing from Google Workspace AI and Salesforce Einstein, both of which include AI features at no additional cost above base subscription tiers.

Microsoft's Chief Commercial Officer said the new pricing will be accompanied by a revamped ROI dashboard that helps customers quantify productivity gains from Copilot adoption, making the business case easier to justify.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
            image: "https://www.sde.org.tr/content/upload/news/thumb/68d680b637689950X535-40_thumbd.webp",
            company: "Microsoft",
            companyDomain: "microsoft.com",
            announcedDate: new Date(Date.now() - 3600000 * 31).toISOString(),
            url: "https://news.microsoft.com/",
            triggers: ["KW_14"]
        },

        // ─── ⚖️ Legal ──────────────────────────────────────────────────────
        {
            id: "legal_001",
            title: "Meta Hit With €1.3 Billion GDPR Fine by Irish DPC Over EU-US Data Transfers",
            description: "Meta receives Europe's largest-ever data protection fine for illegally transferring EU user data to US servers without adequate safeguards.",
            content: `Ireland's Data Protection Commission (DPC) has hit Meta with a record €1.3 billion fine under the EU's General Data Protection Regulation (GDPR) for systematically transferring the personal data of European Facebook users to United States servers without adequate legal protections.

The Irish DPC, acting as Meta's lead EU regulator, also issued an order requiring Meta to suspend future EU-US data transfers and bring its data practices into compliance within 5 months.

Meta has announced it will appeal the decision through the Irish courts and the Court of Justice of the European Union. The company maintains that the data transfers were conducted under Standard Contractual Clauses that it believes remain legally valid.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop",
            company: "Meta",
            companyDomain: "meta.com",
            announcedDate: new Date(Date.now() - 3600000 * 33).toISOString(),
            url: "https://about.fb.com/news/",
            triggers: ["KW_526", "KW_711"]
        },

        // ─── 🏛️ Regulatory ─────────────────────────────────────────────────
        {
            id: "reg_001",
            title: "RBI Grants Federal Bank In-Principle Approval to Launch Digital Banking Unit",
            description: "Federal Bank becomes one of only six Indian banks authorised to operate a fully digital banking unit under the RBI's DBU framework.",
            content: `The Reserve Bank of India has granted Federal Bank in-principle approval to establish a Digital Banking Unit (DBU) in Kochi, making it one of only six scheduled commercial banks to receive this regulatory clearance.

The DBU will offer the full stack of retail banking services—savings accounts, personal loans, fixed deposits, insurance, and investment products—through an AI-first mobile interface with zero-branch dependency.

Federal Bank's MD & CEO KVS Manian said: "The RBI's trust in Federal Bank's digital capabilities is a testament to the transformation we have undergone over the last five years." The bank plans to extend DBU services to 20 cities by end of FY2026.`,
            officialLogo: "https://manifest-media.in/cover/prev/6egh70hfpfp66oog85m6kupbi1-20260107105153.Medi.jpeg",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop",
            company: "Federal Bank",
            companyDomain: "federal.bank.in",
            announcedDate: new Date(Date.now() - 3600000 * 35).toISOString(),
            url: "https://www.federalbank.co.in/news",
            triggers: ["KW_522", "KW_585", "KW_613"]
        },

        // ─── 📚 Research & Publications ────────────────────────────────────
        {
            id: "research_001",
            title: "xAI Publishes 'Grok-2 Technical Report' — Claims State-of-the-Art in Math and Coding Benchmarks",
            description: "xAI releases a comprehensive technical paper showing Grok-2 outperforms GPT-4o on 14 of 18 standard AI benchmarks.",
            content: `xAI has published its Grok-2 Technical Report, a 94-page research document detailing the architecture, training methodology, and benchmark performance of its latest large language model.

According to the report, Grok-2 achieves state-of-the-art results on MATH (92.3%), HumanEval coding (89.1%), and MMLU (88.4%) benchmarks, outperforming GPT-4o on 14 of 18 standard evaluations. The model uses a novel mixture-of-experts architecture trained on a combination of public internet data and real-time X (Twitter) data.

The report underwent peer review from researchers at four external universities. xAI has committed to releasing the Grok-2 weights under a research licence for academic use.`,
            officialLogo: "https://wcms.alura.com.br/wp-content/uploads/2025/12/xai-e1766432557653.png",
            image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop",
            company: "xAI",
            companyDomain: "x.ai",
            announcedDate: new Date(Date.now() - 3600000 * 37).toISOString(),
            url: "https://x.ai/blog",
            triggers: ["KW_589"]
        },

        // ─── 🕵️ Scandals, Rumours, Activism ────────────────────────────────
        {
            id: "scandal_001",
            title: "Meta Whistleblower Alleges Company Suppressed Internal AI Safety Research",
            description: "A former Meta AI safety researcher files a detailed whistleblower complaint with the SEC alleging data fabrication in safety disclosures.",
            content: `A former senior researcher in Meta's Fundamental AI Research (FAIR) lab has filed a formal whistleblower complaint with the U.S. Securities and Exchange Commission, alleging that the company suppressed and altered internal reports that showed significant safety risks in Meta's large-scale AI models.

The complaint, first reported by the Financial Times, claims that internal evaluations showing that Llama 2 and Llama 3 models could be jailbroken to produce harmful content in over 40% of adversarial test cases were not disclosed to regulators or the public.

Meta has categorically denied the allegations, calling them "a mischaracterisation of our rigorous safety evaluation process." The SEC has confirmed receipt of the complaint and is reviewing it.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1024px-Meta_Platforms_Inc._logo.svg.png",
            image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2000&auto=format&fit=crop",
            company: "Meta",
            companyDomain: "meta.com",
            announcedDate: new Date(Date.now() - 3600000 * 39).toISOString(),
            url: "https://about.fb.com/news/",
            triggers: ["KW_654", "KW_665", "KW_678"]
        },

        // ─── 🔐 Security Breaches & Outages ────────────────────────────────
        {
            id: "security_001",
            title: "Microsoft Azure Experiences 14-Hour Global Outage Affecting 500+ Enterprise Services",
            description: "A BGP routing configuration error triggers Microsoft Azure's most significant outage in five years, disrupting services for millions.",
            content: `Microsoft Azure experienced a major global outage lasting 14 hours and 22 minutes, caused by a faulty Border Gateway Protocol (BGP) routing configuration update that propagated incorrectly across Azure's backbone network.

The incident affected over 500 Azure services including Azure Active Directory, Azure DevOps, Microsoft Teams, and a significant portion of Microsoft 365 workloads. An estimated 3.4 million enterprise users experienced complete service unavailability during the peak outage window.

Microsoft's incident response team published a detailed preliminary post-mortem within 48 hours, attributing the failure to an automated configuration deployment that bypassed the normal canary-testing phase. The company announced an emergency review of its deployment automation systems.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop",
            company: "Microsoft",
            companyDomain: "microsoft.com",
            announcedDate: new Date(Date.now() - 3600000 * 41).toISOString(),
            url: "https://news.microsoft.com/",
            triggers: ["KW_530", "KW_601"]
        },

        // ─── 🧑‍🏭 Employee / Labor Dispute ────────────────────────────────
        {
            id: "labor_001",
            title: "Netflix UK Writers Stage 48-Hour Strike Over AI Script Usage Policy",
            description: "Netflix's London-based writing staff walk out demanding a contractual ban on using AI tools to generate or revise production scripts.",
            content: `Writers employed on Netflix's UK original productions staged a 48-hour work stoppage, the first industrial action in the streaming giant's London production history. The dispute centres on Netflix's recently updated production guidelines, which permit showrunners to use AI writing tools for first-pass script generation and outline creation.

The Writers' Guild of Great Britain, which is coordinating the action, demands contractual language explicitly prohibiting AI-generated content from replacing human writers at any stage of the creative process, and a 15% pay increase to account for increased workload.

A Netflix spokesperson stated that the company "remains committed to negotiating in good faith" and confirmed that mediation sessions are scheduled for the following week.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1024px-Netflix_2015_logo.svg.png",
            image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop",
            company: "Netflix",
            companyDomain: "netflix.com",
            announcedDate: new Date(Date.now() - 3600000 * 43).toISOString(),
            url: "https://about.netflix.com/news",
            triggers: ["KW_677"]
        },

        // ─── 🌪️ Accidents & Disasters ──────────────────────────────────────
        {
            id: "disaster_001",
            title: "Tesla Giga Texas Hit by Flash Flooding — Production Halted for 72 Hours",
            description: "Unprecedented rainfall causes flood damage to Tesla's Austin Gigafactory, temporarily halting Cybertruck and Model Y production.",
            content: `Unprecedented flash flooding in the Travis County, Texas area caused significant water ingress to Tesla's Gigafactory Austin facility, forcing a temporary 72-hour halt in Cybertruck and Model Y production. The flooding, triggered by a historic rainfall event that dumped 11 inches in 6 hours, damaged paint shop equipment and a section of the stamping facility.

Tesla confirmed the incident in a regulatory filing, stating that the financial impact is being assessed and is expected to result in a production shortfall of approximately 2,000–3,000 vehicles for the quarter.

No injuries were reported. Tesla's emergency response team worked with Austin city authorities to pump out water and assess structural integrity before resuming operations.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png",
            image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2000&auto=format&fit=crop",
            company: "Tesla",
            companyDomain: "tesla.com",
            announcedDate: new Date(Date.now() - 3600000 * 45).toISOString(),
            url: "https://www.tesla.com/blog",
            triggers: ["KW_531", "KW_616"]
        },

        // ─── ⚠️ Recalls & Disruptions ──────────────────────────────────────
        {
            id: "recall_001",
            title: "Tesla Initiates OTA Recall of 2.04 Million Vehicles Over Autopilot Warning Deficiency",
            description: "In the largest automotive recall of 2025, Tesla pushes an over-the-air software update to fix a critical Autopilot driver attention alert failure.",
            content: `Tesla has initiated an over-the-air software recall covering 2.04 million vehicles in the United States to address a critical deficiency in the Autopilot system's driver attention monitoring. The recall, the largest in Tesla's history by vehicle count, was ordered after NHTSA investigators found that the system failed to provide adequate visual warnings in 23% of tested scenarios when driver attention lapsed.

The OTA update, designated 2025.12.4, strengthens the frequency and visual prominence of driver attention alerts and adds a new audio escalation protocol for prolonged inattention events.

Tesla emphasized that no fatalities or injuries are directly linked to the specific alert deficiency being addressed. All affected vehicles will receive the update automatically over Wi-Fi within 30 days.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Tesla_Motors.svg/512px-Tesla_Motors.svg.png",
            image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2000&auto=format&fit=crop",
            company: "Tesla",
            companyDomain: "tesla.com",
            announcedDate: new Date(Date.now() - 3600000 * 47).toISOString(),
            url: "https://www.tesla.com/blog",
            triggers: ["KW_524", "KW_673", "KW_700", "KW_737"]
        },

        // ─── 🧩 M&A – Divestment ───────────────────────────────────────────
        {
            id: "div_001",
            title: "HDFC Divests 10% Stake in HDFC Credila to KKR for ₹1,740 Crore",
            description: "HDFC Limited completes a partial exit from its education finance subsidiary, signalling strategic capital reallocation post-merger.",
            content: `HDFC Limited has divested a 10% equity stake in HDFC Credila Financial Services, its wholly-owned education loan subsidiary, to private equity giant KKR for ₹1,740 crore. The transaction values HDFC Credila at approximately ₹17,400 crore.

The divestment is part of HDFC Group's broader strategy to unlock value from non-core subsidiary holdings following the completion of the HDFC Bank mega-merger. The capital received will be used to strengthen HDFC Bank's Tier-1 capital adequacy ratio.

KKR's education finance investment thesis is premised on India's rapidly growing student loan market, which is projected to reach ₹1.5 lakh crore by 2030 driven by rising higher education enrollment.`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/1024px-HDFC_Bank_Logo.svg.png",
            image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=2000&auto=format&fit=crop",
            company: "HDFC",
            companyDomain: "hdfc.com",
            announcedDate: new Date(Date.now() - 3600000 * 49).toISOString(),
            url: "https://www.hdfc.com/news",
            triggers: ["KW_519", "KW_520"]
        },

        // ─── 📢 Re-branding ────────────────────────────────────────────────
        {
            id: "rebrand_001",
            title: "Manchester United Drops 'FC' — Rebrands as Part of INEOS Global Identity Overhaul",
            description: "Sir Jim Ratcliffe's INEOS Group unveils a sweeping rebrand, retiring the 'Manchester United FC' identity in favour of a minimalist global brand.",
            content: `Manchester United has unveiled a comprehensive rebranding initiative under the direction of new minority owner INEOS Group, led by Sir Jim Ratcliffe. The club will drop the 'FC' suffix from its official commercial name globally, rebranding to simply 'Manchester United' to align with modern sports franchise naming conventions adopted by the NBA and NFL.

The rebrand includes a redesigned crest that retains the iconic red devil motif but adopts cleaner typography and a simplified colour palette. A new commercial identity framework will govern all partnerships, merchandise, and digital communications.

INEOS' brand director stated that the changes position Manchester United "as a global entertainment and lifestyle brand, not merely a football club."`,
            officialLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1024px-Manchester_United_FC_crest.svg.png",
            image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2000&auto=format&fit=crop",
            company: "Manchester United",
            companyDomain: "manutd.com",
            announcedDate: new Date(Date.now() - 3600000 * 51).toISOString(),
            url: "https://www.manutd.com/news",
            triggers: ["KW_709", "KW_143"]
        }
    ]
};
