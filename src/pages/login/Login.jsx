import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSignIn,
  useSignUp,
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  useUser,
} from "@clerk/clerk-react";
import "./Login.css"; // Asegúrate de tener un archivo CSS para estilos personalizados
import { Navigate, useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const registerSchema = loginSchema.extend({
  passwordConfirm: z
    .string()
    .min(6, "Confirma tu contraseña")
    .refine((val, ctx) => val === ctx.parent.password, {
      message: "Las contraseñas no coinciden",
    }),
});

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const {
    isLoaded: signInLoaded,
    signIn,
    setActive: setSignInActive,
  } = useSignIn();
  const {
    isLoaded: signUpLoaded,
    signUp,
    setActive: setSignUpActive,
  } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const { isSignedIn, isLoaded: userLoaded } = useUser(); // 👈 para verificar si ya está autenticado

  useEffect(() => {
    if (userLoaded && isSignedIn) {
      console.log(userLoaded, isSignedIn);
      navigate("/dashboard/home");
    }
  }, [isSignedIn, userLoaded, navigate]);

  const handleGoogleSignIn = async () => {
    if (!signIn) {
      console.log("Clerk aún no ha cargado");
      return;
    }
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback", // puede ser temporal
        redirectUrlComplete: "/dashboard/home", // ✅ este es el final
      });
      console.log(isSignedIn, "autenticado");
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err);
    }
  };
  const onSubmit = async (data) => {
    if (isLogin) {
      if (!signInLoaded) return;
      try {
        const result = await signIn.create({
          identifier: data.email,
          password: data.password,
        });
        if (result.status === "complete") {
          await setSignInActive({ session: result.createdSessionId });
          alert("Sesión iniciada correctamente");
        }
      } catch (err) {
        alert(err.errors?.[0]?.message || "Error al iniciar sesión");
      }
    } else {
      if (!signUpLoaded) return;
      try {
        const result = await signUp.create({
          emailAddress: data.email,
          password: data.password,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        alert("Verifica tu correo para completar el registro");
      } catch (err) {
        alert(err.errors?.[0]?.message || "Error al registrarse");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-96">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {!isLogin && (
          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              {...register("passwordConfirm")}
              className="w-full p-2 border rounded"
            />
            {errors.passwordConfirm && (
              <p className="text-red-500 text-sm">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </button>

        <div className="text-center mt-2 text-sm text-gray-600">
          {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Registrarme" : "Iniciar Sesión"}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="mb-2 text-gray-600">O </p>
        <ClerkLoaded>
    <SignInButton mode="redirect" redirectUrl="/dashboard/home" strategy="oauth_google">
      <div type="button" className="google-login-button">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="google-icon"
        />
        Iniciar sesión con Google
      </div>
    </SignInButton>
  </ClerkLoaded>
  <ClerkLoading>
    <p className="loading-text">Cargando...</p>
  </ClerkLoading>
      </div>
    </div>
  );
}
