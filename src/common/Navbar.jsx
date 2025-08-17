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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { getCurrentUser } from '../api/signin';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  // 👇 Subscription ke liye external link
  { name: 'Subscription', path: 'https://subscription-frontend-psi.vercel.app/subscription' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUserDetails(user);
        console.dir(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const isActive = (path) => location.pathname === path;
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserDetails(null);
    navigate('/signin');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-50 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-xl font-bold text-purple-600">MyApp</Link>
            
            {/* Desktop menu */}
            <div className="hidden sm:flex space-x-6">
              {navLinks.map(({ name, path }) => {
                if (name === 'Subscription') {
                  return (
                    <a
                      key={path}
                      href={path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 text-gray-700 hover:text-purple-600`}
                    >
                      {name}
                    </a>
                  );
                }
                return (
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
                );
              })}
            </div>
            
            {/* Right side buttons */}
            <div className="hidden sm:flex items-center space-x-4">
              {userDetails?.name ? (
                <div className="relative dropdown-container">
                  <button 
                    onClick={toggleDropdown} 
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    <span className="font-medium">{userDetails.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                      <div className="px-4 py-2 text-gray-700 border-b">
                        <p className="text-sm">Logged in as</p>
                        <p className="font-medium">{userDetails.name}</p>
                      </div>
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="relative dropdown-container">
                    <button 
                      onClick={toggleDropdown} 
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition relative"
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
                  <Link to="/signin" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Sign In
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu toggle */}
            <button onClick={toggleMenu} className="sm:hidden p-2 text-gray-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      <div className="h-16"></div>
      
      {/* Mobile menu */}
      <div className={`sm:hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 transform scale-100' : 'max-h-0 opacity-0 transform scale-95'
      } overflow-hidden`}
      >
        <div className="bg-white shadow-md space-y-2 p-4">
          {navLinks.map(({ name, path }) => {
            if (name === 'Subscription') {
              return (
                <a
                  key={path}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded-md text-lg text-gray-700 hover:bg-gray-200"
                >
                  {name}
                </a>
              );
            }
            return (
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
            );
          })}

          {userDetails ? (
            <>
              <div className="px-4 py-2 border-t border-gray-200">
                <p className="font-medium">Logged in as {userDetails.name}</p>
              </div>
              <Link to="/profile" onClick={toggleMenu} className="block px-4 py-2 text-gray-700 hover:bg-gray-200">
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Sign Out
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
                    <Link to="/signup/shopkeeper" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu}>
                      Shopkeeper
                    </Link>
                    <Link to="/signup/user" className="block px-4 py-2 text-gray-700 hover:bg-gray-200" onClick={toggleMenu}>
                      User
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/signin" onClick={toggleMenu} className="block px-4 py-2 bg-blue-500 text-white rounded-md text-lg">
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
