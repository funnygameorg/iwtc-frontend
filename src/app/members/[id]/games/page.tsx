import HomeLoginForm from "@/components/Register/HomeLoginForm";
import Sidebar from "@/components/common/sidebar";
import HydratedWCList from "@/components/home/HydratedWCList";
import MyWorldCupList from "@/components/myWorldcup/MyWorldCupList";

/*
    월드컵 관리 페이지를 표현합니다.
*/
const Page = ({ params }: { params: { id: number } }) => {
    return (
        <div>
            <div className="m-5">
                <p className="text-lg bold font-bold">
                    ❤️ 월드컵 목록 ❤️
                </p>
            </div>
            <div>
                <MyWorldCupList />
            </div>
        </div>
    );
};

export default Page;

