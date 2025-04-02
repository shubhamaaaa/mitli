import React, { useEffect, useState } from "react";
import axios from "axios";

const ReferrelCount = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchuserRefreels();
    }, []);

    const fetchuserRefreels = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/auth/alluser");
            console.log("API Response:", response.data);  
            
            
            setUsers(Array.isArray(response.data.Users) ? response.data.Users : []);
            
        } catch (error) {
            console.error("Failed to fetch userRefreels", error);
            setUsers([]); 
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Admin Panel - Referrels
            </h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading subscribers...</p>
            ) : users.length === 0 ? (
                <p className="text-center text-gray-500">No subscribers found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-left">
                                <th className="p-3 border-b">Email</th>
                                <th className="p-3 border-b">Mobile</th>
                                <th className="p-3 border-b">Referral Code</th>
                                <th className="p-3 border-b">Referral Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    
                                >
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.mobile}</td>
                                    <td className="p-3">{user.referralCode}</td>
                                    <td className="p-3">{user.
totalreferral}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReferrelCount;
