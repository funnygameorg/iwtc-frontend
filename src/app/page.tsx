import Link from "next/link"

export default function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <Link href="/test"><h2>테스트 회원가입 page이동</h2></Link>
    </div>
  )
}
