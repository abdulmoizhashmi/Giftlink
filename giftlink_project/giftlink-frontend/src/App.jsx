import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Gifts from './pages/Gifts';
import Search from './pages/Search';
import GiftDetails from './pages/GiftDetails';
import GiftForm from './pages/GiftForm';
import Profile from './pages/Profile';
import { Login, Register } from './pages/Auth';
export default function App(){return <BrowserRouter><Navbar/><Routes><Route path="/" element={<Home/>}/><Route path="/gifts" element={<Gifts/>}/><Route path="/search" element={<Search/>}/><Route path="/gifts/:id" element={<GiftDetails/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/><Route path="/gifts/new" element={<ProtectedRoute><GiftForm/></ProtectedRoute>}/><Route path="/gifts/:id/edit" element={<ProtectedRoute><GiftForm/></ProtectedRoute>}/><Route path="*" element={<Home/>}/></Routes></BrowserRouter>}
