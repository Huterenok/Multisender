use near_sdk::{
	borsh::{self, BorshDeserialize, BorshSerialize},
	env,
	json_types::U128,
	log, near_bindgen, require,
	serde::{Serialize, Deserialize},
	AccountId, Promise, Balance,
};


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
struct Multisender {}


#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Operation {
	 address: AccountId,
	 amount: U128,
}

impl Default for Multisender {
	fn default() -> Self {
			Multisender {}
	}
}

#[near_bindgen]
impl Multisender {
	#[payable]
	pub fn multisend(transactions: Vec<Operation>) {
			let caller = env::predecessor_account_id();
			let attached_deposit = env::attached_deposit();

			log!("Caller: {}, attached_deposit {}", caller, attached_deposit);

			let mut total: Balance = 0;
			for account in &transactions {
				assert!(
					env::is_valid_account_id(account.address.as_bytes()),
					"Account @{} is invalid",
					account.address
				);
				let amount: Balance = account.amount.into();
        total += amount;
			}
			require!(
					attached_deposit >= total,
					"Not enough attached deposit"
			);

			for account in transactions {
					Promise::new(account.address).transfer(account.amount.into());
			}
	}

	pub fn get_hello() -> String {
		"Hello".into()
	}
}
