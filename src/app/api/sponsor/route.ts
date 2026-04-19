import { NextResponse } from "next/server";
import { TransactionBuilder, Server, Networks, Keypair, FeeBumpTransaction } from "stellar-sdk";

const HORIZON_URL = "https://horizon-testnet.stellar.org";

export async function POST(req: Request) {
  try {
    const { xdr } = await req.json();
    
    if (!xdr) {
      return NextResponse.json({ error: "Missing transaction XDR" }, { status: 400 });
    }

    // 1. Initialize Stellar Server for testnet
    const server = new Server(HORIZON_URL);
    const networkPassphrase = Networks.TESTNET;

    // 2. Decode the incoming unsigned/signed transaction from the user
    const tx = TransactionBuilder.fromXDR(xdr, networkPassphrase);

    // 3. Obtain sponsor's keypair from environment variables
    // For Demo purposes, if not set, we generate a random keypair and use it (mocked)
    const sponsorSecret = process.env.SPONSOR_SECRET_KEY;
    if (!sponsorSecret) {
      console.warn("SPONSOR_SECRET_KEY not set. Using mocked success response for advanced feature demo.");
      // For demo day, simulating a successful fee bump 
      return NextResponse.json({
        success: true,
        sponsored_xdr: xdr, // In a real scenario, this would be the FeeBumpTransaction signed by the sponsor
        message: "Fee sponsored successfully (Mock mode)"
      });
    }

    const sponsorKeypair = Keypair.fromSecret(sponsorSecret);

    // 4. Create a Fee Bump Transaction
    // A FeeBumpTransaction wraps the inner transaction and pays the fees.
    const feeBumpTx = new FeeBumpTransaction(
      tx as any,
      sponsorKeypair.publicKey(),
      "2000" // 2x the base fee of 1000 stroops
    );

    // 5. Sign the Fee Bump Transaction with the sponsor's key
    feeBumpTx.sign(sponsorKeypair);

    // 6. Return the sponsored and signed XDR to the client
    // Note: The client doesn't need to sign again for the fees, they just submit or sign the inner tx
    const sponsoredXdr = feeBumpTx.toXDR();

    return NextResponse.json({
      success: true,
      sponsored_xdr: sponsoredXdr,
      message: "Fee sponsored successfully"
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
