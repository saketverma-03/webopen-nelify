import Link from "next/link";

export default function Home() {
  return (
    <main className="text-white bg-gradient-to-r scroll-smooth from-gray-800 to-gray-950 h-full flex flex-col ">
      <nav className="flex w-full p-1 px-6">
        <div className="mr-auto">Web Pen</div>
        <div className="flex gap-4">
          <Link
            href="/auth"
            className="block hover:bg-slate-950 hover:text-blue-500 px-4 py-2 bg-blue-700 font-bold"
          >
            Login
          </Link>
          <Link
            href="/auth"
            className="block bg-slate-950 px-4 py-2 hover:bg-blue-700 font-bold"
          >
            Login
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
              CodePen is a social development environment for front-end
              designers and developers. Build and deploy a website, show off
              your work, build test cases to learn and debug, and find
              inspiration.
            </p>
            <div className="flex justify-center">
              <a
                href="#"
                className="mr-5 inline-block rounded-xl bg-black px-8 py-4 text-center font-semibold text-white [box-shadow:rgb(19,_83,_254)_6px_6px] md:mr-6"
              >
                Get Started
              </a>
              <a
                href="#"
                className="flex max-w-full flex-row items-center justify-center rounded-xl border border-solid border-[#1353fe] px-6 py-3 font-semibold text-[#1353fe] [box-shadow:rgb(19,_83,_254)_6px_6px]"
              >
                <img
                  src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905a575ec39b6784fc687c_Play.svg"
                  alt=""
                  className="mr-2 inline-block w-6"
                />
                <p className="">View Demo</p>
              </a>
            </div>
          </div>
          <div className="relative mx-auto h-[512px]">
            <img
              src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63915d247ab06a755ee4aaee_magicpattern-KfFmwa7m5VQ-unsplash.jpg"
              alt=""
              className="inline-block h-full w-full rounded-xl object-cover sm:rounded-2xl"
            />
            <div className="absolute bottom-0 left-4 right-0 top-4 -z-10 h-full w-full rounded-2xl bg-black"></div>
          </div>
        </div>
        <img
          src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905b9f809b5c8180ce30c5_pattern-1.svg"
          alt=""
          className="absolute bottom-0 left-0 right-auto top-auto -z-10 inline-block md:bottom-1/2 md:left-0 md:right-auto md:top-auto"
        />
        <img
          src="https://assets.website-files.com/63904f663019b0d8edf8d57c/63905ba1538296b3f50a905e_pattern-2.svg"
          alt=""
          className="absolute bottom-auto left-auto right-0 top-0 -z-10 hidden sm:inline-block"
        />
      </section>
      <section id="about" className="p-2 scroll-smooth sm:w-2/3 self-center">
        <h2 className="text-4xl font-bold mb-16 mt-24 text-center">
          An Online HTML CSS JS editor
        </h2>{" "}
        <h2 className="text-xl font-bold mb-2 ">About</h2>
        <p className="text-gray-300">
          CodePen is your creative playground for building, sharing, and
          exploring web development projects. We're passionate about empowering
          developers, designers, and learners of all levels to bring their ideas
          to life on the web.
        </p>
        <h2 className="text-xl font-bold mb-2 mt-4">Our Mission</h2>
        <p className="text-gray-300">
          Our mission is to provide a collaborative and inspiring platform where
          you can experiment with HTML, CSS, and JavaScript. Whether you're a
          seasoned developer or just getting started, CodePen is here to support
          your journey by offering a space to showcase your skills, learn from
          others, and collaborate with a vibrant community.
        </p>
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
        <p className="text-gray-300 text-slate-400">
          Whether you're a developer, designer, hobbyist, or educator, CodePen
          is your go-to platform for turning your web development ideas into
          reality. We can't wait to see what you create and share with the
          world. Start coding, exploring, and collaborating today with CodePen!
        </p>
      </div>
    </main>
  );
}
