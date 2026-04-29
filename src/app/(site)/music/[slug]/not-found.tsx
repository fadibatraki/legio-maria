import Link from "next/link";
import { ArrowLeft, Music } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07070B] px-4">
      <div className="text-center">
        <Music className="mx-auto mb-6 h-24 w-24 text-[#7C3AED]/50" />
        <h2 className="mb-4 text-3xl font-bold text-white">Album Not Found</h2>
        <p className="mb-8 text-white/60">
          Sorry, we couldn't find the album you're looking for.
        </p>
        <Link
          href="/music"
          className="inline-flex items-center gap-2 rounded-xl border border-[#7C3AED]/50 bg-[#7C3AED]/20 px-6 py-3 font-semibold text-white transition-all hover:border-[#F43F5E] hover:bg-[#F43F5E]/30"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Music
        </Link>
      </div>
    </div>
  );
}
