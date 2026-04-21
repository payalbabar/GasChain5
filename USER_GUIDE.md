# GasChain | LPG Connect User Guide & Technical Documentation

Welcome to **GasChain (LPG Connect)**, the next generation of decentralized Electronic Health Records (EHR) built on the Stellar network using Soroban smart contracts.

## 🏁 Getting Started

### 1. Requirements
- **Browser:** Chrome, Brave, or Firefox.
- **Wallet:** [Freighter Wallet](https://www.freighter.app/) extension installed.
- **Network:** Switch Freighter to **Testnet**.

### 2. Connection
- Open [GasChain](https://lpg-connect-wallet.vercel.app/).
- Click **"Connect Wallet"** in the top right corner.
- Approve the connection request in Freighter.

## 🏥 Core Features

### 📄 Uploading Medical Records
1. Navigate to the **Dashboard**.
2. Click **"New Record"**.
3. Choose a file (PDF, JPG, PNG).
4. Fill in the metadata (Type, Provider, Tags).
5. Click **"Submit"**.
   - *Advanced Feature:* Your first 3 transactions are **sponsored** by the GasChain platform. You don't need XLM to start!

### 🔐 Managing Access
- Each record is encrypted before being stored on IPFS.
- You own the decryption keys.
- To share a record with a doctor:
  1. Click on the record detail.
  2. Click **"Grant Access"**.
  3. Enter the Doctor's **Stellar Wallet Address**.
  4. Set an expiry duration.
  5. Sign the transaction.

### 📈 Viewing Metrics
- Visit the [Live Metrics Dashboard](https://lpg-connect-wallet.vercel.app/dashboard/metrics) to see platform growth, network health, and transaction logs.

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS.
- **On-Chain Logic:** Rust / Soroban Smart Contracts.
- **Wallet Integration:** @stellar/freighter-api.
- **Storage:** IPFS (via Pinata) for record content.
- **Indexing:** Custom Horizon API Poller.
- **Monitoring:** Vercel Analytics + Speed Insights.

### Fee Sponsorship (Gasless)
GasChain utilizes **Stellar Fee Bump Transactions (SEP-15)**. 
- When a user submits a transaction without sufficient XLM, the frontend sends the XDR to our `/api/sponsor` endpoint.
- Our backend validates the transaction and wraps it in a `FeeBumpTransaction` signed by the platform's Fee Pool account.

### Data Security
- **Encryption:** AES-256 for record content.
- **Hashing:** SHA-256 hashes of records are stored on-chain to ensure immutability.
- **Access Control:** Managed via the Soroban contract state (using `Map<Address, AccessInfo>`).

## ❓ Support & Feedback
If you encounter any issues, please submit them via our [Community Twitter](https://twitter.com/payalbabar) or check the project README for the latest updates.
