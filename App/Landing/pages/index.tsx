import RainEffect from "../../components/RainEffect";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <RainEffect />

      <h1 className="text-4xl font-bold mb-4 z-10">DSRT - Digital Smart Revise Technology</h1>
      <p className="text-lg mb-8 z-10 text-center max-w-xl">
        Platform restorasi foto dengan akurasi tinggi dan mempertahankan semua elemen asli tanpa manipulasi berlebihan.
      </p>
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg z-10 hover:bg-blue-600 transition">
        Mulai Restorasi
      </button>

      <footer className="absolute bottom-4 text-sm z-10">
        © 2025 DSRT All Rights Reserved
      </footer>
    </div>
  );
}
