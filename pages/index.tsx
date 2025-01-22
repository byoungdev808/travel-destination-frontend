import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch destinations from the backend
  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    const response = await fetch(`${BACKEND_URL}/destinations`);
    const data = await response.json();
    setDestinations(data);
  }

  // Handle create and update
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      // Update existing destination
      await fetch(`${BACKEND_URL}/destinations/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    } else {
      // Create a new destination
      await fetch(`${BACKEND_URL}/destinations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
    }
    setName("");
    setEditingId(null);
    fetchDestinations();
  }

  // Handle delete
  async function handleDelete(id: string) {
    await fetch(`${BACKEND_URL}/destinations/${id}`, { method: "DELETE" });
    fetchDestinations();
  }

  // Handle edit
  function handleEdit(destination: any) {
    setName(destination.name);
    setEditingId(destination.id);
  }

  return (
    <main className="h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Destinations</h1>

        {/* Form for Create and Update */}
        <form onSubmit={handleSubmit} className="mb-6">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter destination name"
            className="mb-2"
            required
          />
          <Button type="submit" variant={editingId ? "secondary" : "default"}>
            {editingId ? "Update Destination" : "Add Destination"}
          </Button>
        </form>

        {/* List of Destinations */}
        <div className="grid grid-cols-1 gap-4">
          {destinations.map((dest: any) => (
            <Card key={dest.id}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/knowledgebase/${dest.id}`}>
                    {/* Navigate to KnowledgeBase page */}
                    {dest.name}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="secondary" onClick={() => handleEdit(dest)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(dest.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
