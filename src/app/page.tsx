import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main className="text-white bg-gradient-to-r scroll-smooth from-gray-800 to-gray-950 h-full flex flex-col ">
      <nav className="sticky backdrop-blur-lg z-10 top-0 flex w-full p-1 py-2 px-6">
        <div className="mr-auto font-bold">Web Pen</div>
        <div className="flex gap-2 ">
          <Link
            href="/auth"
            className="block rounded-full hover:bg-blue-900  px-4 py-2 bg-blue-700 font-bold"
          >
            Login
          </Link>
          <Link
            href="/auth"
            className="block rounded-full bg-slate-950 px-4 py-2 hover:bg-blue-700 font-bold"
          >
            signup
          </Link>
        </div>
      </nav>
      <section className="relatve">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
          <div className="mx-auto mb-12 w-full max-w-3xl text-center md:mb-16 lg:mb-20">
            <h1 className="mb-4 text-4xl font-semibold md:text-6xl">
              The in Browser
              <span className="bg-[url('https://assets.website-files.com/63904f663019b0d8edf8d57c/6390526ac2a607693620c97b_Rectangle%2010.svg')] bg-cover bg-center px-4 text-white">
                Code Editor{" "}
              </span>
              .
            </h1>
            <p className="mx-auto  mb-5 max-w-[528px] text-xl text-slate-400 lg:mb-8">
              The web application boasts a robust set of features designed to
              enhance the coding experience. It incorporates a sophisticated
              code editor with autocompletion for HTML, CSS, and JS,
            </p>
          </div>
          <div className="relative mx-auto h-[512px]">
            <Image
              src="/thubnail-webpen.jpg"
              alt=""
              height={720}
              width={1280}
              className="inline-block h-full w-full rounded-xl object-cover sm:rounded-2xl"
            />
            <div className="absolute bottom-0 left-4 right-0 top-4 -z-10 h-full w-full rounded-2xl bg-black"></div>
          </div>
        </div>
      </section>
      <section id="about" className="p-2 scroll-smooth sm:w-2/3 self-center">
        <h2 className="text-4xl font-bold mb-16 mt-24 text-center">
          What Makes CodePen Unique
        </h2>
        <section className="text-gray-300 grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-slate-800 p-4 bg-gray-900 rounded hover:border-blue-500">
            CodePen offers an instant live preview of your code, allowing you to
            see your changes in real-time. No need to switch between tabs or
            applications – your code and its results are right there in front of
            you.
          </div>
          <div className="border border-slate-800 p-4 bg-gray-900 rounded hover:border-blue-500">
            welcoming community of developers and designers from around the
            world. Share your work, ask for feedback, and discover new
            techniques from fellow CodePen enthusiasts.
          </div>
          <div className="border border-slate-800 p-4 bg-gray-900 rounded hover:border-blue-500">
            Organize your work with Pens, create complete web projects, and
            curate your favorite pieces into Collections. CodePen makes it easy
            to showcase your portfolio and find inspiration from others.{" "}
          </div>
          <div className="border border-slate-800 p-4 bg-gray-900 rounded hover:border-blue-500">
            Our robust code editor includes autocompletion, linting, and an
            extensive library of front-end frameworks and libraries. Whether
            you're building a simple website or a complex web app, we've got you
            covered.
          </div>
        </section>
      </section>

      <div className="bg-slate-950 p-4 mt-16">
        <h2 className="text-xl mb-4">Join the CodePen Community</h2>
        <p className="text-gray-300 ">
          Whether you're a developer, designer, hobbyist, or educator, CodePen
          is your go-to platform for turning your web development ideas into
          reality. We can't wait to see what you create and share with the
          world. Start coding, exploring, and collaborating today with CodePen!
        </p>
      </div>
    </main>
  );
}
