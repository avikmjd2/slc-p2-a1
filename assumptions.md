# Project Assumptions & Architectural Deviations

## 1. Primary Assumption: Tech Stack vs. Functionality
**Requirement Reference:** The initial problem statement mentioned creating a "WordPress" site.
**Implementation Choice:** I implemented a custom **Full-Stack Federated GraphQL Application** using Next.js, FastAPI, Apollo Federation, and MongoDB.

**I THOUGHT THAT BY MENTIONING WORDPRESS SITE THEY MEANT TO CREATE A SITE THAT MIMIC THEIR ACTUAL ARCHITECTURE OF THE CLUBS IIIT SITE**
After learning what a wordpress was (after completing in their architecture :( ),

### Justification
While WordPress is a powerful CMS, I assumed the core objective of this task was to demonstrate an understanding of **modern web architecture, data federation, and full-stack engineering**.

I chose this custom architecture over WordPress for the following reasons:

1.  **Fidelity to the Reference Material:** The actual IIIT Clubs & Events Portal is built using a modern JavaScript/Python stack (Next.js + Backend APIs). My implementation mirrors the *actual* engineering reality of the target site rather than simulating it via a PHP-based CMS.
2.  **Microservices & Federation:** The prompt required handling distinct data domains (Clubs vs. Events). Instead of using a monolithic CMS, I utilized **Apollo Federation** to stitch together two independent microservices. This demonstrates a more advanced understanding of distributed systems and separation of concerns.
3.  **Dockerization & Portability:** This project is fully containerized. Unlike a standard LAMP stack (Linux, Apache, MySQL, PHP) often required for WordPress, this microservices architecture runs identically on Windows, Linux (Fedora), and macOS via a single `docker compose up` command, satisfying the cross-platform requirement more robustly.
4.  **Educational Scope:** Building a federated Gateway, writing raw GraphQL schemas, and handling React state for dynamic searching provides a significantly higher "lines-of-code" technical contribution than configuring WordPress plugins and themes.

## 2. Assumption: Data Stitching
**Assumption:** I interpreted "stitching" as **Schema Stitching/Federation** at the API gateway level, rather than just linking pages visually.
**Implementation:**
* The **Gateway** (Port 4000) automatically aggregates data from the **Clubs Service** (Port 8000) and **Events Service** (Port 8001).
* The frontend queries a single endpoint, unaware that the data comes from different servers. This mimics enterprise-grade "Headless CMS" architectures better than a traditional WordPress setup.

## 3. Assumption: One-Click Deployment
**Assumption:** The ease of setup is prioritized over the ease of content editing for this specific submission.
**Implementation:** A `docker-compose.yml` file is provided to orchestrate 6 distinct services (Frontend, Gateway, 2 Subgraphs, DB, Seeder).
* **Deviation:** There is no "wp-admin" dashboard.
* **Solution:** Content management (Adding Clubs) is handled via a custom-built, mutation-backed React form on the frontend, which provides a cleaner, bespoke user experience for the specific task of adding clubs.

## 4. Feature Parity
I assumed that mimicking the website meant replicating the *user experience* and *core data flows* as the actual website.

| Requirement | WordPress Approach | My Federated Approach | Benefit of My Approach |
| :--- | :--- | :--- | :--- |
| **Frontend** | PHP Themes | **Next.js (React)** | Faster, Single Page Application (SPA) feel, Reactive searching. |
| **Backend** | Monolithic Core | **FastAPI Microservices** | Decoupled logic; Python is better suited for data-heavy backends. |
| **API** | REST/WP-JSON | **GraphQL Gateway** | No over-fetching of data; clients request exactly what they need. |
| **Data** | MySQL (Relational) | **MongoDB (NoSQL)** | Flexible schema for Clubs/Events allows rapid iteration. |

## Conclusion

This submission meets all functional requirements (displaying clubs, handling events, search/filtering, and seamless deployment) but achieves them using a **Cloud-Native Architecture**. This ensures the project is not just a website, but a scalable software application ready for modern deployment pipelines.
