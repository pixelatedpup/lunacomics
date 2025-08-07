import type { ReactNode } from 'react';


interface NavBarProps {
    children: ReactNode;
}
const NavBar = ({children}:NavBarProps) =>{
    return( 
        <div className='bg-[#002C34] text-[white] h-[719px] w-[225px] rounded-2xl'>
            {children}
        </div>
    );
}

export default NavBar;