import { Outlet, useNavigate } from 'react-router-dom';
import '../components/style.css';
import Sidenav from './Sidenav';



function Dashboard() {
    const navigate =useNavigate();

    const logOutHandler=()=>{
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <div className="dashboard-main-container">
                <div className='dashboard-container'>
                    <Sidenav />
                    <div className='main-container'>
                        <div className='top-bar'>
                            <div className='logo-container'>
                                <div className='profile-logo'>
                                    <img alt='profile-logo' src={localStorage.getItem('imageUrl')}/>
                                </div>
                            </div>

                            <div className='log-out'>
                                <h3>{localStorage.getItem('fullName')}</h3>
                                <button onClick={logOutHandler}>log out</button>
                            </div>
                        </div>
                        <div className='outlet-area'>
                        <Outlet/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;