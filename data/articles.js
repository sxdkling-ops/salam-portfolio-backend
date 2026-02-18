export const articles = [
  {
    id: "a1",
    title: "The Future of RAG in Enterprise Environments",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    category: "AI Engineering",
    excerpt:
      "Why simple chatbots fall short in real organizations and how retrieval-augmented generation makes answers more reliable and usable.",
    content: `The biggest shift in enterprise AI is not just bigger language models. It is relevance.

Most businesses do not need a chatbot that can “sound smart.” They need a system that can answer questions using the same policies, documents, and internal knowledge their teams trust every day. That is where Retrieval-Augmented Generation (RAG) becomes practical. Instead of relying only on what a model learned during training, RAG retrieves the most relevant passages from your private sources and uses them as grounding context to generate a response.

Why this matters is simple: hallucinations are expensive. A confident but wrong answer can cause compliance issues, operational mistakes, and loss of trust. With RAG, the system can point back to the source passages used to form an answer, making responses easier to verify.

A production-grade RAG system usually has these layers:

1) Data ingestion and cleaning
Documents need to be loaded from sources like Google Drive, SharePoint, Confluence, databases, or internal file systems. Normalize formats, remove duplicates, and attach useful metadata (owner, department, timestamp, access rules).

2) Chunking strategy
Chunking is one of the most important decisions. If chunks are too large, retrieval becomes noisy. If they are too small, the system loses meaning and context. Common approaches include section-based chunking, sentence windows, or hybrid chunking that preserves headings and structure.

3) Embeddings and indexing
Text chunks are converted into embeddings and stored in a vector database. The embedding model selection matters because it affects recall and semantic matching. Indexing should also support metadata filtering so you can narrow results by department, document type, or recency.

4) Retrieval and reranking
A basic retrieval step pulls the top candidates. A reranker can then improve quality by selecting the most relevant passages from that candidate set. This is where many RAG systems gain a noticeable jump in accuracy.

5) Generation with citations
The LLM uses retrieved chunks to answer the question. In enterprise, it is best to return the final answer with clear references to the source documents, and to keep logs for audits.

If you are building RAG for real organizations, there are also two non-negotiables: security and evaluation.

Security means access control has to be enforced at retrieval time, not just in the UI. The model should never see content a user is not allowed to see.

Evaluation means you should measure performance continuously. Track retrieval precision, answer correctness, citation quality, and failure cases. In enterprise settings, “works on a demo” is not enough. The system must be consistent under messy, real-world inputs.

RAG does not magically solve every problem, but it changes the game. It turns AI from a general chatbot into a tool that can operate with the same facts your teams already use to do their jobs. That is what makes it enterprise-ready.`,
  },

  {
    id: "a2",
    title: "Building Resilient Data Pipelines",
    date: "Aug 05, 2023",
    readTime: "7 min read",
    category: "Data Engineering",
    excerpt:
      "A practical guide to keeping your data flow stable when sources change, files break, or systems fail at the worst time.",
    content: `Data pipelines rarely fail because of one dramatic bug. Most of the time, they fail because of small, normal things: a column gets renamed, an API returns a null, a file arrives late, or a source system suddenly changes its format.

A resilient data pipeline is designed with the assumption that something will go wrong. Not “if,” but “when.” The goal is not perfection. The goal is controlled failure, fast recovery, and minimal business impact.

Here are the key habits that make pipelines resilient in real production environments.

Schema validation before damage
One of the most common causes of broken analytics is silent schema drift. The pipeline should validate column names, data types, and expected ranges before writing into downstream tables. If something unexpected shows up, fail early and alert the team. It is better to stop a pipeline than to spread corrupted data.

Idempotent runs
A pipeline should be safe to rerun. If a job crashes halfway, the rerun should not duplicate records or produce inconsistent outputs. This often means using partition-based writes, merge/upsert strategies, or staging tables.

Circuit breakers and retries
Retries are useful, but only when done carefully. A flaky API might recover in the next attempt. But uncontrolled retries can make outages worse. Add circuit breakers that pause calls after repeated failures and recover after a cooldown.

Checkpointing and incremental loads
Avoid rebuilding everything from scratch if you do not need to. Incremental pipelines reduce load, shorten runtime, and are easier to recover. Keep checkpoints so you can resume from the last successful point.

Data quality checks
Resilience is not only “pipeline ran successfully.” It is also “output data makes sense.” Add basic checks like row count thresholds, null ratios, duplicate detection, and outlier detection. A job that runs but produces nonsense is still a failure.

Observability and logging
If a pipeline fails, you need to know why in minutes, not hours. Log inputs, versions, counts, and step-level timings. Track failures with clear error messages and include enough context so you do not have to reproduce the issue just to understand it.

Graceful degradation
Not every failure must be a full stop. In some cases, you can allow partial delivery. For example, load what is available, mark the missing partitions, and alert the business. This depends on the use case, but it can prevent dashboards from going completely dark.

A resilient pipeline is basically a pipeline that respects reality. Sources will break. Formats will drift. Human errors will happen. If your pipeline anticipates those issues, you spend less time firefighting and more time building value.

The best pipeline is not the one that never fails. It is the one that fails safely, recovers quickly, and keeps your business confident in the data.`,
  },

  {
    id: "a3",
    title: "Python for Data Science: The Core Basics That Matter",
    date: "Feb 16, 2026",
    readTime: "9 min read",
    category: "Data Science",
    excerpt:
      "A clean, beginner-friendly foundation: variables, data types, operators, conditionals, loops, functions, modules, and core data structures.",
    content: `Python is popular in data science for one big reason: it helps you go from messy data to useful output fast. Whether you are cleaning spreadsheets, building reports, or running machine learning models, most of the work still depends on basic foundations.

If you get the basics right, everything else becomes much easier. If you skip them, even simple tasks feel confusing.

This article covers the most important fundamentals you will use repeatedly in data science work.

Variables, data types, and operators
A variable is like a labeled container. It stores a value so you can reuse it later.

x = 10
name = "Alice"

Here, x stores a number and name stores text.

Python also needs to understand what kind of data it is working with. These are the most common ones:
- int: whole numbers like 10, 25, 100
- float: numbers with decimals like 3.14 or 2.5
- str: text like "Hello"
- bool: True or False

Operators are how you do math and comparisons:
- + add
- - subtract
- * multiply
- / divide
- == check if equal
- != check if not equal

You will use these in almost every script you write.

Conditionals and loops
Conditionals help your program make decisions.

if x > 5:
  print("Greater than 5")
else:
  print("5 or less")

This logic is powerful in data work. You can tag records, apply rules, or filter values based on conditions.

Loops repeat actions automatically. They are useful when you need to process many rows, files, or values.

for i in range(5):
  print(i)

This prints numbers from 0 to 4.

In real data science tasks, loops often show up when reading multiple files, calculating metrics across columns, or cleaning records in batches.

Functions and modules
A function is a reusable block of code. Instead of rewriting the same logic, you write it once and reuse it.

def greet(name):
  print("Hello", name)

Functions help keep code clean and organized, especially in notebooks and scripts.

Modules are libraries made by other people. You import them when you need extra tools.

import math
import pandas as pd

The math module helps with calculations, while pandas is one of the most common tools for organizing and analyzing data.

Lists, dictionaries, sets, and tuples
These are core structures for storing multiple values.

Lists store items in order:
my_list = [1, 2, 3]

Dictionaries store key-value pairs:
my_dict = {"a": 1}

Sets store unique values with no duplicates:
my_set = {1, 2, 3}

Tuples are like lists but cannot be changed:
my_tuple = (1, 2, 3)

These structures are essential when dealing with datasets, grouping data, tracking unique categories, or mapping labels to values.

Why this matters
If you understand these fundamentals, you can move faster when you learn pandas, visualization, SQL integration, or machine learning. The fancy stuff becomes less intimidating because you already understand how Python thinks.

Data science is not just about complex models. A huge part of the job is writing small, reliable code that cleans data, checks logic, and produces outputs you can trust. That starts with the basics.`,
  },

  {
    id: "a4",
    title: "From Google Sheets Tracking to a Live Web-Based KPI Dashboard",
    date: "Feb 02, 2026",
    readTime: "7 min read",
    category: "Web Development",
    excerpt:
      "How years of manual tracking in Google Sheets turned into a structured, live project and KPI system built with a straightforward web stack.",
    content: `From 2022 to 2025, I used Google Sheets to track my work, progress, and KPIs. It started simple: a list of projects, then a status column, then priorities, owners, deadlines, and eventually even budget and savings indicators.

Over time, it became my main way of seeing how things were really moving.

But as the list grew, the manual work started to slow everything down. Updating statuses, filtering views, and keeping the sheet clean took more time than it should. That was the moment I realized the setup was good, but the tool was holding it back. I needed the same logic, but in a more structured form.

So I rebuilt it as a web-based project and KPI dashboard.

What I kept from the sheet
The main goal was not to change the workflow. It was to make it easier to use daily while keeping the same tracking style:
- clear project list
- consistent status tracking
- priorities and ownership
- deadlines and progress
- KPI monitoring with a structured view

What changed in the system version
In a web app, the structure becomes more natural:
- validation prevents messy or incomplete entries
- filtering and views can be faster and more consistent
- you can separate projects, KPIs, owners, and history into proper tables
- it is easier to maintain long-term without turning into a “mega sheet”

Tech stack used
I used a straightforward stack focused on reliability and clarity:
- HTML, CSS, Bootstrap
- JavaScript with AJAX for smoother interactions
- PHP and MySQL for the backend and database

No frameworks. Just a clean setup that is stable and easy to deploy.

Why this build felt rewarding
There is something satisfying about seeing years of tracking turn into a working system you actually use every day. It felt like leveling up from “manual tracking” to “a real tool.”

And honestly, that is the bigger lesson here: spreadsheets are great for starting, but once your tracking becomes a real process, it can be worth turning it into a system. You keep what works, remove the friction, and make it scale.`,
  },

  {
    id: "a5",
    title: "A Clinic Procedure and Branch Availability Chatbot Built with n8n",
    date: "Feb 01, 2026",
    readTime: "6 min read",
    category: "Automation",
    excerpt:
      "A chat-based tool that answers clinic service questions using real branch data, designed to respond like a staff member, not a generic bot.",
    content: `In most clinics, simple questions still take too long to answer.

Patients ask things like, “Is CBC and urinalysis available in this branch?” Front desk staff often check spreadsheets, PDFs, or ask around. That wastes time and leads to inconsistent answers, especially when services differ per branch, licensing, or running schedules.

To solve that, I built a clinic procedure and branch availability lookup chatbot using n8n.

What it does
Users ask normal questions in chat:
- is a test available in a branch
- what days a service runs
- turnaround time for results
- preparation requirements for patients

Instead of guessing, the chatbot checks actual clinic data and replies with clear, structured information. The response is written like a clinic staff member would explain it, not like a “robot answer.”

Why this approach works
The key is the data source. Clinics already have the truth somewhere, usually in spreadsheets. The chatbot makes that truth searchable in plain language, so people do not need to manually open files just to answer routine inquiries.

Tech stack used
The build uses n8n for workflow automation and orchestration:
- chat trigger to receive questions
- an AI agent node to reason about what the user is asking and which data to check
- an OpenAI chat model to generate the final response
- conversation memory so follow-up questions still make sense
- Google Sheets as the structured data source for lab, imaging, and branch directory info

The result
This tool reduces repeated manual checking and helps standardize answers across staff. It also improves patient experience because they get accurate information faster.

It is not meant to replace clinic staff. It is meant to remove the boring lookup work so staff can focus on actual patient support.`,
  },

  {
    id: "a6",
    title: "From OCR to Structured JSON: Turning Messy Documents into Usable Data",
    date: "Jan 24, 2026",
    readTime: "10 min read",
    category: "Document AI",
    excerpt:
      "A real-world pipeline: upload a receipt or invoice, extract text with OCR, then use an LLM to convert it into clean structured output.",
    content: `OCR can read, but it does not understand.

If you have ever run OCR on receipts or invoices, you know the result: text out of order, numbers mixed with labels, weird characters, and totals that are hard to trust. The data is technically extracted, but it is not really usable yet.

That is what this project solves.

The idea is simple: upload to OCR, OCR to an LLM, then structured output.

The pipeline
Step 1: Upload
Users upload common document formats such as PDF, TIF, PNG, or JPG.

Step 2: OCR extraction
The system runs OCR to pull out as much text as possible. This produces raw text output that is often messy.

Step 3: LLM interpretation
Instead of trying to “regex everything,” the raw OCR text is sent to a model through Groq. The model’s job is not OCR. Its job is interpretation:
- identify vendor and recipient
- detect totals, taxes, dates, currency
- separate line items and quantities
- understand layout even when text is scrambled

Step 4: Structured output
After interpretation, the system returns structured JSON with validation rules and basic math checks. That JSON can be used for automation, reporting, or integrations.

UI output views
To keep it transparent, the UI shows the same document in three views:
1) OCR text, so you can see what was actually scanned
2) receipt view, so humans can read it cleanly
3) raw JSON, so systems and developers can use it directly

Tech stack used
Frontend
- React
- Tailwind CSS
- Lucide icons
- drag-and-drop upload UI and tabbed views
OCR and file handling
- Tesseract.js for OCR
- PDF.js for PDF rendering
- UTIF for TIFF decoding
- canvas preprocessing to improve scan quality (sharpen, threshold, contrast, upscale)

Backend
- Node.js
- Express
- Groq SDK API
- JSON-only structured output with validation and math checking

What this project is really about
The goal is not just to scan documents. The goal is to remove the manual cleanup after OCR. That is the step that usually costs time, creates errors, and blocks automation.

There are still edge cases and accuracy improvements to work on, but seeing a messy upload turn into structured data in seconds is the kind of output that makes document automation actually feel real.`,
  },

  {
    id: "a7",
    title: "Fixing AI-Generated Meeting Minutes with a Simple Automation Workflow",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    category: "Productivity Automation",
    excerpt:
      "Google Meet can generate meeting notes, but they are often generic. This workflow converts them into structured, review-ready minutes.",
    content: `Google Meet already has AI through Gemini. After a meeting, it can record, transcribe, and generate a minutes of the meeting file automatically.

Sounds great, but in practice, the output is often too generic. It reads fine, but it is not really reusable. It does not feel like something you can directly share, archive, and act on without editing.

So I built a small workflow to fix that.

The main idea
Instead of accepting the default summary format, I convert it into structured data first, then generate a cleaner final output from that structure.

How the workflow works
1) Detect the new summary file
After a meeting ends, the AI summary file appears in Google Drive. The workflow detects the new file.

2) Pull the raw text
The workflow extracts the text from the file.

3) Identify who should receive it
It checks which emails have access to the document or were part of the meeting context.

4) Convert to structured JSON
The text is sent to an AI again, but this time with a controlled output format. Instead of freeform paragraphs, the model generates structured JSON that includes sections like:
- agenda and topics
- decisions made
- action items
- owners and due dates (if available)
- follow-ups and next steps

5) Generate an HTML minutes file
Using the JSON, the system generates an HTML version that is cleaner and easier to review.

6) Send via email
The final HTML version is sent to the relevant participants via Gmail.

Why this works better
Same meeting. Same AI. Better output.

The difference is control. Once you force structure, you can make the minutes consistent, searchable, and reusable. It becomes something you can archive and reference without feeling like you are reading a generic recap.

This workflow turns auto-generated notes into structured, review-ready minutes without manual rewriting.`,
  },

  {
    id: "a8",
    title: "What I Learned Creating a Short AI Video Ad with Gemini and Veo 3",
    date: "Jan 12, 2026",
    readTime: "5 min read",
    category: "Generative Media",
    excerpt:
      "A quick, honest review of what looks amazing in AI video generation, what still breaks, and why prompt iteration plus human review still matters.",
    content: `I recently used Gemini and Veo 3 to create a short cinematic advertisement for a shampoo product. It was only around eight seconds, but it was enough time to notice what AI video generation is already great at, and what it still struggles with.

What impressed me the most
The visuals and motion looked surprisingly realistic. Hair movement, lighting, and the overall cinematic feel were strong. The output felt like something that could pass as a real shot at a quick glance, especially if you are watching casually.

Where things still need human eyes
Text elements are still the weak spot.

Even if the scene looks polished, text can show small issues:
- typos
- duplicated words
- weird spacing
- alignment problems

And because text is usually what people read first, those small mistakes can make the whole output feel less professional fast.

What this taught me about prompting
The biggest lesson is that small prompt changes can make a big difference. You can get two outputs that look totally different even if the prompts are only slightly adjusted.

That is why prompt iteration matters. You are not just “telling AI what to do.” You are steering it. You test, tweak, and refine until you get something that fits the goal.

Final takeaway
AI can absolutely speed up video prototyping and multimedia production, but it still needs human review and refinement for professional results.

It is powerful, but it is not set-and-forget. At least not yet.`,
  },

  {
    id: "a9",
    title: "Spatial Interpolation: Filling the Gaps in Heatmaps with Limited Data",
    date: "Dec 17, 2025",
    readTime: "8 min read",
    category: "Geospatial Analytics",
    excerpt:
      "When your map data creates holes, spatial interpolation can estimate values in missing areas and turn scattered points into a usable heatmap.",
    content: `I worked on a project called Map Analysis where the goal was to visualize the Philippines using calculated optimal scores and display them as a heatmap. Darker areas represented higher concentration or stronger potential, while lighter areas represented lower potential.

The challenge appeared immediately: the data did not cover the entire country. When mapped into a grid, the result had visible gaps or “holes.” It was not wrong, but it was not helpful either. A heatmap should feel continuous enough to interpret.

That is where spatial interpolation comes in.

What spatial interpolation means
Spatial interpolation is a GIS method that estimates values in areas with no direct data using nearby known values. The logic is straightforward: places that are closer tend to be more similar.

If you only have a limited set of known points (like branches, sensors, or scored locations), interpolation helps you estimate what the areas around them might look like.

A simple example
To understand it better, I built a smaller example using Makati City.

- The known values were represented by a few points.
- The map area was divided into small grid cells.
- Each grid cell was assigned a value based on its nearest known point.
- The closer a grid cell was to a known point, the stronger the influence.

The result was a grid heatmap that “filled in” the missing areas and removed the holes.

Why it matters
When you visualize business potential, demand, or coverage, gaps can mislead interpretation. Spatial interpolation helps you create a clearer continuous surface, especially when your raw data is limited.

It does not replace real data. It estimates. But when used responsibly, it turns scattered points into a more useful map for decision-making.

For me, the biggest win was seeing a map go from “patchy” to “readable.” That is when the visualization starts to support decisions instead of just showing raw points.`,
  },

  {
    id: "a10",
    title: "A Call Center Schedule Adherence Dashboard with Dynamic Insights in Power BI",
    date: "Nov 20, 2025",
    readTime: "9 min read",
    category: "Business Intelligence",
    excerpt:
      "A Power BI dashboard powered by a large simulated dataset, featuring dynamic KPI cards, period comparisons, ranking logic, and forecasting visuals.",
    content: `I built a call center schedule adherence dashboard in Power BI using a simulated dataset generated in Python. The dataset was created to mirror real call center behavior, making it useful for practicing real operational analytics without using any sensitive data.

The model is powered by a dataset with over 292,000 rows generated in Python.

What the dashboard tracks
Schedule adherence is often broken down into two main measures:
- minutes in adherence
- minutes out of adherence

From these, adherence percentage becomes a core KPI. The dashboard makes it easy to monitor performance across different time levels while keeping the logic consistent.

What is new in this version
1) Dynamic KPI cards
I built interactive measures that adapt based on a parameter slicer so the report can switch between year, month, and date views without breaking the KPIs.

2) Time comparison logic
I added previous-period measures and delta percentage measures, including visual indicators for trend direction. This makes it easier to answer a basic ops question: “Are we improving or getting worse?”

3) Top and bottom performer ranking
Using dynamic DAX ranking, the dashboard can surface top and bottom performers for any selected timeframe. This makes the dashboard useful for coaching and targeted interventions.

4) Trend and forecast visualization
I included visuals that show trend and forecast patterns for adherence percent and minutes in or out of adherence. This supports both monitoring and planning.

Why this matters for operations
Schedule adherence is one of those metrics where small improvements can have big downstream effects: service levels, staffing efficiency, customer experience, and even agent stress.

A dashboard like this is useful because it creates a consistent way to answer operational questions quickly:
- where are the biggest adherence issues
- who needs support
- what patterns repeat over time
- what the next period might look like based on trend and seasonality

Building this with a simulated dataset made it easier to experiment with logic, forecast methods, and interactive design, while still keeping the insights grounded in how real operations behave.`,
  },

  {
    id: "a11",
    title: "Forecasting Schedule Adherence with Python and Power BI",
    date: "Nov 15, 2025",
    readTime: "10 min read",
    category: "Predictive Analytics",
    excerpt:
      "How a synthetic dataset was built in Python, then modeled in Power BI using trend and seasonality to forecast adherence for 2026.",
    content: `Over a few weeks, I built a simulated dataset of call center schedule adherence from scratch in Python. While the dataset is dummy, it mirrors real call center behavior and supports realistic analysis like year-over-year changes, month-to-month movement, and week-over-week shifts.

Dataset coverage and structure
The dataset spans January 2024 to December 2025 and contains 292,401 rows. Each row represents daily adherence performance for an agent, including supervisor grouping.

Typical columns include:
- date
- agent id
- agent name
- reporting supervisor
- minutes in adherence
- minutes out adherence
- activities

Forecast focus: adherence in 2026
The main forecasting target was adherence percentage.

The measure was designed as a ratio of in-adherence minutes over total minutes, then adjusted using trend and seasonality components. This matters because raw ratios can be noisy. Trend and seasonality help explain stable patterns and repeating weekly behavior.

How seasonality was handled
Seasonality was computed using historical weekly adherence patterns. This gives the model a way to represent common cycles such as:
- consistent weekly dips
- predictable peaks
- recurring operational patterns

Key result
The model forecasts an average adherence rate around 91.9% for 2026, with subtle month-to-month variation that feels consistent with a mature operations environment.

Next steps and extensions
Forecasting is only one part of operational analytics. After establishing a stable forecast, the natural next moves are:
- visualizing year-over-year, month-over-month, and week-over-week changes
- adding agent-level clustering to detect groups of top and bottom performers
- comparing statistical forecasting approaches (ARIMA, SARIMAX) against tools like Prophet

Why this build matters
Forecasting can feel intimidating until you build one yourself. Once you do, you realize it is mostly about understanding patterns, choosing the right level of granularity, and validating that results make operational sense.

This project helped me connect data generation, modeling, and BI storytelling into one end-to-end workflow.`,
  },

  {
    id: "a12",
    title: "Understanding Outliers and Using Z-Scores in Data Analysis",
    date: "Nov 10, 2025",
    readTime: "8 min read",
    category: "Data Analysis",
    excerpt:
      "Outliers can be errors or insights. This guide explains what they are, why they matter, and when the Z-score method is a good fit.",
    content: `When working with data, not every value fits neatly into the pattern. Some values sit far away from the rest, either unusually small or extremely large. These are outliers.

Outliers can look like mistakes at first, but they can also be the most interesting part of the dataset. They can represent fraud, risk, special cases, or real behavior that deserves attention.

What outliers are
Outliers are data points that behave differently from the majority.

A simple example: imagine most employees earn between 40,000 and 70,000. Then one record shows 250,000. That single value can change averages, distort charts, and trigger questions:
- is this a leadership salary
- is this a special role
- is it a typo

Why outliers matter
Outliers matter because they:
1) affect statistical results like mean and correlation
2) can indicate data entry or processing errors
3) can reveal real insights like high-value customers, risks, or fraud

Ways to detect outliers
There is no single best method. The right approach depends on the data and the goal. Common approaches include:
- visual inspection using plots
- IQR for skewed distributions
- Z-score for distributions closer to normal

The Z-score method
A Z-score measures how far a value is from the mean, in standard deviations.

On the Z-score scale:
- 0 means exactly average
- positive means above average
- negative means below average

A common rule is:
If Z is greater than 3 or less than -3, the observation is considered an outlier.

When to use Z-score
Z-score works best when:
- your data is continuous numerical data
- the distribution is roughly bell-shaped
- you have enough records for stable averages and standard deviation

When to avoid Z-score
Avoid it when:
- the data is heavily skewed
- sample size is very small
- the values are categories, not numbers

Final thought
Outliers are not automatically “bad.” The goal is not to delete them. The goal is to identify them, understand them, and decide how to treat them based on the story the data is telling.`,
  },

  {
    id: "a13",
    title: "SARIMAX Explained: A Practical Forecasting Model for Time Series Data",
    date: "Nov 01, 2025",
    readTime: "11 min read",
    category: "Time Series Forecasting",
    excerpt:
      "A clear explanation of SARIMAX, time series basics, and why this model is useful for real forecasting tasks with trend, seasonality, and external factors.",
    content: `I got curious about how forecasting works and decided to build one myself.

I created a simple Python notebook that uses SARIMAX to forecast daily sales. It includes an automatic moving-average fallback when data is limited. The notebook loads a CSV, fits the model, plots the forecast, and saves results as a downloadable CSV.

Before you use SARIMAX, it helps to understand what it is actually modeling.

What time series data is
Time series data is a collection of numbers recorded over time in order. Each value has a timestamp, like a date or time. Examples:
- daily sales
- weekly tickets resolved
- monthly revenue
- hourly sensor readings

What a forecasting model does
A forecasting model looks at past patterns to predict future values. It is not magic. It is pattern learning with assumptions.

What SARIMAX stands for
SARIMAX means:
Seasonal AutoRegressive Integrated Moving Average with eXogenous factors

That is a long name, but it is built from smaller pieces:

AR (AutoRegressive)
Today’s value can depend on past values, like yesterday’s sales.

I (Integrated)
The model can remove trend effects so it focuses on changes, not just raw level.

MA (Moving Average)
The model learns from past prediction errors, not just past values.

S (Seasonal)
The model captures repeating cycles, like weekly patterns or yearly behavior.

X (Exogenous)
Optional external factors can be included, such as marketing spend, holidays, promotions, or weather.

Why SARIMAX is useful
SARIMAX is widely used because it can handle:
- trend
- seasonality
- short-term dependencies
- and optional outside drivers

It is especially helpful when you have time series data with clear repeating patterns, like weekly cycles, and you want a model that is interpretable and structured.

A practical mindset when using it
SARIMAX is powerful, but it still needs good habits:
- clean timestamps
- consistent frequency (daily, weekly, monthly)
- enough history for seasonality patterns
- evaluation using train/test splits or backtesting

Forecasting becomes much easier once you stop treating it like a black box. When you understand what the model is trying to capture, you can debug results, explain them to others, and trust the output more realistically.`,
  },
];
