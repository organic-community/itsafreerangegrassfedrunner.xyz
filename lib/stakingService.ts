import { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { Program, AnchorProvider, BN } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { IDL } from '../idl/anchor_token_staking';

// Token2022 program ID
const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface StakingConfig {
  admin: PublicKey;
  totalTokensLocked: BN;
  tokenAddress: PublicKey;
  decimals: number;
  bump: number;
  apys: number[];
  vaultAccount?: PublicKey | null;
}

export interface StakePosition {
  user: PublicKey;
  amountLocked: BN;
  lockDays: number;
  startDate: BN;
  endDate: BN;
  expectedReward: BN;
  bump: number;
}

export interface User {
  userAddress: PublicKey;
  stakeCount: BN;
}

export class StakingService {
  private program: Program;
  private connection: Connection;
  private provider: AnchorProvider;

  constructor(connection: Connection, wallet: any, publicKey?: PublicKey) {
    this.connection = connection;
    
    if (!wallet) {
      throw new Error('Wallet is required');
    }
    
    if (!publicKey) {
      throw new Error('Wallet public key is required');
    }
    
    // Use the wallet's adapter which should have all the required methods
    if (!wallet.adapter) {
      throw new Error('Wallet adapter is required');
    }
    
    this.provider = new AnchorProvider(connection, wallet.adapter, {
      commitment: 'confirmed',
    });
    
    this.program = new Program(IDL as any, this.provider);
  }

  get programId(): PublicKey {
    return this.program.programId;
  }

  // Helper method to get config PDA
  private getConfigPDA(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('config')],
      this.program.programId
    );
  }

  // Helper method to get vault authority PDA
  private getVaultAuthorityPDA(): [PublicKey, number] {
    return PublicKey.findProgramAddressSync(
      [Buffer.from('vault')],
      this.program.programId
    );
  }

  async getConfig(): Promise<StakingConfig | null> {
    try {
      // Config is now a PDA with seed ['config']
      const [configAddress] = this.getConfigPDA();

      console.log('Fetching config from PDA address:', configAddress.toString());
      
      const config = await (this.program.account as any).config.fetch(configAddress);
      console.log('Raw config data:', config);
      
      // Handle APY values that might be BN objects or regular numbers
      const apys = config.apys.map((apy: any) => {
        if (apy && typeof apy.toNumber === 'function') {
          return apy.toNumber();
        } else if (typeof apy === 'number') {
          return apy;
        } else {
          console.warn('Unexpected APY format:', apy);
          return 0;
        }
      });
      
      return {
        admin: config.admin,
        totalTokensLocked: config.totalTokensLocked,
        tokenAddress: config.tokenAddress,
        decimals: config.decimals,
        bump: config.bump,
        apys: apys,
        // Add vault account if it exists in the config
        vaultAccount: config.vaultAccount || null,
      };
    } catch (error) {
      console.error('Error fetching config:', error);
      return null;
    }
  }

  async getUserPositions(userPublicKey: PublicKey): Promise<StakePosition[]> {
    try {
      console.log(`Fetching all positions for user: ${userPublicKey.toString()}`);
      
      // Get all program accounts of type stakePosition
      const allPositions = await (this.program.account as any).stakePosition.all();
      
      console.log(`Found ${allPositions.length} total positions in the system`);
      
      // Filter positions that belong to the current user
      const userPositions: StakePosition[] = allPositions
        .filter((account: any) => account.account.user.equals(userPublicKey))
        .map((account: any) => ({
          user: account.account.user,
          amountLocked: account.account.amountLocked,
          lockDays: account.account.lockDays,
          startDate: account.account.startDate,
          endDate: account.account.endDate,
          expectedReward: account.account.expectedReward,
          bump: account.account.bump,
        }));

      console.log(`Found ${userPositions.length} positions for user ${userPublicKey.toString()}`);
      
      // Log details of each position found
      userPositions.forEach((position, index) => {
        console.log(`Position ${index + 1}:`, {
          amount: position.amountLocked.toNumber(),
          lockDays: position.lockDays,
          startDate: position.startDate.toNumber(),
          endDate: position.endDate.toNumber(),
          expectedReward: position.expectedReward.toNumber()
        });
      });

      return userPositions;
    } catch (error) {
      console.error('Error fetching user positions:', error);
      return [];
    }
  }

  async getAllPositions(): Promise<StakePosition[]> {
    try {
      console.log('Fetching all positions in the system...');
      
      // Get all program accounts of type stakePosition
      const allPositions = await (this.program.account as any).stakePosition.all();
      
      console.log(`Found ${allPositions.length} total positions in the system`);
      
      const positions: StakePosition[] = allPositions.map((account: any) => ({
        user: account.account.user,
        amountLocked: account.account.amountLocked,
        lockDays: account.account.lockDays,
        startDate: account.account.startDate,
        endDate: account.account.endDate,
        expectedReward: account.account.expectedReward,
        bump: account.account.bump,
      }));

      return positions;
    } catch (error) {
      console.error('Error fetching all positions:', error);
      return [];
    }
  }

  async getLeaderboard(): Promise<{ user: PublicKey; totalStaked: BN; positionCount: number }[]> {
    try {
      console.log('Fetching leaderboard data...');
      
      // Use the existing getAllPositions method
      const allPositions = await this.getAllPositions();
      console.log(`Found ${allPositions.length} total positions for leaderboard`);
      
      // Group positions by user and calculate total staked
      const userStats = new Map<string, { user: PublicKey; totalStaked: BN; positionCount: number }>();
      
      allPositions.forEach(position => {
        const userKey = position.user.toString();
        
        if (userStats.has(userKey)) {
          const existing = userStats.get(userKey)!;
          existing.totalStaked = existing.totalStaked.add(position.amountLocked);
          existing.positionCount += 1;
        } else {
          userStats.set(userKey, {
            user: position.user,
            totalStaked: position.amountLocked,
            positionCount: 1
          });
        }
      });
      
      // Convert to array and sort by total staked (descending)
      const leaderboard = Array.from(userStats.values())
        .sort((a, b) => b.totalStaked.cmp(a.totalStaked))
        .slice(0, 10); // Top 10 users
      
      console.log(`Leaderboard created with ${leaderboard.length} users`);
      return leaderboard;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      return [];
    }
  }

  async lockTokens(
    amount: number,
    lockDays: number,
    tokenAddress: PublicKey
  ): Promise<string> {
    try {
      const userPublicKey = this.provider.wallet.publicKey;
      
      if (!userPublicKey) {
        throw new Error('Wallet public key is not available. Please ensure your wallet is connected.');
      }

      // Get config to validate token and get position ID
      const config = await this.getConfig();
      if (!config) {
        throw new Error('Config not found. Please create config first.');
      }

      // Validate token address
      if (!config.tokenAddress.equals(tokenAddress)) {
        throw new Error('Token address does not match config token address.');
      }

      // Determine which token program the mint uses
      const mintAccountInfo = await this.connection.getAccountInfo(tokenAddress);
      if (!mintAccountInfo) {
        throw new Error('Mint account not found');
      }
      
      const isToken2022 = mintAccountInfo.owner.equals(TOKEN_2022_PROGRAM_ID);
      const tokenProgram = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

      // Get user's token account with correct token program
      const userTokenAccount = getAssociatedTokenAddressSync(
        tokenAddress,
        userPublicKey,
        false,
        tokenProgram,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Check if user's token account exists and is owned by the correct token program
      const userTokenAccountInfo = await this.connection.getAccountInfo(userTokenAccount);
      if (!userTokenAccountInfo) {
        throw new Error('User token account not found. Please ensure you have tokens.');
      }
      
      if (!userTokenAccountInfo.owner.equals(tokenProgram)) {
        throw new Error(`User token account is owned by wrong token program. Expected ${tokenProgram.toString()}, got ${userTokenAccountInfo.owner.toString()}`);
      }

      // Convert amount to base units (considering decimals)
      const amountBase = new BN(amount * Math.pow(10, config.decimals));

      // Derive PDAs exactly like in the tests
      const [configAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from('config')],
        this.program.programId
      );
      
      const [vaultAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from('vault')],
        this.program.programId
      );

      const [userPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('user'), userPublicKey.toBuffer()],
        this.program.programId
      );

      // Position ID is based on config.totalTokensLocked
      const positionId = new BN(config.totalTokensLocked.toNumber() + 1);
      
      const [positionPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('position'), userPublicKey.toBuffer(), positionId.toArrayLike(Buffer, 'le', 8)],
        this.program.programId
      );

      // Get config token account (vault)
      const configTokenAccount = getAssociatedTokenAddressSync(
        tokenAddress,
        vaultAuthority,
        true,
        tokenProgram,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Check if vault token account exists
      const vaultTokenAccountInfo = await this.connection.getAccountInfo(configTokenAccount);
      if (!vaultTokenAccountInfo) {
        throw new Error('Vault token account not found. Please ensure config was created properly.');
      }

      // Use the exact account structure from the working tests
      const tx = await this.program.methods
        .lock(positionId, amountBase, lockDays)
        .accounts({
          position: positionPda,
          user: userPda,
          config: configAddress,
          mint: tokenAddress,
          userTokenAccount: userTokenAccount,
          vaultAuthority: vaultAuthority,
          configTokenAccount: configTokenAccount,
          owner: userPublicKey,
          tokenProgram: tokenProgram,
          systemProgram: new PublicKey('11111111111111111111111111111111'),
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error locking tokens:', error);
      throw error;
    }
  }

  async unlockTokens(
    positionPda: PublicKey,
    tokenAddress: PublicKey
  ): Promise<string> {
    try {
      const userPublicKey = this.provider.wallet.publicKey;
      
      if (!userPublicKey) {
        throw new Error('Wallet public key is not available. Please ensure your wallet is connected.');
      }

      // Get config to validate token
      const config = await this.getConfig();
      if (!config) {
        throw new Error('Config not found. Please create config first.');
      }

      // Validate token address
      if (!config.tokenAddress.equals(tokenAddress)) {
        throw new Error('Token address does not match config token address.');
      }

      // Determine which token program the mint uses
      const mintAccountInfo = await this.connection.getAccountInfo(tokenAddress);
      if (!mintAccountInfo) {
        throw new Error('Mint account not found');
      }
      
      const isToken2022 = mintAccountInfo.owner.equals(TOKEN_2022_PROGRAM_ID);
      const tokenProgram = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;

      // Get user's token account with correct token program
      const userTokenAccount = getAssociatedTokenAddressSync(
        tokenAddress,
        userPublicKey,
        false,
        tokenProgram,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Derive PDAs exactly like in the tests
      const [configAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from('config')],
        this.program.programId
      );
      
      const [vaultAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from('vault')],
        this.program.programId
      );

      const [userPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('user'), userPublicKey.toBuffer()],
        this.program.programId
      );

      // Get config token account (vault)
      const configTokenAccount = getAssociatedTokenAddressSync(
        tokenAddress,
        vaultAuthority,
        true,
        tokenProgram,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Use the exact account structure from the working tests
      const tx = await this.program.methods
        .unlock()
        .accounts({
          position: positionPda,
          user: userPda,
          config: configAddress,
          mint: tokenAddress,
          vaultAuthority: vaultAuthority,
          configTokenAccount: configTokenAccount,
          userTokenAccount: userTokenAccount,
          owner: userPublicKey,
          tokenProgram: tokenProgram,
          systemProgram: new PublicKey('11111111111111111111111111111111'),
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error unlocking tokens:', error);
      throw error;
    }
  }

  async createConfig(
    tokenAddress: PublicKey,
    decimals: number,
    apys: number[]
  ): Promise<string> {
    try {
      const userPublicKey = this.provider.wallet.publicKey;
      
      if (!userPublicKey) {
        throw new Error('Wallet public key is not available. Please ensure your wallet is connected.');
      }
      
      // Derive PDAs exactly like in the tests
      const [configAddress] = PublicKey.findProgramAddressSync(
        [Buffer.from('config')],
        this.program.programId
      );
      
      const [vaultAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from('vault')],
        this.program.programId
      );

      // Determine which token program the mint uses
      const mintAccountInfo = await this.connection.getAccountInfo(tokenAddress);
      if (!mintAccountInfo) {
        throw new Error('Mint account not found');
      }
      
      // Check if the mint is owned by Token2022 or regular Token program
      const isToken2022 = mintAccountInfo.owner.equals(TOKEN_2022_PROGRAM_ID);
      const tokenProgram = isToken2022 ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
      
      console.log(`Mint ${tokenAddress.toString()} uses ${isToken2022 ? 'Token2022' : 'SPL Token'} program`);
      console.log('Vault authority PDA:', vaultAuthority.toString());
      console.log('Config PDA:', configAddress.toString());

      // Get the config token account (ATA owned by vault authority)
      const configTokenAccount = getAssociatedTokenAddressSync(
        tokenAddress,
        vaultAuthority,
        true,
        tokenProgram,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      console.log('Config token account (ATA):', configTokenAccount.toString());

      // Check if the ATA already exists
      const existingAta = await this.connection.getAccountInfo(configTokenAccount);
      if (!existingAta) {
        // Create the config ATA first, just like in the tests
        console.log('Creating config ATA (vault)...');
        const { createAssociatedTokenAccountInstruction } = await import('@solana/spl-token');
        
        const createAtaIx = createAssociatedTokenAccountInstruction(
          userPublicKey,     // payer
          configTokenAccount, // associated token account address
          vaultAuthority,     // owner (vault PDA)
          tokenAddress,       // mint
          tokenProgram,       // token program
          ASSOCIATED_TOKEN_PROGRAM_ID
        );
        
        const createAtaTx = new Transaction().add(createAtaIx);
        const createAtaSignature = await this.provider.sendAndConfirm(createAtaTx);
        console.log('Config ATA created with signature:', createAtaSignature);
      } else {
        console.log('Config ATA already exists:', configTokenAccount.toString());
      }
      
      // Check if config already exists
      const existingConfig = await this.connection.getAccountInfo(configAddress);
      if (existingConfig) {
        console.log('Config already exists, skipping createConfig');
        return 'Config already exists';
      }

      // Use the exact account structure from the working tests
      const tx = await this.program.methods
        .createConfig(tokenAddress, decimals, apys)
        .accounts({
          config: configAddress,
          admin: userPublicKey,
          mint: tokenAddress,
          vaultAuthority: vaultAuthority,
          configTokenAccount: configTokenAccount,
          tokenProgram: tokenProgram,
          associatedTokenProgram: new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'),
          systemProgram: new PublicKey('11111111111111111111111111111111'),
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error creating config:', error);
      throw error;
    }
  }

  async updateApys(newApys: number[]): Promise<string> {
    try {
      const userPublicKey = this.provider.wallet.publicKey;
      
      if (!userPublicKey) {
        throw new Error('Wallet public key is not available. Please ensure your wallet is connected.');
      }
      
      // Get config PDA
      const [configAddress] = this.getConfigPDA();

      const tx = await this.program.methods
        .updateApys(newApys)
        .accounts({
          config: configAddress,
          admin: userPublicKey,
        })
        .rpc();

      return tx;
    } catch (error) {
      console.error('Error updating APYs:', error);
      throw error;
    }
  }
}
