import type { ReactNode } from 'react';
import Highlight from './Highlight';
import { useState } from 'react';


interface LinkItem {
    name: string;
    id: number;
}
interface NavBarProps {
    children?: ReactNode;
    links:LinkItem[];
}


const NavBar = ({children, links}:NavBarProps) =>{
    const[highlightLink, setHighlightLink] = useState(0);

    const handleLink = () => {
        
    }
    return( 
        <aside className="w-[250px] p-4 border-r border-gray-200 flex-shrink-0 sticky top-[100px] self-start z-0">
            <div className='bg-[#002C34] text-[white] lg:h-[719px] lg:w-[225px] md:h-[479.33px] md:w-[150px] rounded-2xl transition-all duration-[0.5s] '>
                <ul className="flex flex-row sm:flex-row md:flex-col lg:flex-col gap-5 items-start px-[50px] pt-[70px]">

                    {links?.map((link, index) => {
                        const isHighlighted = index === highlightLink;


                        return (
                            
                            <li className="cursor-pointer" 
                                key={index}
                                onClick={() => setHighlightLink(index)}>
                                    
                                
                                {
                                isHighlighted ? (
                                    <Highlight>
                                    
                                    <h3 className="px-[40px]" key={link.id}>{link.name}</h3>
                                    </Highlight>
                                ):(
                                    <h3 className="px-[40px]" key={link.id}>{link.name}</h3>
                                )
                                
                                }
                            
                            </li> 
                             
                        )
                    })} 
                </ul>
            </div>
        </aside>
    );
}

export default NavBar;