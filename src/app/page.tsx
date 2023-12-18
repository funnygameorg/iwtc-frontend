import HomeLoginForm from '@/components/Register/HomeLoginForm';
import Sidebar from '@/components/common/Sidebar';
import HydratedWCList from '@/components/home/HydratedWCList';

const Home = () => {
    return (
        <div>
            <div className="flex">
                <div>
                    <HydratedWCList />
                </div>

                <div className="z-50 line absolute mt-32 transform  h-0.5 bg-gray-200 w-full"></div>
            </div>
        </div>
    );
};
export default Home;
