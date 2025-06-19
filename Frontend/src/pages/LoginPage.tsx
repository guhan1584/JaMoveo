"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Music, LogIn, ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "@/config/axios";
import { loginSchema } from "@/validations/auth.schema";
import type { ZodIssue } from "zod";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErrors([]);
    setIsLoading(true);

    const validation = loginSchema.safeParse(form);

    if (!validation.success) {
      const issues: ZodIssue[] = validation.error.issues;
      const messages = issues.map((issue) => issue.message);
      setErrors(messages);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.admin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setErrors([err.response.data.message]);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-50 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      <Card className="w-full max-w-md relative z-10 bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Music className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
          <p className="text-white/60 text-sm">Sign in to join the session</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/80 font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20 h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20 h-12 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1 h-10 w-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40 text-white/60 hover:text-white rounded-lg transition-all duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <ul className="list-disc list-inside text-red-300 text-sm space-y-1">
                {errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <Button
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing In...
              </div>
            ) : (
              <>
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </>
            )}
          </Button>

          <div className="pt-4 border-t border-white/10">
            <p className="text-center text-white/60 text-sm">
              Don't have an account?{" "}
              <span
                className="text-purple-300 hover:text-white cursor-pointer transition-colors duration-200 font-medium hover:underline"
                onClick={() => navigate("/")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
