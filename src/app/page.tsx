import Sidebar from "@/components/common/sidebar";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <h1>HOME</h1>
      <Link href="/test">
        <h2>테스트 회원가입 page이동</h2>
      </Link>
    </div>
  );
};
export default Home;