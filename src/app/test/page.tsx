import LoginForm from "@/components/LoginForm";
import Link from "next/link"

//serverside rendering
const Test = () => {
  
  console.log("Test");
  return (
    <div>
      <h1>TEST PAGE</h1>
      <Link href="/"><h2>홈으로 이동</h2></Link>
      <LoginForm />
    </div>
  )
}

export default Test;