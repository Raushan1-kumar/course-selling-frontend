
import './App.css';
import Signup from './components/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import Course from './components/Course';
import AddCourse from './components/AddCourse';
import AllStudent from './components/AllStudent';
import AddStudent from './components/AddStudent';
import Payment from './components/Payment';
import PaymentHistory from './components/PaymentHistory';
import CourseDetail from './components/CourseDetail';
import EditCourse from './components/EditCourse';
import EditStudent from './components/EditStudent';
import DetailOfStudent from './components/DetailOfStudent';


function App() {
  const myRouter = createBrowserRouter([
    {path:'', Component:Signup},
    {path:'login',Component:Login},
    {path:'signup',Component:Signup},
    {path:'dashboard', Component:Dashboard,children:[
      {path:'',Component:Home},
      {path:'home',Component:Home},
      {path:'courses',Component:Course},
      {path:'add-courses',Component:AddCourse,},
      {path:'all-student',Component:AllStudent},
      {path:'add-student',Component:AddStudent},
      {path:'fee',Component:Payment},
      {path:'payment-history',Component:PaymentHistory},
      {path:'course-detail/:id',Component:CourseDetail},
      {path:'edit-course/:id',Component:EditCourse},
      {path:'edit-student/:id',Component:EditStudent},
      {path:'student-detail/:id',Component:DetailOfStudent},
    ]},
  ])
  return (
    <div >
      <RouterProvider router={myRouter}/>
      <ToastContainer/>
    </div>
  );
}

export default App;
