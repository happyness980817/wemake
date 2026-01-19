import { Form, Link, redirect, useNavigation } from "react-router";
import type { Route } from "./+types/login-page";
import { Button } from "~/common/components/ui/button";
import InputPair from "~/common/components/input-pair";
import AuthButtons from "../components/auth-buttons";
import { LoaderCircle } from "lucide-react";
import z from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | Wemake" }];
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return {
      loginError: null,
      formError: error.flatten().fieldErrors,
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      formError: null,
      loginError: loginError.message,
    };
  }
  return redirect("/", { headers });
};
// action 함수 - post 요청 처리

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.state === "submitting" || // 폼 제출시 로딩 표시
    navigation.state === "loading"; // 홈페이지 로드 시 로딩 표시
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <Button variant="link" asChild className="absolute top-8 right-8">
        <Link to="/auth/join">Join &rarr;</Link>
      </Button>
      <div className="flex items-center flex-col justify-center max-w-md w-full gap-10">
        <h1 className="text-2xl font-semibold">Log In</h1>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="email"
            label="Email"
            name="email"
            type="email"
            description="Enter your email"
            required
            placeholder="Enter your email"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.email?.join(", ")}
            </p>
          )}
          <InputPair
            id="password"
            label="Password"
            name="password"
            type="password"
            description="Enter your password"
            required
            placeholder="Enter your password"
          />
          {actionData && "formError" in actionData && (
            <p className="text-sm text-red-500">
              {actionData?.formError?.password?.join(", ")}
            </p>
          )}
          <Button className="w-full h-10" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Log In"
            )}
          </Button>
          {actionData && "loginError" in actionData && (
            <p className="text-sm text-red-500">{actionData.loginError}</p>
          )}
        </Form>
        <AuthButtons />
      </div>
    </div>
  );
}
