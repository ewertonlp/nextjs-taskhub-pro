
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-slate-50 font-sans dark:bg-slate-900 p-4">
      {/* Header */}
      <div className="w-full lg:max-w-7xl flex justify-between items-center bg-white dark:bg-slate-700 px-8 py-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-linear-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-bold">
            TH
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold uppercase">TaskHub Pro</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Organize your work
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <nav>
            <ul className="flex items-center justify-between flex-wrap gap-5">
              <li className="">
                <Link
                  href="/"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <span className="">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <span className="font-regular text-slate-800">Pricing</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <span className="font-regular text-slate-800">
                    Testimonials
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
                >
                  <span className="font-regular text-slate-800">Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-600 transition-all duration-150"
          >
            <span className="font-regular text-slate-800">Contact</span>
          </Link>
          <a href="" className="inline-flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 text-sm font-semibold shadow-md transition">Sign Up</a>
        </div>
      </div>

      {/* Hero */}
      <div className="flex w-full max-w-7xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-slate-800 sm:items-start rounded-lg overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="flex-1 justify-center gap-8 items-center">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Streamline your Workflow</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white">
                Organize, Track, and 
              <br />
                Complete{' '}<span className="text-slate-900 dark:text-white">Tasks</span> <span className="bg-linear-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">Efficiently</span> 
              </h1>

              <p className="my-6 text-lg text-slate-600 dark:text-slate-300 max-w-4xl">Our task management software helps you stay on top of your projects with intuitive tools for scheduling,
              collaboration, and time tracking.</p>
            </div>
             <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/login"
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 text-sm font-semibold shadow-md transition"
                aria-label="Start free trial"
              >
                Start Free Trial
              </a>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 px-5 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="Learn more"
              >
                Learn More
              </a>
            </div>
          </div>

        </div>
        
       
       
        
      </div>

      {/* Footer */}
      <div className="w-full lg:max-w-7xl flex flex-col justify-between items-center bg-linear-to-r from-slate-700 to-slate-900 dark:bg-slate-200 px-8 py-6 rounded-lg">
        <div className="w-full flex justify-between items-center ">
        <Link href='/'>
         <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-linear-to-r from-slate-400 to-slate-500 dark:bg-linear-to-br dark:from-slate-700 dark:to-slate-900 flex items-center justify-center text-slate-900 dark:text-white font-bold">
            TH
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold uppercase text-slate-200 dark:text-slate-800">TaskHub Pro</div>
            <div className="text-sm text-gray-100 dark:text-gray-700">
              Organize your work
            </div>
          </div>
        </div>
        </Link>

         <div className="flex items-center gap-3">
          <nav className="text-slate-100">
            <ul className="flex items-center justify-between flex-wrap gap-16 text-slate-100">
              <li className="text-slate-100">
                <Link
                  href="/"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-slate-700 transition-all duration-150"
                >
                  <span className="">Home</span>
                </Link>
              </li>
              <li className="">
                <Link
                  href="#pricing"
                  className="flex flex-col items-center gap-1  p-2 rounded-md hover:bg-slate-700 transition-all duration-150"
                >
                  <span className="font-regular ">Pricing</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="flex flex-col items-center gap-1  p-2 rounded-md  hover:bg-slate-700 transition-all duration-150"
                >
                  <span className="font-regular ">
                    Testimonials
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="flex flex-col items-center gap-1  p-2 rounded-md  hover:bg-slate-700 transition-all duration-150"
                >
                  <span className="font-regular ">Blog</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        </div>

        <div className="w-full mt-8 border-t border-slate-600 dark:border-slate-300 flex items-center justify-between">
          <div className="py-4">
            <p className="text-sm text-slate-400 font-light">2025, TaskHub. All Right Reserved</p>
          </div>
          <div className="text-slate-400 font-light dark:text-slate-800 flex gap-5">
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy politics</a>
            <a href="/termsOfUse" target="_blank" rel="noopener noreferrer">Terms of Use</a>
          </div>
        </div>


      </div>
    </div>
  );
}
