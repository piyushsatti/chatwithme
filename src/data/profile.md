# Comprehensive Profile Summary

## About

**Home page introduction (raw)**

I am a Software Developer with a strong foundation in computer science, hands‑on freelance experience, and published research in algorithm development. Graduated with M.Sc. in Applied Computer Science at Concordia University (Montreal, Canada). I bring a trifecta: academic rigor, engineering experience, and entrepreneurial mindset.

**About page quotes (raw)**

- I'm a backend‑leaning developer with an M.Sc. I care about typed schemas, clean boundaries, and tests that read like specs.
- Fueled by: diet coke, whiteclaw, and ramen.

## Projects

### GameOps Suite (FastAPI + ETL + Discord)

- **Raw description**: End‑to‑end ops platform: Discord event ETL → MongoDB; FastAPI REST with authZ; containers on DigitalOcean; Redis; ~200 ms E2E typical actions; dashboard for player statistics.
- **Features mentioned**:
  - Ingest. Discord event hooks → ETL workers → MongoDB collections.
  - Serve. Role‑based FastAPI endpoints for CRUD + analytics.
  - Deploy. Containerized services on DigitalOcean droplets.
  - Real‑time announcements and sign‑ups.
  - Low‑latency (~200 ms typical action path).
  - Foundation for analytics dashboards and AI assistants.
  - Async stream processing for spikes.
  - Public read‑only endpoints with cached projections.
  - Data contracts for dashboard widgets.
- **Technologies mentioned**: Python, FastAPI, ETL, Discord, MongoDB, Docker, Redis, DigitalOcean, AuthZ.
- **Primary languages**: Python, Makefile.
- **Links**:
  - Portfolio page: `https://piyushsatti.github.io/projects/gameops-suite/`
  - Repository: `https://github.com/piyushsatti/Nonagon`
  - Demo: Not found
  - Docs: Not found
- **Timeline**: 2025‑03‑01 → 2025‑06‑01
- **Evidence signals**: tests – true; CI/CD – true; docs – true; architecture notes – true.

### Risk‑Emulated (Spring Boot + GraphQL)

- **Raw description**: Playable RISK backend using Spring Boot + GraphQL with a typed schema (createGame, reinforce, attack, gameStatus), map validator, State/Strategy engine, audit MoveLog, and CI gates.
- **Features mentioned**:
  - Backend‑only, rules‑accurate RISK implementation.
  - Exposes a typed GraphQL API for map creation and turn phases while isolating game logic behind domain services.
  - DDD entities (Game, Player, Territory, Continent, Card, MoveLog).
  - Phase/state engine using the State pattern.
  - Pluggable combat and reinforcement policies (Strategy).
  - Graph‑based validator enforces connected maps and continent bonuses.
  - Deterministic turns with MoveLog audit trail.
- **Technologies mentioned**: Java, Spring Boot, GraphQL, DDD, Docker, PostgreSQL, Testing.
- **Primary language**: Java.
- **Links**:
  - Portfolio page: `https://piyushsatti.github.io/projects/risk-emulated/`
  - Repository: `https://github.com/piyushsatti/old-risk-emulated`
  - Demo: Not found
  - Docs: Swagger UI (local)
- **Timeline**: 2024‑08‑01 → 2024‑11‑01
- **Evidence signals**: tests – false; CI/CD – false; docs – true; architecture notes – true.

### Min–Max Average Pooling Based Filter for Impulse Noise Removal

- **Raw description**: Proposes a denoising filter using min–max average pooling to better handle salt‑and‑pepper (impulse) noise. Improves signal quality while preserving edges by selectively pooling neighborhood statistics.
- **Features mentioned**:
  - A compact image filter that detects and cleans impulse specks in pictures without blurring details.
  - Leverages both min and max neighborhood values and averages them in a principled way to restore pixels robustly.
  - Quantitative metrics (PSNR, SSIM, IEF) and qualitative comparisons.
  - Pre‑alpha research tooling.
- **Technologies mentioned**: Python, MATLAB, image processing, filter design, denoising, signal processing.
- **Primary languages**: Python, MATLAB.
- **Links**:
  - Portfolio page: `https://piyushsatti.github.io/research/mmapf/`
  - Repository: `https://github.com/piyushsatti/GAMBIT`
  - Paper: DOI link (labelled “Paper”) – Not expanded
  - Demo: Not found
- **Publication info**: Published 2020‑06‑01 in IEEE Signal Processing Letters.
- **Evidence signals**: tests – false; CI/CD – false; docs – false; architecture notes – false.

## GitHub Repositories

### Nonagon

- **Description**: Backend micro‑service suite that handles API requests, command routing, and ETL into a document store. Built with FastAPI, Redis caching, and Dockerized deployment on DigitalOcean.
- **Primary languages**: Python, Makefile.
- **README content**: Includes description of the multi‑guild Discord automation platform, tech stack (Python 3.11+, FastAPI, Uvicorn, discord.py, MongoDB, Docker), setup instructions (environment variables, running with Docker Compose), project structure (FastAPI API, Discord bot, docs folder), and contribution guidelines.
- **Topics**: none.
- **Key features**: Multi‑guild Discord automation, bundled FastAPI service and Discord bot, containerized deployment, environment configuration via `.env` variables.
- **Evidence signals**: tests – true; CI/CD – true; docs – true; architecture notes – true.

### old‑risk‑emulated

- **Description**: Domain‑driven backend implementing a turn/attack engine, GraphQL API, and reproducible game logs. Built with Spring Boot, GraphQL, and PostgreSQL; containerized for local testing.
- **Primary language**: Java.
- **README content**: Detailed explanation of the RISK backend, features, system requirements, getting started steps, sample API usage, project structure (MVC separation), development practices, and future enhancements for human‑in‑the‑loop integration.
- **Topics**: none.
- **Key features**: Supports creating games with reinforcement, attack, and fortification phases; models entities (Continent, Territory, Player, Game, Ownership, Card, MoveLog); provides REST API documented via Swagger UI; uses H2 in‑memory database; includes basic authentication.
- **Evidence signals**: tests – false; CI/CD – false; docs – true; architecture notes – true.

### Dr.Garg‑flask‑website

- **Description**: Not found (repository has no description).
- **Primary languages**: HTML, Python, CSS, Batchfile, Procfile.
- **README content**: Not found (no README file in repo).
- **Topics**: none.
- **Key features**: Flask web application with routes for home, about, teaching, research, publications, team, and professional activities; uses JSON files to feed data into templates; renders templates using Jinja2 and serves static assets.
- **Evidence signals**: tests – false; CI/CD – false; docs – false; architecture notes – false.

### class‑to‑sql

- **Description**: Class to SQL is a Python module that allows the user to write Python classes and work with them using regular Python code. Primarily meant for smaller databases and projects.
- **Primary language**: Python.
- **README content**: Very brief description matching the repository description.
- **Topics**: none.
- **Key features**: Enables use of Python classes as database models; designed for small databases and projects.
- **Evidence signals**: tests – false; CI/CD – false; docs – false; architecture notes – false.

### GAMBIT

- **Description**: Not found (repository has no description).
- **Primary languages**: Python, MATLAB.
- **README content**: Describes the GUI tool for image denoising research (dubbed GAMBIT). Lists features such as generating denoised images across noise densities, computing performance metrics (PSNR, SSIM, IEF), qualitative and quantitative comparisons, plans for CLI tool development, installation instructions for the MATLAB API for Python, work‑to‑be‑done checklist, and reasons for the project.
- **Topics**: none.
- **Key features**: Generates denoised images across noise densities; computes metrics (PSNR, SSIM, IEF); offers qualitative and quantitative comparisons; pre‑alpha stage with planned CLI; provides setup guidance for MATLAB API for Python.
- **Evidence signals**: tests – false; CI/CD – false; docs – false; architecture notes – false.

## Keywords and Traits

- **Role descriptors**: Software Developer; backend‑leaning developer; M.Sc.; academic rigor; engineering experience; entrepreneurial mindset.
- **Professional traits**: strong foundation in computer science; hands‑on freelance experience; published research in algorithm development; care for typed schemas; clean boundaries; tests that read like specs.
- **Personal/fun**: diet coke; whiteclaw; ramen.
- **Technical keywords**: Python; Java; JavaScript/TypeScript; Ruby; HTML/CSS; C/C++; SQL; MATLAB; Bash; LaTeX; Git/GitHub; Docker; DigitalOcean; Vercel; Supabase; GitHub Actions; PostgreSQL; MongoDB; Redis; Kafka; Nginx; Elasticsearch; Postman; Jira/Trello; Astro; Next.js; Tailwind CSS; Flask; FastAPI; Spring Boot; Express.js/Node.js; Monolithic; Microservices; Serverless; LangGraph; Retrieval‑Augmented Generation (RAG); Apache Spark; NumPy; Pandas; PyTorch; Scikit‑learn; NLTK; Speechbrain; Matplotlib; Seaborn.
- **Project technologies**: FastAPI; ETL; Discord; MongoDB; Docker; Redis; DigitalOcean; AuthZ; Java; Spring Boot; GraphQL; DDD; PostgreSQL; Testing; image processing; filter design; denoising; signal processing.

## Evidence and Provenance

- **Evidence labels**: Home page about section and featured projects; About page introduction and technical skills; GameOps Suite project details; Risk‑Emulated project details; Research project description; GitHub repo links for GameOps (Nonagon) and Risk‑Emulated.
- **Evidence URLs**:
  - `https://piyushsatti.github.io/` (Home page)
  - `https://piyushsatti.github.io/about/` (About page)
  - `https://piyushsatti.github.io/projects/gameops-suite/`
  - `https://piyushsatti.github.io/projects/risk-emulated/`
  - `https://piyushsatti.github.io/research/mmapf/`
  - `https://github.com/piyushsatti/Nonagon`
  - `https://github.com/piyushsatti/old-risk-emulated`
  - `https://github.com/piyushsatti/GAMBIT`

## Canonicalization Summary

A portfolio project is linked to a GitHub repository only when the portfolio entry explicitly provides a repository URL matching a repository in the GitHub extraction. Otherwise, linkage is marked as “Not found.”

- **GameOps Suite / Nonagon**: Linked via explicit repo URL `https://github.com/piyushsatti/Nonagon`. Canonical ID links the portfolio project to GitHub repo `Nonagon`.
- **Risk‑Emulated**: Linked via explicit repo URL `https://github.com/piyushsatti/old-risk-emulated`. The canonical entry connects the portfolio project to `old-risk-emulated`.
- **Min–Max Average Pooling Based Filter / GAMBIT**: Linked via explicit repo URL `https://github.com/piyushsatti/GAMBIT`.
- **Other repositories**: Dr.Garg‑flask‑website and class-to-sql have no corresponding portfolio project and remain standalone canonical entities.

## Provenance

This summary was generated from two primary sources:

1. **Profile Data Extraction.pdf** – containing the raw portfolio information and keywords.
2. **github_extraction.json** – containing repository descriptions, README content, languages, features, and evidence signals.

The unified data was compiled without inference or rewriting; missing fields are marked as “Not found.”
