"use client"

import { useEffect, useState } from "react"

type User = {
    id: string;
    name: string;
    email: string;
    role: "User" | "Admin";
  };

export default function AdminDashboard () {

    const [users , setUsers] = useState<User[]>([]);

    useEffect( () =>{
        
        const fetchUser = async () => {
            const res = await fetch('/api/allUsers');
            const data = await res.json();
            setUsers(data);
        }
        
        fetchUser();

    } , [])


    return (

        <div>
            <h2>Users</h2>
            <ul>
                {users.map((user , i) =>(
                    <li key={i}>{user.name}</li>
                ))}
            </ul>
        </div>

    )

}