import Sidebar from '@/components/common/Sidebar';
import SearchBar from '@/components/searsch';
import Link from 'next/link';

const Home = () => {
    return (
        <div>
            <div className="flex">
                <Sidebar />
                <SearchBar />
                <div className="line absolute mt-20 transform  h-0.5 bg-gray-200 w-full"></div>
            </div>

            {/* <div className="ml-64"> TAB</div> */}
            <Link href="/test">
                <h2>테스트 회원가입 page이동</h2>
            </Link>
        </div>
    );
};
export default Home;
