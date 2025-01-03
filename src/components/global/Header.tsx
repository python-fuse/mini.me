'use client';

import { BiChevronDown } from 'react-icons/bi';
import AccountAvatar from '../account/AccountAvatar';
import SearchBar from './SearchBar';
import { SearchProvider } from '../../contexts/SearchContext';

const Header = () => {
  return (
    <div className="py-2 px-4 h-20 justify-between w-full bg-white border-b border-tertiary-500 flex items-center">
      <SearchBar />
      <AccountAvatar />
    </div>
  );
};
export default Header;
