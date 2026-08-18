import horizontalIcon from "../../../../assets/horizontal-transparent-darkUI@2x.png";

function Header() {
  return (
    <>
      {/* Header */}
      <header className="flex flex-col items-center text-center mb-6">
        <div className="font-semibold text-[#e2e2e8] tracking-tight mb-1">
          <img src={horizontalIcon} alt="worklyIcon" />
        </div>
        <h2 className="text-lg font-semibold text-[#e2e2e8] mt-2">
          Select your workspace
        </h2>
        <p className="text-sm text-[#c2c6d7] mt-1">
          Choose a team to continue or create a new one.
        </p>
      </header>
    </>
  );
}

export default Header;
