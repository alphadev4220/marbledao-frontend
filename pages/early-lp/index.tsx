import type { NextPage } from 'next'
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { styled } from '@stitches/react'

import LPClaim from 'features/early-lp'
import { voters0 } from 'early-lp/data0.json'
import { voters00 } from 'early-lp/data00.json'
import { voters000 } from 'early-lp/data000.json'
import { voters0000 } from 'early-lp/data0000.json'
import { voters } from 'early-lp/data.json'
import { voters2 } from 'early-lp/data2.json'
import { voters3 } from 'early-lp/data3.json'
import { voters4 } from 'early-lp/data4.json'
import { voters5 } from 'early-lp/data5.json'
import { voters6 } from 'early-lp/data6.json'
import { voters7 } from 'early-lp/data7.json'
import { voters8 } from 'early-lp/data8.json'
import { voters9 } from 'early-lp/data9.json'
import { voters10 } from 'early-lp/data10.json'
import { voters11 } from 'early-lp/data11.json'
import { voters12 } from 'early-lp/data12.json'
import { voters13 } from 'early-lp/data13.json'
import { voters14 } from 'early-lp/data14.json'
import { voters15 } from 'early-lp/data15.json'
import { voters16 } from 'early-lp/data16.json'
import { voters17 } from 'early-lp/data17.json'
import { voters18 } from 'early-lp/data18.json'
import { voters19 } from 'early-lp/data19.json'
const PUBLIC_AIRDROP_CONTRACT0 = 'juno15mcl9uymygcs860dswfp08pjhld58v8pmmam3nn0ngfz034frjzq8h52lk'
const PUBLIC_AIRDROP_CONTRACT00 = 'juno1eqm0dtej87mhxwcatt7n78ggzj5s7rnlvl2grjlgf9aqvy2n3zfsjvy0le'
const PUBLIC_AIRDROP_CONTRACT000 = 'juno1tgq63uq2u4pkt03rfujql4yzkzl86wkpxf6gs853yq8rxcxgugfs867hg5'
const PUBLIC_AIRDROP_CONTRACT0000 = 'juno1ykr4kf0jmmn7mtue2wvljf6mkls3xl4sq3f89ca2l6l0xnqm475q6s49jq'
const PUBLIC_AIRDROP_CONTRACT = 'juno12tuw5ncatu4zf03chvxh8vgj950dfcxvfj33mgmy0wqpjstaweyskrefke'
const PUBLIC_AIRDROP_CONTRACT2 = 'juno198tm6ft3dxzt3q7pmkqlfsuj4hf9pnes27yaa9pflwwnvekr05hsevf3cv'
const PUBLIC_AIRDROP_CONTRACT3 = 'juno1rch77h23aw457qu0rc032swlfwn5czjhz2ykdgx9q0qc97sqrrfqvtlmkj'
const PUBLIC_AIRDROP_CONTRACT4 = 'juno1f7jlwzn4hsrqnrh05p9r8k4wkgv09vx4m2qmdh9yhezentxs8fxs9r8ttf'
const PUBLIC_AIRDROP_CONTRACT5 = 'juno1phd0zrqnrfntmt8yqjdtyuxyqcmqzgyqv5a02jwa47sxxnjmalequcthr9'
const PUBLIC_AIRDROP_CONTRACT6 = 'juno1ury7hkx307yc65zv7pz6lyeygl2wzph9xr59tejyllr9ngq459ksjhxhue'
const PUBLIC_AIRDROP_CONTRACT7 = 'juno17d0rwjjs8qz7v0ualrunsqtzrefgawnzthl9xdxxdagzdq2jk5pq7axgfs'
const PUBLIC_AIRDROP_CONTRACT8 = 'juno1sn2ns46vecg6tp2qetfnz0s8zr240tddttkmp2rt7xvfrw9dtznqfdsgfg'
const PUBLIC_AIRDROP_CONTRACT9 = 'juno1vma3mcxw088yjpxzfk5jwnkf93u4pc36l50rpac725d769hlv08sgp88vu'
const PUBLIC_AIRDROP_CONTRACT10 = 'juno1237kutweuwn4hfwrdxrk4fruchc2arpw62rm0zan8lp24sne5q3scp0lh7'
const PUBLIC_AIRDROP_CONTRACT11 = 'juno1a4y7h7kx98sgcsmj25s6mrrcdujczzkqgx2jhv04p95tcsrxsdkq5lhxga'
const PUBLIC_AIRDROP_CONTRACT12 = 'juno1mxl8ulxujexwqm6sn0z5uqfyuqeza97mhmk0lc3p5p0u44zk0s6q7xktkn'
const PUBLIC_AIRDROP_CONTRACT13 = 'juno18m8wpwn8ahhy5gct57jsmsgtu4q5zvatvep8szacl7wtuhpfuksquhkj6y'
const PUBLIC_AIRDROP_CONTRACT14 = 'juno153uk7eg9pl66vthhxx0dhr6uddh030vnuy44e9lnmpvhyyd66nzqwsqfnj'
const PUBLIC_AIRDROP_CONTRACT15 = 'juno1zk6vy7ma3l4hj500kj5na2ax0zzjw8qc52383pv2vuqwwpzh0etsflay5j'
const PUBLIC_AIRDROP_CONTRACT16 = 'juno16dvudrrsa2jmpdnxxh9w543vcqx9cesp5sh20ww9e4qg3jl0u75qgkqlyx'
const PUBLIC_AIRDROP_CONTRACT17 = 'juno19e0260ld8593qs4y9a763s5ggqq4puwc2m0hxylg9xpzgmpz9ddqg9k7ef'
const PUBLIC_AIRDROP_CONTRACT18 = 'juno1g2se042hm5awteeqm2n5z2dv7gkp8hj4ah7xc3fvggknu2wg8dqs35hdsv'
const PUBLIC_AIRDROP_CONTRACT19 = 'juno1qxaj54lp0nvfkglwqyl9h05jcvh9p6ru5k0yr3vguxrfn8q6qhzsrg3le9'
const votes = [voters0, voters00, voters000, voters0000, voters, voters2, voters3, voters4, voters5, voters6, voters7, voters8, voters9, voters10, voters11, voters12, voters13, voters14, voters15, voters16, voters17, voters18, voters19]

// TODO: change contract address
const contractAddresses = [
  PUBLIC_AIRDROP_CONTRACT0,
  PUBLIC_AIRDROP_CONTRACT00,
  PUBLIC_AIRDROP_CONTRACT000,
  PUBLIC_AIRDROP_CONTRACT0000,
  PUBLIC_AIRDROP_CONTRACT,
  PUBLIC_AIRDROP_CONTRACT2,
  PUBLIC_AIRDROP_CONTRACT3,
  PUBLIC_AIRDROP_CONTRACT4,
  PUBLIC_AIRDROP_CONTRACT5,
  PUBLIC_AIRDROP_CONTRACT6,
  PUBLIC_AIRDROP_CONTRACT7,
  PUBLIC_AIRDROP_CONTRACT8,
  PUBLIC_AIRDROP_CONTRACT9,
  PUBLIC_AIRDROP_CONTRACT10,
  PUBLIC_AIRDROP_CONTRACT11,
  PUBLIC_AIRDROP_CONTRACT12,
  PUBLIC_AIRDROP_CONTRACT13,
  PUBLIC_AIRDROP_CONTRACT14,
  PUBLIC_AIRDROP_CONTRACT15,
  PUBLIC_AIRDROP_CONTRACT16,
  PUBLIC_AIRDROP_CONTRACT17,
  PUBLIC_AIRDROP_CONTRACT18,
  PUBLIC_AIRDROP_CONTRACT19
]

const airdropDates = [
  {
    startDate: 'May 18, 2022 00:00:00 UTC+00:00',
    endDate: 'April 16, 2023 00:00:00 UTC+00:00',
  },
  {
    startDate: 'May 21, 2022 00:00:00 UTC+00:00',
    endDate: 'April 30, 2023 0:00:00 UTC+00:00',
  },
  {
    startDate: 'May 24, 2022 0:00:00 UTC+00:00',
    endDate: 'May 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'May 27, 2022 00:00:00 UTC+00:00',
    endDate: 'June 30, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'May 30, 2022 00:00:00 UTC+00:00',
    endDate: 'July 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 02, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 05, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 08, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 11, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 14, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  //11
  {
    startDate: 'June 17, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 20, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 23, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 26, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'June 29, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 02, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 05, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 08, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 11, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 14, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 17, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 20, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
  {
    startDate: 'July 23, 2022 00:00:00 UTC+00:00',
    endDate: 'August 31, 2023 23:59:00 UTC+00:00',
  },
]

const PClaim: NextPage = () => {
  return (
    <AppLayout>
      <div className="middle mauto">
        <PageHeader
          title="Rewards for Early LPers"
          subtitle="Every 72h, 600k rewards are released. Early LPers of day 0 first, then all others!"
        />
        <StyledDivForWrapper className="airdrop-section">
          {airdropDates.map((date, index) => (
            <LPClaim
              key={index}
              index={index + 1}
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
