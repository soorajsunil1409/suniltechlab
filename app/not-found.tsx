import Link from "next/link";

const NotFound = () => {
  return (
    <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-b from-slate-900 via-green-950 to-green-900">      {/* Stadium Lights */}
      <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Football Pitch */}
      <div className="absolute inset-0 opacity-20">
        <div className="relative h-full w-full border-4 border-white/30">
          <div className="absolute left-1/2 top-0 h-full w-px bg-white/30 -translate-x-1/2" />
          <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/30" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="animate-bounce text-8xl md:text-9xl">
          ⚽
        </div>

        <h1 className="mt-6 text-7xl font-black tracking-wider text-white md:text-9xl">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold text-yellow-400 md:text-4xl">
          UNDER CONSTRUCTION
        </h2>

        <div className="mt-10 flex gap-4">
          <Link
            href="/"
            className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105"
          >
            Back to Home
          </Link>

          <Link
            href="/worldcup2026"
            className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"
          >
            View Matches
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;