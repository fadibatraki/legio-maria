import Link from "next/link";
import menuData from "./menuData";

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-side header-mark" aria-hidden="true">
        LM
      </div>

      <div className="header-title">
        <p>الليجيو ماريا - مصر</p>
        <Link href="/">دليل الليجيو ماريا</Link>
        <span>Legio Mariae - Egypt</span>
      </div>

      <nav className="header-side" aria-label="روابط الموقع">
        {menuData.map((item) => (
          <Link href={item.path || "/"} key={item.id}>
            {item.title}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
