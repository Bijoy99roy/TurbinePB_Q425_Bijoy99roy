/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/builder_board_adv_task_1.json`.
 */
export type BuilderBoardAdvTask1 = {
  "address": "8CC5vhrbP2v5thEG4Lwy7QsUqa2gCmeSzUbu5j4jJC4C",
  "metadata": {
    "name": "builderBoardAdvTask1",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeProject",
      "discriminator": [
        69,
        126,
        215,
        37,
        20,
        60,
        73,
        235
      ],
      "accounts": [
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "projectAccountPda",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "projectId",
          "type": "u64"
        },
        {
          "name": "projectName",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    {
      "name": "upvoteProject",
      "discriminator": [
        31,
        103,
        54,
        125,
        44,
        166,
        52,
        159
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "projectAccountPda",
          "writable": true
        },
        {
          "name": "upvotePda",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  112,
                  118,
                  111,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "projectAccountPda"
              },
              {
                "kind": "account",
                "path": "user"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "projectId",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "project",
      "discriminator": [
        205,
        168,
        189,
        202,
        181,
        247,
        142,
        19
      ]
    },
    {
      "name": "upvote",
      "discriminator": [
        94,
        87,
        230,
        31,
        34,
        9,
        27,
        127
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "alreadyVoted",
      "msg": "User has already voted the project"
    }
  ],
  "types": [
    {
      "name": "project",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "upvotes",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "projectId",
            "type": "u64"
          },
          {
            "name": "projectName",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          }
        ]
      }
    },
    {
      "name": "upvote",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "project",
            "type": "pubkey"
          },
          {
            "name": "projectId",
            "type": "u64"
          },
          {
            "name": "user",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
