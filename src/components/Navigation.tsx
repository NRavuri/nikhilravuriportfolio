import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* CLICKABLE PROFILE IMAGE */}
            <button
              onClick={() => setShowImage(true)}
              className="flex items-center gap-2"
            >
              <img
                src="/profile.jpg"
                alt="Nikhil Ravuri"
                className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform cursor-pointer"
              />
              <span className="font-bold">NR</span>
            </button>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex space-x-8">
              {['about', 'skills', 'experience', 'education', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="text-gray-700 hover:text-blue-600 transition-colors capitalize font-medium"
                >
                  {section}
                </button>
              ))}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {['about', 'skills', 'experience', 'education', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors capitalize font-medium py-2"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* FULLSCREEN MODAL FOR PROFILE IMAGE */}
      {showImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setShowImage(false)}
        >
          <img
            src="/profile.jpg"
            alt="Full Profile"
            className="max-w-[85%] max-h-[85%] rounded-lg shadow-xl animate-zoomIn"
          />
        </div>
      )}
    </>
  );
}
