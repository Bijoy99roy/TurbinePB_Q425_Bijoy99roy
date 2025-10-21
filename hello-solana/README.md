# Hello Solana

A simple hello solana program on anchor.

### Functionality

The program has single allowed operations:
- Prints Hello Solana with txn signature

### Build & Test

1. Install dependencies
```bash
cd hello-solana
npm install
```

2. Run the solana test validator

```bash
solana-test-validator
```

3. Run the tests (skip spinning the local validator by anchor)
```bash
anchor test --skip-local-validator
```

4. View the printed logs (Copy the transaction signature from previous step)

```bash
solana confirm -v <TXN Signature>
```

### Troubleshooting

Incase if the program failes to run
- Try resetting your local solana test validator
- Make sure you local solana CLI and anchor versions are compatible