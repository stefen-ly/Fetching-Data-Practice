"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { z } from "zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit?: (data: LoginFormValues) => Promise<void> | void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export function LoginForm({
  className,
  onSubmit,
  isLoading = false,
  errorMessage = null,
  ...props
}: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const handleFormSubmit = async (data: LoginFormValues) => {
    if (onSubmit) {
      try {
        await onSubmit(data);
      } catch (err) {
        console.error("Login error:", err);}
    } else {
      console.log("Login data:", data);
      await new Promise((r) => setTimeout(r, 1400));
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
            {errorMessage && (
              <div className="rounded-md bg-destructive/15 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </div>
            )}

            <FieldGroup>
              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="username"
                      autoFocus
                      placeholder="name@example.com"
                      disabled={isLoading || isSubmitting}
                    />
                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <div className="relative">
                      <Input
                        {...field}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="••••••••"
                        disabled={isLoading || isSubmitting}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <FieldError errors={fieldState.error ? [fieldState.error] : undefined} />
                  </Field>
                )}
              />

              <div className="pt-2 space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isSubmitting || !form.formState.isValid}
                >
                  {(isLoading || isSubmitting) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading || isSubmitting ? "Signing in..." : "Sign in"}
                </Button>

                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  disabled={isLoading || isSubmitting}
                >
                  Continue with Google
                </Button>

                <FieldDescription className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a
                    href="/signup"
                    className="text-primary hover:underline underline-offset-4 font-medium"
                  >
                    Sign up
                  </a>
                </FieldDescription>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}