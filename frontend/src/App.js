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
function App() {
  return (
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/course" element={<CoursePage />}></Route>
            <Route path="/home/student" element={<StudentHome />}></Route>
            <Route path="/home/course/student" element={<StudentCoursePage />}></Route>
            <Route path="/home/student/profile" element={<ProfileStudent />}></Route>
            <Route path="/home/student/contact" element={<ContactStudent />}></Route>
            <Route path="/home/student/courses" element={<CoursesStudent />}></Route>
            <Route path="/home/teacher" element={<TeacherHome />}></Route>
            <Route path="/home/teacher/profile" element={<ProfileTeacher />}></Route>
            <Route path="/home/teacher/contact" element={<ContactTeacher />}></Route>
            <Route path="/home/teacher/add" element={<TeacherAddCourse />}></Route>
            <Route path="/home/teacher/statistics" element={<StatisticsTeacher />}></Route>
            <Route path="/home/teacher/editCourse" element={<EditCourse />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
