import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl wopido-gradient flex items-center justify-center shadow-lg mx-auto mb-6">
          <span className="text-white font-bold text-3xl">W</span>
        </div>
        <h1 className="text-6xl font-bold text-wopido-plum mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page not found</h2>
        <p className="text-muted-foreground mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 wopido-button-primary px-8 py-3 rounded-xl"
        >
          <span>← Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
