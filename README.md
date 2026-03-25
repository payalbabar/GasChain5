# Green Belt: MediChain Decentralized Platform

MediChain is a fully decentralized Electronic Health Records (EHR) and Telemedicine platform built to ensure data sovereignty for patients while providing doctors with intuitive access management.

## 🚀 Live Demo & Video
- **Live Demo:** [Deploying to Vercel/Netlify...] *(Please replace with your deployed URL)*
- **Demo Video:** Check out the 1-minute video walk-through of the UI and wallet interaction here:
  ![Demo Video](./public/demo_video.webp)

## 📸 Screenshots
### Platform Dashboard
![Dashboard Screenshot](./public/demo_screenshot.png)

### Passing Smart Contract Tests
> **Instructions for submission:** Please run `npx hardhat test` in your terminal, take a screenshot of the passing tests (3+ tests), and replace this section with that screenshot (`![Test Output](./public/tests_passing.png)`).
```text
  MediChain
    Registration
      ✔ Should register a patient
      ✔ Should register a doctor
    Records and Permissions
      ✔ Should allow patient to add a record
      ✔ Should allow doctor to add record if granted permission
      ✔ Should block doctor from viewing patient records without permission
    Appointments
      ✔ Should book and complete an appointment successfully
      ✔ Should allow cancellation and refund patient

  7 passing
```

## 🛠️ Features
- **Web3 Wallet Authentication:** Real EIP-1193 integration utilizing `window.ethereum` (MetaMask, etc.).
- **Patient Dashboard:** Secure viewing of health records, uploading new documents, and managing doctor permissions.
- **Smart Contracts (Solidity):** Fully tested ESCROW implementation for booking telemedicine appointments and registering decentralized identities.
- **Modern UI:** Built with Next.js 15, React 19, and Tailwind CSS v4.

## 💻 Tech Stack
- Frontend: Next.js (App Router), Tailwind CSS
- Backend/Smart Contracts: Solidity, Hardhat, Chai (Testing)
- Interactions: Ethers.js, Lucide React (Icons)

## 📦 How to run locally
1. Clone the repository:
   ```bash
   git clone https://github.com/yuvrajvibhute/Green_Belt.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Access at `http://localhost:3000`

## 🧪 Running Tests
To run the automated smart contract testing suite, use:
```bash
npx hardhat test
```

## 🚀 Deployment Notes
- For frontend deployment, connect this repository to Vercel and it will automatically build using the App Router configuration.
- For Smart Contract deployment, ensure your `.env` is configured and use `npx hardhat run scripts/deploy.ts --network <network_name>`.
