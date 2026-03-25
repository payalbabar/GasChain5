"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type Web3ContextType = {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if user was previously connected
    const checkConnection = async () => {
      if (typeof window !== 'undefined' && 'ethereum' in window) {
        try {
          // @ts-ignore
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts && accounts.length > 0) {
            setAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Failed to check Web3 connection", error);
        }
      }
    };
    checkConnection();

    // Listen to account changes
    if (typeof window !== 'undefined' && 'ethereum' in window) {
      // @ts-ignore
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
        } else {
          setAddress(null);
        }
      };
      
      // @ts-ignore
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => {
        // @ts-ignore
        if (window.ethereum.removeListener) {
          // @ts-ignore
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, []);

  const connect = async () => {
    setIsConnecting(true);
    try {
      if (typeof window !== 'undefined' && 'ethereum' in window) {
        // @ts-ignore
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts && accounts.length > 0) {
          setAddress(accounts[0]);
        }
      } else {
        alert("Please install MetaMask or another Web3 Wallet!");
      }
    } catch (error) {
      console.error("User rejected wallet connection", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    // Real Web3 doesn't force disconnect from DApp side, but we clear the local state.
  };

  return (
    <Web3Context.Provider value={{
      address,
      isConnected: !!address,
      isConnecting,
      connect,
      disconnect
    }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
}
