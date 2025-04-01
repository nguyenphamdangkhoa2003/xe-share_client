"use client";
import { useEffect, useState } from "react";
import { User, columns } from "./columns"
import { DataTable } from "./data-table"
async function getData(): Promise<User[]> {

  return [
    {
      avatar:"/images/avatar.png",
      name:"tuan",
      email: "m@example.com",
    },
{
      avatar:"/images/avatar.png",
      name:"trị",
      email: "hehehm@example.com",
    },
  ]
}
function UsersPage() {
    const [data, setData] = useState<User[]>([]);

    useEffect(() => {
        async function fetchData() {
            const users = await getData();
            setData(users);
        }
        fetchData();
    }, []);
    return (
        <div className="p-3">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                The People of the Kingdom
            </h2>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default UsersPage;
