# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1e33defd-f591-4a5d-9f80-932df5ade32f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1e33defd-f591-4a5d-9f80-932df5ade32f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

# Revolutionising Voting using AI & Blockchain — Prototype

A prototype frontend demonstrating a blockchain-style voting flow and results dashboard. This project demonstrates the UX and state management for a larger system titled "Revolutionising Voting using AI and Blockchain." For this prototype the blockchain is simulated locally (see details below).

Summary
- Purpose: Demonstrate vote selection, confirmation, submission and results visualization with a blockchain-like UX (transaction delay, transaction hash).
- Prototype status: Demo only — the blockchain is simulated in-browser and not secure for real elections.

Tech stack
# Revolutionising Voting using AI & Blockchain — Prototype

A prototype frontend demonstrating a blockchain-style voting flow and results dashboard. This project demonstrates the UX and state management for a larger system titled "Revolutionising Voting using AI and Blockchain." For this prototype the blockchain is simulated locally (see details below).

Summary
- Purpose: Demonstrate vote selection, confirmation, submission and results visualization with a blockchain-like UX (transaction delay, transaction hash).
- Prototype status: Demo only — the blockchain is simulated in-browser and not secure for real elections.

Tech stack
- React, TypeScript, Vite
- Tailwind CSS, shadcn / Radix UI primitives
- React Router, TanStack Query
- Sonner for toasts

Quick start
```powershell
npm install
npm run dev
```

Key files
- `src/main.tsx` — React entry mounting `<App />`.
- `src/App.tsx` — App composition: providers (theme, react-query), router, toasters.
- `src/context/VotingContext.tsx` — Central voting state, submission flow, admin flags.
- `src/utils/blockchainService.ts` — Simulated blockchain backend (stores votes in `localStorage`, generates pseudo transaction hashes, and simulates latency).
- `src/utils/candidatesData.ts` — Sample candidate list used by the UI.
- `src/components/*`, `src/components/ui/*` — UI components and shadcn wrappers used throughout the app.

Simulated blockchain (important)
- Storage: votes are stored in the browser's `localStorage` under a project key (not on a network).
- Transaction hash: `generateTransactionHash()` returns a pseudo-random 64-hex string prefixed with `0x` purely for UX.
- Latency: calls include artificial delays to mimic blockchain confirmation time.
- Admin: demo admin login is implemented with a hardcoded password (`admin123`) — not secure for production.

Why this is a prototype
This repo focuses on UX, state management and flow validation. It intentionally uses a local simulation instead of smart contracts, wallet integration, or production-grade security. The prototype helps validate integration points and user flows before investing in full blockchain and AI development.

Recommended next steps to progress from prototype → production
1. Implement a smart contract to manage votes and election rules; deploy to a testnet.
2. Add wallet integration (e.g., MetaMask) and use `ethers.js` or `web3.js` for signed transactions.
3. Replace simulated storage with on-chain transactions or a secure backend + indexing (e.g., TheGraph).
4. Harden admin flows and add role-based access, logging and audits.

Resume-friendly blurb (suggested)
"Built a prototype frontend for ‘Revolutionising Voting using AI and Blockchain’: implemented voting flow and a blockchain-simulation to validate UX; used React/TypeScript, Tailwind and TanStack Query."

Security note
This prototype is not suitable for collecting real votes. Real elections require rigorous cryptographic guarantees, verifiability, privacy protections and audits.

If you want, I can:
- update this README with a focused section showing how to integrate `ethers.js` and MetaMask, or
- draft a 2–3 line resume description tailored to a specific role.

---
