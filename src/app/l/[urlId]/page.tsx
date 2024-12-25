import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

// /l/[urlId]/page.tsx
const page = async ({ params }: { params: { urlId: string } }) => {
  const { urlId } = params;

  const DOMAIN =
    process.env.NODE_ENV === 'production'
      ? process.env.PRODUCTION_DOMAIN
      : 'http://localhost:3000';

  const incomingHeaders = headers();

  const requiredHeaders = {
    'x-browser': incomingHeaders.get('x-browser') ?? '',
    'x-os': incomingHeaders.get('x-os') ?? '',
    'x-device': incomingHeaders.get('x-device') ?? '',
    'x-country': incomingHeaders.get('x-country') ?? '',
    'x-city': incomingHeaders.get('x-city') ?? '',
    'x-referrer': incomingHeaders.get('x-referrer') ?? '',
  };

  const response = await fetch(`${DOMAIN}/api/links/redirect?urlId=${urlId}`, {
    method: 'GET',
    cache: 'no-cache',
    headers: requiredHeaders,
  });

  // Rest of the code remains the same
  if (response.status === 200) {
    const data = await response.json();
    console.log('Redirecting to:', data.url);
    // Redirect to the original URL
    return redirect(data.url);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className=" text-4xl font-bold text-red-500 border-r-2 border-primary-500 pr-4 ">
        404
      </h1>
      <p className=" text-4xl font-bold text-black pl-4">Link not found</p>
    </div>
  );
};
export default page;
