function Footer() {
  return (
    <footer className="border-t border-surface-container-highest bg-surface-container-lowest py-12 px-margin-page mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-stack-default">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">
            task_alt
          </span>
          <span className="font-label-md text-label-md font-bold text-on-surface">
            Workly
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant ml-4">
            © 2024 Workly Inc.
          </span>
        </div>
        <div className="flex items-center gap-gutter font-label-sm text-label-sm text-on-surface-variant">
          <a className="hover:text-on-surface transition-colors" href="#">
            Features
          </a>
          <a className="hover:text-on-surface transition-colors" href="#">
            Pricing
          </a>
          <a className="hover:text-on-surface transition-colors" href="#">
            Status
          </a>
          <a className="hover:text-on-surface transition-colors" href="#">
            Twitter
          </a>
          <a className="hover:text-on-surface transition-colors" href="#">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
