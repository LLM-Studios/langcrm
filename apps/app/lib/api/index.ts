import { headers } from "next/headers";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function apiFetch(
	endpoint: string,
	options: RequestInit = {}
): Promise<any> {
	const defaultHeaders = {
		"Content-Type": "application/json",
	} as HeadersInit;

	options.headers = {
		...defaultHeaders,
		...options.headers,
	};

	const res = await fetch(API_URL + endpoint, options);

	return res;
}
