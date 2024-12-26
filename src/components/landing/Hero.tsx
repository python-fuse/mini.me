const Hero = () => {
  return (
    <main className="hero w-screen bg-tertiary-400 h-screen justify-center items-center text-center flex flex-col place-items-center gap-y-4 pt-20">
      <h2 className="text-8xl font-bold text-white">Your Links, shortened</h2>
      <p className="text-xl text-white/90 mt-5 text-center">
        Transform long URLs into memorable links. Track engagement with powerful
        analytics. Generate QR codes instantly. <br /> Paste your long URL below
        to get started.
      </p>
      <div className="flex mt-5">
        <input
          type="text"
          placeholder="Paste your long URL here"
          className=" p-4 text-lg rounded-l-md outline-none"
          autoFocus
        />
        <button className="cta-btn bg-primary-300 hover:bg-primary-200 duration-300  p-2  text-white rounded-r-md">
          Create link - <span className="italic font-light">100% free</span>
        </button>
      </div>

      <div className="">
        <p className="text-lg text-white">
          Sign up for free. Create unlimited links and QR codes
        </p>
      </div>
    </main>
  );
};
export default Hero;
