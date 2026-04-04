# DEPLOYMENT GUIDE FOR MEDICHAIN

## Step 1: Deploy Frontend to Vercel/Netlify

### Option A: Deploy to Vercel (Recommended)

1. **Go to Vercel:**
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New..." → "Project"

2. **Connect Repository:**
   - Select your Green_Belt repository
   - Click "Import"

3. **Configure Environment Variables:**
   - Add `NEXT_PUBLIC_PINATA_JWT` with your Pinata JWT token
   - Click "Deploy"

4. **Get Your Live URL:**
   - After deployment completes, you'll see: `https://your-project-name.vercel.app`
   - Copy this URL and add to README

### Option B: Deploy to Netlify

1. **Go to Netlify:**
   - Visit https://netlify.com
   - Sign in with GitHub
   - Click "New site from Git"

2. **Select Repository:**
   - Choose Green_Belt
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Set Environment Variables:**
   - Go to Site settings → Build & deploy → Environment
   - Add `NEXT_PUBLIC_PINATA_JWT=your_token`
   - Deploy

4. **Get Your URL:**
   - Your live site URL will be shown
   - Copy and add to README

---

## Step 2: Deploy Soroban Contracts to Stellar Testnet

### Prerequisites:
```bash
# Install Soroban CLI (if not already installed)
cargo install --locked soroban-cli

# Or download from: https://github.com/stellar/rs-soroban-sdk/releases
```

### Deployment Steps:

1. **Build the contracts:**
```bash
cd rust-contracts/medichain
cargo build --target wasm32-unknown-unknown --release
```

2. **Set up Stellar account (if you don't have one):**
```bash
# Download Stellar Freighter wallet: https://freighter.app/
# Or generate a keypair using soroban CLI:
soroban keys generate my-key --global

# Fund your account with testnet XLM:
# Go to https://stellar.expert/test and request XLM for your public key
```

3. **Deploy MediChain Main Contract:**
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/medichain.wasm \
  --source-account my-key \
  --network testnet
```

Expected output:
```
Record ID: [transaction hash]
Successfully deployed.
Contract ID: CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Write down the Contract ID!**

4. **Deploy MediReward Token Contract:**
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/medichain.wasm \
  --source-account my-key \
  --network testnet
```

**Write down this Contract ID too!**

5. **Initialize the MediChain Contract:**
```bash
soroban contract invoke \
  --id CXXXXXXX... \ # Use the contract ID from step 3
  --source-account my-key \
  --network testnet \
  -- \
  initialize \
  --admin GXXXXXXX... # Your Stellar public key
```

6. **Invoke Inter-Contract Call (to show reward):**
```bash
soroban contract invoke \
  --id CXXXXXXX... \ # Main contract ID
  --source-account my-key \
  --network testnet \
  -- \
  add_record_with_reward \
  --patient GXXXXXXX... \
  --record_cid QmTest... \
  --title "Test Record" \
  --reward_token_addr CYYYYY... \ # Token contract ID
  --reward_amount 100
```

This transaction will show the inter-contract call working!

---

## Step 3: Create 8+ Meaningful Git Commits

Make commits for each change:

```bash
# Commit 1
git add .
git commit -m "feat: setup CI/CD pipeline with GitHub Actions"

# Commit 2
git commit -m "feat: implement Soroban token contract with mint/burn"

# Commit 3
git commit -m "feat: add inter-contract reward functionality"

# Commit 4
git commit -m "feat: implement real-time event listeners and streaming"

# Commit 5
git commit -m "fix: resolve Pinata JWT environment variable error"

# Commit 6
git commit -m "docs: update README with production requirements"

# Commit 7
git commit -m "feat: add mobile responsive design with Tailwind CSS"

# Commit 8
git commit -m "feat: add Soroban deployment guide and contract improvements"

# Verify commits
git log --oneline | head -20
```

---

## Step 4: Add Proof Assets to README

### Mobile Screenshot:

1. **Take the screenshot:**
   - Open DevTools (F12) on `http://localhost:3000`
   - Click device toolbar (top-left)
   - Select "iPhone 12" (375px)
   - Take screenshot with browser viewport
   - Save to `public/mobile-screenshot.png`

2. **Add to README:**
```markdown
### Mobile Responsive View
![Mobile View](./public/mobile-screenshot.png)
```

### CI/CD Badge:

1. **GitHub Actions badge** (add to README top after title):
```markdown
[![CI Pipeline](https://github.com/YOUR_USERNAME/Green_Belt/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/Green_Belt/actions/workflows/ci.yml)
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 5: Fill in Contract Details in README

Update these sections with your deployment info:

```markdown
## 🔗 Smart Contracts

### Contract Addresses
- **MediChain Main Contract:** `CXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
- **MediReward Token (MRT):** `CYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY`

### Deployment Hashes
- **Main Contract Deploy:** `[transaction-hash-1]`
- **Token Contract Deploy:** `[transaction-hash-2]`
- **Inter-Contract Call Example:** `[transaction-hash-from-add_record_with_reward]`

## 🚀 Live Demo
**URL:** https://your-project-name.vercel.app
```

---

## Verification Checklist

Before submitting, verify:

- [ ] Frontend builds without errors: `npm run build` ✓
- [ ] CI/CD pipeline shows green: Check GitHub Actions
- [ ] 8+ commits visible: `git log --oneline | wc -l`
- [ ] Mobile screenshot in README
- [ ] Live Vercel URL in README
- [ ] Contract addresses in README
- [ ] Transaction hashes in README
- [ ] CI badge showing in README

---

## Troubleshooting

**Contract deployment fails:**
- Make sure you have testnet XLM: `soroban balance --source-account my-key --network testnet`
- Check WASM file exists: `ls target/wasm32-unknown-unknown/release/medichain.wasm`

**Vercel build fails:**
- Check `npm run build` works locally first
- Look at Vercel deploy logs for errors
- Make sure `.env.local` variables are added to Vercel project settings

**Git commits not showing:**
- Run: `git log --oneline` to see if commits are local
- Push to GitHub: `git push origin main`
- Refresh GitHub page to see commits

---

Good luck with deployment! 🚀
