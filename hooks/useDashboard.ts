import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { walletState } from 'state/atoms/walletAtoms'
import { protectAgainstNaN } from 'util/conversion'
import { useMultiplePoolsLiquidity } from './usePoolLiquidity'
import {
  useTokenDollarValue,
  useTokenDollarValueQuery,
} from './useTokenDollarValue'
import { useTokenList } from './useTokenList'
const DAO_ADDRESS = [
  'juno14an9atj9jf77emlrajdcx6a5ykvp4kvwe850w043cp2zf5l2lxlqjh0qs3',
  'juno1ay840g97ngja9k0f9lnywqxwk49245snw69kpwz0ry9qv99q367q3m4x8v',
  'juno1zz3gc2p9ntzgjt8dh4dfqnlptdynxlgd4j7u2lutwdg5xwlm4pcqyxnecp',
]

const STAKING_ADDRESS = [
  'juno16chnq7j49z289wlhjv3qjzrddz4jf332crz964c8csclydlqxxdqt2ht9t',
  'juno13hsmf05g3ukaz6z5cxfxuxnfgtlpdw9w8qma3yyvk43s9sztdsxqakrpt9',
  'juno1lqqv9qt5ghlpzsy0wsk02zh0qdansm8fkh9rjz97ke4zvh78254qx80jj6',
]

const LAST_STAKING_ADDRESS = [
  'juno1lqqv9qt5ghlpzsy0wsk02zh0qdansm8fkh9rjz97ke4zvh78254qx80jj6',
]

export const useDashboard = () => {
  const [blockSupply, setBlockSupply] = useState(0)
  const [marbleSupply, setMarbleSupply] = useState(0)
  const [totalBonding, setTotalBonding] = useState(0)
  const [maxAPR, setMaxAPR] = useState(0)
  const [governanceStaking, setGovernanceStaking] = useState(0)
  const [lastdaoStaking, setlastdaoStaking] = useState(0)
  const [treasuryBalance, setTreasuryBalance] = useState(0)

  const [[marblePrice, junoPrice]] = useTokenDollarValueQuery([
    'MARBLE',
    'JUNO',
  ])
  const [blockPrice] = useTokenDollarValue('BLOCK')
  const { address, client } = useRecoilValue(walletState)

  const [tokenList] = useTokenList()
  const [supportedTokens, poolIds] = useMemo(() => {
    const tokensCollection =
      tokenList?.tokens.filter(({ swap_address }) => Boolean(swap_address)) ??
      []

    const poolIdsCollection = tokensCollection
      .map(({ pool_id }) => pool_id)
      .filter(Boolean)

    return [tokensCollection, poolIdsCollection]
  }, [tokenList])

  const [liquidity] = useMultiplePoolsLiquidity({
    poolIds,
  })

  const totalLiquidity = useMemo(() => {
    return liquidity.reduce((prev, curr) => {
      return prev + curr.totalLiquidity.dollarValue
    }, 0)
  }, [liquidity])

  const getBlockSupply = useCallback(async () => {
    const tokenInfo = await client.queryContractSmart(
      process.env.NEXT_PUBLIC_BLOCK_TOKEN_ADDRESS,
      {
        token_info: {},
      }
    )
    setBlockSupply(
      protectAgainstNaN(
        Number(tokenInfo?.total_supply / Math.pow(10, tokenInfo?.decimals))
      )
    )
  }, [client])

  const getMarbleSupply = useCallback(async () => {
    const tokenInfo = await client.queryContractSmart(
      process.env.NEXT_PUBLIC_MARBLE_TOKEN_ADDRESS,
      {
        token_info: {},
      }
    )
    setMarbleSupply(
      protectAgainstNaN(
        Number(tokenInfo?.total_supply / Math.pow(10, tokenInfo?.decimals))
      )
    )
  }, [client])

  const calculateAPR = useCallback(
    (dailyReward, bondedDollarValue) => {
      const tokenAmount = bondedDollarValue / 2 / blockPrice
      return protectAgainstNaN(
        (365 * Number(dailyReward)) / 10000 / tokenAmount
      )
    },
    [blockPrice]
  )

  const getTotalBonding = useCallback(async () => {
    let bonding = 0
    let APR = 0
    if (!liquidity || !supportedTokens) return 0
    for (let i in supportedTokens) {
      const bondingInfo = await client?.queryContractSmart(
        supportedTokens[i].incentives_address,
        {
          config: {},
        }
      )
      const lpTokenPrice =
        liquidity[i]?.totalLiquidity?.dollarValue /
        liquidity[i]?.totalLiquidity?.coins
      const bondedDollarValue = protectAgainstNaN(
        Number(bondingInfo?.stake_amount) * lpTokenPrice
      )
      APR = Math.max(
        APR,
        calculateAPR(bondingInfo?.daily_reward_amount, bondedDollarValue)
      )
      bonding += bondedDollarValue
    }
    setTotalBonding(bonding)
    setMaxAPR(APR)
  }, [liquidity, supportedTokens, client, calculateAPR])

  const getGovernanceStaking = useCallback(async () => {
    let stakingAmount = 0
    for (let stakingAddress of STAKING_ADDRESS) {
      const res = await client?.queryContractSmart(stakingAddress, {
        total_value: {},
      })
      stakingAmount += protectAgainstNaN(Number(res?.total))
    }
    setGovernanceStaking(stakingAmount / marbleSupply / 10)
  }, [client, marbleSupply])

  const getlastdaoStaking = useCallback(async () => {
    let stakingAmount = 0
    for (let stakingAddress of LAST_STAKING_ADDRESS) {
      const res = await client?.queryContractSmart(stakingAddress, {
        total_value: {},
      })
      stakingAmount += protectAgainstNaN(Number(res?.total))
    }
    setlastdaoStaking(stakingAmount / marbleSupply / 10)
  }, [client, marbleSupply])

  const getTreasuryBalance = useCallback(async () => {
    let balance = 0
    for (let daoAddress of DAO_ADDRESS) {
      const marble = await client?.queryContractSmart(
        process.env.NEXT_PUBLIC_MARBLE_TOKEN_ADDRESS,
        {
          balance: { address: daoAddress },
        }
      )
      const block = await client?.queryContractSmart(
        process.env.NEXT_PUBLIC_BLOCK_TOKEN_ADDRESS,
        {
          balance: { address: daoAddress },
        }
      )
      const juno = await client?.getBalance(daoAddress, 'ujuno')
      balance += protectAgainstNaN(
        Number(
          marble?.balance * marblePrice +
            block?.balance * blockPrice +
            Number(juno?.amount) * junoPrice
        ) / 100000
      )
    }
    setTreasuryBalance(balance)
  }, [blockPrice, client, junoPrice, marblePrice])

  useEffect(() => {
    if (!client) return
    getBlockSupply()
    getMarbleSupply()
    getGovernanceStaking()
    getlastdaoStaking()
    getTreasuryBalance()
  }, [
    client,
    getBlockSupply,
    getGovernanceStaking,
    getlastdaoStaking,
    getMarbleSupply,
    getTreasuryBalance,
  ])

  useEffect(() => {
    getTotalBonding()
  }, [getTotalBonding])

  return {
    marblePrice,
    blockPrice,
    blockSupply,
    marbleSupply,
    totalLiquidity,
    totalBonding,
    maxAPR,
    governanceStaking,
    lastdaoStaking,
    treasuryBalance,
    isConnected: !!address,
  }
}
