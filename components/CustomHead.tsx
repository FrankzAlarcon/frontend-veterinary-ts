import Head from "next/head"

interface Props {
  title: string,
  description?: string
}

function CustomHead({title, description}: Props) {
  return (
    <Head>
      <title>App Veterinaria | {title}</title>
      <meta name="description" content={description} />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
    </Head>
  )
}

export default CustomHead;
