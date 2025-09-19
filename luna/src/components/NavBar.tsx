import type { ReactNode } from 'react';
import Highlight from './Highlight';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LinkItem {
  id:number;
  name: string;
  route?:string;
  onClick?:()=>void
}
interface NavBarProps {
  children?: ReactNode;
  links: LinkItem[];
  onLinkSelect?: (name: string) => void;
}


const NavBar = ({ children, links, onLinkSelect }: NavBarProps) => {
  const navigate = useNavigate();
  const [highlightLink, setHighlightLink] = useState(0);

  useEffect(() => {
    const currentIndex = links.findIndex((link) => link.route === location.pathname);
    if (currentIndex !== -1) {
      setHighlightLink(currentIndex);
    }
  }, []);

  const handleLink = (index: number) => {
    setHighlightLink(index);
    const link = links[index];

    //Checks to see if link object has an onClick item
    if (link.onClick) {
      link.onClick()
      return;
    }
    //Checks to see if link object has a route item
    if(link.route){
          onLinkSelect?.(links[index].name);
    navigate(`${links[index].route}`);
    }

  };

  return (
    <aside
      className={`
        p-4 border-gray-200 flex-shrink-0 z-40
        lg:w-[250px] lg:sticky lg:top-[100px]  /* desktop sidebar */
        fixed top-[100px] left-0 w-full  bg-white md:border-r-0  /* mobile/tablet fixed below header */
      `}
    >
      <div
        className="
          bg-[#002C34] text-white rounded-2xl transition-all duration-500
          lg:h-[719px] lg:w-[225px]
          md:h-auto md:w-full
        "
      >
        <ul
          className="
            flex gap-5 items-center justify-around px-4 py-3
            md:flex-row
            lg:flex-col lg:items-start lg:px-[50px] lg:pt-[70px]
            text-center
          "
        >
          {links?.map((link, index) => {
            const isHighlighted = index === highlightLink;
            return (
              <li
                className="cursor-pointer w-full"
                key={link.id}
                onClick={() => handleLink(index)}
              >
                {isHighlighted ? (
                  <Highlight>
                    <h3 className="px-4">{link.name}</h3>
                  </Highlight>
                ) : (
                  <h3 className="px-4">{link.name}</h3>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default NavBar;
