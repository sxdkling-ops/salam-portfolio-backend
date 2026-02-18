export const projects = [
  {
    id: "p1",
    title: "Smart AI-Powered QA Automation",
    category: "AI",
    description:
      "Automated QA review system that transforms long manual checking into fast, consistent AI-assisted validation.",
    problem:
      "Manual QA reviews required ~8 hours for 15 calls per QA, slowing output and limiting scalability.",
    solution:
      "Built an automated pipeline that extracts required details, applies rule-based logic + AI analysis, and outputs structured results in minutes per file.",
    tools: ["Python", "Google Colab", "LLM", "RAG Workflow", "JSON Processing"],
    impact:
      "Reduced review time to ~2–3 minutes per file and improved overall efficiency by 60–70%."
  },

  {
    id: "p2",
    title: "RAG Chatbot for Provider / Clinic / Facility Information",
    category: "AI",
    description:
      "Retrieval-Augmented Generation chatbot that answers internal queries using company documents as the grounded data source.",
    problem:
      "Agents spent excessive time searching documents for provider, clinic, and facility details, increasing resolution time.",
    solution:
      "Implemented document chunking + vector search + LLM-based answering, enabling natural language queries with context-aware responses.",
    tools: ["RAG", "Vector Search", "LLM", "Document Chunking", "Prompt Engineering"],
    impact:
      "Reduced agent search time by 45% and improved resolution speed by 30%."
  },

  {
    id: "p3",
    title: "PCC Branch Locator System",
    category: "Data Analytics",
    description:
      "Interactive branch locator system with mapping, routing, lab test search, and card verification functionality.",
    problem:
      "Users and support teams had slow and inconsistent ways to locate branches and validate information during live calls.",
    solution:
      "Developed a searchable locator with sorting logic, route instructions, and verification tools to improve accessibility and data accuracy.",
    tools: ["Web Application", "Maps Integration", "Search Logic", "Data Validation", "UI/UX"],
    impact:
      "Improved navigation experience and increased hotline data accuracy by approximately 40%."
  },

  {
    id: "p4",
    title: "Schedule Adherence Dashboard (DAX + Logic Redesign)",
    category: "Data Analytics",
    description:
      "Rebuilt DAX measures and reporting logic to ensure accurate and reliable workforce adherence tracking.",
    problem:
      "Incorrect DAX logic created reporting inconsistencies and reduced trust in adherence metrics.",
    solution:
      "Redesigned DAX calculations and improved data modeling so adherence tracking aligned with operational rules.",
    tools: ["Power BI", "DAX", "Data Modeling", "Reporting Logic"],
    impact:
      "Improved workforce visibility and compliance tracking by 25%."
  },

  {
    id: "p5",
    title: "PCC Expansion Map Analysis (Geospatial + Operations Data)",
    category: "Data Analytics",
    description:
      "Geospatial and operational data analysis system to support strategic branch expansion decisions.",
    problem:
      "Branch expansion decisions lacked integrated analysis of operational performance and geographic demand indicators.",
    solution:
      "Merged operational metrics with geospatial datasets and built scoring models to highlight high-potential expansion areas.",
    tools: ["Geospatial Analysis", "Data Scoring", "Mapping", "Dashboarding"],
    impact:
      "Improved strategic decision-making speed and accuracy by approximately 35%."
  }
];
