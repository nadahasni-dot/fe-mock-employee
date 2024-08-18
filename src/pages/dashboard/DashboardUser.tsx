import NavBar from "@/components/NavBar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";

const DashboardUser = () => {
  const email = localStorage.getItem(LOCAL_STORAGE_KEY.EMAIL) || "";

  return (
    <ProtectedRoute role="USER">
      <NavBar />
      <section className="container py-10">
        <h2 className="text-2xl font-semibold tracking-tight scroll-m-20">
          Welcome Back {email}!
        </h2>
        <p className="mt-2 leading-7">Please complete your biodata below</p>
      </section>
    </ProtectedRoute>
  );
};

export default DashboardUser;
