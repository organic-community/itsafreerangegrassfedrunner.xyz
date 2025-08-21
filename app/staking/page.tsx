'use client';

import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { BN } from '@coral-xyz/anchor';
import { StakingService, StakingConfig, StakePosition } from '../../lib/stakingService';

const TOKEN_MINT = new PublicKey('DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777');

export default function StakingPage() {
  const { connection } = useConnection();
  const { publicKey, wallet, connected } = useWallet();
  
  const [stakingService, setStakingService] = useState<StakingService | null>(null);
  const [config, setConfig] = useState<StakingConfig | null>(null);
  const [positions, setPositions] = useState<StakePosition[]>([]);
  const [allPositions, setAllPositions] = useState<StakePosition[]>([]);
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [stakeAmount, setStakeAmount] = useState('');
  const [lockDays, setLockDays] = useState(10);
  const [userTokenBalance, setUserTokenBalance] = useState(0);
  const [newApys, setNewApys] = useState([1, 3, 10, 25]);
  const [tokenAddress, setTokenAddress] = useState('DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777');
  const [tokenDecimals, setTokenDecimals] = useState(9);
  const [leaderboard, setLeaderboard] = useState<{ user: PublicKey; totalStaked: BN; positionCount: number }[]>([]);
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);

  const ADMIN_WALLET = 'G6CQw1w5FkcmMCSxf4NNZYLRXMbx355d5pZXqrcsdiZV';
  const isAdmin = publicKey?.toString() === ADMIN_WALLET;

  const fetchTokenPrice = useCallback(async () => {
    try {
      const response = await fetch('https://lite-api.jup.ag/price/v3?ids=DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777');
      const data = await response.json();
      
      if (data['DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777']) {
        const price = data['DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777'].usdPrice;
        console.log('Token price fetched:', price);
        setTokenPrice(price);
      }
    } catch (error) {
      console.error('Error fetching token price:', error);
    }
  }, []);

  const fetchTokenBalance = useCallback(async () => {
    if (!publicKey) return;
    
    try {
      const tokenMint = config?.tokenAddress || TOKEN_MINT;
      console.log('Fetching token balance for mint:', tokenMint.toString());
      console.log('User public key:', publicKey.toString());
      
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: tokenMint,
      });
      
      console.log('Found token accounts:', tokenAccounts.value.length);
      
      if (tokenAccounts.value.length > 0) {
        const accountInfo = tokenAccounts.value[0].account.data.parsed.info;
        console.log('Token account info:', accountInfo);
        
        const balance = accountInfo.tokenAmount.uiAmount;
        console.log('Raw balance:', balance);
        
        setUserTokenBalance(balance || 0);
      } else {
        // User doesn't have a token account for this mint yet
        console.log('No token account found for this mint');
        setUserTokenBalance(0);
      }
    } catch (error) {
      console.error('Error fetching token balance:', error);
      setUserTokenBalance(0);
    }
  }, [publicKey, connection, config?.tokenAddress]);

  useEffect(() => {
    console.log('useEffect triggered with:', {
      publicKey: publicKey?.toString(),
      wallet: !!wallet,
      connected,
      connection: !!connection,
      isInitialized
    });
    
    // Reset when wallet changes
    if (!publicKey || !wallet || !connection || !connected) {
      console.log('Resetting state due to missing dependencies');
      setIsInitialized(false);
      setStakingService(null);
      setConfig(null);
      setPositions([]);
      setUserTokenBalance(0);
      setLeaderboard([]);
      setAllPositions([]);
      return;
    }

    if (!isInitialized) {
      console.log('Initializing staking service...');
      try {
        console.log('Creating StakingService with wallet:', wallet);
        console.log('Wallet structure:', {
          hasAdapter: !!wallet.adapter,
          hasSignTransaction: !!(wallet as unknown as { signTransaction: unknown }).signTransaction,
          hasSignAllTransactions: !!(wallet as unknown as { signAllTransactions: unknown }).signAllTransactions,
          adapterKeys: wallet.adapter ? Object.keys(wallet.adapter) : 'no adapter'
        });
        const service = new StakingService(connection, wallet, publicKey);
        console.log('Staking service created successfully');
        setStakingService(service);
        
        // Fetch data directly in useEffect
        const loadData = async () => {
          try {
            setLoading(true);
            
            // Fetch config first
            const configData = await service.getConfig();
            console.log('Config data:', configData);
            setConfig(configData);

            // Fetch user positions if wallet is connected
            if (publicKey) {
              try {
                const positionsData = await service.getUserPositions(publicKey);
                console.log('User positions data:', positionsData);
                setPositions(positionsData);
              } catch (error) {
                console.error('Error fetching user positions:', error);
                setPositions([]);
              }
            }

            // Fetch leaderboard data
            try {
              const leaderboardData = await service.getLeaderboard();
              console.log('Leaderboard data received in UI:', leaderboardData);
              setLeaderboard(leaderboardData || []);
            } catch (error) {
              console.error('Error fetching leaderboard:', error);
              setLeaderboard([]);
            }

            // Fetch all positions for leaderboard details
            try {
              const allPositionsData = await service.getAllPositions();
              console.log('All positions data received in UI:', allPositionsData);
              setAllPositions(allPositionsData || []);
            } catch (error) {
              console.error('Error fetching all positions:', error);
              setAllPositions([]);
            }

            // Fetch token price
            await fetchTokenPrice();
          } catch (error) {
            console.error('Error fetching data:', error);
          } finally {
            setLoading(false);
          }
        };
        
        loadData();
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing staking service:', error);
        // Don't set isInitialized to true if there's an error
      }
    }
  }, [publicKey, wallet, connection, isInitialized, connected, fetchTokenPrice]);

  // Separate useEffect for token balance fetching
  useEffect(() => {
    if (stakingService && publicKey && isInitialized) {
      fetchTokenBalance();
    }
  }, [stakingService, publicKey, isInitialized, fetchTokenBalance]);
  
  const createConfig = async () => {
    console.log('Create config called with:', {
      stakingService: !!stakingService,
      publicKey: publicKey?.toString(),
      wallet: !!wallet,
      connection: !!connection
    });
    
    // Try to initialize service if not available
    if (!stakingService) {
      console.log('Attempting to initialize staking service...');
      try {
        if (publicKey && wallet && connection) {
          const service = new StakingService(connection, wallet, publicKey);
          setStakingService(service);
          console.log('Staking service created successfully in createConfig');
          
          // Use the service directly for this operation
          const apysInBasisPoints = newApys.map(apy => Math.round(apy * 100));
          const tx = await service.createConfig(
            new PublicKey(tokenAddress),
            tokenDecimals,
            apysInBasisPoints
          );
          
          alert(`Config created successfully! Transaction: ${tx}`);
          return;
        } else {
          alert('Cannot initialize service: missing wallet, connection, or public key');
          return;
        }
      } catch (error) {
        console.error('Error creating staking service:', error);
        alert(`Error creating staking service: ${error}`);
        return;
      }
    }
    
    // If we get here, we have a stakingService, so use it
    try {
      setAdminLoading(true);
      const apysInBasisPoints = newApys.map(apy => Math.round(apy * 100)); // Convert to basis points
      
      const tx = await stakingService.createConfig(
        new PublicKey(tokenAddress),
        tokenDecimals,
        apysInBasisPoints
      );
      
      alert(`Config created successfully! Transaction: ${tx}`);
      // Refresh data
      if (stakingService) {
        const configData = await stakingService.getConfig();
        setConfig(configData);
        if (publicKey) {
          const positionsData = await stakingService.getUserPositions(publicKey);
          setPositions(positionsData);
          await fetchTokenBalance();
        }
        // Refresh leaderboard
        const leaderboardData = await stakingService.getLeaderboard();
        setLeaderboard(leaderboardData);
        
        // Refresh all positions
        const allPositionsData = await stakingService.getAllPositions();
        setAllPositions(allPositionsData);
      }
    } catch (error) {
      console.error('Error creating config:', error);
      alert(`Error creating config: ${error}`);
    } finally {
      setAdminLoading(false);
    }
  };

  const updateApys = async () => {
    console.log('Update APYs called with:', {
      stakingService: !!stakingService,
      publicKey: publicKey?.toString(),
      wallet: !!wallet,
      connection: !!connection
    });
    
    if (!stakingService) {
      alert('Staking service not initialized. Please try refreshing the page.');
      return;
    }
    
    if (!publicKey) {
      alert('Wallet public key not available. Please ensure your wallet is connected.');
      return;
    }
    
    try {
      setAdminLoading(true);
      const apysInBasisPoints = newApys.map(apy => Math.round(apy * 100)); // Convert to basis points
      
      const tx = await stakingService.updateApys(apysInBasisPoints);
      
      alert(`APYs updated successfully! Transaction: ${tx}`);
      // Refresh data
      if (stakingService) {
        const configData = await stakingService.getConfig();
        setConfig(configData);
        if (publicKey) {
          const positionsData = await stakingService.getUserPositions(publicKey);
          setPositions(positionsData);
          await fetchTokenBalance();
        }
        // Refresh leaderboard
        const leaderboardData = await stakingService.getLeaderboard();
        setLeaderboard(leaderboardData);
        
        // Refresh all positions
        const allPositionsData = await stakingService.getAllPositions();
        setAllPositions(allPositionsData);
      }
    } catch (error) {
      console.error('Error updating APYs:', error);
      alert(`Error updating APYs: ${error}`);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleStake = async () => {
    console.log('Handle stake called with:', {
      stakingService: !!stakingService,
      publicKey: publicKey?.toString(),
      stakeAmount,
      config: !!config,
      userTokenBalance
    });
    
    if (!stakingService) {
      alert('Staking service not available. Please try refreshing the page.');
      return;
    }
    
    if (!publicKey) {
      alert('Wallet not connected. Please connect your wallet.');
      return;
    }
    
    if (!stakeAmount) {
      alert('Please enter an amount to stake.');
      return;
    }
    
    if (!config) {
      alert('Staking configuration not loaded. Please wait or refresh the page.');
      return;
    }

    try {
      setLoading(true);
      
      // Get user's token account using the token address from config
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: config.tokenAddress,
      });

      console.log('Found token accounts:', tokenAccounts.value.map(acc => ({
        pubkey: acc.pubkey.toString(),
        mint: acc.account.data.parsed.info.mint,
        owner: acc.account.data.parsed.info.owner,
        amount: acc.account.data.parsed.info.tokenAmount.uiAmount
      })));

      if (tokenAccounts.value.length === 0) {
        alert(`No token account found for mint ${config.tokenAddress.toString()}. You may need to create a token account first or get some tokens.`);
        return;
      }

      console.log('Selected token account:', tokenAccounts.value[0].pubkey.toString());

      // Pass amount in UI units (not base units) as the new program expects
      const amount = parseFloat(stakeAmount);
      
      console.log('Staking with accounts:', {
        amount,
        lockDays,
        userTokenAccount: tokenAccounts.value[0].pubkey.toString(),
        configTokenAddress: config.tokenAddress.toString(),
        TOKEN_MINT: TOKEN_MINT.toString(),
        config: config
      });
      
      // Log token account info for debugging
      const accountInfo = await connection.getAccountInfo(tokenAccounts.value[0].pubkey);
      console.log('Token account info:', {
        owner: accountInfo?.owner.toString(),
        tokenType: accountInfo?.owner.toString() === 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' 
          ? 'Token2022' 
          : accountInfo?.owner.toString() === 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
          ? 'Standard SPL Token'
          : 'Unknown Token Type'
      });
      
      const tx = await stakingService.lockTokens(
        amount,
        lockDays,
        TOKEN_MINT
      );

      alert(`Staking successful! Transaction: ${tx}`);
      setStakeAmount('');
      // Refresh data
      if (stakingService) {
        const configData = await stakingService.getConfig();
        setConfig(configData);
        if (publicKey) {
          const positionsData = await stakingService.getUserPositions(publicKey);
          setPositions(positionsData);
          await fetchTokenBalance();
        }
        // Refresh leaderboard
        const leaderboardData = await stakingService.getLeaderboard();
        setLeaderboard(leaderboardData);
        
        // Refresh all positions
        const allPositionsData = await stakingService.getAllPositions();
        setAllPositions(allPositionsData);
      }
    } catch (error) {
      console.error('Error staking:', error);
      alert(`Error staking: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async (position: StakePosition) => {
    if (!stakingService || !publicKey) return;

    try {
      setLoading(true);
      
      // Get user's token account using the token address from config
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
        mint: config?.tokenAddress || TOKEN_MINT,
      });

      if (tokenAccounts.value.length === 0) {
        alert('No token account found.');
        return;
      }

      // Get position PDA
      const [positionPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('position'), publicKey.toBuffer(), position.amountLocked.toArrayLike(Buffer, 'le', 8)],
        stakingService.programId
      );

      // Derive the vault authority PDA and config token account
      const [vaultAuthority] = PublicKey.findProgramAddressSync(
        [Buffer.from('vault')],
        stakingService.programId
      );

      // Derive config token account (unused but kept for future use)
      getAssociatedTokenAddressSync(
        config?.tokenAddress || TOKEN_MINT,
        vaultAuthority,
        true,
        TOKEN_2022_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      const tx = await stakingService.unlockTokens(
        positionPda,
        TOKEN_MINT
      );

      alert(`Unstaking successful! Transaction: ${tx}`);
      // Refresh data
      if (stakingService) {
        const configData = await stakingService.getConfig();
        setConfig(configData);
        if (publicKey) {
          const positionsData = await stakingService.getUserPositions(publicKey);
          setPositions(positionsData);
          await fetchTokenBalance();
        }
        // Refresh leaderboard
        const leaderboardData = await stakingService.getLeaderboard();
        setLeaderboard(leaderboardData);
        
        // Refresh all positions
        const allPositionsData = await stakingService.getAllPositions();
        setAllPositions(allPositionsData);
      }
    } catch (error) {
      console.error('Error unstaking:', error);
      alert(`Error unstaking: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: { toNumber: () => number }) => {
    return new Date(timestamp.toNumber() * 1000).toLocaleDateString();
  };

  const formatAmount = (amount: { toNumber: () => number }, decimals: number) => {
    return (amount.toNumber() / Math.pow(10, decimals)).toFixed(2);
  };

  const formatUSDValue = (organicAmount: number) => {
    if (!tokenPrice) return '';
    const usdValue = organicAmount * tokenPrice;
    return `($${usdValue.toFixed(2)})`;
  };

  const isPositionUnlockable = (position: StakePosition) => {
    const now = Math.floor(Date.now() / 1000);
    return position.endDate.toNumber() <= now;
  };

  const toggleUserExpansion = (userAddress: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userAddress)) {
      newExpanded.delete(userAddress);
    } else {
      newExpanded.add(userAddress);
    }
    setExpandedUsers(newExpanded);
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-green-50 via-lime-50 to-emerald-50">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-green-400/5 to-emerald-400/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-300/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-green-300/10 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-emerald-300/10 rounded-full filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2384cc16' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Mobile-Optimized Navigation */}
      <nav className="relative z-30 px-4 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg active:scale-95 transition-transform cursor-pointer">
                  🐄
                </div>
                <span className="text-base sm:text-lg font-black bg-gradient-to-r from-green-600 to-lime-500 bg-clip-text text-transparent">
                  ORGANIC
                </span>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex items-center gap-2 sm:gap-4">
                <a
                  href="/"
                  className="group relative inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-lime-100 to-green-100 active:from-lime-200 active:to-green-200 rounded-full text-xs sm:text-sm font-bold text-green-700 transition-all duration-300 active:scale-95 shadow-sm min-h-[44px] min-w-[44px] justify-center sm:min-w-auto"
                >
                  <span className="text-base sm:text-sm">🏠</span>
                  <span className="hidden sm:inline">Home</span>
                </a>
                
                <div className="w-px h-6 bg-gray-300 hidden sm:block" />
                
                <a
                  href="/ecosystem"
                  className="group relative inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-lime-100 to-green-100 active:from-lime-200 active:to-green-200 rounded-full text-xs sm:text-sm font-bold text-green-700 transition-all duration-300 active:scale-95 shadow-sm min-h-[44px] min-w-[44px] justify-center sm:min-w-auto"
                >
                  <span className="text-base sm:text-sm">🎮</span>
                  <span className="hidden sm:inline">Ecosystem</span>
                </a>

                <div className="w-px h-6 bg-gray-300 hidden sm:block" />
                
                <a
                  href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-lime-400 active:from-green-600 active:to-lime-500 rounded-full text-xs sm:text-sm font-bold text-white transition-all duration-300 active:scale-95 shadow-lg min-h-[44px]"
                >
                  <span className="text-base sm:text-sm">💰</span>
                  <span className="hidden sm:inline">Buy ORGANIC</span>
                  <span className="sm:hidden text-xs">Buy</span>
                </a>

                <div className="w-px h-6 bg-gray-300 hidden sm:block" />

                <a
                  href="https://dexscreener.com/solana/9r87b2ur7jemtmshxjq9cwr4j4fnf2qfhzivhbay3zcb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-sky-100 to-cyan-100 active:from-sky-200 active:to-cyan-200 rounded-full text-xs sm:text-sm font-bold text-cyan-700 transition-all duration-300 active:scale-95 shadow-sm min-h-[44px]"
                >
                  <span className="text-base sm:text-sm">📈</span>
                  <span className="hidden sm:inline">DexScreener</span>
                </a>

                <a
                  href="https://x.com/organicrunner_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center w-11 h-11 sm:w-10 sm:h-10 bg-black active:bg-gray-800 text-white rounded-xl transition-all duration-300 active:scale-95 shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 h-[calc(100vh-80px)] overflow-y-auto pt-2 sm:pt-4">
        {/* Mobile-Optimized Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-lime-400 to-green-600 rounded-xl flex items-center justify-center text-white text-sm sm:text-lg shadow-lg">
              🐄
            </div>
            <span className="text-xl sm:text-2xl animate-bounce" style={{ animationDelay: '0ms' }}>🌱</span>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black bg-gradient-to-br from-green-600 via-lime-500 to-emerald-500 bg-clip-text text-transparent">
              Staking
            </h1>
            <span className="text-xl sm:text-2xl animate-bounce" style={{ animationDelay: '500ms' }}>🐄</span>
          </div>
          <p className="text-sm sm:text-base text-gray-600 font-light max-w-2xl mx-auto mb-3 sm:mb-4 px-4">
            Plant your ORGANIC tokens and watch them grow with our staking program
          </p>
          <div className="flex justify-center">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
              <span>🏠</span>
            </a>
          </div>
          
          {/* Contract Address */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl border border-gray-200 shadow-lg">
            <span className="text-xs text-gray-500 font-semibold">CA:</span>
            <code className="text-xs font-mono text-gray-700">DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777</code>
            <a
              href="https://heaven.xyz/token/DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Wallet Connection Section */}
        {!connected ? (
          <div className="text-center py-12">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 border border-white/50 shadow-lg max-w-md mx-auto">
              <div className="flex justify-center mb-6">
                <span className="text-6xl">🐄</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Wallet</h2>
              <p className="text-gray-600 mb-8">Connect your wallet to start organic farming and staking</p>
              <WalletMultiButton className="bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300" />
            </div>
          </div>
        ) : (
          <>
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                <p className="text-gray-600 mt-2">Loading your farm data...</p>
              </div>
            )}

            {isAdmin && adminLoading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                <p className="text-gray-600 mt-2">Processing admin operation...</p>
              </div>
            )}

            {isAdmin && (
              <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-red-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">👑</span>
                  <h2 className="text-2xl font-bold text-gray-800">Admin Controls</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Create Config */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Create Config</h3>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Token Address</label>
                      <input
                        type="text"
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">Token Decimals</label>
                      <input
                        type="number"
                        value={tokenDecimals}
                        onChange={(e) => setTokenDecimals(Number(e.target.value))}
                        className="w-full px-4 py-3 bg-white/60 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <button
                      onClick={createConfig}
                      disabled={adminLoading}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      {adminLoading ? 'Creating...' : 'Create Config'}
                    </button>
                  </div>

                  {/* Update APYs */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Update APYs</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">1 Day (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newApys[0]}
                          onChange={(e) => setNewApys([Number(e.target.value), newApys[1], newApys[2], newApys[3]])}
                          className="w-full px-3 py-2 bg-white/60 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">10 Days (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newApys[1]}
                          onChange={(e) => setNewApys([newApys[0], Number(e.target.value), newApys[2], newApys[3]])}
                          className="w-full px-3 py-2 bg-white/60 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">30 Days (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newApys[2]}
                          onChange={(e) => setNewApys([newApys[0], newApys[1], Number(e.target.value), newApys[3]])}
                          className="w-full px-3 py-2 bg-white/60 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1">100 Days (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={newApys[3]}
                          onChange={(e) => setNewApys([newApys[0], newApys[1], newApys[2], Number(e.target.value)])}
                          className="w-full px-3 py-2 bg-white/60 border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={updateApys}
                      disabled={adminLoading}
                      className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      {adminLoading ? 'Updating...' : 'Update APYs'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Staking Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Staking Form */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🌾</span>
                  <h2 className="text-2xl font-bold text-gray-800">Plant Your Tokens</h2>
                </div>
                
                {config && (
                  <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">🌱</span>
                      <h3 className="text-lg font-semibold text-gray-800">Lock Periods</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">10 Days</p>
                        <p className="text-green-600 font-bold">Short Term</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">30 Days</p>
                        <p className="text-green-600 font-bold">Medium Term</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-sm">100 Days</p>
                        <p className="text-green-600 font-bold">Long Term</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Amount to Stake
                    </label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-gray-600 text-sm">
                        Available: {userTokenBalance.toFixed(2)} tokens {formatUSDValue(userTokenBalance)}
                      </p>
                      <button
                        onClick={fetchTokenBalance}
                        className="text-green-600 hover:text-green-700 text-sm underline"
                      >
                        Refresh
                      </button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => setStakeAmount((userTokenBalance * 0.5).toFixed(2))}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        50%
                      </button>
                      <button
                        onClick={() => setStakeAmount(userTokenBalance.toFixed(2))}
                        className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        100%
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Lock Duration
                    </label>
                    <select
                      value={lockDays}
                      onChange={(e) => setLockDays(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white/80 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value={10}>10 Days</option>
                      <option value={30}>30 Days</option>
                      <option value={100}>100 Days</option>
                    </select>
                  </div>

                  <button
                    onClick={handleStake}
                    disabled={loading || !stakeAmount}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    {loading ? '🌱 Planting...' : '🌱 Plant Tokens'}
                  </button>
                </div>
              </div>

              {/* Positions */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🏡</span>
                  <h2 className="text-2xl font-bold text-gray-800">Your Farm</h2>
                </div>
                
                {positions.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="text-6xl mb-4 block">🌱</span>
                    <p className="text-gray-600">No crops planted yet</p>
                    <p className="text-gray-500 text-sm mt-2">Start planting to grow your organic tokens!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {positions.map((position, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-gray-800 font-semibold">
                              {formatAmount(position.amountLocked, config?.decimals || 6)} tokens {formatUSDValue(parseFloat(formatAmount(position.amountLocked, config?.decimals || 6)))}
                            </p>
                            <p className="text-gray-600 text-sm">
                              Locked for {position.lockDays} day{position.lockDays > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-gray-600 text-sm mb-3">
                          <p>Start: {formatDate(position.startDate)}</p>
                          <p>End: {formatDate(position.endDate)}</p>
                        </div>

                        {isPositionUnlockable(position) ? (
                          <button
                            onClick={() => handleUnstake(position)}
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                          >
                            {loading ? 'Unlocking...' : 'Unlock Tokens'}
                          </button>
                        ) : (
                          <div className="text-center py-2">
                            <span className="text-2xl mb-2 block">🔒</span>
                            <p className="text-yellow-600 text-sm">Tokens still locked</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Leaderboard and Token Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Leaderboard */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <h2 className="text-2xl font-bold text-gray-800">Top Farmers</h2>
                  </div>
                  <button
                    onClick={async () => {
                      if (stakingService) {
                        try {
                          const leaderboardData = await stakingService.getLeaderboard();
                          console.log('Refreshed leaderboard data:', leaderboardData);
                          setLeaderboard(leaderboardData || []);
                          
                          const allPositionsData = await stakingService.getAllPositions();
                          console.log('Refreshed all positions data:', allPositionsData);
                          setAllPositions(allPositionsData || []);
                        } catch (error) {
                          console.error('Error refreshing leaderboard:', error);
                        }
                      }
                    }}
                    className="text-green-600 hover:text-green-700 text-sm underline"
                  >
                    Refresh
                  </button>
                </div>
                
                {leaderboard.length === 0 ? (
                  <div className="text-center py-8">
                    <span className="text-6xl mb-4 block">🌱</span>
                    <p className="text-gray-600">No farmers yet</p>
                    <p className="text-gray-500 text-sm mt-2">Be the first to stake and claim the top spot!</p>
                    <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-500">
                      <p>Debug: Leaderboard length: {leaderboard.length}</p>
                      <p>Debug: Staking service: {stakingService ? 'Available' : 'Not available'}</p>
                      <p>Debug: Connected: {connected ? 'Yes' : 'No'}</p>
                      <p>Debug: Public key: {publicKey ? 'Available' : 'Not available'}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div key={index} className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-gray-400' : 
                              index === 2 ? 'bg-orange-600' : 'bg-green-600'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-gray-800 font-semibold">
                                {entry.user.toString().slice(0, 4)}...{entry.user.toString().slice(-4)}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {entry.positionCount} position{entry.positionCount > 1 ? 's' : ''} • {formatAmount(entry.totalStaked, config?.decimals || 6)} ORGANIC {formatUSDValue(parseFloat(formatAmount(entry.totalStaked, config?.decimals || 6)))}
                              </p>
                            </div>
                          </div>
                          {entry.positionCount > 1 && (
                            <button
                              onClick={() => toggleUserExpansion(entry.user.toString())}
                              className="text-blue-600 hover:text-blue-700 text-sm underline cursor-pointer"
                            >
                              {expandedUsers.has(entry.user.toString()) ? 'Hide details' : 'Show details'}
                            </button>
                          )}
                        </div>
                        
                        {/* Show individual positions if user has multiple and is expanded */}
                        {entry.positionCount > 1 && expandedUsers.has(entry.user.toString()) && (
                          <div className="ml-12 space-y-2">
                            {allPositions
                              .filter(pos => pos.user.toString() === entry.user.toString())
                              .map((position, posIndex) => (
                                <div key={posIndex} className="bg-white/80 rounded-lg p-3 border border-green-100">
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="text-gray-800 text-sm font-medium">
                                        Position {posIndex + 1}
                                      </p>
                                      <p className="text-gray-600 text-xs">
                                        {position.lockDays} day{position.lockDays > 1 ? 's' : ''} lock
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-green-600 text-sm font-semibold">
                                        {formatAmount(position.amountLocked, config?.decimals || 6)} ORGANIC {formatUSDValue(parseFloat(formatAmount(position.amountLocked, config?.decimals || 6)))}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Token Information */}
              <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">🐄</span>
                  <h2 className="text-2xl font-bold text-gray-800">ORGANIC Token</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Token Address</h3>
                    <p className="text-green-600 font-mono text-sm break-all">
                      DeySaoLoSppcriZAtjUzWjFrUgK3jZhbsK4ifipw9777
                    </p>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Community</h3>
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://twitter.com/organicrunner_" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        <span className="text-xl">🐦</span>
                        <span>@organicrunner_</span>
                      </a>
                      <a 
                        href="https://www.itsafreerangegrassfedrunner.xyz/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
                      >
                        <span className="text-xl">🌐</span>
                        <span>Website</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">About ORGANIC</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      A free range grass fed runner. All cows go to heaven. Our cows aren&apos;t just cows - they&apos;re angels. 
                      Raised under heavenly blue skies, grazing on the greenest pastures, and frolicking like nobody&apos;s watching, 
                      each one pours their heart (and milk) into every carton.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
