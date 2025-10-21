use anchor_lang::prelude::*;

pub const MAX_NAME_LEN: usize = 50;
pub const MAX_DESCRIPTION_LEN: usize = 128;
pub const MAX_URL_LEN: usize = 128;

#[account]
#[derive(InitSpace)]
pub struct Project {
    pub owner: Pubkey,
    pub upvotes: u64,
    pub bump: u8,
    pub project_id: u64,
    #[max_len(MAX_NAME_LEN)]
    pub project_name: String,
    #[max_len(MAX_DESCRIPTION_LEN)]
    pub description: String,
    #[max_len(MAX_URL_LEN)]
    pub url: String,
}

impl Project {
    pub fn initialization(
        &mut self,
        owner: Pubkey,
        project_id: u64,
        project_name: String,
        description: String,
        url: String,
        bump: u8,
    ) -> Result<()> {
        self.owner = owner;
        self.project_id = project_id;
        self.description = description;
        self.project_name = project_name;
        self.url = url;
        self.bump = bump;
        self.upvotes = 0;
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Upvote {
    pub project: Pubkey,
    pub user: Pubkey,
}
