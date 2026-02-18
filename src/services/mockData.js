export const MOCK_SUBSCRIPTIONS = {
    subscriptions: [
        {
            id: "sub_1",
            resource: "news.companies",
            companies: [
                { name: "Google", domain: "google.com" },
                { name: "Microsoft", domain: "microsoft.com" },
                { name: "Apple", domain: "apple.com" },
                { name: "Tesla", domain: "tesla.com" },
                { name: "Amazon", domain: "amazon.com" }
            ],
            signals: ["M&A", "Funding", "Product Launch", "Partnership", "Layoffs", "Expansion"],
            triggers: ["M&A", "Funding", "Product Launch", "Partnership", "Layoffs", "Expansion"]
        }
    ]
};

export const MOCK_NEWS = {
    news: [
        {
            id: "news_1",
            title: "Microsoft Announces New AI Partnership with OpenAI",
            description: "Microsoft has solidified its partnership with OpenAI, announcing a new multi-billion dollar investment to accelerate AI breakthroughs and adoption.",
            content: `Microsoft Corp and OpenAI on Monday announced they are extending their partnership through a multiyear, multi-billion dollar investment from Microsoft to accelerate AI breakthroughs and ensure these benefits are broadly shared with the world.

This agreement follows Microsoft's previous investments in 2019 and 2021. It extends their ongoing collaboration across AI supercomputing and research and enables each of them to independently commercialize the resulting advanced AI technologies.

Satya Nadella, Chairman and CEO of Microsoft, stated: "We formed our partnership with OpenAI around a shared ambition to responsibly advance cutting-edge AI research and democratize AI as a new technology platform. In this next phase of our partnership, developers and organizations across every industry will have access to the best AI infrastructure, models, and toolchain with Azure to build and run their applications."`,
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
            company: "Microsoft",
            companyDomain: "microsoft.com",
            announcedDate: new Date().toISOString(),
            url: "https://www.microsoft.com/en-us/microsoft-cloud/blog/2023/11/07/come-build-with-us-microsoft-and-openai-partnership-unveils-new-ai-opportunities/",
            triggers: ["Partnership", "Expansion"]
        },
        {
            id: "news_2",
            title: "Tesla Expands Gigafactory in Texas",
            description: "Tesla files permit for a $700M expansion of its Austin Gigafactory, aiming to increase production capacity for the Cybertruck.",
            content: `Tesla has officially filed for specialized permits to expand its Giga Texas facility in Austin. The investment, totaling over $700 million, will add approximately 1.4 million square feet of space to the existing factory.

The expansion is critical for the upcoming high-volume production of the Cybertruck and the development of Tesla's next-generation vehicle platform. The new buildings will include facilities for cell manufacturing, drive unit production, and a dedicated die-casting area.

Elon Musk has previously referred to Giga Texas as a "money furnace" during its startup phase, but the facility is now reaching significant production milestones, recently hitting 3,000 Model Y vehicles per week.`,
            image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2000&auto=format&fit=crop",
            company: "Tesla",
            companyDomain: "tesla.com",
            announcedDate: new Date(Date.now() - 86400000).toISOString(),
            url: "https://www.tesla.com/blog",
            triggers: ["Expansion", "Product Launch"]
        },
        {
            id: "news_3",
            title: "Google's Strategic Acquisition in Cloud Computing",
            description: "Google Cloud acquires cybersecurity firm Mandiant for $5.4 billion to bolster its security offerings against growing threats.",
            content: `Google LLC today announced it has completed the acquisition of Mandiant, Inc., a leader in dynamic cyber defense and response. Mandiant will join Google Cloud to help organizations improve their threat detection and incident response.

The acquisition brings together Google Cloud's security capabilities with Mandiant's frontline expertise. "The completion of this acquisition will enable us to deliver a comprehensive security operations suite with even greater capability to help customers stay protected at every stage of the security lifecycle," said Thomas Kurian, CEO of Google Cloud.

Mandiant is widely recognized for its high-profile incident response work and its annual M-Trends report, which provides critical insights into the evolving threat landscape.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_Cloud_logo.svg/1024px-Google_Cloud_logo.svg.png",
            company: "Google",
            companyDomain: "google.com",
            announcedDate: new Date(Date.now() - 172800000).toISOString(),
            url: "https://cloud.google.com/blog",
            triggers: ["M&A"]
        },
        {
            id: "news_4",
            title: "Amazon Web Services Launches New Region",
            description: "AWS opens a new infrastructure region in Spain, providing lower latency and greater data sovereignty for local customers.",
            content: `Amazon Web Services (AWS) today announced the opening of its newest infrastructure region, the AWS Europe (Spain) Region. This launch provides customers with more options for running their applications and serving users from data centers located in Spain.

The new region will enable local customers with data residency requirements to store their content in Spain with the assurance that they retain complete ownership and control over the location of their data.

AWS estimates that its investment in the new region will support more than 1,300 full-time jobs annually and contribute approximately $2.5 billion to the Spanish GDP over the next 10 years.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png",
            company: "Amazon",
            companyDomain: "amazon.com",
            announcedDate: new Date(Date.now() - 259200000).toISOString(),
            url: "https://aws.amazon.com/new",
            triggers: ["Expansion"]
        },
        {
            id: "news_5",
            title: "Apple Unveils New Vision Pro Headset",
            description: "Apple enters the spatial computing era with the launch of Vision Pro, a revolutionary mixed reality headset.",
            content: `Apple today unveiled Apple Vision Pro, a revolutionary spatial computer that seamlessly blends digital content with the physical world, while allowing users to stay present and connected to others.

Vision Pro creates an infinite canvas for apps that scales beyond the boundaries of a traditional display and introduces a fully three-dimensional user interface controlled by the most natural and intuitive inputs possible — a user's eyes, hands, and voice.

Featuring visionOS, the world's first spatial operating system, Vision Pro lets users interact with digital content in a way that feels like it is physically present in their space.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png",
            company: "Apple",
            companyDomain: "apple.com",
            announcedDate: new Date(Date.now() - 345600000).toISOString(),
            url: "https://www.apple.com/newsroom",
            triggers: ["Product Launch"]
        },
        {
            id: "news_6",
            title: "NVIDIA Hits Record Revenue Amid AI Boom",
            description: "NVIDIA reports a massive surge in quarterly revenue, driven by unprecedented demand for AI chips and data center solutions.",
            content: `NVIDIA today reported record revenue for the second quarter ended July 30, 2023, of $13.51 billion, up 101% from a year ago and up 88% from the previous quarter.
Data Center revenue was a record $10.32 billion, up 171% from a year ago and up 141% from the previous quarter. "A new computing era has begun. Companies worldwide are transitioning from general-purpose to accelerated computing and generative AI," said Jensen Huang, founder and CEO of NVIDIA.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/512px-Nvidia_logo.svg.png",
            company: "NVIDIA",
            companyDomain: "nvidia.com",
            announcedDate: new Date(Date.now() - 432000000).toISOString(),
            url: "https://nvidianews.nvidia.com/",
            triggers: ["Funding", "Expansion"]
        },
        {
            id: "news_7",
            title: "Meta Announces Major Workforce Restructuring",
            description: "Meta is reducing its headcount by approximately 10,000 employees as part of its 'Year of Efficiency' initiative.",
            content: `Meta CEO Mark Zuckerberg announced today that the company will reduce the size of its recruiting team and further downsize its tech and business groups in the coming months.
This follows a previous workforce reduction in late 2022. Zuckerberg described 2023 as the "Year of Efficiency," focusing on flattening the organization and removing layers of middle management to speed up decision-making.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/512px-Meta_Platforms_Inc._logo.svg.png",
            company: "Meta",
            companyDomain: "meta.com",
            announcedDate: new Date(Date.now() - 518400000).toISOString(),
            url: "https://about.fb.com/news/",
            triggers: ["Layoffs"]
        },
        {
            id: "news_8",
            title: "Google DeepMind Launches Gemini 1.5",
            description: "Google's AI research lab introduces Gemini 1.5, featuring a massive breakthrough in long-context understanding.",
            content: `Google DeepMind has unveiled its next-generation AI model, Gemini 1.5. This model offers significantly enhanced performance across various tasks and introduces a context window of up to 1 million tokens.
This breakthrough allows the model to process vast amounts of information, including entire libraries of code, long documents, and hours of video. It represents a major leap forward in AI capabilities.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/512px-Google_Gemini_logo.svg.png",
            company: "Google",
            companyDomain: "google.com",
            announcedDate: new Date(Date.now() - 604800000).toISOString(),
            url: "https://blog.google/technology/ai/",
            triggers: ["Product Launch", "Expansion"]
        },
        {
            id: "news_9",
            title: "Amazon's New Strategic Partnership with Anthropic",
            description: "Amazon invests up to $4 billion in Anthropic to advance generative AI and provide early access to its models on AWS.",
            content: `Amazon and Anthropic today announced a strategic collaboration that will bring together their respective technologies to accelerate the development of Anthropic's future foundation models and make them available to AWS customers.
As part of the collaboration, Anthropic will use AWS Trainium and Inferentia chips to build, train, and deploy its future foundation models, benefiting from AWS's price, performance, scale, and security.`,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/512px-Amazon_logo.svg.png",
            company: "Amazon",
            companyDomain: "amazon.com",
            announcedDate: new Date(Date.now() - 691200000).toISOString(),
            url: "https://www.aboutamazon.com/news",
            triggers: ["Partnership", "Funding"]
        }
    ]
};
