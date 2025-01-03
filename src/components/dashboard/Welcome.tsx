import { getServerSession } from 'next-auth';

const Welcome = async () => {
  const session = await getServerSession();

  return (
    <div className="border border-tertiary-500 p-10 flex bg-white flex-col ">
      <p className="text-lg tracking-widest uppercase">Welcome</p>
      <h1 className="text-4xl font-semibold ">{session?.user?.name}</h1>
    </div>
  );
};
export default Welcome;
