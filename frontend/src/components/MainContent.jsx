import React, { useEffect, useState } from "react";
import {
  fetchPartners,
  deletePartner,
  updatePartner,
  createPartner,
} from "../api"; // Make sure to import the createPartner API function

const MainContent = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPartner, setEditingPartner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Modal visibility for creating partner
  const [updatedData, setUpdatedData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    shiftStart: "",
    shiftEnd: "",
    metrics: { rating: 5, completedOrders: 0, cancelledOrders: 0 },
  });

  const [newPartnerData, setNewPartnerData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
    shiftStart: "",
    shiftEnd: "",
    metrics: { rating: 5, completedOrders: 0, cancelledOrders: 0 },
  });
  // Fetch partners from backend
  useEffect(() => {
    const loadPartners = async () => {
      try {
        const data = await fetchPartners();
        setPartners(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPartners();
  }, []);

  // Handle the deletion of a partner
  const handleDelete = async (id) => {
    try {
      await deletePartner(id);
      setPartners(partners.filter((partner) => partner._id !== id));
    } catch (error) {
      console.error("Error deleting partner:", error);
    }
  };

  const handleEdit = (partner) => {
    setEditingPartner(partner);
    setUpdatedData({
      name: partner.name,
      email: partner.email,
      phone: partner.phone,
      status: partner.status,
      shiftStart: partner.shift?.start || "", // Shift start time
      shiftEnd: partner.shift?.end || "", // Shift end time
      rating: partner.metrics?.rating || 5, // Default rating
      completedOrders: partner.metrics?.completedOrders || 0, // Default completed orders
      cancelledOrders: partner.metrics?.cancelledOrders || 0, // Default cancelled orders
    });
    setIsModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      if (updatedData.completedOrders < 0 || updatedData.cancelledOrders < 0) {
        alert("Completed and Cancelled Orders cannot be negative.");
        return;
      }

      const updatedPartner = await updatePartner(editingPartner._id, {
        ...updatedData,
        shift: {
          start: updatedData.shiftStart,
          end: updatedData.shiftEnd,
        },
        metrics: {
          rating: updatedData.rating,
          completedOrders: updatedData.completedOrders,
          cancelledOrders: updatedData.cancelledOrders,
        },
      });

      setPartners(
        partners.map((partner) =>
          partner._id === updatedPartner._id ? updatedPartner : partner
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating partner:", error);
    }
  };

  const handleCreate = async () => {
    try {
      if (
        newPartnerData.metrics.completedOrders < 0 ||
        newPartnerData.metrics.cancelledOrders < 0
      ) {
        alert("Completed and Cancelled Orders cannot be negative.");
        return;
      }

      const newPartner = await createPartner({
        ...newPartnerData,
        shift: {
          start: newPartnerData.shiftStart,
          end: newPartnerData.shiftEnd,
        },
        metrics: {
          rating: newPartnerData.metrics.rating,
          completedOrders: newPartnerData.metrics.completedOrders,
          cancelledOrders: newPartnerData.metrics.cancelledOrders,
        },
      });

      setPartners([...partners, newPartner]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating partner:", error);
    }
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-6">Partners</h1>

      {/* Button to open the Create Partner Modal */}
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Create Partner
      </button>

      {/* Loading State */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Shift Start</th>
                <th className="py-2 px-4 text-left">Shift End</th>
                <th className="py-2 px-4 text-left">Ratings</th>
                <th className="py-2 px-4 text-left">Completed orders</th>
                <th className="py-2 px-4 text-left">Cancelled orders</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.length > 0 ? (
                partners.map((partner) => (
                  <tr key={partner._id} className="border-b border-gray-300">
                    <td className="py-2 px-4">{partner.name}</td>
                    <td className="py-2 px-4">{partner.email}</td>
                    <td className="py-2 px-4">{partner.phone}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-3 py-1 rounded-full ${
                          partner.status === "active"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {partner.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{partner.shift?.start}</td>
                    <td className="py-2 px-4">{partner.shift?.end}</td>
                    <td className="py-2 px-4">
                      {partner.metrics?.rating || 5}
                    </td>
                    <td className="py-2 px-4">
                      {partner.metrics?.completedOrders || 0}
                    </td>
                    <td className="py-2 px-4">
                      {partner.metrics?.cancelledOrders || 0}
                    </td>

                    <td className="py-2 px-4">
                      {/* Edit Button */}
                      <button
                        className="px-3 py-1 text-white bg-blue-500 rounded-md mr-2"
                        onClick={() => handleEdit(partner)}
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="px-3 py-1 text-white bg-red-500 rounded-md"
                        onClick={() => handleDelete(partner._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-4 text-center">
                    No partners available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Creating Partner */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Create Partner</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.name}
              onChange={(e) =>
                setNewPartnerData({ ...newPartnerData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.email}
              onChange={(e) =>
                setNewPartnerData({ ...newPartnerData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.phone}
              onChange={(e) =>
                setNewPartnerData({ ...newPartnerData, phone: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.status}
              onChange={(e) =>
                setNewPartnerData({ ...newPartnerData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="time"
              placeholder="Shift Start"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.shiftStart}
              onChange={(e) =>
                setNewPartnerData({
                  ...newPartnerData,
                  shiftStart: e.target.value,
                })
              }
            />
            <input
              type="time"
              placeholder="Shift End"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.shiftEnd}
              onChange={(e) =>
                setNewPartnerData({
                  ...newPartnerData,
                  shiftEnd: e.target.value,
                })
              }
            />
            <input
              type="number"
              placeholder="Rating (0 to 5)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.metrics.rating}
              onChange={(e) => {
                const value = Math.max(0, Math.min(5, Number(e.target.value)));
                setNewPartnerData({
                  ...newPartnerData,
                  metrics: {
                    ...newPartnerData.metrics,
                    rating: value,
                  },
                });
              }}
            />
            <input
              type="number"
              placeholder="Completed Orders (>= 0)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.metrics.completedOrders}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value)); // Ensure value is >= 0
                setNewPartnerData({
                  ...newPartnerData,
                  metrics: {
                    ...newPartnerData.metrics,
                    completedOrders: value,
                  },
                });
              }}
            />
            <input
              type="number"
              placeholder="Cancelled Orders (>= 0)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newPartnerData.metrics.cancelledOrders}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value)); // Ensure value is >= 0
                setNewPartnerData({
                  ...newPartnerData,
                  metrics: {
                    ...newPartnerData.metrics,
                    cancelledOrders: value,
                  },
                });
              }}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Partner */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Edit Partner</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.email}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.phone}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, phone: e.target.value })
              }
            />
            <select
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.status}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              type="text"
              placeholder="Shift Start (HH:mm)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.shiftStart}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, shiftStart: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Shift End (HH:mm)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.shiftEnd}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, shiftEnd: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Rating (0 to 5)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.rating}
              onChange={(e) => {
                const value = Math.max(0, Math.min(5, Number(e.target.value))); // Ensure value is between 0 and 5
                setUpdatedData({ ...updatedData, rating: value });
              }}
            />
            <input
              type="number"
              placeholder="Completed Orders (>= 0)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.completedOrders}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value)); // Ensure value is >= 0
                setUpdatedData({ ...updatedData, completedOrders: value });
              }}
            />
            <input
              type="number"
              placeholder="Cancelled Orders (>= 0)"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={updatedData.cancelledOrders}
              onChange={(e) => {
                const value = Math.max(0, Number(e.target.value)); // Ensure value is >= 0
                setUpdatedData({ ...updatedData, cancelledOrders: value });
              }}
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default MainContent;
