import React, { useState, useEffect } from "react";
import { createNotice, getNotice, updateNotice } from "../api";
import { useNavigate, useParams } from "react-router-dom";

function NoticeForm() {
  const [form, setForm] = useState({ title: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getNotice(id).then(data => setForm({ title: data.title, content: data.content }));
    }
  }, [id]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (id) {
      await updateNotice(id, form);
    } else {
      await createNotice(form);
    }
    navigate("/adminnotice");
  };

  return (
    <div style={{width:'100%', maxWidth:1200, marginBottom:100}} className="container mt-4">
      <h2 style={{textAlign:'center', marginTop:100, fontSize:56, fontWeight:'bold', marginBottom:0}} className="n-list mb-4">{id ? "공지사항 수정" : "공지사항 등록"}</h2>
      <form style={{ marginTop: 50 }} onSubmit={handleSubmit}>
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
                  onChange={handleChange}
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
                <label htmlFor="content" className="form-label mb-0">
                  내용
                </label>
              </th>
              <td style={{ border: 0 }}>
                <textarea
                  style={{ borderRadius: "0" }}
                  className="form-control"
                  name="content"
                  id="content"
                  rows="6"
                  value={form.content}
                  onChange={handleChange}
                  required
                ></textarea>
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

export default NoticeForm;
