import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";
import { Button } from "../ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

const NavBar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem(LOCAL_STORAGE_KEY.ROLE);

  const handleSignOut = () => {
    localStorage.clear();
    toast.info("Sign Out success");
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 w-full bg-white border-b">
      <div className="container flex items-center justify-between h-16 text-black">
        <Link to="/">
          <h1 className="text-2xl font-semibold tracking-tight scroll-m-20">
            JOBWAYS
          </h1>
        </Link>
        <div className="flex gap-2">
          {role ? (
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate({ to: "/signin" })}>
                Sign In
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate({ to: "/signup" })}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
