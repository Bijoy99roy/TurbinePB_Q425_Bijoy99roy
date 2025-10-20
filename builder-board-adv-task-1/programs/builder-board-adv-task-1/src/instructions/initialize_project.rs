use anchor_lang::prelude::*;

use crate::{Project, ProjectError, MAX_DESCRIPTION_LEN, MAX_NAME_LEN};

#[derive(Accounts)]
#[instruction(project_id: String)]
pub struct InitializeProject<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        init,
        space= 8 + Project::INIT_SPACE,
        seeds = [b"projects", owner.key().as_ref(), project_id.as_bytes()],
        bump,
        payer=owner
    )]
    pub project_account_pda: Account<'info, Project>,
    pub system_program: Program<'info, System>,
}

pub fn _intialize_project(
    ctx: Context<InitializeProject>,
    project_id: String,
    project_name: String,
    url: String,
    description: String,
) -> Result<()> {
    require!(
        project_name.len() <= MAX_NAME_LEN,
        ProjectError::InvalidProjectNameLength
    );
    require!(
        description.len() <= MAX_DESCRIPTION_LEN,
        ProjectError::InvalidDescriptionLength
    );

    let owner = &ctx.accounts.owner;
    let project_account_pda_bump = ctx.bumps.project_account_pda;

    ctx.accounts.project_account_pda.initialization(
        owner.key(),
        project_id,
        project_name,
        description,
        url,
        project_account_pda_bump,
    )?;
    Ok(())
}
