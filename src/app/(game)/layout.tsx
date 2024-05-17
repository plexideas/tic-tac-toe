export default function GameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-dvh w-screen flex flex-col items-center justify-center overflow-hidden">
      {children}
    </main>
  );
}
