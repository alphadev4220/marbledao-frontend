import React from 'react'
import { useEffect, useState} from 'react'
import Link from 'next/link'
import { Button } from '../Button'
{/*import { Text } from '../Text'
import { Logo } from '../../icons/Logo'
import { LogoText } from '../../icons/LogoText'*/}
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useRecoilState } from 'recoil'
import { walletState, WalletStatusType } from '../../state/atoms/walletAtoms'
import { useRouter } from 'next/router'
import {
  Search,
  User,
  UpRightArrow,
  ArrowDown,
  Exchange,
  Presale,
  Open,
  Dao,
  NFTs,
  Dash,
  NewDash,
  Airdrop,
  Astronaut,
  Ellipse,
  Nav, } from '../../icons'
import { IconWrapper } from '../IconWrapper'
import { ConnectedWalletButton } from '../ConnectedWalletButton'

import { styled } from '../theme'
import { __TEST_MODE__ } from '../../util/constants'

export function NavigationSidebar({ openNav ,setOpenNav }) {
  const { mutate: connectWallet } = useConnectWallet()
  const [{ key }, setWalletState] = useRecoilState(walletState)

  function resetWalletConnection() {
    setWalletState({
      status: WalletStatusType.idle,
      address: '',
      key: null,
      client: null,
    })
  }

  const { pathname } = useRouter()
  const getActiveStylesIfActive = (path) =>
    pathname === path || (pathname.indexOf("/collection/") != -1 && path.indexOf("/collection/") != -1)? { borderBottom: '3px solid $white', background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 100%)" } : {borderBottom: '3px solid transparent', background: 'transparent' }

  const isActive = (path) => (pathname === path ? 'active' : '')
  const StyledImageForLogoText = styled('img', {
    borderRadius: '0%',
  })

  return (
    <>
      <StyledWrapper className={`wrap-header ${openNav ? 'open' :''}`}>
        <StyledMenuContainer className="wrap-menu container">
        <IconWrapper
          className="mobile-nav"
            type="button"
            icon={<Nav />}
            onClick={() => {
              setOpenNav(!openNav)
            }}
          />

          <Link href="/" passHref>
            <StyledDivForLogo as="a">
              <StyledImageForLogoText className="logo-img" src="/images/logotext.svg" />
            </StyledDivForLogo>
          </Link>

          <StyledListForLinks className="top-menu-links">
          <div className="dropdown">
            <Link href="/dashboard" passHref>
              <button className="dropbtn">
                  Dashboard
                    <NewDash />
              </button>
            </Link>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              DeFi
              <ArrowDown />
            </button>
            <div className="dropdown-content">
              <Link href="/" passHref>
                <a className="dropdown-item">
                  <Exchange />
                  <span className={isActive('/')}>Swap</span>
                </a>
              </Link>
              <Link href="/transfer" passHref>
                <a className="dropdown-item">
                  <UpRightArrow />
                  <span className={isActive('/transfer')}>Transfer</span>
                </a>
              </Link>
              <Link href="/pools" passHref>
                <a className="dropdown-item">
                  <Open />
                  <span className={isActive('/pools')}>Liquidity</span>
                </a>
              </Link>
              <Link href="/presale-claim" passHref>
                <a className="dropdown-item">
                  <Airdrop />
                  <span className={isActive('/presale-claim')}>
                    Presale Claim
                  </span>
                </a>
              </Link>
              <Link href="/early-lp" passHref>
                <a className="dropdown-item">
                  <Ellipse />
                  <span className={isActive('/early-lp')}>
                    Early LPers
                  </span>
                </a>
              </Link>
            </div>
          </div>
          <div className="dropdown">
                    <button className="dropbtn">
                      NFT Marketplace<span className="span-mark">Beta</span>
                      <ArrowDown />
                    </button>
                    <div className="dropdown-content">
                      <Link href="https://nft.marbledao.finance/" passHref>
                        <a className="dropdown-item">
                          <Search />
                          <span className={isActive('https://app.marbledao.finance/')}>
                          Explore
                          </span>
                        </a>
                      </Link>
                      { Boolean(key?.name) &&
                      <Link href={{
                        pathname: 'https://nft.marbledao.finance/profile',
                        query: { key: key, user: key.name },
                      }} passHref>
                        <a className="dropdown-item">
                          <User />
                          <span className={isActive('/profile')}>
                          Profile
                          </span>
                        </a>
                      </Link>
                      }
                      <Link href="/marblenauts-nft" passHref>
                        <a className="dropdown-item">
                          <Astronaut />
                          <span className={isActive('/marblenauts-nft')}>
                            The Marblenauts
                          </span>
                        </a>
                      </Link>
                    </div>
                  </div>
          <div className="dropdown">
            <button className="dropbtn">
              Airdrop
              <ArrowDown />
            </button>
            <div className="dropdown-content">
              <Link
                href="https://app.marbledao.finance/airdrop"
                passHref
              >
                <a className="dropdown-item">
                  <span className={isActive('/airdrop')}>Marble GovDrop</span>
                </a>
              </Link>
              <Link
                href="https://app.marbledao.finance/block-airdrop"
                passHref
              >
                <a className="dropdown-item">
                  <span className={isActive('/block-airdrop')}>Block Drop</span>
                </a>
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">
              Governance
              <ArrowDown />
            </button>
            <div className="dropdown-content">
              <Link
                href="https://daodao.zone/dao/juno1m895hnfqhmv9p2jy99c8j32fz7p5y9tvg75wvkyfdu2j2xnc3xesdx6gv6"
                passHref
              >
                <a className="dropdown-item" target="__blank">
                  <Dao />
                  <span>DAO</span>
                </a>
              </Link>
            </div>
          </div>
          </StyledListForLinks>
          <ConnectedWalletButton
            connected={Boolean(key?.name)}
            walletName={key?.name}
            onConnect={() => connectWallet(null)}
            onDisconnect={resetWalletConnection}
          />

        </StyledMenuContainer>
      </StyledWrapper>
      <MobileMenu className={`mobile-menu ${openNav ? 'open' :''}`}>
        <StyledListForLinks className={`top-menu-links ${openNav ? 'open' :''}`}>
        <Link href="https://app.marbledao.finance/dashboard" passHref>
          <Button className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<NewDash />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance/dashboard')}
          >
            Dashboard
          </Button>
        </Link>
        <Link href="https://app.marbledao.finance" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Exchange />} />}
            css={getActiveStylesIfActive('https://app.marbledao.finance')}
          >
            Swap
          </Button>
        </Link>
        <Link href="/transfer" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<UpRightArrow />} />}
            css={getActiveStylesIfActive('/transfer')}
          >
            Transfer
          </Button>
        </Link>
        <Link href="/pools" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Open />} />}
            css={getActiveStylesIfActive('/pools')}
          >
            Liquidity
          </Button>
        </Link>
        <Link href="https://nft.marbledao.finance/" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Astronaut />} />}
            css={getActiveStylesIfActive('https://nft.marbledao.finance/')}
          >
            Explore NFTs
          </Button>
        </Link>
        <Link href="https://nft.marbledao.finance/profile" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Astronaut />} />}
            css={getActiveStylesIfActive('https://nft.marbledao.finance/profile')}
          >
            Profile NFTs
          </Button>
        </Link>
        <Link href="/marblenauts-nft" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Astronaut />} />}
            css={getActiveStylesIfActive('/marblenauts-nft')}
          >
            The Marblenauts NFTs
          </Button>
        </Link>
        <Link href="/airdrop" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Airdrop />} />}
            css={getActiveStylesIfActive('/airdrop')}
          >
            Marble GovDrop
          </Button>
        </Link>
        <Link href="/block-airdrop" passHref>
          <Button
            className="top-menu"
            as="a"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Airdrop />} />}
            css={getActiveStylesIfActive('/block-airdrop')}
          >
            BLOCK Airdrop
          </Button>
        </Link>
        <Link
          href="https://daodao.zone/dao/juno1m895hnfqhmv9p2jy99c8j32fz7p5y9tvg75wvkyfdu2j2xnc3xesdx6gv6"
          passHref
        >
          <Button
            className="top-menu"
            as="a"
            target="__blank"
            variant="ghost"
            iconCenter={<IconWrapper icon={<Dao />} />}
            css={getActiveStylesIfActive('/dao')}
          >
            DAO
          </Button>
        </Link>
          <ConnectedWalletButton
            connected={Boolean(key?.name)}
            walletName={key?.name}
            onConnect={() => connectWallet(null)}
            onDisconnect={resetWalletConnection}

          />
        </StyledListForLinks>
      </MobileMenu>
    </>
  )
}

const StyledWrapper = styled('div', {
  color: '$colors$white',
  backgroundColor: '$black',
  borderRight: '1px solid $borderColors$inactive',
})

const StyledMenuContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  zIndex: '$1',
  paddingTop: '$10',
  ' a':{
    color: '$colors$white',
    display: 'flex',
    ' svg':{
      color: '$colors$white',
      stroke: '$colors$white',
    },
  }
})

const StyledListForLinks = styled('div', {
  display: 'flex',
  rowGap: '$space$2',
  flexDirection: 'row',
  ' .span-mark':{
    border: '2px solid $white'
  }
})



const StyledDivForLogo = styled('div', {
  columnGap: '$space$4',
  alignItems: 'center',
  paddingBottom: '$8',
  '& [data-logo]': {
    marginBottom: '$2',
  },
})

const MobileMenu = styled('div', {

})
