import type { NextPage } from 'next'
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { styled } from '@stitches/react'

import PresaleClaim from 'features/presale-claim'
import { voters } from 'proposal_block.json'
import { voters2 } from 'proposal_block2.json'
import { voters3 } from 'proposal_block3.json'
import { voters4 } from 'proposal_block4.json'
import { voters5 } from 'proposal_block5.json'
import { voters6 } from 'proposal_block6.json'
const PUBLIC_AIRDROP_CONTRACT = process.env.NEXT_PUBLIC_AIRDROP_BLOCK || ''
const PUBLIC_AIRDROP_CONTRACT2 = 'juno1yfpveataejry2wesqrgpma9hzz9ylcunjp3cjmzlzztk428z0hesl3zlm4'
const PUBLIC_AIRDROP_CONTRACT3 = 'juno18q0kn7g9v67ltc72wlec2zmcu4l5ck7lcpw3yn9c8qkwedwgh6gsem3wt7'
const PUBLIC_AIRDROP_CONTRACT4 = 'juno1ygfg7rxda3k36xzdlvdm6jt04wnl6t4sk46kkdy37gcjc2jrtlcq6qtr88'
const PUBLIC_AIRDROP_CONTRACT5 = 'juno1hfty2ptdhadna8ggwz5pxtv6sfe9ge3rmat04mr2rhgf5wmccytsqt07qm'
const PUBLIC_AIRDROP_CONTRACT6 = 'juno16eql09sytg2x4xq743us3vapqh2zlx6c4p6mjq76jkz9xxamv8hqaun2y0'
const votes = [voters2, voters3, voters4, voters5, voters6]

// TODO: change contract address
const contractAddresses = [
  PUBLIC_AIRDROP_CONTRACT2,
  PUBLIC_AIRDROP_CONTRACT3,
  PUBLIC_AIRDROP_CONTRACT4,
  PUBLIC_AIRDROP_CONTRACT5,
  PUBLIC_AIRDROP_CONTRACT6,
]

const airdropDates = [
  {
    startDate: 'April 30, 2022 00:00:00 UTC+00:00',
    endDate: 'April 30, 2023 0:00:00 UTC+00:00',
  },
  {
    startDate: 'May 31, 2022 0:00:00 UTC+00:00',
    endDate: 'May 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 30, 2022 00:00:00 UTC+00:00',
    endDate: 'June 30, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 31, 2022 00:00:00 UTC+00:00',
    endDate: 'July 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'August 31, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
]

const PClaim: NextPage = () => {
  return (
    <AppLayout>
      <div className="middle mauto">
        <PageHeader
          title="Block Presale Claim"
          subtitle="If you bought $BLOCK on presale, you can redeem your $BLOCK here."
        />
        <StyledDivForWrapper className="airdrop-section">
          {airdropDates.map((date, index) => (
            <PresaleClaim
              key={index}
              index={index + 2}
              contractAddress={contractAddresses[index]}
              voters={votes[index]}
              airdropStart={date.startDate}
              airdropEnd={date.endDate}
            />
          ))}
        </StyledDivForWrapper>
      </div>
    </AppLayout>
  )
}

const StyledDivForWrapper = styled('div', {
  borderRadius: '$radii$4',
  border: '$borderWidths$1 solid $borderColors$default',
  boxShadow: '0px 4px 24px $borderColors$shadow',
  padding: '3rem 4rem',
  ' .claim-wrapper': {
    justifyContent: 'center',
    display: 'flex',
    margin: '$space$16 $space$8 $space$8 $space$8',
  },
})

export default PClaim
