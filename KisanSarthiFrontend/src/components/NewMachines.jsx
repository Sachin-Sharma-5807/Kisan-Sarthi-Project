// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import FormData from "form-data";

// const API_BASE = "http://localhost:8000/api";

// const NewMachineManager = ({ vendorId }) => {
//   const [machines, setMachines] = useState([]);
//   const [form, setForm] = useState({
//     MachineName: "",
//     MachineType: "",
//     CompanyName: "",
//     MachinePrice: "",
//     MachineDescription: "",
//     MachineImages: [],
//   });
//   const [editingId, setEditingId] = useState(null);

//   const fetchMachines = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/machines/new/all?VendorID=${vendorId}`);
//       setMachines(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch machines");
//     }
//   };

//   useEffect(() => {
//     fetchMachines();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     setForm((prev) => ({ ...prev, MachineImages: [...e.target.files] }));
//   };

//   const resetForm = () => {
//     setForm({
//       MachineName: "",
//       MachineType: "",
//       CompanyName: "",
//       MachinePrice: "",
//       MachineDescription: "",
//       MachineImages: [],
//     });
//     setEditingId(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     Object.entries(form).forEach(([key, value]) => {
//       if (key === "MachineImages") {
//         value.forEach((file) => fd.append("MachineImages", file));
//       } else {
//         fd.append(key, value);
//       }
//     });
//     fd.append("VendorID", vendorId);

//     try {
//       if (editingId) {
//         const res = await axios.put(`${API_BASE}/machines/new/update/${editingId}`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success(res.data.message || "Machine updated!");
//       } else {
//         const res = await axios.post(`${API_BASE}/machines/new/add-new-machine`, fd, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         toast.success("Machine added successfully!");
//       }

//       fetchMachines();
//       resetForm();
//     } catch (err) {
//       console.error(err);
//       toast.error("Operation failed");
//     }
//   };

//   const handleEdit = (machine) => {
//     setForm({
//       MachineName: machine.MachineName,
//       MachineType: machine.MachineType,
//       CompanyName: machine.CompanyName,
//       MachinePrice: machine.MachinePrice,
//       MachineDescription: machine.MachineDescription,
//       MachineImages: [],
//     });
//     setEditingId(machine.MachineID);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/machines/new/delete/${id}`);
//       toast.success("Machine deleted!");
//       fetchMachines();
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed");
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h3 className="text-success mb-4">{editingId ? "Edit" : "Add"} New Machine</h3>

//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <div className="row g-3">
//           <div className="col-md-6">
//             <input
//               type="text"
//               name="MachineName"
//               className="form-control"
//               placeholder="Machine Name"
//               value={form.MachineName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="text"
//               name="MachineType"
//               className="form-control"
//               placeholder="Machine Type"
//               value={form.MachineType}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="text"
//               name="CompanyName"
//               className="form-control"
//               placeholder="Company Name"
//               value={form.CompanyName}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-md-6">
//             <input
//               type="number"
//               name="MachinePrice"
//               className="form-control"
//               placeholder="Price"
//               value={form.MachinePrice}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="col-12">
//             <textarea
//               name="MachineDescription"
//               className="form-control"
//               placeholder="Machine Description"
//               value={form.MachineDescription}
//               onChange={handleInputChange}
//               rows={3}
//               required
//             />
//           </div>
//           <div className="col-12">
//             <input
//               type="file"
//               multiple
//               className="form-control"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//           </div>
//           <div className="col-12">
//             <button type="submit" className="btn btn-success">
//               {editingId ? "Update" : "Add"} Machine
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 className="btn btn-secondary ms-2"
//                 onClick={resetForm}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </div>
//       </form>

//       <hr className="my-5" />

//       <h4 className="text-success">Your Machines</h4>
//       {machines.length === 0 ? (
//         <p>No machines found</p>
//       ) : (
//         <div className="row mt-3">
//           {machines.map((m) => (
//             <div key={m.MachineID} className="col-md-4">
//               <div className="card mb-4 shadow-sm">
//                 {m.MachineImage && (
//                   <img
//                     src={m.MachineImage}
//                     className="card-img-top"
//                     alt={m.MachineName}
//                     style={{ height: "200px", objectFit: "cover" }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{m.MachineName}</h5>
//                   <p className="card-text">
//                     <strong>Type:</strong> {m.MachineType} <br />
//                     <strong>Company:</strong> {m.CompanyName} <br />
//                     <strong>Price:</strong> ₹{m.MachinePrice}
//                   </p>
//                   <div className="d-flex justify-content-between">
//                     <button
//                       className="btn btn-sm btn-outline-success"
//                       onClick={() => handleEdit(m)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-outline-danger"
//                       onClick={() => handleDelete(m.MachineID)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewMachineManager;
