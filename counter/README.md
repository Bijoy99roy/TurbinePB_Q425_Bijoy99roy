# Counter Program

A simple anchor program that manages a on-chain counter.

### Functionality

The program has two allowed operations:
- Increment counter
- Decrement counter

### Build & Test

1. Install dependencies
```bash
cd counter
npm install
```

2. Run the tests (Runs a local validator, build the anchor code and executes the test)
```bash
anchor test
```


### Troubleshooting

Incase if the program failes to run
- Stop any local running validator then try again
- Make sure you local solana CLI and anchor versions are compatible