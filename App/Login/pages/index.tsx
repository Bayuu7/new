import RainEffect from "../../components/RainEffect";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white">
      <RainEffect />

      <div className="bg-gray-900 p-8 rounded-lg shadow-lg z-10 flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-64 px-3 py-2 border border-gray-400 rounded bg-black text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-64 px-3 py-2 border border-gray-400 rounded bg-black text-white"
        />

        <button className="w-64 px-3 py-2 bg-blue-500 rounded hover:bg-blue-600 transition">
          Login
        </button>

        <div className="flex gap-4 mt-4">
          <button className="px-3 py-1 border border-gray-400 rounded">Forgot</button>
          <button className="px-3 py-1 border border-gray-400 rounded">Register</button>
        </div>

        <footer className="text-sm mt-4">
          © 2025 DSRT All Rights Reserved
        </footer>
      </div>
    </div>
  );
}
