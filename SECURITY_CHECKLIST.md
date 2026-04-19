# Security Checklist for MediChain

## 🔐 Authentication & Authorization
- [x] Wallet connection is enforced per session.
- [x] No private keys are stored in localStorage or sessionStorage.
- [x] Authorization checks exist on smart contract execution.
- [x] All read/write access to medical data requires valid permissions.

## 🔗 Smart Contract (Soroban/Rust)
- [x] Input validation for all external functions.
- [x] Checked math operations (preventing overflow/underflow).
- [x] Inter-contract calls use correct authorization parameters.
- [x] Re-entrancy guards not necessary in Soroban, but state updates are handled before inter-contract communication.

## 🌐 Next.js & Frontend
- [x] Environment variables containing sensitive keys (`SPONSOR_SECRET_KEY`) are kept strictly Server-Side only.
- [x] Dependency vulnerabilities patched (`npm audit fix`).
- [x] Cross-Site Scripting (XSS) mitigated through Next.js built-in DOM escaping.
- [x] Vercel edge caching configurations avoid caching authenticated pages.

## 🛡️ Monitoring & Indexing
- [x] Data indexing endpoint (`/api/indexer`) correctly limits the query sizes to prevent DDoS.
- [x] Fee sponsorship endpoint verifies the input payload structure before attempting to sign.
