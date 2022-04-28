// import React, {useState} from "react";
// import {Link} from "react-router-dom";
//
// const Navbar =() => {
//
//   //  const [currentUser, setCurrentUser]=useState();
//
//     const [navState, setNavState] = useState({
//         activeNav: 'Model',
//         navs: [{name:'Model', link:'/model', role:'ALL'},
//             {name:'Pristupy', link:'/approach', role:'ALL'},
//             {name:'Studenti', link:'/students', role:'SUPERVISOR'},
//             {name:'Hodnocení', link:'/evaluation', role:'STUDENT'}],
//         navsAll: [{name:'Model', link:'/model'},
//             {name:'Pristupy', link:'/approach'},
//             {name:'Studenti', link:'/students'},
//             {name:'Hodnocení', link:'/evaluation'},
//             {name:'Login', link:'/login'},
//             {name:'Register', link:'/register'}]
//     });
//     function toggleActive(index){
//         setNavState({...navState, activeNav: navState.navsAll[index].name});
//     }
//     function toggleActiveStyles(index){
//         if(navState.navsAll[index].name===navState.activeNav){
//             return "nav-item active";
//         } else {
//             return "nav-item";
//         }
//     }
//
//     function logout(){
//         localStorage.clear();
//         toggleActive(0);
//     }
//
//     function loginOrLogout(){
//         if (!localStorage.getItem('role')){
//             return (
//                 <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
//                     <ul className="navbar-nav ml-auto">
//                         <Link to={"/login"}>
//                             <li className={toggleActiveStyles(navState.navs.length)} onClick={()=>{
//                                 toggleActive(navState.navs.length);
//                             }}>
//                                 <a href="#" className="nav-link" >Login</a>
//                             </li>
//                         </Link>
//                         <Link to={"/register"}>
//                             <li className={toggleActiveStyles(navState.navs.length+1)} onClick={()=>{
//                                 toggleActive(navState.navs.length+1);
//                             }}>
//                                 <a href="#" className="nav-link" >Signup</a>
//                             </li>
//                         </Link>
//                     </ul>
//                 </div>
//             )}
//         else return (
//             <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
//                 <ul className="navbar-nav ml-auto">
//                     <Link to={"/"}>
//                         <li className="nav-item" onClick={()=>{
//                             logout();
//                         }}>
//                             <a href="#" className="nav-link" >Logout</a>
//                         </li>
//                     </Link>
//                 </ul>
//             </div>
//         )
//     }
//
//     function isHidden(role){
//         if (role!=='ALL' && role !== localStorage.getItem('role')) return 'd-none';
//         else return '';
//     }
//
//     return (
//         <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark ">
//             <span className="navbar-brand" >
//                 <img src = {process.env.PUBLIC_URL + "images/logo1.png"}
//                      className="d-inline-block align-top" alt="logo" width="30px" height="30px"/>
//                 Thesis helper
//             </span>
//             <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav">
//                     {navState.navs.map((element, index)=>(
//                         <Link to={element.link}>
//                             <li className={toggleActiveStyles(index) + isHidden(element.role)}  onClick={()=>{
//                                 toggleActive(index);
//                             }}>
//                                 <a href="#" className="nav-link" >{element.name}</a>
//                             </li>
//                         </Link>
//                     ))}
//                 </ul>
//             </div>
//             {loginOrLogout()}
//         </nav>
//     )
// }
//
// export default Navbar;