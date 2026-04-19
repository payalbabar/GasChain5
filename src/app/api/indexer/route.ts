import { NextResponse } from "next/server";

const HORIZON_URL = "https://horizon-testnet.stellar.org";
const MEDICHAIN_CONTRACT_ID = "CBG5DNSZQQJITR7OH5ELPDXLUG3EEX7W3FWNCFOZANQSXMQDUR2LGW5N";

export async function GET() {
  try {
    // 1. Fetch recent transactions that involve the smart contract ID
    // We query the Horizon API's /accounts/ /transactions endpoint or just look for the contract's public key if it was an account.
    // In Soroban, contract interactions are recorded as transactions. 
    // We can query the horizon URL for recent transactions involving the contract.
    const res = await fetch(
      `${HORIZON_URL}/contracts/${MEDICHAIN_CONTRACT_ID}/transactions?limit=50&order=desc`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch on-chain data" }, { status: 500 });
    }

    const data = await res.json();
    
    // Process and index the raw blockchain data
    const indexedData = data._embedded.records.map((tx: any) => ({
      tx_hash: tx.hash,
      created_at: tx.created_at,
      successful: tx.successful,
      fee_charged: tx.fee_charged,
      source_account: tx.source_account,
      ledger: tx.ledger,
      signatures: tx.signatures,
    }));

    // Return the indexed data as a metrics payload for dashboard usage
    return NextResponse.json({
      success: true,
      metadata: {
        contract_id: MEDICHAIN_CONTRACT_ID,
        total_indexed_records: indexedData.length,
        network: "testnet",
        timestamp: new Date().toISOString()
      },
      data: indexedData
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
