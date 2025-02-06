import { Link } from 'react-router-dom';
import '../components/style.css';

function Sidenav() {
    return (
        <>
            <div className='nav-container'>
                <div className='brand-container'>
                    <div className='profile-logo'>
                    <img className='profile-logo' alt='brand-logo' src={require('../asset/secondlogo.png')}/>
                    </div>
                    <div className='brand-detail' >
                    <h3 className='brand-name'>हमारी कक्षा</h3>
                    <p className='brand-slogan'>Manage your class in easy way</p>
                    </div>

                   

                </div>
                <div className='menu-bar'>
                    <Link className='menu-link' to='/dashboard/home'><i className="fa-solid fa-house"></i>  Home</Link>
                    <hr/>
                    <Link className='menu-link' to='/dashboard/courses'><i className="fa-solid fa-book"></i> All Courses</Link>
                    <hr/>
                    <Link className='menu-link' to='/dashboard/add-courses'><i className="fa-solid fa-plus"></i> Add Courses</Link>
                    <hr/>
                    <Link className='menu-link' to='/dashboard/all-student'><i className="fa-solid fa-user"></i> All Student</Link>
                    <hr/>
                    <Link className='menu-link' to='/dashboard/add-student'><i className="fa-solid fa-person"></i> Add Student</Link>
                    <hr/>
                    <Link className='menu-link' to='/dashboard/fee'><i className="fa-solid fa-hand-holding-dollar"></i> Collect Fee</Link>
                    <hr/>
                    <Link className='menu-link' to='/dashboard/payment-history'> <i className="fa-solid fa-list"></i> Payment History</Link>
                </div>
                <div className='contact-us'>
                    
                    <p><i class="fa-regular fa-address-card"></i> Contact Developer</p>
                    <p><i class="fa-solid fa-phone"></i> 353453352224</p>
                </div>
            </div>
        </>
    );
}

export default Sidenav;