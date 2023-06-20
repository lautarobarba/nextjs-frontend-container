import Link from "next/link";

const Home = () => {
  return (
    <main>
      <br />
      <h1 className="underline decoration-sky-500">Frontend Mentor</h1>
      <div className="flex flex-col flex-nowrap justify-center">
        <br />
        <hr className="m-auto w-80" />
        <Link
          href="/results-summary-component"
          className="m-auto text-blue-500"
        >
          Results summary component
        </Link>
      </div>
    </main>
  );
};

export default Home;
