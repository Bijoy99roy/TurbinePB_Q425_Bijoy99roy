# BuilderBoard

BuilderBoard is a decentralized platform on Solana where builders can showcase their projects and receive community-driven upvotes, ensuring transparent and tamper-proof visibility while helping users discover trending innovations.

# User Story

Click here to see [User Story](./UserStory.md)

## Architecture Diagram
![Architecture Diagram](./Architecture-Diagram.drawio.png)

## Sequence Diagram
![Sequence Diagram](./SequenceDiagram.drawio.png)


## Functionality

- **Publish Projects:** Users can post their projects on-chain with a title, description, and URL.
- **Leaderboard:** All projects are displayed on a leaderboard, sorted by upvotes to showcase trending projects.
- **Community Upvotes:** Anyone with a Solana wallet can upvote projects, contributing to their ranking.
- **Tamper-Proof & Transparent:** All projects and votes are recorded on Solana, ensuring verifiable and immutable data.

## Installation & Setup

### Prerequisites

- Rust
- Solana CLI
- Anchor Framework
- Node.js

### Installation

1. Clone the repository

```bash
https://github.com/Bijoy99roy/TurbinePB_Q425_Bijoy99roy
cd builder-board-adv-task-1
```

2. Install depencencies

```bash
npm install
```

### Testing

```bash
anchor test
```

### Deployment

**Local Deployment**
```bash
solana-test-validator

anchor deploy
```