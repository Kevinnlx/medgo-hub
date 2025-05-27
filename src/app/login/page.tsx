"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUp, Eye, EyeOff, Loader2, AlertCircle, Copy, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedCredential, setCopiedCredential] = useState<string | null>(null);

  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  // Usuarios de prueba organizados por categorías
  const demoCredentials = {
    platform: [
      {
        role: "PLATFORM",
        name: "Administrador Sistema",
        email: "admin@medgohub.com",
        password: "platform123",
        description: "Acceso completo a toda la plataforma"
      }
    ],
    staff: [
      {
        role: "STAFF - Platform Finance",
        name: "Ana Financiera",
        email: "finance@medgohub.com",
        password: "finance123",
        description: "Personal Financiero - Plataforma"
      },
      {
        role: "STAFF - Platform Support",
        name: "Carlos Soporte",
        email: "support@medgohub.com",
        password: "support123",
        description: "Personal de Soporte - Plataforma"
      },
      {
        role: "STAFF - Provider Finance",
        name: "Elena Finanzas Hospital",
        email: "staff.finance.provider@medgohub.com",
        password: "stafffinance123",
        description: "Personal Financiero - Proveedor"
      },
      {
        role: "STAFF - Provider Support",
        name: "Roberto Soporte Hospital",
        email: "staff.support.provider@medgohub.com",
        password: "staffsupport123",
        description: "Personal de Soporte - Proveedor"
      }
    ],
    providers: [
      {
        role: "PROVIDER - Medical Center",
        name: "Dr. María González",
        email: "provider.medical@medgohub.com",
        password: "medical123",
        description: "Centro Médico Completo"
      },
      {
        role: "PROVIDER - Pharmacy",
        name: "Farmacia Central",
        email: "provider.pharmacy@medgohub.com",
        password: "pharmacy123",
        description: "Servicios de Farmacia"
      },
      {
        role: "PROVIDER - Laboratory",
        name: "Laboratorio Clínico",
        email: "provider.lab@medgohub.com",
        password: "lab123",
        description: "Servicios de Laboratorio"
      },
      {
        role: "PROVIDER - Emergency",
        name: "Servicios de Emergencia",
        email: "provider.emergency@medgohub.com",
        password: "emergency123",
        description: "Servicios de Emergencia"
      },
      {
        role: "PROVIDER - Homecare",
        name: "Atención Domiciliaria Plus",
        email: "provider.homecare@medgohub.com",
        password: "homecare123",
        description: "Atención Domiciliaria"
      },
      {
        role: "PROVIDER - Office Specialist",
        name: "Dr. Luis Cardiólogo",
        email: "provider.specialist@medgohub.com",
        password: "specialist123",
        description: "Especialista Consultorio"
      },
      {
        role: "PROVIDER - Virtual Specialist",
        name: "Dra. Carmen Telemedicina",
        email: "provider.virtual@medgohub.com",
        password: "virtual123",
        description: "Especialista Virtual"
      }
    ]
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && user) {
      const intendedDestination = sessionStorage.getItem(
        "intended_destination",
      );
      sessionStorage.removeItem("intended_destination");
      router.push(intendedDestination || "/dashboard");
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(email, password);

      if (success) {
        const intendedDestination = sessionStorage.getItem(
          "intended_destination",
        );
        sessionStorage.removeItem("intended_destination");
        router.push(intendedDestination || "/dashboard");
      } else {
        setError("Credenciales incorrectas. Verifica tu email y contraseña.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error inesperado. Intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyCredentials = async (email: string, password: string) => {
    try {
      await navigator.clipboard.writeText(`${email} / ${password}`);
      setCopiedCredential(email);
      setTimeout(() => setCopiedCredential(null), 2000);
    } catch (err) {
      console.error('Failed to copy credentials:', err);
    }
  };

  const handleQuickLogin = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  // Show loading only for a brief moment during initial auth check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  // Don't show login form if already authenticated
  if (user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Panel - Demo Credentials */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Usuarios de Prueba - MediGo Hub
          </h3>
          
          {/* Platform Users */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
              Administradores de Plataforma
            </h4>
            <div className="space-y-2">
              {demoCredentials.platform.map((credential, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-800">
                      {credential.name}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleCopyCredentials(credential.email, credential.password)}
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="Copiar credenciales"
                      >
                        {copiedCredential === credential.email ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleQuickLogin(credential.email, credential.password)}
                        className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        Usar
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-blue-600 mb-2">{credential.description}</p>
                  <p className="text-xs text-blue-700 font-mono">
                    {credential.email} / {credential.password}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Users */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
              Personal Administrativo
            </h4>
            <div className="space-y-2">
              {demoCredentials.staff.map((credential, index) => (
                <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-green-800">
                      {credential.name}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleCopyCredentials(credential.email, credential.password)}
                        className="p-1 text-green-600 hover:text-green-800 transition-colors"
                        title="Copiar credenciales"
                      >
                        {copiedCredential === credential.email ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleQuickLogin(credential.email, credential.password)}
                        className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        Usar
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-green-600 mb-2">{credential.description}</p>
                  <p className="text-xs text-green-700 font-mono">
                    {credential.email} / {credential.password}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Provider Users */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
              Proveedores de Servicios
            </h4>
            <div className="space-y-2">
              {demoCredentials.providers.map((credential, index) => (
                <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-purple-800">
                      {credential.name}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleCopyCredentials(credential.email, credential.password)}
                        className="p-1 text-purple-600 hover:text-purple-800 transition-colors"
                        title="Copiar credenciales"
                      >
                        {copiedCredential === credential.email ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button
                        onClick={() => handleQuickLogin(credential.email, credential.password)}
                        className="px-2 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                      >
                        Usar
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-purple-600 mb-2">{credential.description}</p>
                  <p className="text-xs text-purple-700 font-mono">
                    {credential.email} / {credential.password}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="mx-auto h-20 w-20 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-8">
              <div className="relative">
                <span className="text-white text-4xl font-bold">M</span>
                <ArrowUp className="w-5 h-5 text-white absolute -top-1 -right-1 rotate-45" />
              </div>
            </div>
            <h2 className="text-2xl font-normal text-gray-800">
              Iniciar sesión en su cuenta
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              MediGo Hub - Plataforma Administrativa
            </p>
          </div>

          {/* Mobile Demo Credentials */}
          <div className="lg:hidden mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Credenciales de prueba disponibles:
            </h3>
            <div className="text-xs text-blue-700 space-y-1">
              <div><strong>PLATFORM:</strong> admin@medgohub.com / platform123</div>
              <div><strong>STAFF:</strong> finance@medgohub.com / finance123</div>
              <div><strong>PROVIDER:</strong> provider.medical@medgohub.com / medical123</div>
              <p className="text-xs text-blue-600 mt-2 italic">
                Ver panel izquierdo en desktop para más opciones
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 text-red-700 rounded-lg">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Ingresa tu correo electrónico"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <Link
                  href="#"
                  className="text-sm text-cyan-500 hover:text-cyan-600"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Ingresa tu contraseña"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Iniciando sesión...</span>
                  </>
                ) : (
                  <span>Iniciar sesión</span>
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              ¿No registrado como proveedor?{" "}
            </span>
            <Link
              href="#"
              className="text-sm text-cyan-500 hover:text-cyan-600 font-medium"
            >
              Regístrese aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

