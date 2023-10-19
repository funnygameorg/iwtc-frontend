import HomeLoginForm from "@/components/Register/HomeLoginForm";
import RankSelect from "@/components/button/RankSelect";
import Sidebar from "@/components/common/Sidebar";
import Order from "@/components/dropdown/Order";
import SearchBar from "@/components/searsch";

const Home = () => {
  return (
    <div>
      <div className="flex">
        {/* sidebar */}
        <aside
          id="logo-sidebar"
          className="left-0 z-40 w-64 h-screen  transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <HomeLoginForm />
          <Sidebar />
        </aside>
        {/* main header */}
        <div className="flex">
          <SearchBar />
          <RankSelect />
          <Order />
        </div>
        <div className="z-50 line absolute mt-32 transform  h-0.5 bg-gray-200 w-full"></div>
      </div>
    </div>
  );
};
export default Home;
