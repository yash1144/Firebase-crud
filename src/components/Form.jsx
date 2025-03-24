import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    gender: "",
    hobby: [],
  });
  const [records, setRecords] = useState([]);
  const [index, setIndex] = useState("");

  const value = collection(db, "records");

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const dbvalue = await getDocs(value);
    setRecords(dbvalue.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const getinput = (e) => {
    let { name, value, type, checked } = e.target;
    setFormData((prev) => {
      if (name === "hobby") {
        return {
          ...prev,
          hobby: checked ? [...prev.hobby, value] : prev.hobby.filter((h) => h !== value),
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const submit = async () => {
    const { name, email, password, city, gender, hobby } = formData;
    if (name && email && password && city && gender && hobby.length) {
      if (index) {
        const userDoc = doc(db, "records", index);
        await updateDoc(userDoc, formData);
        toast.success("User Updated Successfully");
        setIndex("");
      } else {
        await addDoc(value, formData);
        toast.success("User Added Successfully");
      }
      setFormData({ name: "", email: "", password: "", city: "", gender: "", hobby: [] });
      getdata();
    } else {
      toast.error("Please fill all fields");
    }
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "records", id);
    await deleteDoc(userDoc);
    getdata();
  };

  const updateUser = async (id) => {
    const userDoc = doc(db, "records", id);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      setFormData(userSnap.data());
      setIndex(id);
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className="container">
      <h3>User Form</h3>
      <input type="text" placeholder="Enter name" name="name" onChange={getinput} value={formData.name} />
      <input type="email" placeholder="Enter email" name="email" onChange={getinput} value={formData.email} />
      <input type="password" placeholder="Enter password" name="password" onChange={getinput} value={formData.password} />

      <select name="city" onChange={getinput} value={formData.city}>
        <option value="">Select City</option>
        <option value="Surat">Surat</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Ahmedabad">Ahmedabad</option>
      </select>

      <div className="radio-group">
        <label>
          <input type="radio" name="gender" value="male" onChange={getinput} checked={formData.gender === "male"} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" onChange={getinput} checked={formData.gender === "female"} />
          Female
        </label>
      </div>

      <div className="checkbox-group">
        <label>
          <input type="checkbox" name="hobby" value="Reading" onChange={getinput} checked={formData.hobby.includes("Reading")} />
          Reading
        </label>
        <label>
          <input type="checkbox" name="hobby" value="Traveling" onChange={getinput} checked={formData.hobby.includes("Traveling")} />
          Traveling
        </label>
        <label>
          <input type="checkbox" name="hobby" value="Gaming" onChange={getinput} checked={formData.hobby.includes("Gaming")} />
          Gaming
        </label>
      </div>

      <button onClick={submit}>{index ? "Update" : "Add"}</button>

      <h3>User Records</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Gender</th>
            <th>Hobbies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((doc, i) => (
              <tr key={doc.id}>
                <td>{i + 1}</td>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.city}</td>
                <td>{doc.gender}</td>
                <td>{doc.hobby.join(", ")}</td>
                <td>
                  <button onClick={() => updateUser(doc.id)}>Update</button>
                  <button onClick={() => deleteUser(doc.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default Form;
