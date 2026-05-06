"use client";

import React from "react";
import styles from "./dashboard.module.css";
import { 
  BsPeople, BsBriefcase, BsLayoutTextWindow, 
  BsPersonLinesFill, BsSearch, BsMegaphone 
} from "react-icons/bs";
import Link from "next/link";

const DashboardPage = () => {
  const stats = [
    { name: "Total Members", count: 9, icon: <BsPeople />, color: "#4e73df", path: "/admin/team" },
    { name: "Services", count: 7, icon: <BsBriefcase />, color: "#1cc88a", path: "/admin/services" },
    { name: "Recent Enquiries", count: 12, icon: <BsPersonLinesFill />, color: "#36b9cc", path: "/admin/enquiries" },
    { name: "Active Blogs", count: 5, icon: <BsLayoutTextWindow />, color: "#f6c23e", path: "/admin/blogs" },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <p className={styles.subtitle}>Welcome back! Here's an overview of your website performance.</p>

      <div className={styles.statsGrid}>
        {stats.map((stat) => (
          <Link href={stat.path} key={stat.name} className={styles.statCard}>
            <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className={styles.statInfo}>
              <h3>{stat.count}</h3>
              <p>{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.recentActivity}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <button className={styles.actionBtn}>Update Popup Image</button>
          <button className={styles.actionBtn}>Upload Testimonial Video</button>
          <button className={styles.actionBtn}>New Blog Post</button>
          <button className={styles.actionBtn}>Manage Users</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
