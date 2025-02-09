export default function NotFound() {
  return (
    <main className="mx-auto max-w-screen-lg">
      <section className="flex h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="my-6 text-4xl font-bold md:text-5xl lg:text-6xl">
          404 Not Found
        </h1>
        <p>ご指定のページは見つかりません。</p>
        <p>アドレスが変更されたか、ページが削除された可能性があります。</p>
      </section>
    </main>
  );
}
