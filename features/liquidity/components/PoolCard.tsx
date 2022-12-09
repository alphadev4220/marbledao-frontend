import Link from 'next/link'
import { useMemo } from 'react'
import { styled } from 'components/theme'
import { colorTokens } from '../../../util/constants'
import { Text } from '../../../components/Text'
import { useTokenInfo, useTokenInfoByPoolId } from '../../../hooks/useTokenInfo'
import { LiquidityType } from '../../../hooks/usePoolLiquidity'
import { IconWrapper } from '../../../components/IconWrapper'
import { Note } from '../../../icons'
import {
  dollarValueFormatterWithDecimals,
  protectAgainstNaN,
} from '../../../util/conversion'
import { useBondingInfo } from 'hooks/useBondingInfo'

type PoolCardProps = {
  poolId: string
  tokenASymbol: string
  tokenBSymbol: string
  totalLiquidity: LiquidityType
  myLiquidity: LiquidityType
  tokenDollarValue: number
}

export const parseCurrency = (value: number | string) =>
  Number(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })

export const PoolCard = ({
  poolId,
  tokenASymbol,
  tokenBSymbol,
  totalLiquidity,
  tokenDollarValue,
  myLiquidity,
}: PoolCardProps) => {
  const tokenA = useTokenInfo(tokenASymbol)
  const tokenB = useTokenInfo(tokenBSymbol)
  const tokenInfo = useTokenInfoByPoolId(poolId)

  const { bondingInfo, myBonding } = useBondingInfo(
    tokenInfo?.incentives_address
  )

  const APR = useMemo(() => {
    if (!bondingInfo) return '0.00'
    const lpTokenPrice = totalLiquidity?.dollarValue / totalLiquidity.coins
    const stakedDollarValue =
      (Number(bondingInfo.stake_amount) * lpTokenPrice) / 2
    const tokenAmount = stakedDollarValue / tokenDollarValue
    return protectAgainstNaN(
      (Number(bondingInfo.daily_reward_amount) * 365) / 10000 / tokenAmount
    ).toFixed(2)
  }, [bondingInfo, tokenDollarValue, totalLiquidity])

  return (
    <Link href={`/pools/${poolId}`} passHref>
      <StyledLinkForCard>
        <>
          <StyledDivForRowWrapper>
            <StyledDivForHeaderContainer>
              <StyledDivForTokenLogos>
                <StyledImageForTokenLogo
                  src={tokenA.logoURI}
                  as={tokenA.logoURI ? 'img' : 'div'}
                />
                <StyledImageForTokenLogo
                  src={tokenB.logoURI}
                  as={tokenB.logoURI ? 'img' : 'div'}
                />
              </StyledDivForTokenLogos>
              <StyledTextForTokenNames variant="primary">
                {tokenA.symbol} <span /> {tokenB.symbol}
              </StyledTextForTokenNames>
            </StyledDivForHeaderContainer>
          </StyledDivForRowWrapper>
        </>

        <StyledDivForSeparator />

        <StyledDivForLiquidityRows highlighted={true}>
          <StyledDivForRowWrapper>
            <StyledDivForRow>
              <Text color="secondary" variant="body">
                Total liquidity
              </Text>
              <Text>{parseCurrency(totalLiquidity.dollarValue)}</Text>
            </StyledDivForRow>
          </StyledDivForRowWrapper>
          <StyledDivForSeparator />
          <StyledDivForRowWrapper>
            <StyledDivForRow>
              <Text color="secondary" variant="body">
                APR
              </Text>
              <Text>{APR}%</Text>
            </StyledDivForRow>
          </StyledDivForRowWrapper>
          <StyledDivForSeparator />
          <StyledDivForRowWrapper>
            <StyledDivForRow>
              <Text color="secondary" variant="body">
                My liquidity
              </Text>
              <Text>{parseCurrency(myLiquidity.dollarValue)}</Text>
            </StyledDivForRow>
          </StyledDivForRowWrapper>
          <StyledDivForSeparator />
          <StyledDivForRowWrapper>
            <StyledDivForRow>
              <Text color="secondary" variant="body">
                Bonded
              </Text>
              <Text
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '$space$1',
                }}
              >
                <IconWrapper icon={<Note />} />$
                {dollarValueFormatterWithDecimals(
                  (Number(myBonding?.amount) / totalLiquidity?.coins) *
                    totalLiquidity.dollarValue,
                  {
                    includeCommaSeparation: true,
                    applyNumberConversion: false,
                  }
                )}
              </Text>
            </StyledDivForRow>
          </StyledDivForRowWrapper>
        </StyledDivForLiquidityRows>
      </StyledLinkForCard>
    </Link>
  )
}

export const PoolCardFetching = ({ hasLiquidityProvided = true }) => {
  return (
    <StyledLinkForCard
      as="div"
      variant={hasLiquidityProvided ? 'fetching--active' : 'fetching'}
    >
      <StyledDivForTokenLogos>
        <StyledImageForTokenLogo as="div" />
        <StyledImageForTokenLogo as="div" />
      </StyledDivForTokenLogos>
      {hasLiquidityProvided && (
        <>
          <StyledDivForLiquidityRows highlighted={true} placeholder={true}>
            <StyledDivForSeparator />
            <StyledDivForSeparator />
          </StyledDivForLiquidityRows>
        </>
      )}
    </StyledLinkForCard>
  )
}

const StyledLinkForCard = styled('a', {
  cursor: 'pointer',
  borderRadius: '$radii$4',
  border: '$borderWidths$1 solid $borderColors$default',
  backgroundColor: '$backgroundColors$white',
  position: 'relative',
  transition: 'background-color 0.1s ease-out',
  '&:hover': {
    backgroundColor: '$colors$dark15',
  },
  '&:active': {
    backgroundColor: '$colors$dark5',
  },
  variants: {
    variant: {
      fetching: {
        minHeight: '184px',
      },
      'fetching--active': {
        minHeight: '288px',
      },
    },
  },
})

const StyledDivForTokenLogos = styled('div', {
  left: '$space$11',
  top: '$space$12',
  display: 'block',
  float: 'left',
  alignItems: 'center',
})

const StyledImageForTokenLogo = styled('img', {
  width: '$space$22',
  height: '$space$22',
  borderRadius: '50%',
  objectFit: 'fit',
  backgroundColor: '#ccc',
  position: 'relative',
  zIndex: 1,
  '&:first-child': {
    boxShadow: '0 0 0 $space$1 #E8E8E9',
    zIndex: 0,
  },
  '&:last-child': {
    left: '-$space$4',
    border: '$borderWidths$2 solid $white',
  },
})

const StyledTextForTokenNames: typeof Text = styled(Text, {
  paddingTop: '$8',
  paddingBottom: '$2',
  display: 'flex',
  alignItems: 'center',
  '& span': {
    width: 4,
    height: 4,
    margin: '0 $3',
    borderRadius: '50%',
    backgroundColor: colorTokens.black,
  },
})

const StyledDivForSeparator = styled('hr', {
  margin: '0 auto',
  border: 'none',
  borderTop: '1px solid rgba(25, 29, 32, 0.1)',
  boxSizing: 'border-box',
  height: 1,
})

const StyledDivForRowWrapper = styled('div', {
  padding: '20px 24px 24px',
  position: 'relative',
  zIndex: 1,
})

const StyledDivForHeaderContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
})

const StyledDivForRow = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
})

const StyledDivForLiquidityRows = styled('div', {
  variants: {
    placeholder: {
      true: {
        display: 'grid',
        rowGap: 0,
        position: 'absolute !important',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 'calc(100% - 100% / 3)',
      },
    },
    highlighted: {
      true: {
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          zIndex: 0,
          left: 0,
          top: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          /*background:
            'radial-gradient(71.15% 71.14% at 19.4% 81.87%, #fd9f98 0%, rgba(247, 202, 100, 0) 100%)',*/
          opacity: 0.4,
          borderRadius: '0 0 8px 8px',
        },
      },
    },
  },
})
