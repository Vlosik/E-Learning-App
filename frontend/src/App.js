import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from "./components/home/LoginPage";
import RegisterPage from "./components/home/RegisterPage";
import HomePage from "./components/home/HomePage";
import CoursePage from "./components/home/CoursePage";
import StudentHome from "./components/student/StudentHome";
import StudentCoursePage from "./components/student/StudentCoursePage";
import ProfileStudent from "./components/student/ProfileStudent";
import ContactStudent from "./components/student/ContactStudent";
import CoursesStudent from "./components/student/CoursesStudent";
import ContactPage from "./components/home/ContactPage";
import TeacherHome from "./components/teacher/TeacherHome";
import ProfileTeacher from "./components/teacher/ProfileTeacher";
import ContactTeacher from "./components/teacher/ContactTeacher";
import TeacherAddCourse from "./components/teacher/TeacherAddCourse";
import StatisticsTeacher from "./components/teacher/StatisticsTeacher";
import EditCourse from "./components/teacher/EditCourse";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/course" element={<CoursePage />}></Route>
            <Route
                path="/home/student"
                element={
                    <ProtectedRoute element={<StudentHome />} allowedRoles={['student']}/>
                }
            />
            <Route
                path="/home/course/student"
                element={
                    <ProtectedRoute element={<StudentCoursePage />} allowedRoles={['student']}/>
                }
            />
            <Route
                path="/home/student/profile"
                element={
                    <ProtectedRoute element={<ProfileStudent />} allowedRoles={['student']}/>
                }
            />
            <Route
                path="/home/student/contact"
                element={
                    <ProtectedRoute element={<ContactStudent />} allowedRoles={['student']}/>
                }
            />
            <Route
                path="/home/student/courses"
                element={
                    <ProtectedRoute element={<CoursesStudent />} allowedRoles={['student']}/>
                }
            />
            <Route
                path="/home/teacher"
                element={
                    <ProtectedRoute element={<TeacherHome />} allowedRoles={['teacher']}/>
                }
            />
            <Route
                path="/home/teacher/profile"
                element={
                    <ProtectedRoute element={<ProfileTeacher />} allowedRoles={['teacher']}/>
                }
            />
            <Route
                path="/home/teacher/contact"
                element={
                    <ProtectedRoute element={<ContactTeacher />} allowedRoles={['teacher']}/>
                }
            />
            <Route
                path="/home/teacher/add"
                element={
                    <ProtectedRoute element={<TeacherAddCourse />} allowedRoles={['teacher']}/>
                }
            />
            <Route
                path="/home/teacher/statistics"
                element={
                    <ProtectedRoute element={<StatisticsTeacher />} allowedRoles={['teacher']}/>
                }
            />
            <Route
                path="/home/teacher/editCourse"
                element={
                    <ProtectedRoute element={<EditCourse />} allowedRoles={['teacher']}/>
                }
            />
        </Routes>
      </Router>
  );
}

export default App;
