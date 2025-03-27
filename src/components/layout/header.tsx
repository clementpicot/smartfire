import LanguaugeSelector from "./languauge-selector";
import MainNav from "./main-nav";

export default function Header() {
  return (
    <header className="relative">
      <div className="h-9 bg-accent px-6 md:px-10 flex items-center">
        <div className="ml-auto">
          <LanguaugeSelector />
        </div>
      </div>
      <MainNav />
    </header>
  );
}
