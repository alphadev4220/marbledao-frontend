import React from 'react'
import { styled } from '@stitches/react'
import DateCountdown from 'components/DateCountdown'
import { Text } from '../../../components/Text'
import { Button } from '../../../components/Button'
import { toast } from 'react-toastify'
import { useBaseTokenInfo, useTokenInfoByPoolId } from 'hooks/useTokenInfo'
import { DEPLOY_TIMESTAMP } from 'util/constants'
import { useBondingInfo } from 'hooks/useBondingInfo'

const incentiveStart = 'April 27, 2022 00:00:00 UTC+00:00'
const incentiveEnd = 'March 27, 2099 00:00:00 UTC+00:00'

interface PoolInfoProps {
  poolId: string
  tokenDollarValue: number
  myDailyReward?: string
  onClaim?: () => void
}

export const PoolInfo: React.FC<PoolInfoProps> = ({
  poolId,
  tokenDollarValue,
  myDailyReward,
  onClaim,
}) => {
  const token = useBaseTokenInfo()
  const tokenInfo = useTokenInfoByPoolId(poolId)

  const { bondingInfo } = useBondingInfo(tokenInfo?.incentives_address)

  if (!bondingInfo || !poolId) return null
  const currentTimeStamp = Math.floor(new Date().getTime() / 1000)
  const rewardCount = Math.ceil(
    (currentTimeStamp - DEPLOY_TIMESTAMP) / bondingInfo.reward_interval
  )
  const dateTo =
    (DEPLOY_TIMESTAMP + bondingInfo.reward_interval * rewardCount) * 1000

  const onClaimReward = async () => {
    const now = new Date()
    if (
      now.getTime() < new Date(incentiveStart).getTime() ||
      now.getTime() > new Date(incentiveEnd).getTime()
    ) {
      toast.error('Rewards are not distributed yet!')
      return
    }
    onClaim()
  }

  return (
    <StyledElementForCard kind="wrapper">
      <StyledElementForToken>
        <Text css={{ padding: '$4 0' }}>Block Price</Text>
        <Text variant="title" css={{ fontSize: '$15' }}>
          ${tokenDollarValue?.toFixed(6)}
        </Text>
      </StyledElementForToken>
      <StyledElementForToken>
        <Text css={{ padding: '$4 0' }}>Rewards distribution in</Text>
        <Text variant="title" css={{ fontSize: '$15' }}>
          <DateCountdown
            dateTo={dateTo}
            loop
            interval={bondingInfo.reward_interval}
            mostSignificantFigure="hour"
            numberOfFigures={2}
          />
        </Text>
      </StyledElementForToken>
      {myDailyReward !== undefined && (
        <StyledElementForToken>
          <Text css={{ padding: '$4 0' }}>Epoch Rewards Estimate</Text>
          <StyledContainerForToken>
            <StyledImageForToken
              as={token?.logoURI ? 'img' : 'div'}
              src={token?.logoURI}
              alt=""
            />
            <Text variant="title" css={{ fontSize: '$15' }}>
              {myDailyReward}
            </Text>
          </StyledContainerForToken>
          <StyledElementForRewards kind="actions">
            <Button
              css={{
                padding: '$3 $6',
                marginTop: '$5',
                borderRadius: '8px',
                fontSize: '$4',
              }}
              disabled={!Number(myDailyReward)}
              onClick={onClaimReward}
            >
              Claim
            </Button>
          </StyledElementForRewards>
        </StyledElementForToken>
      )}
    </StyledElementForCard>
  )
}

const StyledElementForRewards = styled('div', {
  variants: {
    kind: {
      wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 0',
      },
      tokens: {
        display: 'grid',
        columnGap: '32px',
        gridAutoFlow: 'column',
        alignItems: 'center',
      },
      column: {},
      actions: {
        '& .action-btn': {
          padding: '$2 $6',
          marginTop: '$5',
          borderRadius: '8px',
        },
      },
    },
  },
})

const StyledElementForCard = styled('div', {
  variants: {
    kind: {
      wrapper: {
        padding: '$18 $22',
        marginBottom: '$10',
        borderRadius: '$radii$4',
        border: '$borderWidths$1 solid $borderColors$default',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '$backgroundColors$white',
      },
    },
  },
})

const StyledElementForToken = styled('div', {
  display: 'flex',
  flex: 1,
  minWidth: 200,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const StyledImageForToken = styled('img', {
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: '#ccc',
  marginRight: 10,
})

const StyledContainerForToken = styled('div', {
  display: 'flex',
})
