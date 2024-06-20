import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Pencil } from "lucide-react";
import { useState } from "react";
import { Key as KeyType } from "@prisma/client";

export default function EditSchemaButton({
  item,
  onSuccess,
}: {
  item: KeyType;
  onSuccess: (data: KeyType) => void;
}) {
  const [description, setDescription] = useState(item.description);
  const [type, setType] = useState(item.type);
  const [priority, setPriority] = useState(item.priority);
  const [tags, setTags] = useState(item.tags);

  const handleSubmit = async () => {
    if (!description || !type || !priority) {
      return;
    }
    const response = await fetch("/api/schema", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: item.id, description, type, priority, tags }),
    });
    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>
          <Pencil className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit {item.id}</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col gap-2">
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
          <div className="flex flex-row gap-2">
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
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
