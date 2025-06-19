"use client";

import type React from "react";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Music, UserPlus, Crown, ArrowLeft, Eye, EyeOff } from "lucide-react";
import api from "@/config/axios";
import { ALLOWED_INSTRUMENTS } from "@/constants/instruments";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signupSchema } from "@/validations/auth.schema";

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin-signup";

  const [form, setForm] = useState({
    username: "",
    password: "",
    instrument: "",
    admin: isAdmin,
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleInstrumentChange = (value: string) => {
    setForm((prev) => ({ ...prev, instrument: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const validation = signupSchema.safeParse(form);

    if (!validation.success) {
      setError(validation.error.message);
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post(
        `/auth/${isAdmin ? "admin-signup" : "signup"}`,
        form
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Signup failed. Try again.";
      setError(typeof message === "string" ? message : "Invalid input.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-x-hidden">
      {/* Background decoration - Responsive */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      {/* Back Button - Fixed Position */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-50 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        <span className="hidden sm:inline">Back</span>
      </Button>

      {/* Signup Card */}
      <Card className="w-full max-w-md relative z-10 bg-white/5 backdrop-blur-xl border-white/10 shadow-lg rounded-2xl">
        <CardHeader className="text-center p-6 md:p-8">
          <div
            className={`mx-auto w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 shadow-lg ${
              isAdmin
                ? "bg-gradient-to-r from-amber-400 to-orange-500"
                : "bg-gradient-to-r from-purple-400 to-blue-400"
            }`}
          >
            {isAdmin ? (
              <Crown className="w-8 h-8 md:w-10 md:h-10 text-white" />
            ) : (
              <Music className="w-8 h-8 md:w-10 md:h-10 text-white" />
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {isAdmin ? "Create Band Leader Account" : "Join the Band"}
          </h2>
          <p className="text-white/60 text-sm">
            {isAdmin
              ? "Lead your musical sessions"
              : "Start your musical journey"}
          </p>
        </CardHeader>

        <CardContent className="p-6 md:p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              {/* Username Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-white/80 font-medium text-sm"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20 h-12 rounded-xl transition-all duration-200"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-white/80 font-medium text-sm"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20 h-12 pr-12 rounded-xl transition-all duration-200"
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

              {/* Instrument Select */}
              <div className="space-y-2">
                <Label className="text-white/80 font-medium text-sm">
                  Your Instrument
                </Label>
                <Select
                  value={form.instrument}
                  onValueChange={handleInstrumentChange}
                >
                  <SelectTrigger className="bg-gradient-to-br from-slate-800/40 to-gray-900/30 border-slate-600/50 focus:border-white/40 focus:ring-white/20 focus:bg-gradient-to-br focus:from-slate-700/50 focus:to-gray-800/40 h-12 rounded-xl transition-all duration-200">
                    <SelectValue
                      placeholder="Select your instrument"
                      className="text-white font-medium data-[placeholder]:text-white/60"
                      style={{ color: "white !important" }}
                    />
                  </SelectTrigger>
                  <SelectContent
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    className="bg-slate-900/95 backdrop-blur-xl border-white/10 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {ALLOWED_INSTRUMENTS.map((instrument) => (
                      <SelectItem
                        key={instrument}
                        value={instrument}
                        className="text-white hover:bg-white/5 focus:bg-white/5 cursor-pointer py-4 px-6 border-b border-white/5 last:border-b-0 transition-all duration-200 hover:pl-8"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-2 h-6 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full opacity-60"></div>
                          <span className="text-base font-medium tracking-wide">
                            {instrument.charAt(0).toUpperCase() +
                              instrument.slice(1)}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <p className="text-red-300 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className={`w-full h-12 md:h-14 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base ${
                isAdmin
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  : "bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                <>
                  {isAdmin ? (
                    <Crown className="w-5 h-5 mr-3" />
                  ) : (
                    <UserPlus className="w-5 h-5 mr-3" />
                  )}
                  {isAdmin ? "Create Leader Account" : "Join the Band"}
                </>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="pt-4 border-t border-white/10 mt-6">
            <p className="text-center text-white/60 text-sm">
              Already have an account?{" "}
              <span
                className="text-purple-300 hover:text-white cursor-pointer transition-colors duration-200 font-medium hover:underline"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
