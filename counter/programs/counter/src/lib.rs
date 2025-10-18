use anchor_lang::prelude::*;

declare_id!("4JLcDtWyymW79XGpA45TmbuaUUbrUe92phrMNopNrU26");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter;
        counter_account.counter = 0;
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter;

        counter_account.counter = counter_account.counter.checked_add(1).unwrap();
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        let counter_account = &mut ctx.accounts.counter;

        counter_account.counter = counter_account.counter.checked_sub(1).unwrap();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    user: Signer<'info>,

    #[account(
        init,
        payer=user,
        space=8+8
    )]
    pub counter: Account<'info, CounterAccount>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Update<'info> {


    #[account(
        mut
    )]
    pub counter: Account<'info, CounterAccount>,

}


#[account]
pub struct CounterAccount{
    pub counter: u64
}