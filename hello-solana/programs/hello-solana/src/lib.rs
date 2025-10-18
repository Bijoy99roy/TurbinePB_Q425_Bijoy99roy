use anchor_lang::prelude::*;

declare_id!("g79tEtiBPtaU7XapvDVKsot9FnvbYsYzwp8PsbwmjNp");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn greet(ctx: Context<GreetAccount>) -> Result<()> {
        msg!("Hello Solana from {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct GreetAccount {}
