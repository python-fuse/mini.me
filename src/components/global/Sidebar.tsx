'use client';

import logo from '@/src/assets/normal.png';
import Image from 'next/image';
import Link from 'next/link';
import NavItem from './NavItem';
import { PATHNAMES } from '../../utils/constants';
import MyButton from './Button';
import usePath from '../../hooks/usePathName';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import { BiChevronLeft, BiChevronRight, BiPlus } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const activePath = usePath();
  const router = useRouter();

  const { isOpen, close, open } = useSidebar();
  const [isMobile, setIsMobile] = useState(false);

  const decideDevice = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        close();
        setIsMobile(true);
      } else {
        open();
        setIsMobile(false);
      }
    }
  };

  useEffect(() => {
    decideDevice();
    window.addEventListener('resize', decideDevice);
    return () => {
      window.removeEventListener('resize', decideDevice);
    };
  }, []);

  const getActivePath = (href: string, activePath: string) => {
    if (href === '/dashboard' && activePath === 'dashboard') return true;
    if (activePath === href.split('/')[2]) return true;
    return false;
  };

  return (
    <SidebarProvider>
      <aside
        className={`relative ${
          isOpen ? 'w-1/6 items-start' : 'w-20 items-center'
        } flex p-4 flex-col space-y-4 duration-300 bg-white h-screen border-r border-tertiary-500`}
      >
        {!isMobile && (
          <button
            onClick={isOpen ? close : open}
            className="absolute border border-tertiary-400 rounded-full shadow-md bg-white -right-4 top-16"
          >
            {isOpen ? (
              <BiChevronLeft className="h-6 w-6" />
            ) : (
              <BiChevronRight className="h-6 w-6" />
            )}
          </button>
        )}

        <div className="flex gap-x-2 px-2 items-center place-content-center">
          <Link href="/" className="font-semibold shrink-0">
            <Image
              src={logo}
              alt={'Mini.me'}
              className="w-[40px] flex-shrink-0"
            />
          </Link>
          {isOpen && (
            <Link href="/" className="font-semibold text-lg lg:text-3xl mini">
              Mini.me
            </Link>
          )}
        </div>

        <MyButton
          className="w-full font-semibold text-nowrap py-2"
          onClick={() => router.push('/dashboard/links/new')}
        >
          <BiPlus size={24} />
          {isOpen && <p>Create link</p>}
        </MyButton>

        <div className="bg-tertiary h-px rounded-md w-full mb-6 lg:mb-4" />

        <div className="flex flex-col w-full gap-y-6 lg:gap-y-4 h-full">
          {PATHNAMES.map((pathname, index) => (
            <>
              {pathname.title === 'Settings' && (
                <div key={index} className="mt-auto"></div>
              )}
              <NavItem
                key={index}
                href={pathname.href}
                icon={<pathname.icon size={20} className="flex-shrink-0" />}
                title={pathname.title}
                isActive={getActivePath(pathname.href, activePath)}
                isExpanded={isOpen}
              />
            </>
          ))}
        </div>
      </aside>
    </SidebarProvider>
  );
};
export default Sidebar;
