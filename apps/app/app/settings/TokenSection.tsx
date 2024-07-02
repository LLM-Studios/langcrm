"use client";

import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { Plus, Copy, Trash2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Token } from "@repo/database/prisma";
import { Input } from "@/components/ui/input";

export default function TokenSection({ ...props }) {
	const [tokens, setTokens] = useState<Token[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getToken();
	}, []);

	async function getToken() {
		setIsLoading(true);
		const response = await fetch("api/token");
		if (!response.ok) {
			setIsLoading(false);
			throw new Error("Error getting token");
		}
		const data = await response.json();
		if (data.tokens) {
			setTokens(data.tokens);
		}
		setIsLoading(false);
	}

	async function postToken() {
		setIsLoading(true);
		const response = await fetch("api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			setIsLoading(false);
			throw new Error("Error generating token");
		}
		const data = await response.json();
		setTokens([...tokens, data]);
		setIsLoading(false);
	}

	function copyToken(token: string) {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(token).catch((err: Error) => {
				throw new Error("Error copying token to clipboard", err);
			});
		} else {
			console.error("Clipboard API not available");
		}
	}

	async function deleteToken(token: Token) {
		setIsLoading(true);
		const response = await fetch("api/token", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			setIsLoading(false);
			throw new Error("Error deleting token");
		}
		setTokens(tokens.filter((t) => t.id !== token.id));
		setIsLoading(false);
	}

	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle>Token</CardTitle>
				<CardDescription>Your API token</CardDescription>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<div className="flex justify-center items-center h-24 w-full">
						<Loader2 className="h-8 w-8 animate-spin" />
					</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="max-w-[150px]">token</TableHead>
								<TableHead className="max-w-[150px]">created at</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{!tokens.length ? (
								<TableRow>
									<TableCell>No data available</TableCell>
									<TableCell>-</TableCell>
								</TableRow>
							) : (
								tokens.map((item, i) => {
									return (
										<TableRow key={i}>
											<TableCell className="font-medium">
												Ends with *{item.value.slice(-4)}
											</TableCell>
											<TableCell className="hidden md:table-cell">
												{new Date(item.createdAt).toLocaleString("en-US", {
													year: "numeric",
													month: "short",
													day: "numeric",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</TableCell>
											<TableCell className="flex flex-row gap-2 justify-end">
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button variant={"destructive"}>
															<Trash2 className="h-4 w-4" />
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>Are you sure?</AlertDialogTitle>
															<AlertDialogDescription>
																This action cannot be undone.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Cancel</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => deleteToken(item)}
															>
																Confirm
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</TableCell>
										</TableRow>
									);
								})
							)}
						</TableBody>
					</Table>
				)}
			</CardContent>
			<CardFooter className="flex flex-row gap-4 border-t p-6">
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button
							className="flex flex-row gap-2"
							onClick={postToken}
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader2 className="h-4 w-4" />
							) : (
								<Plus className="h-4 w-4" />
							)}
							New Token
						</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						{isLoading ? (
							<div className="flex justify-center items-center h-24 w-full">
								<Loader2 className="h-8 w-8 animate-spin" />
							</div>
						) : (
							<>
								<AlertDialogHeader>
									<AlertDialogTitle>New token created</AlertDialogTitle>
									<AlertDialogDescription>
										This token will be used to authenticate your requests.
										<br />
										It will be displayed only once, so make sure to save it.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<Input value={tokens[tokens.length - 1]?.value} readOnly />
								<AlertDialogFooter>
									<Button
										className="flex flex-row gap-2"
										variant={"outline"}
										onClick={() => copyToken(tokens[tokens.length - 1]!.value)}
									>
										<Copy className="h-4 w-4" />
										Copy
									</Button>
									<AlertDialogAction>Ok</AlertDialogAction>
								</AlertDialogFooter>
							</>
						)}
					</AlertDialogContent>
				</AlertDialog>
			</CardFooter>
		</Card>
	);
}
