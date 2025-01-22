import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function KnowledgeBasePage() {
	const router = useRouter();
	const { destination_id } = router.query;
	const [destination, setDestination] = useState({});
	const [knowledgeBases, setKnowledgeBases] = useState([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingKB, setEditingKB] = useState(null);
	const [content, setContent] = useState("");

	useEffect(() => {
		if (destination_id) {
			fetchDestination();
			fetchKnowledgeBases();
		}
	}, [destination_id]);

	const fetchDestination = async () => {
		const response = await fetch(`${BACKEND_URL}/destinations/${destination_id}`);
		const data = await response.json();
		setDestination(data);
	};

	const fetchKnowledgeBases = async () => {
		const response = await fetch(`${BACKEND_URL}/destinations/${destination_id}/knowledge_bases`);
		const data = await response.json();
		setKnowledgeBases(data);
	};

	const handleSave = async () => {
		const url = editingKB
			? `${BACKEND_URL}/knowledge_bases/${editingKB.id}`
			: `${BACKEND_URL}/destinations/${destination_id}/knowledge_bases`;

		const method = editingKB ? "PUT" : "POST";

		await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content, destination_id }),
		});

		setContent("");
		setEditingKB(null);
		setIsDialogOpen(false);
		fetchKnowledgeBases();
	};

	const handleDelete = async (id) => {
		await fetch(`${BACKEND_URL}/knowledge_bases/${id}`, { method: "DELETE" });
		fetchKnowledgeBases();
	};

	const openEditDialog = (kb) => {
		setEditingKB(kb);
		setContent(kb.content);
		setIsDialogOpen(true);
	};

	if (!destination_id) {
		return <p>Loading...</p>;
	}

	return (
		<TooltipProvider>
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">Knowledge base for {destination.name}</h1>

				{/* Create Button */}
				<Button onClick={() => setIsDialogOpen(true)}>Create Knowledge Base</Button>

				{/* Dialog */}
				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>
								{editingKB ? "Edit KnowledgeBase" : "Create KnowledgeBase"}
							</DialogTitle>
						</DialogHeader>
						<Textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Enter content"
							className="mb-4"
							rows="10"
						/>
						<div className="flex justify-end space-x-2">
							<Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
								Cancel
							</Button>
							<Button onClick={handleSave}>Save</Button>
						</div>
					</DialogContent>
				</Dialog>

				{/* KnowledgeBase Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
					{knowledgeBases.map((kb) => (
						<Card key={kb.id}>
							<CardHeader>
								<CardTitle>KnowledgeBase</CardTitle>
							</CardHeader>
							<CardContent>
								<p>{kb.content}</p>
								<div className="flex justify-end space-x-2 mt-4">
									{/* Edit Button */}
									<Tooltip>
										<TooltipTrigger>
											<Button variant="secondary" onClick={() => openEditDialog(kb)}>
												Edit
											</Button>
										</TooltipTrigger>
										<TooltipContent>Edit this knowledge base</TooltipContent>
									</Tooltip>

									{/* Delete Button */}
									<Tooltip>
										<TooltipTrigger>
											<Button variant="destructive" onClick={() => handleDelete(kb.id)}>
												Delete
											</Button>
										</TooltipTrigger>
										<TooltipContent>Delete this knowledge base</TooltipContent>
									</Tooltip>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</TooltipProvider>
	);
}
