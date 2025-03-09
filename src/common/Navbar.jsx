import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Features', path: '/features' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-purple-600">
              MyApp
            </Link>
            
            {/* Desktop Menu */}
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
            
            {/* Auth Buttons */}
            <div className="hidden sm:flex space-x-4">
              <Link to="/signup" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                Sign Up
              </Link>
              <Link to="/signin" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Sign In
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="sm:hidden p-2 text-gray-600 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
      
      {/* Spacer to prevent content from going behind navbar */}
      <div className="h-16"></div>
      
      {/* Mobile Menu with Opening Animation */}
      <div className={`sm:hidden transition-all duration-500 ease-in-out ${
        isOpen ? 'max-h-screen opacity-100 transform scale-100' : 'max-h-0 opacity-0 transform scale-95'
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
          <Link to="/signup" onClick={toggleMenu} className="block px-4 py-2 bg-orange-500 text-white rounded-md text-lg">
            Sign Up
          </Link>
          <Link to="/signin" onClick={toggleMenu} className="block px-4 py-2 bg-blue-500 text-white rounded-md text-lg">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}