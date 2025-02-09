export default function NotFound() {
  return (
    <section className="container max-w-screen-lg py-6">
      <h1 className="my-6 text-4xl font-bold md:text-5xl lg:text-6xl">
        {'404 Not Found'}
      </h1>
      <p>ご指定のページは見つかりません。</p>
      <p>アドレスが変更されたか、ページが削除された可能性があります。</p>
    </section>
  );
}
