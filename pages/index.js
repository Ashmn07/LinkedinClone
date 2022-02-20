import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });
  return (
    <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
      <Head>
        <title>Feed | Linkedin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar/>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context)
  if(!session){
    return{
      redirect: {
        permanent:false,
        destination:"/home"
      }
    }
  }
  return{
    props:{
      session
    }
  }
}
