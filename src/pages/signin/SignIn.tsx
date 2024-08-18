import NavBar from "@/components/NavBar";
import PublicRoute from "@/components/PublicRoute";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninSchema } from "./form/config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SignInForm from "./form/SignInForm";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/axios";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/response/error";
import { CommonResponse } from "@/types/response/success";
import { SignInDataResponse } from "@/types/response/auth";
import { LOCAL_STORAGE_KEY } from "@/constants/client-storage-keys";

const SignIn = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: [ENDPOINTS.AUTH.SIGN_IN],
    mutationFn: (data: z.infer<typeof SigninSchema>) => {
      return API.post(ENDPOINTS.AUTH.SIGN_IN, {
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: (res: AxiosResponse<CommonResponse<SignInDataResponse>>) => {
      const data = res.data.data;
      localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, data?.token || "");
      localStorage.setItem(LOCAL_STORAGE_KEY.EMAIL, data?.email || "");
      localStorage.setItem(LOCAL_STORAGE_KEY.ROLE, data?.role || "");

      navigate({ to: "/app", replace: true });
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (payload: z.infer<typeof SigninSchema>) => {
    mutate(payload);
  };

  return (
    <PublicRoute>
      <NavBar />
      <section className="flex items-center justify-center min-h-[90vh]">
        <div className="flex flex-col items-center">
          <Card className="max-w-md w-[600px]">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Start your session and find a dream jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <SignInForm form={form} />
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isPending}
                >
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicRoute>
  );
};

export default SignIn;
