"use client";

import React, { useState, useEffect } from "react";
import styles from "./team.module.css";
import { BsPlus, BsPencil, BsTrash, BsImage } from "react-icons/bs";
import Image from "next/image";

const TeamAdminPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState({ title: "", description: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      setTeam(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching team:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PUT" : "POST";
    try {
      const res = await fetch("/api/admin/team", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentMember),
      });
      if (res.ok) {
        fetchTeam();
        closeModal();
      }
    } catch (error) {
      console.error("Error saving member:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch("/api/admin/team", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchTeam();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const openModal = (member = { title: "", description: "", image: "" }) => {
    setCurrentMember(member);
    setIsEditing(!!member.id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentMember({ title: "", description: "", image: "" });
    setIsEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Management Team</h1>
        <button className={styles.addBtn} onClick={() => openModal()}>
          <BsPlus /> Add Member
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member) => (
                <tr key={member.id}>
                  <td>
                    <div className={styles.tableImg}>
                      <Image src={member.image || "/placeholder.webp"} alt={member.title} width={50} height={50} />
                    </div>
                  </td>
                  <td>{member.title}</td>
                  <td>{member.description}</td>
                  <td className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => openModal(member)}>
                      <BsPencil />
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(member.id)}>
                      <BsTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{isEditing ? "Edit Member" : "Add New Member"}</h2>
            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input 
                  type="text" 
                  value={currentMember.title} 
                  onChange={(e) => setCurrentMember({...currentMember, title: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Role</label>
                <input 
                  type="text" 
                  value={currentMember.description} 
                  onChange={(e) => setCurrentMember({...currentMember, description: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Image URL</label>
                <div className={styles.urlInput}>
                  <input 
                    type="text" 
                    value={currentMember.image} 
                    onChange={(e) => setCurrentMember({...currentMember, image: e.target.value})}
                    placeholder="/about/member.webp"
                    required 
                  />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.submitBtn}>{isEditing ? "Update" : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAdminPage;
