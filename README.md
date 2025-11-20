Revolutionising Voting System Using AI & Blockchain — Prototype
===============================================================

This project is a multi-module prototype showcasing how modern technologies can transform the voting process. It integrates slot booking, AI-based face recognition, and a blockchain-inspired voting system to demonstrate a secure, streamlined, and scalable digital voting workflow.

The prototype includes:

*   **Slot Booking Application** – Allow voters to reserve voting time slots.
    
*   **AI Face Recognition System** – Register and verify voters using computer vision.
    
*   **Blockchain Voting Prototype** – Simulated blockchain voting flow with transaction-style confirmation.
    

This system is part of a research-oriented initiative aimed at reducing election-day congestion, improving voter authentication, and enhancing transparency using blockchain concepts.

Project Architecture
--------------------

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   Revolutionising Voting System/  ├── slot-booking/               # Node.js + JS based slot booking web app  ├── ai-face-recognition/        # Flask + OpenCV based voter verification system  └── blockchain-voting/          # React + TS prototype simulating blockchain voting UX   `

Each module is independent but collectively forms the end-to-end voting flow.

1\. Slot Booking System (Node.js + Vanilla JS)
----------------------------------------------

A web-based application allowing voters to book time slots for voting with real-time availability.

### Features

*   Voter login with basic validation
    
*   12 hourly slots from 6:00 AM – 7:00 PM
    
*   Max 50 voters per slot
    
*   Change/rebook option
    
*   JSON-based persistent storage
    
*   Responsive UI (CSS Grid + Flexbox)
    

### Tech Stack

*   **Runtime:** Node.js + Express
    
*   **Frontend:** HTML, CSS, JavaScript
    
*   **Storage:** JSON file storage
    
*   **API:** REST API (CORS enabled)
    

### Run Backend

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd slot-booking/backend  npm install  node server.js   `

### Run Frontend

Open the file directly in your browser:slot-booking/frontend/login.html

2\. AI Face Recognition System (Flask + OpenCV)
-----------------------------------------------

A prototype system for voter registration and verification using camera-based face capture.

_Originally designed for YOLO, the current implementation uses:_

*   Haar Cascade face detection
    
*   Naive pixel-based face matching
    
*   Flask API for registration & verification
    

**Note:** Backend currently uses server webcam, not uploaded frontend images.

### Key Components

*   app.py – Flask routes (/, /register, /verify)
    
*   utils/face\_recognition.py – Save face data
    
*   utils/face\_verification.py – Verify voter
    
*   data/ – Stores faces, voter IDs, and voting records
    

### Data Files

*   faces\_data.pkl
    
*   names.pkl
    
*   voted\_ids.pkl
    

### Run Application

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd ai-face-recognition  python -m venv .venv  # On Windows:  .\.venv\Scripts\activate  # On Mac/Linux:  # source .venv/bin/activate  pip install -r requirements.txt  python app.py   `

### Major Issues (Important)

*   Frontend uploads images → backend ignores them and uses VideoCapture(0)
    
*   Pixel-level matching is not robust
    
*   Pickle files have no encryption
    
*   Server must have a physical webcam to run
    

### Recommended Improvements

*   Switch to reading uploaded images
    
*   Implement YOLO or deep learning embeddings (ArcFace, Dlib)
    
*   Move from pickle to SQLite/MongoDB
    
*   Add encryption & access rules
    

3\. Blockchain Voting Prototype (React + TypeScript)
----------------------------------------------------

A simulation of blockchain-style voting flow demonstrating candidate selection, confirmation dialogs, and transaction hash generation.

### Features

*   Candidate selection
    
*   Confirmation dialog
    
*   Transaction-like delay
    
*   Pseudo transaction hash
    
*   Admin dashboard
    
*   Local simulated blockchain (localStorage)
    

### Tech Stack

*   React + TypeScript + Vite
    
*   Tailwind CSS
    
*   shadcn UI & Radix primitives
    
*   TanStack Query
    
*   Sonner (toast notifications)
    

### Simulated Blockchain Behavior

*   Votes stored in browser localStorage
    
*   Hash is fake 64-hex string
    
*   Artificial latency to mimic confirmation
    
*   Admin login with hardcoded password: admin123
    

### Run the Prototype

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd blockchain-voting  npm install  npm run dev   `

Unified System Flow
-------------------

1.  **Voter books a slot** (Slot Booking App)
    
2.  **On voting day** → Voter verifies face (AI Face Recognition System)
    
3.  **After verification** → Voter votes through UI (Blockchain Voting Prototype)
    
4.  System generates a transaction-style hash & shows results dashboard
    

_This flow simulates a future-ready digital voting environment._

Installation Overview
---------------------

**1\. Slot Booking**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd slot-booking/backend  npm install  node server.js   `

**2\. AI Face Recognition**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd ai-face-recognition  pip install -r requirements.txt  python app.py   `

**3\. Blockchain Voting**

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd blockchain-voting  npm install  npm run dev   `

Future Roadmap
--------------

### AI Module

*   \[ \] YOLO-based face detection
    
*   \[ \] Deep-learning face embeddings
    
*   \[ \] Anti-spoofing (liveness detection)
    

### Slot Booking

*   \[ \] Move to MongoDB/PostgreSQL
    
*   \[ \] Admin dashboard
    
*   \[ \] Multi-center support
    
*   \[ \] SMS/Email confirmation
    

### Blockchain Voting

*   \[ \] Smart contracts (Solidity)
    
*   \[ \] Deploy to testnet
    
*   \[ \] MetaMask wallet integration
    
*   \[ \] Verifiable on-chain vote audit logs
    
*   \[ \] Zero-knowledge privacy mechanisms
    

Security Considerations
-----------------------

**This prototype is NOT suitable for real elections.**Real systems must include:

*   End-to-end encryption
    
*   Tamper-proof smart contracts
    
*   Auditable identity verification
    
*   Strict privacy guarantees
    
*   Multi-factor authentication
    
*   Independent verification mechanisms
    

License
-------

This project is a prototype for educational & research purposes.