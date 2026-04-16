import { useEffect } from 'react';

const DynamicFavicon = () => {
  useEffect(() => {
    const links = document.querySelectorAll("link[rel*='icon']");
    links.forEach(link => link.setAttribute('href', '/mzfavicon.svg'));
  }, []);

  return null;
};

export default DynamicFavicon;
