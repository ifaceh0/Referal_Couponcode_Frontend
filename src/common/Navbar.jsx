// import { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';

// const navLinks = [
//   { name: 'Home', path: '/' },
//   { name: 'Features', path: '/features' },
//   { name: 'Subscription', path: '/subscriptions' },
//   { name: 'Resources', path: '/resources' },
//   { name: 'Contact', path: '/contact' },
// ];

// export default function Navbar() {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   const isActive = (path) => location.pathname === path;

//   const toggleMenu = () => setIsOpen(!isOpen);

//   return (
//     <>
//       <nav className="bg-white shadow-md fixed w-full z-10 top-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             {/* Logo */}
//             <Link to="/" className="text-xl font-bold text-purple-600">
//               MyApp
//             </Link>
            
//             {/* Desktop Menu */}
//             <div className="hidden sm:flex space-x-6">
//               {navLinks.map(({ name, path }) => (
//                 <Link
//                   key={path}
//                   to={path}
//                   className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
//                     isActive(path)
//                       ? 'text-white bg-purple-600 shadow-lg'
//                       : 'text-gray-700 hover:text-purple-600'
//                   }`}
//                 >
//                   {name}
//                 </Link>
//               ))}
//             </div>
            
//             {/* Auth Buttons */}
//             <div className="hidden sm:flex space-x-4">
//               <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
//                 Sign Up
//               </Link>
//               <Link to="/signin" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//                 Sign In
//               </Link>
//             </div>
            
//             {/* Mobile Menu Button */}
//             <button onClick={toggleMenu} className="sm:hidden p-2 text-gray-600 focus:outline-none">
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </nav>
      
//       {/* Spacer to prevent content from going behind navbar */}
//       <div className="h-16"></div>
      
//       {/* Mobile Menu with Opening Animation */}
//       <div className={`sm:hidden transition-all duration-500 ease-in-out ${
//         isOpen ? 'max-h-screen opacity-100 transform scale-100' : 'max-h-0 opacity-0 transform scale-95'
//       } overflow-hidden`}
//       >
//         <div className="bg-white shadow-md space-y-2 p-4">
//           {navLinks.map(({ name, path }) => (
//             <Link
//               key={path}
//               to={path}
//               onClick={toggleMenu}
//               className={`block px-4 py-2 rounded-md text-lg ${
//                 isActive(path)
//                   ? 'bg-purple-500 text-white'
//                   : 'text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {name}
//             </Link>
//           ))}
//           <Link to="/signup" onClick={toggleMenu} className="block px-4 py-2 bg-orange-500 text-white rounded-md text-lg">
//             Sign Up
//           </Link>
//           <Link to="/signin" onClick={toggleMenu} className="block px-4 py-2 bg-blue-500 text-white rounded-md text-lg">
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }


// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X } from 'lucide-react';

// const navLinks = [
//   { name: 'Home', path: '/' },
//   { name: 'Features', path: '/features' },
//   { name: 'Subscription', path: '/subscriptions' },
//   { name: 'Resources', path: '/resources' },
//   { name: 'Contact', path: '/contact' },
// ];

// export default function Navbar() {
//   const location = useLocation();
//   const [isOpen, setIsOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);

//   const isActive = (path) => location.pathname === path;
//   const toggleMenu = () => setIsOpen(!isOpen);
//   const toggleDropdown = () => setShowDropdown(!showDropdown);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (!event.target.closest(".dropdown-container")) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <nav className="bg-white shadow-md fixed w-full z-50 top-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <Link to="/" className="text-xl font-bold text-purple-600">MyApp</Link>
            
//             <div className="hidden sm:flex space-x-6">
//               {navLinks.map(({ name, path }) => (
//                 <Link
//                   key={path}
//                   to={path}
//                   className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
//                     isActive(path)
//                       ? 'text-white bg-purple-600 shadow-lg'
//                       : 'text-gray-700 hover:text-purple-600'
//                   }`}
//                 >
//                   {name}
//                 </Link>
//               ))}
//             </div>
            
//             <div className="hidden sm:flex space-x-4 relative dropdown-container">
//               <div className="relative">
//                 <button 
//                   onClick={toggleDropdown} 
//                   className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition relative"
//                 >
//                   Sign Up
//                 </button>
//                 {showDropdown && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
//                     <Link 
//                       to="/signup/shopkeeper" 
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                       onClick={() => setShowDropdown(false)}
//                     >
//                       Shopkeeper
//                     </Link>
//                     <Link 
//                       to="/signup/user"
//                       className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
//                       onClick={() => setShowDropdown(false)}
//                     >
//                       User
//                     </Link>
//                   </div>
//                 )}
//               </div>
//               <Link to="/signin" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
//                 Sign In
//               </Link>
//             </div>
            
//             <button onClick={toggleMenu} className="sm:hidden p-2 text-gray-600 focus:outline-none">
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </nav>
      
//       <div className="h-16"></div>
      
//       <div className={`sm:hidden transition-all duration-500 ease-in-out ${
//         isOpen ? 'max-h-screen opacity-100 transform scale-100' : 'max-h-0 opacity-0 transform scale-95'
//       } overflow-hidden`}
//       >
//         <div className="bg-white shadow-md space-y-2 p-4">
//           {navLinks.map(({ name, path }) => (
//             <Link
//               key={path}
//               to={path}
//               onClick={toggleMenu}
//               className={`block px-4 py-2 rounded-md text-lg ${
//                 isActive(path)
//                   ? 'bg-purple-500 text-white'
//                   : 'text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {name}
//             </Link>
//           ))}
//           <div className="relative dropdown-container">
//             <button 
//               onClick={toggleDropdown} 
//               className="block w-full text-left px-4 py-2 bg-orange-500 text-white rounded-md text-lg"
//             >
//               Sign Up
//             </button>
//             {showDropdown && (
//               <div className="mt-1 bg-white shadow-lg rounded-lg z-50">
//                 <Link to="/signup/shopkeeper" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu}>
//                   Shopkeeper
//                 </Link>
//                 <Link to="/signup/user" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu}>
//                   User
//                 </Link>
//               </div>
//             )}
//           </div>
//           <Link to="/signin" onClick={toggleMenu} className="block px-4 py-2 bg-blue-500 text-white rounded-md text-lg">
//             Sign In
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { getCurrentUser } from '../api/signin';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Subscription', path: '/subscriptions' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
                 const fetchData = async () => {
                     try {
                         const user = await getCurrentUser();
                         console.log("Fetched user:", user.id);
                         setUserDetails(user);
                     } catch (error) {
                         console.error("Error fetching monthly data:", error);
                     }
                 };
         
                 fetchData();
             }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = '/signin';
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-purple-600">MyApp</Link>

            <div className="hidden sm:flex space-x-6">
              {navLinks.map(({ name, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(path)
                      ? 'text-white bg-purple-600 shadow-lg'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {name}
                </Link>
              ))}
            </div>

            <div className="hidden sm:flex items-center space-x-4 relative dropdown-container">
              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    {user.name}
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                    >
                      Sign Up
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                        <Link
                          to="/signup/shopkeeper"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          Shopkeeper
                        </Link>
                        <Link
                          to="/signup/user"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                          onClick={() => setShowDropdown(false)}
                        >
                          User
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/signin"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 text-gray-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      <div className="h-16" />

      <div
        className={`sm:hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 scale-100' : 'max-h-0 opacity-0 scale-95'
        } overflow-hidden`}
      >
        <div className="bg-white shadow-md space-y-2 p-4">
          {navLinks.map(({ name, path }) => (
            <Link
              key={path}
              to={path}
              onClick={toggleMenu}
              className={`block px-4 py-2 rounded-md text-lg ${
                isActive(path)
                  ? 'bg-purple-500 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              {name}
            </Link>
          ))}

          {user ? (
            <>
              <div className="text-gray-700 px-4 py-2 font-medium">
                Hello, {user.name}
              </div>
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <div className="relative dropdown-container">
                <button
                  onClick={toggleDropdown}
                  className="block w-full text-left px-4 py-2 bg-orange-500 text-white rounded-md text-lg"
                >
                  Sign Up
                </button>
                {showDropdown && (
                  <div className="mt-1 bg-white shadow-lg rounded-lg z-50">
                    <Link
                      to="/signup/shopkeeper"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      onClick={toggleMenu}
                    >
                      Shopkeeper
                    </Link>
                    <Link
                      to="/signup/user"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                      onClick={toggleMenu}
                    >
                      User
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/signin"
                onClick={toggleMenu}
                className="block px-4 py-2 bg-blue-500 text-white rounded-md text-lg"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
