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
  const [editingValue, setEditingValue] = useState("");


  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    const response = await fetch(`${BACKEND_URL}/destinations`);
    const data = await response.json();
    setDestinations(data);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name.trim() === "") return;

    await fetch(`${BACKEND_URL}/destinations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchDestinations();
  }

  async function handleSave(id: string, updatedName: string) {
    if (updatedName.trim() === "") return;

    await fetch(`${BACKEND_URL}/destinations/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: updatedName }),
    });
    setEditingId(null)
    fetchDestinations();
  }

  function handleEdit(destination: any) {
    setEditingId(destination.id);
    setEditingValue(destination.name);
  }

  async function handleDelete(id: string) {
    await fetch(`${BACKEND_URL}/destinations/${id}`, { method: "DELETE" });
    fetchDestinations();
  }

  return (
    <main className="h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Destinations</h1>

        {/* Form for Adding New Destination */}
        <form onSubmit={handleSubmit} className="mb-6">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter destination name"
            className="mb-2"
            required
          />
          <Button type="submit" variant="default">
            Add Destination
          </Button>
        </form>

        {/* List of Destinations */}
        <div className="grid grid-cols-1 gap-4">
          {destinations.map((dest: any) => (
            <Card key={dest.id}>
              <CardHeader>
                <CardTitle>
                  {editingId === dest.id ? (
                    <Input
                      type="text"
                      value={editingValue}
                      onChange={(e) => setEditingValue(e.target.value)}
                      onBlur={() => handleSave(dest.id, editingValue)} // Save on blur
                      autoFocus
                      className="border border-gray-300 p-2 rounded"
                    />
                  ) : (
                    <Link href={`/knowledgebase/${dest.id}`}>
                      <span className="underline">{dest.name}</span>
                    </Link>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => handleEdit(dest)}
                    disabled={editingId === dest.id}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(dest.id)}
                    disabled={editingId === dest.id}
                  >
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