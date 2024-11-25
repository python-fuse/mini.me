import Spinner from "../components/Spinner";

const loading = () => {
  return (
    <div className="w-full h-screen grid place-content-center">
      <Spinner />
    </div>
  );
};
export default loading;
