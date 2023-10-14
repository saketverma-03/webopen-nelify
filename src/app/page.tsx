import Link from "next/link";

export default function Home() {
  return (
    <main className="text-white bg-gradient-to-r scroll-smooth from-gray-800 to-gray-950 h-full flex flex-col ">
      <nav className="flex backdrop-blur-md sticky z-10 top-0 py-5 px-4">
        <span className="flex-1">Code Pen</span>
        <ul className="list-none flex space-x-4 ">
          <li>
            <Link href="#about" className="hover:border-b-2 border-blue-600">
              about
            </Link>
          </li>
          scr
          <li className="px-2 py-1 hover:bg-gray-600 transition rounded-lg ">
            <Link href="/auth">Login</Link>
          </li>
          <li className="bg-gray-100 text-black px-4 py-1 rounded-md transition hover:bg-purple-800 hover:text-white">
            <Link href={"/auth"}>signup</Link>
          </li>
        </ul>
      </nav>
      <div className="grid sm:grid-cols-2 h-screen justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-4xl lg:text-7xl font-bold text-center">
            Code Pen
          </h1>
          <Link
            href=""
            className="bg-gray-100 text-black px-4 py-1 my-4 rounded-md transition hover:bg-purple-800 hover:text-white"
          >
            signup for free
          </Link>
        </div>
        <div className="relative h-full w-full ">
          <div className="bg-gray-900 absolute h-32 flex-col shadow-xl shadow-black top-1/3 flex rounded-lg w-fit pr-4 pb-2 ">
            <span className="py-1 pl-4 font-bold">Html</span>
            <span className="pl-4">div vala code</span>
          </div>

          <div className="bg-gray-900 absolute  h-32 top-[40%] shadow-xl shadow-black translate-x-48 flex-col flex rounded-lg w-fit pr-4 pb-2 ">
            <span className="py-1 pl-4 font-bold">Html</span>
            <span className="pl-4">div vala code</span>
          </div>
          <div className="bg-gray-900 absolute h-32 flex-col flex top-[40%] shadow-xl shadow-black translate-y-14 translate-x-8 rounded-lg w-fit pr-4 pb-2 ">
            <span className="py-1 pl-4 font-bold">css</span>
            <span className="pl-4">div vala code</span>
          </div>
        </div>
      </div>
      <section id="about" className="p-2 scroll-smooth sm:w-2/3 self-center">
        <h1 className="text-2xl font-bold mt-28">
          An Online HTML CSS JS editor
        </h1>
        <h2 className="text-xl font-bold mb-2 mt-4">About</h2>
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
        <h2 className="text-xl font-bold mb-2 mt-6">
          What Makes CodePen Unique
        </h2>
        <p className="text-gray-300">
          <span className="font-bold"> Live Preview:</span> CodePen offers an
          instant live preview of your code, allowing you to see your changes in
          real-time. No need to switch between tabs or applications – your code
          and its results are right there in front of you.
          <span className="font-bold"> Community:</span> Join a diverse and
          welcoming community of developers and designers from around the world.
          Share your work, ask for feedback, and discover new techniques from
          fellow CodePen enthusiasts.
          <br className="mb-4" />
          <span className="font-bold">
            Pens, Projects, and Collections:
          </span>{" "}
          Organize your work with Pens, create complete web projects, and curate
          your favorite pieces into Collections. CodePen makes it easy to
          showcase your portfolio and find inspiration from others.
          <br className="mb-4" />
          <span className="font-bold">Editor Features:</span> Our robust code
          editor includes autocompletion, linting, and an extensive library of
          front-end frameworks and libraries. Whether you're building a simple
          website or a complex web app, we've got you covered.
          <br className="mb-4" />
          <span className="font-bold">Pro Features:</span> Upgrade to CodePen
          Pro for even more powerful tools, such as privacy settings, asset
          hosting, and collaboration features. Pro users enjoy an ad-free
          experience and priority support.
        </p>
        <h2 className="text-xl mt-4 mb-2">Join the CodePen Community</h2>
        <p className="text-gray-300">
          Whether you're a developer, designer, hobbyist, or educator, CodePen
          is your go-to platform for turning your web development ideas into
          reality. We can't wait to see what you create and share with the
          world. Start coding, exploring, and collaborating today with CodePen!
        </p>
      </section>
    </main>
  );
}
