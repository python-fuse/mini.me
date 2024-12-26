'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LandingCreateLinkButton = () => {
  const [url, setUrl] = useState('');
  const router = useRouter();
  return (
    <form
      className="flex mt-5"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/dashboard/links/new?url=${encodeURIComponent(url)}`);
      }}
    >
      <input
        type="text"
        placeholder="Paste your long URL here"
        className=" p-4 text-lg rounded-l-md outline-none"
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button className="cta-btn bg-primary-300 hover:bg-primary-200 duration-300  p-2  text-white rounded-r-md">
        Create link - <span className="italic font-light">100% free</span>
      </button>
    </form>
  );
};
export default LandingCreateLinkButton;
