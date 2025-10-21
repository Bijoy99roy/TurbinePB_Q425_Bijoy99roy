pub mod errors;
pub mod instructions;
pub mod states;
use anchor_lang::prelude::*;
pub use errors::*;
pub use instructions::*;
pub use states::*;
declare_id!("q91M8vdEPnwWN66doxJ9XBxTJiYfjUuUa3cNWoQWEa9");

#[program]
pub mod builder_board_adv_task_1 {
    use super::*;

    pub fn initialize_project(
        ctx: Context<InitializeProject>,
        project_id: u64,
        project_name: String,
        url: String,
        description: String,
    ) -> Result<()> {
        _intialize_project(ctx, project_id, project_name, url, description)?;
        Ok(())
    }

    pub fn upvote_project(ctx: Context<UpvoteProject>) -> Result<()> {
        _upvote_project(ctx)?;
        Ok(())
    }
}
