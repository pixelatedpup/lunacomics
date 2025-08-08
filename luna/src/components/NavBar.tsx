import type { ReactNode } from 'react';


interface NavBarProps {
    children: ReactNode;
}
const NavBar = ({children}:NavBarProps) =>{
    return( 
        <div className='bg-[#002C34] text-[white] lg:h-[719px] lg:w-[225px] md:h-[479.33px] md:w-[150px] rounded-2xl transition-all duration-[0.5s]'>
            {children}
        </div>
    );
}

export default NavBar;