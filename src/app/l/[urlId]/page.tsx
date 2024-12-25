import { redirect } from 'next/navigation';

const page = async ({ params }: { params: { urlId: string } }) => {
  const { urlId } = params;

  const response = await fetch(
    `http://localhost:3000/api/links/redirect?urlId=${urlId}`,
    {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (response.status === 200) {
    const data = await response.json();
    console.log('Redirecting to:', data.url);
    // Redirect to the original URL
    return redirect(data.url);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <h1
        className="
            text-4xl
            font-bold
            text-red-500
            border-r-2 border-primary-500
            pr-4
        "
      >
        404
      </h1>
      <p
        className="
          text-4xl
          font-bold
          text-black
          pl-4"
      >
        Link not found
      </p>
    </div>
  );
};
export default page;
