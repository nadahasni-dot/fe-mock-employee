import NavBar from "@/components/NavBar";
import PublicRoute from "@/components/PublicRoute";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignUpForm from "./form/SignUpForm";
import { SignUpSchema } from "./form/config";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ENDPOINTS } from "@/constants/api";
import { API } from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { ErrorResponse } from "@/types/response/error";

const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      conf_password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    mutationKey: [ENDPOINTS.AUTH.SIGN_UP],
    mutationFn: (data: z.infer<typeof SignUpSchema>) => {
      return API.post(ENDPOINTS.AUTH.SIGN_UP, {
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: () => {
      toast.success("Sign Up success, please sign in to your account");

      navigate({ to: "/signin" });
    },
    onError: (error: AxiosError<ErrorResponse<null>>) => {
      const errorMessage = error.response?.data.message || "Error occured";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (payload: z.infer<typeof SignUpSchema>) => {
    mutate(payload);
  };

  return (
    <PublicRoute>
      <NavBar />
      <section className="flex items-center justify-center min-h-[90vh]">
        <div className="flex flex-col items-center">
          <Card className="max-w-md w-[600px]">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Start your session and find a dream jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <SignUpForm form={form} />
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isPending}
                >
                  Sign Up
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </PublicRoute>
  );
};

export default SignUp;
