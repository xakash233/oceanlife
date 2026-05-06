"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BsGrid, BsPeople, BsImages, BsGear, BsChatLeftText, 
  BsBriefcase, BsLayoutTextWindow, BsSearch, BsPersonLinesFill,
  BsBoxArrowRight, BsMegaphone
} from "react-icons/bs";
import styles from "./admin.module.css";
import Image from "next/image";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  // Hide sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <BsGrid /> },
    { name: "User Management", path: "/admin/users", icon: <BsPeople /> },
    { name: "Popup Management", path: "/admin/popup", icon: <BsMegaphone /> },
    { name: "Testimonials", path: "/admin/testimonials", icon: <BsChatLeftText /> },
    { name: "Services", path: "/admin/services", icon: <BsBriefcase /> },
    { name: "Blogs", path: "/admin/blogs", icon: <BsLayoutTextWindow /> },
    { name: "Enquiries", path: "/admin/enquiries", icon: <BsPersonLinesFill /> },
    { name: "SEO Management", path: "/admin/seo", icon: <BsSearch /> },
    { name: "Management Team", path: "/admin/team", icon: <BsGear /> },
  ];

  return (
    <div className={styles.adminWrapper}>
      <aside className={`${styles.sidebar} ${isSidebarOpen ? "" : styles.sidebarClosed}`}>
        <div className={styles.sidebarHeader}>
          <Image src="/logo.webp" alt="Logo" width={150} height={50} className={styles.logo} />
        </div>
        
        <nav className={styles.nav}>
          {menuItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navLink} ${pathname === item.path ? styles.active : ""}`}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.linkText}>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={() => window.location.href = "/admin/login"}>
            <BsBoxArrowRight />
            <span className={styles.linkText}>Logout</span>
          </button>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <button className={styles.toggleBtn} onClick={() => setSidebarOpen(!isSidebarOpen)}>
            ☰
          </button>
          <div className={styles.userInfo}>
            <span>Welcome, Admin</span>
          </div>
        </header>
        <div className={styles.pageContent}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
