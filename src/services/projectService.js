import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ===============================
// Save Project
// ===============================

export async function saveProject(project) {
  const docRef = await addDoc(collection(db, "projects"), {
    ...project,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

// ===============================
// Get All Projects
// ===============================

export async function getProjects() {
  const snapshot = await getDocs(collection(db, "projects"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ===============================
// Get One Project
// ===============================

export async function getProject(id) {
  const ref = doc(db, "projects", id);

  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// ===============================
// Update Project
// ===============================

export async function updateProject(id, data) {
  const ref = doc(db, "projects", id);

  await updateDoc(ref, {
    ...data,
  });
}

// ===============================
// Delete Project
// ===============================

export async function deleteProject(id) {
  await deleteDoc(doc(db, "projects", id));
}