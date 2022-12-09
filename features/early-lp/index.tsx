import { styled } from '@stitches/react'

import { walletState } from '../../state/atoms/walletAtoms'
import { useWalletConnectionStatus } from 'hooks/useWalletConnectionStatus'
import { useRecoilValue } from 'recoil'
import { Text } from '../../components/Text'

import { useMemo } from 'react'
import { useEffect, useState, MouseEvent, useCallback } from 'react'
import { Button } from 'components/Button'
import { toast } from 'react-toastify'
import { Airdrop as merkleAirdrop } from '../../util/merkle-airdrop-cli/airdrop'
import { formatDateWithSlash, numberToSequence } from 'util/conversion'

const PUBLIC_CW20_CONTRACT = process.env.NEXT_PUBLIC_CW20_BLOCK || ''

const LPClaim = ({
  contractAddress,
  voters,
  airdropStart,
  airdropEnd,
  index,
}) => {
  const [cw20Balance, setCw20Balance] = useState('')
  const [loadedAt, setLoadedAt] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [tokenInfo, setTokenInfo] = useState({ name: '', symbol: '' })

  const { isConnected } = useWalletConnectionStatus(walletState)

  const { address, client } = useRecoilValue(walletState)
  const [merkleProof, setMerkleProof] = useState([])

  const [airdropAmount, setAirdropAmount] = useState(0)
  const [isClaimed, setIsClaimed] = useState(false)

  const canClaim = useMemo(() => {
    const now = new Date()

    return (
      now.getTime() > new Date(airdropStart).getTime() &&
      now.getTime() < new Date(airdropEnd).getTime()
    )
  }, [airdropStart, airdropEnd])

  useEffect(() => {
    if (!address) return
    let claimData = voters.find((el) => el.address === address)
  /*  if (!claimData) {
      toast.error(
        'You are not a BLOCK Early LPer. Try connecting another Keplr wallet!'
      )
    }*/
  }, [address, voters])

  const getMerkleProof = useCallback(
    async (val: number) => {
      let ret: Array<Object> = []

      setLoading(true)
      if (address == '') {
        setLoading(false)
        return ret
      }

      let receivers: Array<{ address: string; amount: string }> = voters
      let airdrop = new merkleAirdrop(receivers)
      let proof = airdrop.getMerkleProof({
        address: address,
        amount: val.toString(),
      })
      setLoading(false)
      return proof
    },
    [address, voters]
  )

  useEffect(() => {
    if (!client || address.length === 0) return

    voters.forEach((rec) => {
      if (rec.address == address) {
        setAirdropAmount(parseInt(rec.amount))
      }
    })

    // Gets cw20 balance
    client
      .queryContractSmart(PUBLIC_CW20_CONTRACT, {
        balance: { address: address },
      })
      .then((response) => {
        setCw20Balance(response.balance)
      })
      .catch((error) => {
        toast.error(`Error! ${error.message}`)
      })
  }, [client, address, loadedAt, voters])

  useEffect(() => {
    if (!client) return

    // Gets token information
    client
      .queryContractSmart(PUBLIC_CW20_CONTRACT, {
        token_info: {},
      })
      .then((response) => {
        setTokenInfo(response)
      })
      .catch((error) => {
        toast.error(`Error! ${error.message}`)
      })
  }, [client])

  useEffect(() => {
    if (!client || address.length === 0) return
    getMerkleProof(airdropAmount)
      .then((response: []) => {
        setMerkleProof(response)
      })
      .catch((error: any) => {
        toast.error(`Error! ${error.message}`)
      })

    client
      .queryContractSmart(contractAddress, {
        is_claimed: {
          stage: 1,
          address: address,
        },
      })
      .then((response) => {
        setIsClaimed(response.is_claimed)
      })
      .catch((error) => {
        toast.error(`Error! ${error.message}`)
      })
  }, [client, address, airdropAmount, getMerkleProof, contractAddress])

  const handleAirdrop = (event: MouseEvent<HTMLElement>) => {
    if (!client || !isConnected) {
      toast.error('Please connect your wallet!')
      return
    }
    if (!canClaim) {
      toast.error('You cannot claim now!')
      return
    }

    if (isClaimed) {
      toast.success('Already claimed!')
      return
    }
    event.preventDefault()
    setLoading(true)
    const defaultFee = {
      amount: [],
      gas: '400000',
    }

    client
      ?.execute(
        address,
        contractAddress,
        {
          claim: {
            stage: 1,
            amount: `${airdropAmount}`,
            proof: merkleProof,
          },
        }, // msg
        defaultFee,
        undefined,
        []
      )
      .then((response) => {
        setLoadedAt(new Date())
        setLoading(false)
        toast.success('Successfully claimed!')
      })
      .catch((error) => {
        setLoading(false)
        toast.error(`Error! ${error}`)
      })
  }

  return (
    <>
      <Text variant="primary" css={{ paddingBottom: '$2', paddingTop: '$4', fontSize: '$8' }}>
        {numberToSequence(index)} Unlock on {formatDateWithSlash(airdropStart)}
      </Text>
      <StyledElementForCard kind="claim" className="airdrop-claim">
        <div className="claim-block">
          <div className="claim-item">
            <Text
              variant="primary"
              css={{ paddingBottom: '$2', color: '$gray' }}
            >
              Amount to claim:
            </Text>
            <Text as="span" variant="title">
              {cw20Balance && (
                <span>
                  <img
                    src="https://raw.githubusercontent.com/MarbleDAO/brand-assets/main/block.png"
                    alt="BLOCK"
                  />
                  {` ${Number(airdropAmount / 1000000).toFixed(2)} ${
                    tokenInfo.symbol
                  } `}
                </span>
              )}
            </Text>
          </div>
          <Button
            variant="primary"
            css={{ fontSize: '$4' }}
            size="medium"
            disabled={!canClaim}
            onClick={handleAirdrop}
          >
            Claim Rewards
          </Button>
        </div>
      </StyledElementForCard>
    </>
  )
}

export default LPClaim

const StyledElementForCard = styled('div', {
  variants: {
    kind: {
      wrapper: {
        borderRadius: '$2',
        padding: '$9 $16',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '$backgroundColors$main',
      },
      content: {
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: '$space$10',
        position: 'relative',
        zIndex: 1,
        width: '100%',
      },
      actions: {
        display: 'grid',
        gridAutoFlow: 'column',
        columnGap: '$space$6',
        position: 'relative',
        zIndex: 1,
      },
      background: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      },
      claim: {
        borderRadius: '$2',
        padding: '$12 $12',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '$backgroundColors$main',
      },
    },
  },
})
