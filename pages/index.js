import { AnimatePresence } from 'framer-motion'
import { getSession, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalState, modalTypeState } from '../atoms/modalAtom'
import Feed from '../components/Feed'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Sidebar from '../components/Sidebar'
import {connectToDatabase} from '../util/mongodb'

export default function Home({posts}) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/home");
    },
  });

  const [modalOpen, setModalOpen] = useRecoilState(modalState)
  const [modalType,setModalType] = useRecoilState(modalTypeState)

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
          <Feed posts={posts}/>
        </div>
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
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

  const {db} = await connectToDatabase()
  const posts = await db.collection('posts').find().sort({timestamp:-1}).toArray()
  return{
    props:{
      session,
      posts:posts.map(post => ({
        _id:post._id.toString(),
        input:post.input, 
        photoUrl: post.photoUrl,
        username: post.username,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      }))
    }
  }
}
