use anchor_lang::prelude::*;

use crate::{Project, Upvote, UpvoteError};

#[derive(Accounts)]
pub struct UpvoteProject<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds = [b"projects", project_account_pda.owner.key().as_ref(), &project_account_pda.project_id.to_be_bytes()[..]],
        bump=project_account_pda.bump,
    )]
    pub project_account_pda: Account<'info, Project>,

    #[account(
        init,
        payer = user,
        space = 8 + Upvote::INIT_SPACE,
        seeds = [b"upvote", project_account_pda.key().as_ref(), user.key().as_ref()],
        bump
    )]
    pub upvote_pda: Account<'info, Upvote>,
    pub system_program: Program<'info, System>,
}

pub fn _upvote_project(ctx: Context<UpvoteProject>) -> Result<()> {
    let upvote_pda = &mut ctx.accounts.upvote_pda;
    let project_account_pda = &mut ctx.accounts.project_account_pda;
    let user = &ctx.accounts.user;

    if project_account_pda.to_account_info().data_is_empty() {
        upvote_pda.project = project_account_pda.key();
        upvote_pda.user = user.key();
        project_account_pda.upvotes = project_account_pda.upvotes.checked_add(1).unwrap();
    } else {
        return Err(UpvoteError::AlreadyVoted.into());
    }
    Ok(())
}
