"use client";

import Image from "next/image";
import Styles from "./Footer.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer1 from "./Footer1";

function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className={Styles.sectionFooter}>
      <div className="container">
        <div className={Styles.rowFooter}>
          <div className={Styles.columnFooter}>
            <Link href={"https://www.olipl.com/"}>
              <Image
                width={200}
                height={100}
                src="/foot-logo.webp"
                alt="image"
              />
            </Link>
          </div>
          <Footer1 />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
