import type { PageServerLoad } from './$types';

interface AgifyResponse {
	name: string;
	age: number | null;
	count: number | null;
}

export const load: PageServerLoad = async ({ url }) => {
	const name = url.searchParams.get('name');

	if (!name || name.trim() === '') {
		return {
			name: null,
			age: null,
			count: null
		};
	}

	try {
		const response = await fetch(`https://api.agify.io?name=${encodeURIComponent(name.trim())}`);
		
		if (!response.ok) {
			console.warn(`API retornou status ${response.status}: ${response.statusText}`);
			return {
				name: name.trim(),
				age: null,
				count: null
			};
		}

		const data: AgifyResponse = await response.json();
		
		return {
			name: data.name,
			age: data.age,
			count: data.count
		};
	} catch (error) {
		console.error('Erro ao consultar API:', error);
		return {
			name: name.trim(),
			age: null,
			count: null
		};
	}
}; 