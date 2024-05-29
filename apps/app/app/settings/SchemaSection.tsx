"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Key as KeyType } from "@prisma/client";

export default function SchemaSection() {
  const [schema, setSchema] = useState<KeyType[]>([]);

  useEffect(() => {
    getSchema();
  }, []);

  async function getSchema() {
    const response = await fetch("/api/schema");
    const data = await response.json();
    setSchema(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schema</CardTitle>
        <CardDescription>Manage your schema</CardDescription>
      </CardHeader>
      <CardContent>
        <AddToSchema schema={schema} setSchema={setSchema} />
      </CardContent>
      <CardFooter>
        <CurrentSchema schema={schema} setSchema={setSchema} />
      </CardFooter>
    </Card>
  );
}

function AddToSchema({
  schema,
  setSchema,
}: {
  schema: KeyType[];
  setSchema: (schema: KeyType[]) => void;
}) {
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");

  const handleSubmit = async () => {
    if (!key || !description || !type || !priority) {
      return;
    }
    const response = await fetch("/api/schema", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, description, type, priority }),
    });
    if (response.ok) {
      const data = await response.json();
      setSchema([...schema, data]);
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder="Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
          <DropdownMenuItem onSelect={() => setType("string")}>
            string
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setType("number")}>
            number
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setType("boolean")}>
            boolean
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

function CurrentSchema({
  schema,
  setSchema,
}: {
  schema: KeyType[];
  setSchema: (schema: KeyType[]) => void;
}) {
  async function handleDelete(id: string) {
    const response = await fetch(`/api/schema`, {
      method: "DELETE",
      body: JSON.stringify({ key: id }),
    });
    if (response.ok) {
      setSchema(schema.filter((item) => item.id !== id));
    }
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="max-w-[150px]">key</TableHead>
          <TableHead className="max-w-[150px]">description</TableHead>
          <TableHead className="max-w-[150px]">priority</TableHead>
          <TableHead className="hidden md:table-cell">type</TableHead>
          <TableHead className="hidden md:table-cell">tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!schema.length ? (
          <TableRow>
            <TableCell>No data available</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        ) : (
          schema.map((item) => (
            <TableRow>
              <TableCell>{item.id}</TableCell>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell>{item.priority}</TableCell>
              <TableCell className="hidden md:table-cell">
                {item.type}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.tags ? item.tags.join(", ") : "-"}
              </TableCell>
              <TableCell>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
