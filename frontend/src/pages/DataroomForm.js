import React, { useState, useEffect } from "react";
import { createDataroom, getDataroom, updateDataroom } from "../api";
import { useNavigate, useParams } from "react-router-dom";
export default function DataroomForm() {
  const [form, setForm] = useState({ title: "", description: "", file: null });
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getDataroom(id).then(data => setForm({ ...data, file: null }));
    }
  }, [id]);
  const submit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.file) formData.append("file", form.file);
    id ? await updateDataroom(id, formData) : await createDataroom(formData);
    navigate("/dataroom");
  };
  return (
    <div style={{ padding: '100px 0' }} className="container">
      <h3 className="n-list" style={{ fontWeight: 'bold', fontSize: 56, marginBottom: 50, textAlign: "center" }}>{id ? "자료 수정" : "자료 등록"}</h3>
      <form style={{ marginTop: 50 }} onSubmit={submit}>
        <table className="table" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <tbody>
            <tr>
              <th
                style={{
                  width: 180,
                  verticalAlign: "middle",
                  border: 0,
                  paddingBottom: 20,
                }}
              >
                <label htmlFor="title" className="form-label mb-0">
                  제목
                </label>
              </th>
              <td style={{ border: 0, paddingBottom: 20 }}>
                <input
                  style={{ borderRadius: "0" }}
                  type="text"
                  name="title"
                  className="form-control"
                  id="title"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  required
                />
              </td>
            </tr>
            <tr>
              <th
                style={{
                  verticalAlign: "middle",
                  border: 0,
                  paddingBottom: 20,
                }}
              >
                <label htmlFor="description" className="form-label mb-0">
                  설명
                </label>
              </th>
              <td style={{ border: 0, paddingBottom: 20 }}>
                <textarea
                  style={{ borderRadius: "0" }}
                  className="form-control"
                  name="description"
                  id="description"
                  rows="6"
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  required
                ></textarea>
              </td>
            </tr>
            <tr>
              <th
                style={{
                  verticalAlign: "middle",
                  border: 0,
                  paddingBottom: 20,
                }}
              >
                <label htmlFor="file" className="form-label mb-0">
                  파일
                </label>
              </th>
              <td style={{ border: 0 }}>
                <input
                  style={{ borderRadius: "0" }}
                  type="file"
                  name="file"
                  className="form-control"
                  id="file"
                  onChange={e => setForm({ ...form, file: e.target.files[0] })}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <button
            type="submit"
            style={{ backgroundColor: "#002c5f", borderRadius: 0 }}
            className="btn btn-dark px-5"
          >
            {id ? "수정" : "등록"}
          </button>
        </div>
      </form>

    </div>
  );
}