import { GetServerSidePropsContext } from 'next'
import React from 'react'

export default function CustomerDetails() {
  return (
    <div>CustomerDetails</div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  /**Investigar cookies */
}