export default function Footer() {
  return (
    <footer className="py-12 bg-chalo-navy">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-lg font-bold tracking-tight text-white">
            Chalo<span className="text-chalo-green">.</span>
          </div>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Chalo. Built for campuses, by students.
          </p>
          <div className="flex gap-5">
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors duration-200">
              Twitter
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors duration-200">
              LinkedIn
            </a>
            <a href="#" className="text-xs text-white/40 hover:text-white transition-colors duration-200">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
