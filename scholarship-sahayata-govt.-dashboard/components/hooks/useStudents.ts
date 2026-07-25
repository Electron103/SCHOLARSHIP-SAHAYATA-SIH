import { useEffect, useState } from "react";
import { STUDENTS_WITH_LOGIN_API, STUDENTS_API } from "../api";

export default function useStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      // Try the joined endpoint first
      let res = await fetch(STUDENTS_WITH_LOGIN_API);
      if (!res.ok) {
        // fallback to older endpoint if joined not available
        res = await fetch(STUDENTS_API);
      }
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const data = await res.json();
      // normalize shape: if API returns { students: [...] } or direct array
      const list = Array.isArray(data) ? data : data.students || [];
      setStudents(list);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load students";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return { students, loading, error, reload: load };
}
