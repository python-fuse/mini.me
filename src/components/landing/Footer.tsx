import logo from '@/src/assets/normal.png';
import { contacts } from '@/src/utils/constants';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="px-40 bg-primary-300 h-40">
      <div className="border-b flex justify-between py-4 items-center">
        <div className="flex items-center gap-x-4">
          <Image
            src={logo}
            height={70}
            width={70}
            alt="Mini.me"
            className="border-r pr-2 "
          />
          <p className="text-3xl text-white">Mini.me</p>
        </div>

        <div className="flex gap-x-4">
          {contacts.map((contact, index) => (
            <Link
              key={index}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <contact.icon size={22} />
            </Link>
          ))}
        </div>
      </div>
      <div className="text-center">
        <p className="text-white">© 2021 Mini.me</p>
      </div>
    </footer>
  );
};
export default Footer;
