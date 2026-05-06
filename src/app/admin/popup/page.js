"use client";

import React, { useState, useEffect } from "react";
import styles from "./popup.module.css";
import Image from "next/image";
import { BsUpload, BsTrash, BsCheckCircle, BsXCircle } from "react-icons/bs";

const PopupAdminPage = () => {
  const [popup, setPopup] = useState({ active: false, image: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from an API
    setPopup({ active: true, image: "/Untitled-7.jpg" });
    setLoading(false);
  }, []);

  const handleToggle = () => {
    setPopup({ ...popup, active: !popup.active });
    // Save to API
  };

  const handleUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Logic for uploading file to server
      alert("Image upload logic would go here. For now, we update the state.");
      setPopup({ ...popup, image: URL.createObjectURL(file) });
    }
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete the popup image?")) {
      setPopup({ ...popup, image: "", active: false });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popup Management</h1>
      <p className={styles.subtitle}>Control the promotional popup displayed to your visitors.</p>

      <div className={styles.card}>
        <div className={styles.statusRow}>
          <span>Status: <strong>{popup.active ? "Active" : "Inactive"}</strong></span>
          <button 
            className={`${styles.toggleBtn} ${popup.active ? styles.btnActive : styles.btnInactive}`}
            onClick={handleToggle}
          >
            {popup.active ? <BsCheckCircle /> : <BsXCircle />}
            {popup.active ? "Disable Popup" : "Enable Popup"}
          </button>
        </div>

        <div className={styles.imagePreview}>
          <div className={styles.previewBox}>
            {popup.image ? (
              <Image src={popup.image} alt="Popup Preview" width={400} height={400} className={styles.img} />
            ) : (
              <div className={styles.placeholder}>No image selected</div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <label className={styles.uploadLabel}>
            <BsUpload /> Update Image
            <input type="file" onChange={handleUpdate} hidden />
          </label>
          <button className={styles.deleteBtn} onClick={handleDelete} disabled={!popup.image}>
            <BsTrash /> Delete Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupAdminPage;
