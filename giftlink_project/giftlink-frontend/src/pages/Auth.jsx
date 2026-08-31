import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login, register } from '../services/api';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const [form,setForm]=useState({email:'',password:''}); const [error,setError]=useState(''); const {save}=useAuth(); const navigate=useNavigate(); const location=useLocation();
  const submit=async e=>{e.preventDefault();setError('');try{const data=await login(form);save(data);navigate(location.state?.from||'/gifts');}catch(err){setError(err.message);}};
  return <AuthCard title="Login"><form onSubmit={submit}><label>Email<input type="email" required placeholder="Enter your email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" required placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label>{error&&<div className="form-error">{error}</div>}<button className="primary-btn wide">Login</button></form><p className="auth-switch">New here? <Link to="/register">Register Here</Link></p></AuthCard>;
}
export function Register() {
  const [form,setForm]=useState({name:'',email:'',password:'',confirm:''}); const [error,setError]=useState(''); const {save}=useAuth(); const navigate=useNavigate();
  const submit=async e=>{e.preventDefault();setError('');if(form.password!==form.confirm)return setError('Passwords do not match');try{const data=await register({name:form.name,email:form.email,password:form.password}); const logged=await login({email:form.email,password:form.password});save(logged);navigate('/gifts');}catch(err){setError(err.message);}};
  return <AuthCard title="Register"><form onSubmit={submit}><label>Name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Password<input type="password" minLength="8" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><label>Confirm password<input type="password" required value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})}/></label>{error&&<div className="form-error">{error}</div>}<button className="primary-btn wide">Create Account</button></form><p className="auth-switch">Already a member? <Link to="/login">Login Here</Link></p></AuthCard>;
}
function AuthCard({title,children}){return <main className="auth-page"><section className="auth-card"><h1>{title}</h1>{children}</section></main>}
