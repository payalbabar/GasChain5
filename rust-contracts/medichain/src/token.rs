#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, env, Address, Env, String, Vec, token::TokenClient};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Admin,
    TotalSupply,
    Balance(Address),
    Allowance(Address, Address),
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct TokenInfo {
    pub name: String,
    pub symbol: String,
    pub decimals: u32,
    pub total_supply: i128,
}

/// MediChain Reward Token (MRT)
/// A token for rewarding patients and doctors in the MediChain ecosystem
#[contract]
pub struct MediRewardToken;

#[contractimpl]
impl MediRewardToken {
    pub fn initialize(env: Env, admin: Address, total_supply: i128) {
        assert!(!env.storage().instance().has(&DataKey::Admin), "Already initialized");
        
        admin.require_auth();
        
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::TotalSupply, &total_supply);
        env.storage().persistent().set(&DataKey::Balance(admin.clone()), &total_supply);
    }

    pub fn total_supply(env: Env) -> i128 {
        env.storage().instance().get(&DataKey::TotalSupply).unwrap_or(0)
    }

    pub fn balance_of(env: Env, account: Address) -> i128 {
        env.storage().persistent().get(&DataKey::Balance(account)).unwrap_or(0)
    }

    pub fn transfer(env: Env, from: Address, to: Address, amount: i128) -> bool {
        from.require_auth();
        assert!(amount > 0, "Amount must be positive");

        let from_balance = Self::balance_of(env.clone(), from.clone());
        assert!(from_balance >= amount, "Insufficient balance");

        let to_balance = Self::balance_of(env.clone(), to.clone());

        env.storage().persistent().set(&DataKey::Balance(from), &(from_balance - amount));
        env.storage().persistent().set(&DataKey::Balance(to), &(to_balance + amount));

        true
    }

    pub fn mint(env: Env, to: Address, amount: i128) -> bool {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        let current_supply = Self::total_supply(env.clone());
        env.storage().instance().set(&DataKey::TotalSupply, &(current_supply + amount));
        
        let balance = Self::balance_of(env.clone(), to.clone());
        env.storage().persistent().set(&DataKey::Balance(to), &(balance + amount));

        true
    }

    pub fn burn(env: Env, from: Address, amount: i128) -> bool {
        from.require_auth();
        
        let balance = Self::balance_of(env.clone(), from.clone());
        assert!(balance >= amount, "Insufficient balance to burn");

        let current_supply = Self::total_supply(env.clone());
        env.storage().instance().set(&DataKey::TotalSupply, &(current_supply - amount));
        env.storage().persistent().set(&DataKey::Balance(from), &(balance - amount));

        true
    }

    pub fn reward_patient(env: Env, patient: Address, amount: i128) -> bool {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        Self::mint(env, patient, amount)
    }

    pub fn reward_doctor(env: Env, doctor: Address, amount: i128) -> bool {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        Self::mint(env, doctor, amount)
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let initial_supply: i128 = 1_000_000;

        MediRewardToken::initialize(env.clone(), admin.clone(), initial_supply);

        assert_eq!(MediRewardToken::total_supply(env.clone()), initial_supply);
        assert_eq!(MediRewardToken::balance_of(env.clone(), admin.clone()), initial_supply);
    }

    #[test]
    fn test_transfer() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let user = Address::generate(&env);
        let initial_supply: i128 = 1_000_000;

        MediRewardToken::initialize(env.clone(), admin.clone(), initial_supply);

        let transfer_amount = 100;
        MediRewardToken::transfer(env.clone(), admin.clone(), user.clone(), transfer_amount);

        assert_eq!(MediRewardToken::balance_of(env.clone(), admin.clone()), initial_supply - transfer_amount);
        assert_eq!(MediRewardToken::balance_of(env.clone(), user.clone()), transfer_amount);
    }

    #[test]
    fn test_mint_and_reward() {
        let env = Env::default();
        let admin = Address::generate(&env);
        let patient = Address::generate(&env);

        MediRewardToken::initialize(env.clone(), admin.clone(), 1_000_000);

        let reward_amount = 50;
        MediRewardToken::reward_patient(env.clone(), patient.clone(), reward_amount);

        assert_eq!(MediRewardToken::balance_of(env.clone(), patient.clone()), reward_amount);
        assert_eq!(MediRewardToken::total_supply(env.clone()), 1_000_000 + reward_amount);
    }
}
