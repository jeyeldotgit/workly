function Footer() {
    return (
        <footer className="mt-6 flex justify-center items-center gap-3 text-xs text-[#c2c6d7]">
          <a
            href="#switch-account"
            className="hover:text-[#e2e2e8] transition-colors"
          >
            Switch account
          </a>
          <span className="w-1 h-1 rounded-full bg-[#424654]" />
          <a
            href="#logout"
            className="hover:text-[#e2e2e8] transition-colors"
          >
            Log out
          </a>
        </footer>
    )
}

export default Footer;