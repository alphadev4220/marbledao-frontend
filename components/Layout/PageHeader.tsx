import React from 'react'
import { Text } from '../Text'
import Head from 'next/head'
import { APP_NAME } from '../../util/constants'

export const PageHeader = ({ title, subtitle }) => {
  return (
    <>
      <Head>
        <title>
          {APP_NAME} — {title}
        </title>
      </Head>
      <Text
        variant="header"
        className="page-title"
        css={{ marginTop: '10px', padding: '30px 0 25px', fontSize: '$12' }}
      >
        {title}
      </Text>
      <Text
        variant="body"
        className="page-subtitle"
        css={{ paddingBottom: '34px', fontSize: '$8' }}
      >
        {subtitle}
      </Text>
    </>
  )
}
