# FINAL SUBMISSION CHECKLIST

## ✅ Code Ready (Already Done)

- [x] CI/CD Pipeline setup (.github/workflows/ci.yml)
- [x] Token Contract (rust-contracts/medichain/src/token.rs) 
- [x] Inter-Contract Calls (lib.rs add_record_with_reward)
- [x] Event Listeners (src/hooks/useContractEvents.ts)
- [x] Updated README (production-ready)
- [x] Deployment Guide (DEPLOYMENT_GUIDE.md)
- [x] Production Build (npm run build ✓)

## ⏳ Manual Steps Required (You do these)

### STEP 1: Push Current Changes to GitHub
```bash
cd c:\Users\Paras\Desktop\stellar-4task\Green_Belt

# Stage all changes
git add .

# Create final commit
git commit -m "feat: complete production setup with token, inter-contract calls, and event streaming"

# Check commits (should show 8+)
git log --oneline | head -10

# Push to GitHub
git push origin main
```

**⚠️ IMPORTANT:** Don't skip this step - your README and contracts need to be on GitHub

---

### STEP 2: Deploy Frontend to Vercel (5-10 minutes)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New" → "Project"
3. Select Green_Belt repository
4. Add environment variable:
   - Key: `NEXT_PUBLIC_PINATA_JWT`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (your Pinata JWT from .env.local)
5. Click "Deploy"
6. Wait for green checkmark ✓
7. Copy the live URL: `https://green-belt-xxxxx.vercel.app`

---

### STEP 3: Update README with Live URL

After Vercel deployment:

```bash
# Edit README.md and update this line:
# Change from: https://[your-vercel-url].vercel.app
# To:          https://your-actual-vercel-url.vercel.app

git add README.md
git commit -m "docs: add live Vercel deployment URL"
git push origin main
```

---

### STEP 4: Deploy Soroban Contracts (15-20 minutes)

#### Install Soroban CLI:
```bash
# Windows PowerShell:
cargo install --locked soroban-cli

# Verify installation:
soroban --version
```

#### Build Contracts:
```bash
cd c:\Users\Paras\Desktop\stellar-4task\Green_Belt\rust-contracts\medichain
cargo build --target wasm32-unknown-unknown --release
```

#### Setup Stellar Account:
```bash
# Create a key (one-time)
soroban keys generate my-key --global

# Get your public key
soroban keys address my-key

# Fund your account:
# 1. Go to https://stellar.expert/test
# 2. Paste your public key (starts with G)
# 3. Request 100 XLM for testing
# 4. Wait ~5 seconds
```

#### Deploy Main MediChain Contract:
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/medichain.wasm \
  --source-account my-key \
  --network testnet
```

**Copy the Contract ID (starts with C), example:**
```
CBQZ2NNFV5H5XQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQ
```

#### Deploy Token Contract (same WASM file):
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/medichain.wasm \
  --source-account my-key \
  --network testnet
```

**Copy this Token Contract ID too!**

#### Get Transaction Hashes:
```bash
# Check your recent transactions:
soroban contract invoke \
  --id CBQZ2NNFV5H5... \
  --source-account my-key \
  --network testnet \
  --help
```

---

### STEP 5: Update README with Contract Addresses

Edit README.md and find these sections:

```markdown
## 🔗 Smart Contracts

### Contract Addresses
- **MediChain Main Contract:** CBQZ2NNFV5H5XQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQSXQ
- **MediReward Token (MRT):** CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC

### Deployment Transaction Hashes
- **Main Contract Deploy:** [hash from soroban output]
- **Token Deploy:** [hash from soroban output]
- **Inter-Contract Reward Call:** [make a call and copy the hash]
```

Then commit:
```bash
git add README.md
git commit -m "docs: add Soroban contract addresses on Stellar testnet"
git push origin main
```

---

### STEP 6: Add Mobile Screenshot (5 minutes)

1. Open http://localhost:3000 in Chrome
2. Press F12 (DevTools)
3. Click device toolbar (top-left of DevTools)
4. Select "iPhone 12" (375px width)
5. Take screenshot (Ctrl+Shift+S)
6. Save to: `c:\Users\Paras\Desktop\stellar-4task\Green_Belt\public\mobile-screenshot.png`
7. Commit:
```bash
git add public/mobile-screenshot.png
git commit -m "docs: add mobile screenshot for responsive design proof"
git push origin main
```

---

## Final Verification Checklist

Before submitting, verify in your repository on GitHub:

- [ ] At least 8 commits showing in commit history
- [ ] README shows live Vercel URL
- [ ] README shows Soroban contract addresses
- [ ] README shows transaction hashes
- [ ] README shows mobile screenshot (public/mobile-screenshot.png)
- [ ] CI/CD badge showing green ([![CI Pipeline](...)badge.svg])
- [ ] .github/workflows/ci.yml exists
- [ ] rust-contracts/medichain/src/token.rs exists with token contract
- [ ] src/hooks/useContractEvents.ts exists for real-time events

---

## Ready to Submit?

Once all above steps are done:

**Go to the submission portal and provide:**
- Your GitHub repository URL
- Any additional notes about the implementation

Example: `https://github.com/your-username/Green_Belt`

---

## TIMELINE

- **STEP 1 (Push):** 2 minutes ⏱️
- **STEP 2 (Vercel):** 10 minutes ⏱️
- **STEP 3 (README URL):** 2 minutes ⏱️
- **STEP 4 (Soroban Deploy):** 20 minutes ⏱️
- **STEP 5 (Contract Addresses):** 5 minutes ⏱️
- **STEP 6 (Mobile Screenshot):** 5 minutes ⏱️

**TOTAL: ~45 minutes** to complete submission! 🚀

---

Need help with any step? See DEPLOYMENT_GUIDE.md for detailed instructions.
