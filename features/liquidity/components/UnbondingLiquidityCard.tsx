import { styled } from 'components/theme'
import {
  dollarValueFormatterWithDecimals,
  formatTimestamp,
} from 'util/conversion'
import { Text } from '../../../components/Text'
import { Button } from 'components/Button'

interface UnbondingLiquidityCardProps {
  totalLiquidity: {
    coins: number
    dollarValue: number
  }
  index: number
  lockDays: number
  unbonding: (string | number)[]
  onWithdraw: (index: number) => void
}
export const UnbondingLiquidityCard = ({
  totalLiquidity,
  index,
  lockDays,
  unbonding,
  onWithdraw,
}: UnbondingLiquidityCardProps) => {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000)
  const remainingTimestamp =
    Number(unbonding[1]) + (lockDays - 14) * 86400 - currentTimestamp
  const remainingPercent = Math.floor(
    (remainingTimestamp * 100) / lockDays / 86400
  )
  return (
    <StyledElementForCard kind="wrapper">
      <StyledElementForCard kind="content">
        <StyledElementForCard kind="columnLeft">
          <Text variant="body" color="secondary">
            Unbonded tokens
          </Text>
          <Text variant="body" css={{ padding: '$2 $6'}} color="body">
            $
            {dollarValueFormatterWithDecimals(
              (Number(unbonding[0]) / totalLiquidity?.coins) *
                totalLiquidity.dollarValue ?? 0
            )}
          </Text>
        </StyledElementForCard>
        <StyledElementForCard kind="columnRight">
          <Text variant="body" color="secondary">
            {remainingTimestamp > 0 ? (
              formatTimestamp(remainingTimestamp)
            ) : (
              <Button
                css={{ padding: '$2 $6', borderRadius: '8px', fontSize: '$6' }}
                onClick={() => onWithdraw(index)}
              >
                Withdraw
              </Button>
            )}
          </Text>
        </StyledElementForCard>
      </StyledElementForCard>
      <StyledElementForBar kind="wrapper">
        <StyledElementForBar
          kind="element"
          css={{ transform: `translate(-${remainingPercent}%)` }}
        />
      </StyledElementForBar>
    </StyledElementForCard>
  )
}

const StyledElementForCard = styled('div', {
  variants: {
    kind: {
      wrapper: {
        padding: '0 35px 12px 24px',
        borderRadius: '8px',
        border: '1px solid $borderColors$default',
        backgroundColor: '$dark10',
      },
      content: {
        padding: '$10 0',
        display: 'flex',
        justifyContent: 'space-between',
      },
      columnLeft: {
        display: 'grid',
        columnGap: '$space$11',
        gridAutoFlow: 'column',
        alignItems: 'center',
      },
      columnRight: {},
    },
  },
})

const StyledElementForBar = styled('div', {
  variants: {
    kind: {
      wrapper: {
        width: '100%',
        height: 4,
        background: '#C4C4C4',
        position: 'relative',
        overflow: 'hidden',
      },
      element: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: '#161616',
      },
    },
  },
})
