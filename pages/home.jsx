import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <header>
          <div className="relative h-10 w-36">
            <Image src="https://rb.gy/vtbzlp" layout="fill" objectFit="contain" />
          </div>
          <div className="flex items-center sm:divide-x divide-gray-300">

          </div>
      </header>
    </div>
  )
}
