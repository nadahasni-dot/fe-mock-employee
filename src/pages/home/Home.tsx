import NavBar from "@/components/NavBar";
import PublicRoute from "@/components/PublicRoute";

const Home = () => {
  return (
    <PublicRoute>
      <NavBar />
      <section className="container py-10">
        <h2 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Find your dream Jobs around the world
        </h2>
      </section>
    </PublicRoute>
  );
};

export default Home;
