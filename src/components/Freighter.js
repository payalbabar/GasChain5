import { isConnected, requestAccess, getAddress, signTransaction } from "@stellar/freighter-api";
import * as StellarSdk from "stellar-sdk";

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");
const networkPassphrase = StellarSdk.Networks.TESTNET;

export const checkConnection = async () => {
  const result = await isConnected();
  return result.isConnected;
};

export const retrievePublicKey = async () => {
  const accessObj = await requestAccess();
  if (accessObj.error) throw new Error(accessObj.error.message);
  return accessObj.address;
};

export const getBalance = async () => {
  const addressObj = await getAddress();
  if (addressObj.error) throw new Error(addressObj.error.message);
  const account = await server.loadAccount(addressObj.address);
  const xlmBalance = account.balances.find((b) => b.asset_type === "native");
  return xlmBalance ? xlmBalance.balance : "0";
};

export const sendXLM = async (destination, amount) => {
  const addressObj = await getAddress();
  if (addressObj.error) throw new Error(addressObj.error.message);
  const sourcePublicKey = addressObj.address;
  const sourceAccount = await server.loadAccount(sourcePublicKey);
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: destination,
        asset: StellarSdk.Asset.native(),
        amount: amount.toString(),
      })
    )
    .setTimeout(30)
    .build();
  const signedResult = await signTransaction(transaction.toXDR(), { networkPassphrase });
  if (signedResult.error) throw new Error(signedResult.error.message);
  const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(signedResult.signedTxXdr, networkPassphrase);
  const res = await server.submitTransaction(signedTransaction);
  return res;
};

/**
 * Advanced Feature: Fee Sponsorship
 * Wraps a user-signed transaction in a Fee Bump Transaction via backend
 */
export const sendSponsoredTransaction = async (transactionXDR) => {
  try {
    // 1. Send the user-signed XDR to our sponsorship API
    const response = await fetch("/api/sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xdr: transactionXDR }),
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || "Sponsorship failed");
    }

    // 2. The result contains the FeeBumpTransaction XDR signed by the sponsor
    const { sponsored_xdr } = result;

    // 3. Submit the sponsored transaction to Stellar
    const sponsoredTx = StellarSdk.TransactionBuilder.fromXDR(sponsored_xdr, networkPassphrase);
    const submissionResult = await server.submitTransaction(sponsoredTx);
    
    return submissionResult;
  } catch (error) {
    console.error("Sponsored Transaction Error:", error);
    throw error;
  }
};
