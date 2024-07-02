"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus, RotateCcw } from "lucide-react";
import { useState } from "react";
import { Key as KeyType } from "@repo/database/prisma";

export default function SchemaInput({
	schema,
	setSchema,
	getSchema,
	isLoading,
}: {
	schema: KeyType[];
	setSchema: (schema: KeyType[]) => void;
	getSchema: () => void;
	isLoading: boolean;
}) {
	const [id, setId] = useState("");
	const [description, setDescription] = useState("");
	const [type, setType] = useState("");
	const [priority, setPriority] = useState("");
	const [tags, setTags] = useState<string[]>([]);

	const handleSubmit = async () => {
		if (!id || !description || !type || !priority) {
			return;
		}
		const response = await fetch("/api/schema", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, description, type, priority, tags }),
		});
		if (response.ok) {
			const data = await response.json();
			setSchema([...schema, data]);
			setId("");
			setDescription("");
			setType("");
			setPriority("");
			setTags([]);
		}
	};

	return (
		<div className="hidden md:flex flex-row gap-2">
			<Button onClick={getSchema} variant={"outline"}>
				<RotateCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
			</Button>
			<Input
				placeholder="Name"
				value={id}
				onChange={(e) => setId(e.target.value)}
			/>
			<Input
				placeholder="Description"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<Input
				placeholder="Tags"
				value={tags.join(",")}
				onChange={(e) => setTags(e.target.value.split(","))}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"secondary"} className="flex flex-row gap-2">
						<ChevronDown className="h-4 w-4" />
						{priority || "Priority"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onSelect={() => setPriority("REQUIRED")}>
						REQUIRED
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setPriority("HIGH")}>
						HIGH
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setPriority("MEDIUM")}>
						MEDIUM
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setPriority("LOW")}>
						LOW
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setPriority("VERY_LOW")}>
						VERY LOW
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"secondary"} className="flex flex-row gap-2">
						<ChevronDown className="h-4 w-4" />
						{type || "Type"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onSelect={() => setType("TEXT")}>
						Text
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setType("NUMBER")}>
						Number
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setType("BOOLEAN")}>
						Boolean
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Button className="flex flex-row gap-2" onClick={handleSubmit}>
				<Plus className="h-4 w-4" />
				Add Field
			</Button>
		</div>
	);
}
