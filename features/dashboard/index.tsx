import type { NextPage } from 'next'
import Link from 'next/link'
import { styled } from 'components/theme'
import { PlusCircleIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { PageHeader } from 'components/Layout/PageHeader'
import { Button } from 'components/Button'
import { IconWrapper } from '../../components/IconWrapper'
import { Tron } from 'icons/Tron'
import { Educate } from 'icons/Educate'
import { MagicStar } from 'icons/MagicStar'
import { Story } from 'icons/Story'
import Chart from './chart'
import { useDashboard } from 'hooks/useDashboard'
import {
  dollarValueFormatter,
  valueFormatter6,
  formatTokenBalance,
} from 'util/conversion'
const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || ''
const BLOCK_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_BLOCK_TOKEN_ADDRESS || ''
const MARBLE_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MARBLE_TOKEN_ADDRESS || ''

const Dashboard: NextPage = () => {
  const {
    marblePrice,
    marbleSupply,
    blockPrice,
    blockSupply,
    totalLiquidity,
    totalBonding,
    maxAPR,
    governanceStaking,
    lastdaoStaking,
    treasuryBalance,
    isConnected,
  } = useDashboard()

  const onAddToken = async (token: string) => {
    if (window && !window?.keplr) {
      alert('Please install Keplr extension and refresh the page.')
      return
    }
    if (token === 'BLOCK') {
      await window.keplr.suggestToken(PUBLIC_CHAIN_ID, BLOCK_TOKEN_ADDRESS)
    } else if (token === 'MARBLE') {
      await window.keplr.suggestToken(PUBLIC_CHAIN_ID, MARBLE_TOKEN_ADDRESS)
    }
  }

  return (
    <>
      <div className="dashboard">
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div className="flex-1">
            <StyledDiv>
              <div className="price-item item-header">
                <div className="d-flex flex-center">
                  <StyledTokenImage src="https://raw.githubusercontent.com/MarbleDAO/brand-assets/main/marble.png" />
                  <span>MARBLE</span>
                </div>
                <span>${valueFormatter6(marblePrice)}</span>
              </div>
              <div className="price-item">
                <span>Supply</span>
                <span>
                  {formatTokenBalance(marbleSupply, {
                    includeCommaSeparation: true,
                  })}
                </span>
              </div>
              <div className="price-item">
                <span>Market Cap</span>
                <span>
                  $
                  {dollarValueFormatter(marbleSupply * marblePrice, {
                    includeCommaSeparation: true,
                  })}
                </span>
              </div>
              <div className="price-item">
                <Button
                  variant="ghost"
                  style={{ border: '1px solid black', marginRight: 16 }}
                  iconLeft={<IconWrapper icon={<PlusCircleIcon />} />}
                  size="large"
                  onClick={() => onAddToken('MARBLE')}
                >
                  Add
                </Button>
                <Link href="https://app.osmosis.zone/?from=OSMO&to=MARBLE" passHref>
                <Button
                  variant="primary"
                  iconLeft={<IconWrapper icon={<ShoppingCartIcon />} />}
                  size="large"
                >
                  Buy
                  </Button>
                </Link>
              </div>
            </StyledDiv>
            <StyledDiv>
              <div className="price-item item-header">
                <div className="d-flex flex-center">
                  <StyledTokenImage src="https://raw.githubusercontent.com/MarbleDAO/brand-assets/main/block.png" />
                  <span>BLOCK</span>
                </div>
                <span>${valueFormatter6(blockPrice)}</span>
              </div>
              <div className="price-item">
                <span>Supply</span>
                <span>
                  {formatTokenBalance(blockSupply, {
                    includeCommaSeparation: true,
                  })}
                </span>
              </div>
              <div className="price-item">
                <span>Market Cap</span>
                <span>
                  $
                  {dollarValueFormatter(blockSupply * blockPrice, {
                    includeCommaSeparation: true,
                  })}
                </span>
              </div>
              <div className="price-item">
                <Button
                  variant="ghost"
                  style={{ border: '1px solid black', marginRight: 16 }}
                  iconLeft={<IconWrapper icon={<PlusCircleIcon />} />}
                  size="large"
                  onClick={() => onAddToken('BLOCK')}
                >
                  Add
                </Button>
                <Link href="https://app.marbledao.finance" passHref>
                <Button
                  variant="primary"
                  iconLeft={<IconWrapper icon={<ShoppingCartIcon />} />}
                  size="large"
                >
                  Buy
                </Button>
                </Link>
              </div>
            </StyledDiv>
          </div>
          <StyledDiv className="flex-2 p-1">
            <div className="d-flex flex-row">
              <StyledCard className="flex-1 card-content">
                <div className="d-flex flex-row mb-1">
                  <div className="icon-container">
                    <Tron />
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <span className="text-gray">Staked Marble</span>
                    <span className="text-bold">
                      {dollarValueFormatter(governanceStaking)}%
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="icon-container">
                    <Educate />
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <span className="text-gray">Daily DAO Staking Rewards</span>
                    <span className="text-bold">{dollarValueFormatter(50000000 / 365)}</span>
                  </div>
                </div>
              </StyledCard>
              <StyledCard className="flex-1 card-content">
                <div className="d-flex flex-row mb-1">
                  <div className="icon-container">
                    <Story />
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <span className="text-gray">Bonded Liquidity Ratio</span>
                    <span className="text-bold">
                      {isConnected
                        ? `${dollarValueFormatter(
                            (totalBonding / totalLiquidity) * 100
                          )}%`
                        : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div className="icon-container">
                    <MagicStar />
                  </div>
                  <div className="d-flex flex-column justify-content-around">
                    <span className="text-gray">Liquidity Staking APR</span>
                    <span className="text-bold">
                      {isConnected ? `Up to ${maxAPR.toFixed(2)}%` : 'N/A'}
                    </span>
                  </div>
                </div>
              </StyledCard>
            </div>
              <StyledCard className="flex-1">
                <div className="price-item item-header">
                  <span>Protocol Stats</span>
                  {/*<span>
                    $
                    {dollarValueFormatter(
                      totalLiquidity + treasuryBalance,
                      {
                        includeCommaSeparation: true,
                      }
                    )}
                  </span>*/}
                </div>
                <div className="price-item">
                  <span>Liquidity Pools</span>
                  <span>
                    $
                    {dollarValueFormatter(totalLiquidity, {
                      includeCommaSeparation: true,
                    })}
                  </span>
                </div>
                <div className="price-item">
                  <span>Bonded Liquidity</span>
                  <span>
                    {isConnected
                      ? `$${dollarValueFormatter(totalBonding, {
                          includeCommaSeparation: true,
                        })}`
                      : 'N/A'}
                  </span>
                </div>
                <div className="price-item">
                  <span>Staked Marble</span>
                  <span>
                    $
                    {dollarValueFormatter(lastdaoStaking * 210 * marblePrice, {
                      includeCommaSeparation: true,
                    })}
                  </span>
                </div>
                <div className="price-item">
                  <span>Treasury</span>
                  <span>
                    $
                    {dollarValueFormatter(treasuryBalance, {
                      includeCommaSeparation: true,
                    })}
                  </span>
                </div>
              </StyledCard>
          </StyledDiv>
        </div>
      </div>
    </>
  )
}

export default Dashboard

const StyledTokenImage = styled('img', {
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: '#ccc',
  marginRight: '3px',
})

const StyledDiv = styled('div', {
  borderRadius: '$radii$4',
  border: '$borderWidths$1 solid $borderColors$default',
  boxShadow: '0px 4px 24px $borderColors$shadow',
  margin: '1rem',
})

const StyledCard = styled('div', {
  borderRadius: '$radii$4',
  background: '#f9f9f9',
  padding: 10,
  boxShadow: '0px 4px 24px $borderColors$shadow',
  margin: '1rem',
})
