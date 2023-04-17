import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


function BodyDataAttr() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1) || 'home';
    document.body.setAttribute('data-page', path);
    console.log(path)
  }, [location]);

  return null; // This component doesn't render anything
};

export default BodyDataAttr;
