import HomeLoginForm from "@/components/Register/HomeLoginForm";
import Sidebar from "@/components/common/sidebar";
import HydratedWCList from "@/components/home/HydratedWCList";

/*
    월드컵 관리 페이지를 표현합니다.
*/
const MyWorldCupList = ({ params }: { params: { id: number } }) => {
    console.log("아이디", params.id);
    return (
        <div className="flex">
            <aside
                id="logo-sidebar"
                className="left-0 z-40 w-64 h-screen  transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <HomeLoginForm />
                <Sidebar />
            </aside>
            <div>
                <HydratedWCList memberId={params.id} />
            </div>
        </div>
    );
};

export default MyWorldCupList;

