import Logo from "@/src/components/logo";

const navItems = ["Solutions", "Customers", "Company"];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-[#e4e4e7] bg-[#fafafa] flex items-center">
      <div className="max-w-[1200px] mx-auto w-full px-2 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[#52525b] hover:text-[#18181b] font-medium text-sm transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-[34px] flex items-center justify-center px-4 cursor-pointer transition-all bg-[#fafafa] border border-[#fff] rounded-[6px] shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_4px_0px_rgba(9,9,11,0.04)] hover:shadow-[0px_0px_0px_1px_rgba(9,9,11,0.08),0px_1px_2px_-1px_rgba(9,9,11,0.08),0px_2px_8px_0px_rgba(9,9,11,0.1)]">
            <div className="text-[#18181b] font-medium text-sm">Sign in</div>
          </div>
          <div
            className="h-[34px] flex items-center justify-center px-4 cursor-pointer transition-all bg-[#27272a] hover:bg-[#3f3f46] rounded-[6px]"
            style={{
              boxShadow:
                "0px 0.75px 0px 0px rgba(255,255,255,0.2) inset,0px 1px 2px 0px rgba(0,0,0,0.4),0px 0px 0px 1px rgba(24,24,27,1)",
            }}
          >
            <div className="text-white/88 font-medium text-sm">Get a demo</div>
          </div>
        </div>
      </div>
    </header>
  );
}
