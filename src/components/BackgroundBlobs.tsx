export const BackgroundBlobs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/30 dark:bg-blue-500/20 blur-3xl blob-spin" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-purple-500/30 dark:bg-purple-500/20 blur-3xl blob" />
      <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-pink-500/30 dark:bg-pink-500/20 blur-3xl blob-spin" />
    </div>
  );