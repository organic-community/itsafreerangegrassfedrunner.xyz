/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/anchor_token_staking.json`.
 */
export type AnchorTokenStaking = {
  "address": "5rabxnwK6eeCdbUmSUFv8iscNXp6vDtbyAa7NxeKB9Ab",
  "metadata": {
    "name": "anchorTokenStaking",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "docs": [
    "This program allows users to lock SPL tokens for a fixed period (1 to 4 years),",
    "track rewards based on amount and duration.",
    "",
    "Admins can initialize a config with the token to lock and the apys to expect.",
    "Users can lock and unlock tokens and view their positions locked."
  ],
  "instructions": [
    {
      "name": "createConfig",
      "docs": [
        "Initializes the config account with the specified SPL token and decimals.",
        "",
        "# Arguments",
        "* `token_address` - The mint address of the SPL token to be locked",
        "* `decimals` - The number of decimals used by the token"
      ],
      "discriminator": [
        201,
        207,
        243,
        114,
        75,
        111,
        47,
        189
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "The admin account that will control this staking configuration."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "docs": [
            "The staking configuration account to be created."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "The mint of the token to be staked (SPL or Token-2022).",
            "We validate it exists and get its decimals."
          ]
        },
        {
          "name": "vaultAuthority",
          "docs": [
            "PDA that owns the vault token account."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "configTokenAccount",
          "docs": [
            "Vault token account (ATA owned by vault_authority)."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The token program **interface** actually in use:",
            "- SPL Token (Tokenkeg…):  anchor_spl::token::ID",
            "- Token-2022 (Tokenz…):   anchor_spl::token_2022::ID"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenAddress",
          "type": "pubkey"
        },
        {
          "name": "decimals",
          "type": "u8"
        },
        {
          "name": "apys",
          "type": {
            "array": [
              "u16",
              4
            ]
          }
        }
      ]
    },
    {
      "name": "lock",
      "docs": [
        "Locks a specified amount of tokens for a given number of years.",
        "",
        "# Arguments",
        "* `amount` - Number of tokens (before decimals) to lock",
        "* `lock_days` - Lock duration in years (1, 2, 3 or 4)"
      ],
      "discriminator": [
        21,
        19,
        208,
        43,
        237,
        62,
        255,
        87
      ],
      "accounts": [
        {
          "name": "position",
          "docs": [
            "The staking position created for this lock."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "User-wide staking metadata."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "config",
          "docs": [
            "Global staking configuration."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Mint of the staked token (SPL or Token-2022)."
          ]
        },
        {
          "name": "userTokenAccount",
          "docs": [
            "User's token account to debit (must be owned by `owner`)."
          ],
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "docs": [
            "PDA that owns the vault token account."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "configTokenAccount",
          "docs": [
            "Vault token account to credit (ATA owned by `vault_authority`)."
          ],
          "writable": true
        },
        {
          "name": "owner",
          "docs": [
            "Wallet paying fees and authorizing transfer."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program interface actually in use:",
            "- SPL Token:     anchor_spl::token::ID",
            "- Token-2022:    anchor_spl::token_2022::ID",
            "",
            "NOTE: Use `Interface<'info, TokenInterface>` (not `Program<'info, …>`)."
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "lockDays",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unlock",
      "docs": [
        "Unlocks tokens after the lock period ends."
      ],
      "discriminator": [
        101,
        155,
        40,
        21,
        158,
        189,
        56,
        203
      ],
      "accounts": [
        {
          "name": "position",
          "docs": [
            "The staking position to unlock."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "User-wide staking metadata."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "config",
          "docs": [
            "Global staking configuration."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Mint of the staked token (SPL or Token-2022)."
          ]
        },
        {
          "name": "vaultAuthority",
          "docs": [
            "PDA that owns the vault token account."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "configTokenAccount",
          "docs": [
            "Vault token account to debit (ATA owned by `vault_authority`)."
          ],
          "writable": true
        },
        {
          "name": "userTokenAccount",
          "docs": [
            "User's token account to credit (must be owned by `owner`)."
          ],
          "writable": true
        },
        {
          "name": "owner",
          "docs": [
            "The wallet authorizing the unlock (must be the position owner)."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program interface actually in use:",
            "- SPL Token:     anchor_spl::token::ID",
            "- Token-2022:    anchor_spl::token_2022::ID",
            "",
            "NOTE: Use `Interface<'info, TokenInterface>` (not `Program<'info, …>`)."
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateApys",
      "docs": [
        "Allows the admin to update the APY (Annual Percentage Yield) values",
        "for the 1 to 4 year staking durations. Only the admin can call this.",
        "",
        "# Arguments",
        "* `new_apys` - An array of 4 u16 values representing APYs in basis points",
        "(e.g., 1000 = 10%) for 1, 2, 3, and 4-year durations respectively."
      ],
      "discriminator": [
        142,
        57,
        160,
        176,
        219,
        193,
        28,
        249
      ],
      "accounts": [
        {
          "name": "config",
          "docs": [
            "Only the admin can update the APY values."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "docs": [
            "The admin who must sign this transaction."
          ],
          "signer": true,
          "relations": [
            "config"
          ]
        }
      ],
      "args": [
        {
          "name": "newApys",
          "type": {
            "array": [
              "u16",
              4
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "config",
      "discriminator": [
        155,
        12,
        170,
        224,
        30,
        250,
        204,
        130
      ]
    },
    {
      "name": "stakePosition",
      "discriminator": [
        78,
        165,
        30,
        111,
        171,
        125,
        11,
        220
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidLockDuration",
      "msg": "Invalid lock duration. Must be 1, 10, 30, or 100 days."
    },
    {
      "code": 6001,
      "name": "invalidToken",
      "msg": "Invalid token"
    },
    {
      "code": 6002,
      "name": "invalidTokenProgram",
      "msg": "Invalid token program"
    },
    {
      "code": 6003,
      "name": "invalidDecimals",
      "msg": "Invalid decimals"
    },
    {
      "code": 6004,
      "name": "invalidApy",
      "msg": "Invalid APY value"
    },
    {
      "code": 6005,
      "name": "unauthorized",
      "msg": "Unauthorized operation"
    },
    {
      "code": 6006,
      "name": "invalidUser",
      "msg": "Invalid user"
    },
    {
      "code": 6007,
      "name": "invalidOwner",
      "msg": "Invalid owner"
    },
    {
      "code": 6008,
      "name": "lockPeriodNotEnded",
      "msg": "Lock period not ended"
    },
    {
      "code": 6009,
      "name": "numericalOverflow",
      "msg": "Numerical overflow occurred"
    },
    {
      "code": 6010,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    }
  ],
  "types": [
    {
      "name": "config",
      "docs": [
        "Global staking configuration account.",
        "Defines which token is staked, token decimals, and APYs per lock duration."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "docs": [
              "Admin who can initialize and manage the config"
            ],
            "type": "pubkey"
          },
          {
            "name": "totalTokensLocked",
            "docs": [
              "Total amount staked (raw units)"
            ],
            "type": "u64"
          },
          {
            "name": "tokenAddress",
            "docs": [
              "The token to be staked"
            ],
            "type": "pubkey"
          },
          {
            "name": "decimals",
            "docs": [
              "Decimals of the staked token (usually 6 or 9)"
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "apys",
            "docs": [
              "APY per lock duration (index 0 = 1 year, index 1 = 2 years, etc.)",
              "Expressed in basis points (e.g. 1000 = 10%)"
            ],
            "type": {
              "array": [
                "u16",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "stakePosition",
      "docs": [
        "Represents one individual staking lock for a user.",
        "Multiple stake positions can exist per user, each with its own duration and reward."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "The user who owns this stake"
            ],
            "type": "pubkey"
          },
          {
            "name": "amountLocked",
            "docs": [
              "The amount staked (in raw units, before decimals applied)"
            ],
            "type": "u64"
          },
          {
            "name": "lockDays",
            "docs": [
              "Lock duration in years (1 to 4)"
            ],
            "type": "u8"
          },
          {
            "name": "startDate",
            "docs": [
              "Timestamp when staking started"
            ],
            "type": "u64"
          },
          {
            "name": "endDate",
            "docs": [
              "Timestamp when staking can be unlocked"
            ],
            "type": "u64"
          },
          {
            "name": "expectedReward",
            "docs": [
              "Reward expected at the end (raw units)"
            ],
            "type": "u64"
          },
          {
            "name": "bump",
            "docs": [
              "Bump for PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAddress",
            "docs": [
              "User wallet"
            ],
            "type": "pubkey"
          },
          {
            "name": "stakeCount",
            "docs": [
              "Number of staking positions created"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};

// Export the IDL as a constant for use with Anchor
export const IDL: AnchorTokenStaking = {
  "address": "5rabxnwK6eeCdbUmSUFv8iscNXp6vDtbyAa7NxeKB9Ab",
  "metadata": {
    "name": "anchorTokenStaking",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "docs": [
    "This program allows users to lock SPL tokens for a fixed period (1 to 4 years),",
    "track rewards based on amount and duration.",
    "",
    "Admins can initialize a config with the token to lock and the apys to expect.",
    "Users can lock and unlock tokens and view their positions locked."
  ],
  "instructions": [
    {
      "name": "createConfig",
      "docs": [
        "Initializes the config account with the specified SPL token and decimals.",
        "",
        "# Arguments",
        "* `token_address` - The mint address of the SPL token to be locked",
        "* `decimals` - The number of decimals used by the token"
      ],
      "discriminator": [
        201,
        207,
        243,
        114,
        75,
        111,
        47,
        189
      ],
      "accounts": [
        {
          "name": "admin",
          "docs": [
            "The admin account that will control this staking configuration."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "config",
          "docs": [
            "The staking configuration account to be created."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "The mint of the token to be staked (SPL or Token-2022).",
            "We validate it exists and get its decimals."
          ]
        },
        {
          "name": "vaultAuthority",
          "docs": [
            "PDA that owns the vault token account."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
                  {
            "name": "configTokenAccount",
            "docs": [
              "Vault token account (ATA owned by vault_authority)."
            ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "vaultAuthority"
              },
              {
                "kind": "account",
                "path": "tokenProgram"
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The token program **interface** actually in use:",
            "- SPL Token (Tokenkeg…):  anchor_spl::token::ID",
            "- Token-2022 (Tokenz…):   anchor_spl::token_2022::ID"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenAddress",
          "type": "pubkey"
        },
        {
          "name": "decimals",
          "type": "u8"
        },
        {
          "name": "apys",
          "type": {
            "array": [
              "u16",
              4
            ]
          }
        }
      ]
    },
    {
      "name": "lock",
      "docs": [
        "Locks a specified amount of tokens for a given number of years.",
        "",
        "# Arguments",
        "* `amount` - Number of tokens (before decimals) to lock",
        "* `lock_days` - Lock duration in years (1, 2, 3 or 4)"
      ],
      "discriminator": [
        21,
        19,
        208,
        43,
        237,
        62,
        255,
        87
      ],
      "accounts": [
        {
          "name": "position",
          "docs": [
            "The staking position created for this lock."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              },
              {
                "kind": "arg",
                "path": "id"
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "User-wide staking metadata."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "config",
          "docs": [
            "Global staking configuration."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Mint of the staked token (SPL or Token-2022)."
          ]
        },
        {
          "name": "userTokenAccount",
          "docs": [
            "User's token account to debit (must be owned by `owner`)."
          ],
          "writable": true
        },
        {
          "name": "vaultAuthority",
          "docs": [
            "PDA that owns the vault token account."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "configTokenAccount",
          "docs": [
            "Vault token account to credit (ATA owned by `vault_authority`)."
          ],
          "writable": true
        },
        {
          "name": "owner",
          "docs": [
            "Wallet paying fees and authorizing transfer."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program interface actually in use:",
            "- SPL Token:     anchor_spl::token::ID",
            "- Token-2022:    anchor_spl::token_2022::ID",
            "",
            "NOTE: Use `Interface<'info, TokenInterface>` (not `Program<'info, …>`)."
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "id",
          "type": "u64"
        },
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "lockDays",
          "type": "u8"
        }
      ]
    },
    {
      "name": "unlock",
      "docs": [
        "Unlocks tokens after the lock period ends."
      ],
      "discriminator": [
        101,
        155,
        40,
        21,
        158,
        189,
        56,
        203
      ],
      "accounts": [
        {
          "name": "position",
          "docs": [
            "The staking position to unlock."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  115,
                  105,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "user",
          "docs": [
            "User-wide staking metadata."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "config",
          "docs": [
            "Global staking configuration."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "docs": [
            "Mint of the staked token (SPL or Token-2022)."
          ]
        },
        {
          "name": "vaultAuthority",
          "docs": [
            "PDA that owns the vault token account."
          ],
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              }
            ]
          }
        },
        {
          "name": "configTokenAccount",
          "docs": [
            "Vault token account to debit (ATA owned by `vault_authority`)."
          ],
          "writable": true
        },
        {
          "name": "userTokenAccount",
          "docs": [
            "User's token account to credit (must be owned by `owner`)."
          ],
          "writable": true
        },
        {
          "name": "owner",
          "docs": [
            "The wallet authorizing the unlock (must be the position owner)."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "Token program interface actually in use:",
            "- SPL Token:     anchor_spl::token::ID",
            "- Token-2022:    anchor_spl::token_2022::ID",
            "",
            "NOTE: Use `Interface<'info, TokenInterface>` (not `Program<'info, …>`)."
          ]
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "updateApys",
      "docs": [
        "Allows the admin to update the APY (Annual Percentage Yield) values",
        "for the 1 to 4 year staking durations. Only the admin can call this.",
        "",
        "# Arguments",
        "* `new_apys` - An array of 4 u16 values representing APYs in basis points",
        "(e.g., 1000 = 10%) for 1, 2, 3, and 4-year durations respectively."
      ],
      "discriminator": [
        142,
        57,
        160,
        176,
        219,
        193,
        28,
        249
      ],
      "accounts": [
        {
          "name": "config",
          "docs": [
            "Only the admin can update the APY values."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  110,
                  102,
                  105,
                  103
                ]
              }
            ]
          }
        },
        {
          "name": "admin",
          "docs": [
            "The admin who must sign this transaction."
          ],
          "signer": true,
          "relations": [
            "config"
          ]
        }
      ],
      "args": [
        {
          "name": "newApys",
          "type": {
            "array": [
              "u16",
              4
            ]
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "config",
      "discriminator": [
        155,
        12,
        170,
        224,
        30,
        250,
        204,
        130
      ]
    },
    {
      "name": "stakePosition",
      "discriminator": [
        78,
        165,
        30,
        111,
        171,
        125,
        11,
        220
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "invalidLockDuration",
      "msg": "Invalid lock duration. Must be 1, 10, 30, or 100 days."
    },
    {
      "code": 6001,
      "name": "invalidToken",
      "msg": "Invalid token"
    },
    {
      "code": 6002,
      "name": "invalidTokenProgram",
      "msg": "Invalid token program"
    },
    {
      "code": 6003,
      "name": "invalidDecimals",
      "msg": "Invalid decimals"
    },
    {
      "code": 6004,
      "name": "invalidApy",
      "msg": "Invalid APY value"
    },
    {
      "code": 6005,
      "name": "unauthorized",
      "msg": "Unauthorized operation"
    },
    {
      "code": 6006,
      "name": "invalidUser",
      "msg": "Invalid user"
    },
    {
      "code": 6007,
      "name": "invalidOwner",
      "msg": "Invalid owner"
    },
    {
      "code": 6008,
      "name": "lockPeriodNotEnded",
      "msg": "Lock period not ended"
    },
    {
      "code": 6009,
      "name": "numericalOverflow",
      "msg": "Numerical overflow occurred"
    },
    {
      "code": 6010,
      "name": "insufficientFunds",
      "msg": "Insufficient funds"
    }
  ],
  "types": [
    {
      "name": "config",
      "docs": [
        "Global staking configuration account.",
        "Defines which token is staked, token decimals, and APYs per lock duration."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "docs": [
              "Admin who can initialize and manage the config"
            ],
            "type": "pubkey"
          },
          {
            "name": "totalTokensLocked",
            "docs": [
              "Total amount staked (raw units)"
            ],
            "type": "u64"
          },
          {
            "name": "tokenAddress",
            "docs": [
              "The token to be staked"
            ],
            "type": "pubkey"
          },
          {
            "name": "decimals",
            "docs": [
              "Decimals of the staked token (usually 6 or 9)"
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump for PDA derivation"
            ],
            "type": "u8"
          },
          {
            "name": "apys",
            "docs": [
              "APY per lock duration (index 0 = 1 year, index 1 = 2 years, etc.)",
              "Expressed in basis points (e.g. 1000 = 10%)"
            ],
            "type": {
              "array": [
                "u16",
                4
              ]
            }
          }
        ]
      }
    },
    {
      "name": "stakePosition",
      "docs": [
        "Represents one individual staking lock for a user.",
        "Multiple stake positions can exist per user, each with its own duration and reward."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "docs": [
              "The user who owns this stake"
            ],
            "type": "pubkey"
          },
          {
            "name": "amountLocked",
            "docs": [
              "The amount staked (in raw units, before decimals applied)"
            ],
            "type": "u64"
          },
          {
            "name": "lockDays",
            "docs": [
              "Lock duration in years (1 to 4)"
            ],
            "type": "u8"
          },
          {
            "name": "startDate",
            "docs": [
              "Timestamp when staking started"
            ],
            "type": "u64"
          },
          {
            "name": "endDate",
            "docs": [
              "Timestamp when staking can be unlocked"
            ],
            "type": "u64"
          },
          {
            "name": "expectedReward",
            "docs": [
              "Reward expected at the end (raw units)"
            ],
            "type": "u64"
          },

          {
            "name": "bump",
            "docs": [
              "Bump for PDA"
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "userAddress",
            "docs": [
              "User wallet"
            ],
            "type": "pubkey"
          },
          {
            "name": "stakeCount",
            "docs": [
              "Number of staking positions created"
            ],
            "type": "u64"
          }
        ]
      }
    }
  ]
};
