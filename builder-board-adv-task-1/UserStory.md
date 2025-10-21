# Decentralize Project Leaderboard
**Project Name:** BuilderBoard

**Value Proposition:**

Our platform allows anyone to post their project on-chain and receive upvotes from the community. We use Solana blockchain to keep the projects on-chain ensuring transparent, tamperproof visibility of it. Builders who post their project gain exposure and users discover new trending projects in a verifiable way.

**Product-Market Fit:**

At the moment most of the project sharing platforms are centralized, That means votes, visibility can be modified from company side or lost if platform shuts down.
Our platform addressed these issues by offering an on-chain leaderboard that allows every upvote to be public, verifiable and immutable. It creates a sense of trust by making everything transparent and creates a healthy environment for indie developers and  opensource contributors to gain recognition from the community directly.

**Target User Profiles:**

- Indie Builder: This persona wants to showcase their personal projects to the public. They value genuine upvotes, feedback on the project and permanent project visibility.
- Tech Community Manager: Manages tech communities and interested in highlighting new and quality opensource tools. Values trustless project validation.

## User Story ID: BB-001
**1. User Persona**
- **Name:** Bijoy
- **Role:** Indie Builder
- **Goal:** Share his new project and see how community responds through upvotes.


**2. User Story:** As an builder, I want to post my project’s name, Github/Website URL and  a small description on-chain so that my projects get exposure in the community through upvotes in a trasaparent environment and get other peoples to use it and contribute to it.

**3. Acceptance Criteria**

**Functionality**

- The platform allows indie builder to post his project with the following details:
    - Project Name
    - Website URL/Github link
    - Description
- Indie builder can upvote his own project and other listed projects.

**User Interaction:**
- Indie Builder connects wallet (Phantom, Solflare, etc)
- Indie Builder can fill the project form then clicks on publish. After signing the transaction the project is posted in the platform.
- Indie Builder and other users can upvote listed projects

**Security:**
- The project data and upvotes should be verifiable on-chain.
- The input while filling form should be validated (Non-empty field & valid URL)

**4. Priority: High**

**5. Technical Notes (For Developers)**
**Dependencies:**
- The program needs to be hooked with a frontend built on React.js with wallet adapter
Consideration:
- Indexer can be added later for performance for faster off-chain leaderboard display.

## User Story ID: BB-002
**1. User Persona**
- **Name:** Andre
- **Role:** Tech Community Manager
- **Goal:** Support projects he like by upvoting and find new tools loved by community.

**2. User Story:**

As a Tech Community Manager, I want to be involved in supporting new emerging tools that might help my community members also promote quality work by influence the leaderboard transparently.

**3. Acceptance Criteria**

**Functionality:**
- The platform allows the tech community manager to discover new and trending projects
- The platform allows the tech community manager to upvote projects.

**User Interaction:**
- The user can upvote any project that he likes
- The user can see the leaderboard and the ranking of the projects

**Security:**
- The platform should ensure no double voting is taking place.

**4.Priority: High**

**5.Technical Notes (For Developers)**

**Considerations:**
- Handle transaction confirmation status before updating UI

