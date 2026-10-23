export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Wopido Logo */}
        <div className="w-16 h-16 rounded-2xl wopido-gradient flex items-center justify-center shadow-lg animate-pulse">
          <span className="text-white font-bold text-2xl">W</span>
        </div>
        {/* Spinner */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-wopido-plum animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-wopido-plum animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2.5 h-2.5 rounded-full bg-wopido-rose animate-bounce" />
        </div>
        <p className="text-sm text-muted-foreground font-medium">Loading Wopido...</p>
      </div>
    </div>
  );
}
