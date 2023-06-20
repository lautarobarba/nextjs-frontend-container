import Link from "next/link";

const Home = () => {
  return (
    <main>
      <br />
      <h1 className="text-lg text-center">Frontend Mentor</h1>
      <hr className="m-auto w-80" />
      <h2 className="mt-5">Retos</h2>
      <ul className="list-disc">
        <li>
          <Link
            href="/results-summary-component"
            className="m-auto text-blue-500"
          >
            {"[[>>]]"} Results summary component
          </Link>
        </li>
      </ul>
    </main>
  );
};

export default Home;
