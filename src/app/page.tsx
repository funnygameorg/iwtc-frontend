import RankSelect from "@/components/button/RankSelect";
import Sidebar from "@/components/common/sidebar";
import Order from "@/components/dropdown/Order";
import SearchBar from "@/components/searsch";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="flex">
          <SearchBar />
          <RankSelect />
          <Order />
        </div>
        <div className="z-10 line absolute mt-20 transform  h-0.5 bg-gray-200 w-full"></div>
      </div>
    </div>
  );
};
export default Home;
