import React, { useState } from "react";

const ProfileSection = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Satya Aman",
        email: "satya@example.com",
        mobile: "+91 9876543210",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const toggleEdit = () => setIsEditing(!isEditing);

    return (
        <div className="p-6 rounded-xl shadow-md bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">👤 Profile Information</h2>
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-200">
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={user.name}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-md border mt-1 ${
                            isEditing
                                ? "border-blue-400 bg-white dark:bg-gray-800"
                                : "border-transparent bg-transparent"
                        }`}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-md border mt-1 ${
                            isEditing
                                ? "border-blue-400 bg-white dark:bg-gray-800"
                                : "border-transparent bg-transparent"
                        }`}
                    />
                </div>
                <div>
                    <label>Mobile Number</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={user.mobile}
                        disabled={!isEditing}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 rounded-md border mt-1 ${
                            isEditing
                                ? "border-blue-400 bg-white dark:bg-gray-800"
                                : "border-transparent bg-transparent"
                        }`}
                    />
                </div>

                <div className="mt-4 flex justify-end">
                    {isEditing ? (
                        <>
                            <button
                                onClick={toggleEdit}
                                className="cursor-pointer px-4 py-2 rounded-md bg-gray-400 text-white hover:bg-gray-500 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    toggleEdit();

                                    console.log("Saved Profile:", user);
                                }}
                                className="cursor-pointer px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Save
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={toggleEdit}
                            className="cursor-pointer px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
