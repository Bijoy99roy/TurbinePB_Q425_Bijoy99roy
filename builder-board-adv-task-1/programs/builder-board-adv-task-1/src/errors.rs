use anchor_lang::prelude::*;

#[error_code]
pub enum ProjectError {
    #[msg("Invalid project name length")]
    InvalidProjectNameLength,
    #[msg("Invalid description length")]
    InvalidDescriptionLength,
    #[msg("Invalid url length")]
    InvalidUrlLength,
}

#[error_code]
pub enum UpvoteError {
    #[msg("User has already voted the project")]
    AlreadyVoted,
}
