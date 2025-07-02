<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: any;

	let name = '';
	let debounceTimer: NodeJS.Timeout;
	let isLoading = false;

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		name = target.value;

		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		if (name.trim()) {
			isLoading = true;
			debounceTimer = setTimeout(() => {
				goto(`/?name=${encodeURIComponent(name.trim())}`, { replaceState: true });
			}, 500);
		} else {
			goto('/', { replaceState: true });
		}
	}

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const urlName = urlParams.get('name');
		if (urlName) {
			name = urlName;
		}
	});

	$: if (data) {
		isLoading = false;
	}
</script>

<svelte:head>
	<title>Voltera - Descubra a idade pelo nome</title>
	<meta name="description" content="Consulte a idade estimada de uma pessoa pelo nome usando a API Agify" />
	<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcEz///////////////////////////////////////+x0Kpsp2LJ3sYoiwpClit7q3gldSk6iTijxKAOdRUwfTE2kRzP4c7e6t30+PO2zbdeo05PnDyPt4sDZAVHiUrV4/3lAAAAC3RSTlMAMYXD7P9gYRnaQZ1VDsUAAADsSURBVHgBfdNFgsQgAERROlBxF1zuf8p2IiO87Y+gZHfLKAMYzW7kp5xhx4pLKitcVOXRavxSJ9peS/zp8+UKf6peLcehaTvs8mdk2LX9MGDHnnPHbpzmYcThRjJEy7oNXEA2Ch8ZobHpdRsHg6bn8dOUsL2t2nIB7kav4k/x4Z6t4QayX8KEr3dUOjwbBt4Bw7Aue2QQ87quQaLhFoAbBmteBBih6NbgBADLG0D7zZmBc953oMdUBB8A571ElB2L0PBWT36T50UgbI/ce4cDOy+8axeFkzy5ZenNTh+T9AFLH83fhzonUeI6PAC4XxUWxjuUjQAAAABJRU5ErkJggg==" />
</svelte:head>

<main>
	<div class="container">
		<header>
			<h1>
				<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAYFBMVEVHcEz///////////////////////////////////////+x0Kpsp2LJ3sYoiwpClit7q3gldSk6iTijxKAOdRUwfTE2kRzP4c7e6t30+PO2zbdeo05PnDyPt4sDZAVHiUrV4/3lAAAAC3RSTlMAMYXD7P9gYRnaQZ1VDsUAAADsSURBVHgBfdNFgsQgAERROlBxF1zuf8p2IiO87Y+gZHfLKAMYzW7kp5xhx4pLKitcVOXRavxSJ9peS/zp8+UKf6peLcehaTvs8mdk2LX9MGDHnnPHbpzmYcThRjJEy7oNXEA2Ch8ZobHpdRsHg6bn8dOUsL2t2nIB7kav4k/x4Z6t4QayX8KEr3dUOjwbBt4Bw7Aue2QQ87quQaLhFoAbBmteBBih6NbgBADLG0D7zZmBc953oMdUBB8A571ElB2L0PBWT36T50UgbI/ce4cDOy+8axeFkzy5ZenNTh+T9AFLH83fhzonUeI6PAC4XxUWxjuUjQAAAABJRU5ErkJggg==" alt="Voltera" class="logo" />
				Voltera
			</h1>
			<p class="subtitle">Descubra a idade estimada pelo nome</p>
		</header>

		<div class="search-section">
			<div class="input-wrapper">
				<input
					type="text"
					placeholder="Digite um nome..."
					bind:value={name}
					on:input={handleInput}
					class="name-input"
					autocomplete="off"
					aria-label="Digite um nome para descobrir a idade estimada"
				/>
				{#if isLoading}
					<div class="loading-spinner" aria-label="Carregando resultado..."></div>
				{/if}
			</div>
		</div>

		{#if data && data.age !== null && data.name}
			<div class="result-section">
				<div class="result-card">
					<h2>Resultado</h2>
					<div class="age-display">
						<span class="age-number" aria-label="Idade estimada: {data.age} anos">{data.age}</span>
						<span class="age-label">anos</span>
					</div>
					<p class="name-display">Nome: <strong>{data.name}</strong></p>
					{#if data.count !== null}
						<div class="count-info">
							<svg class="stats-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
							</svg>
							<span>Baseado em <strong>{data.count}</strong> pessoas com este nome</span>
						</div>
					{/if}
				</div>
			</div>
		{:else if name.trim() && !isLoading}
			<div class="no-result">
				<p>Nenhum resultado encontrado para "{name}"</p>
			</div>
		{:else if !name.trim()}
			<div class="welcome-message">
				<p>Digite um nome acima para descobrir a idade estimada!</p>
			</div>
		{/if}
	</div>
</main>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	:global(body) {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background: 
			linear-gradient(135deg, #47b408 0%, #2d5016 15%, #4ade80 35%, #16a34a 65%, #22c55e 85%, #47b408 100%);
		background-size: 400% 400%;
		animation: gradientShift 20s ease infinite;
		min-height: 100vh;
		color: #333;
		margin: 0;
		padding: 0;
		position: relative;
		overflow-x: hidden;
	}

	@keyframes gradientShift {
		0% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
		100% {
			background-position: 0% 50%;
		}
	}

	:global(body::before) {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: 
			radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.04) 0%, transparent 50%);
		pointer-events: none;
		z-index: 0;
	}

	main {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		position: relative;
		z-index: 1;
	}

	.container {
		background: rgba(255, 255, 255, 0.98);
		border-radius: 20px;
		padding: 40px;
		box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.08);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		max-width: 500px;
		width: 100%;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.container:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.18), 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	header {
		margin-bottom: 40px;
	}

	h1 {
		font-size: 2.5rem;
		color: #47b408;
		margin-bottom: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 2px;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 15px;
	}

	.logo {
		width: 40px;
		height: 40px;
		object-fit: contain;
	}

	.subtitle {
		color: #718096;
		font-size: 1.1rem;
		font-weight: 300;
	}

	.search-section {
		margin-bottom: 40px;
	}

	.input-wrapper {
		position: relative;
		display: inline-block;
		width: 100%;
	}

	.name-input {
		width: 100%;
		padding: 15px 20px;
		font-size: 1.1rem;
		border: 1px solid #e2e8f0;
		border-radius: 50px;
		outline: none;
		transition: all 0.3s ease;
		background: white;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
	}

	.name-input:focus {
		border-color: #47b408;
		box-shadow: 0 0 0 3px rgba(71, 180, 8, 0.1), 0 4px 12px rgba(71, 180, 8, 0.15);
		transform: translateY(-1px);
	}

	.name-input:hover {
		border-color: #47b408;
		box-shadow: 0 2px 12px rgba(71, 180, 8, 0.1);
		transform: translateY(-1px);
	}

	.name-input::placeholder {
		color: #a0aec0;
	}

	.loading-spinner {
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		border: 2px solid #e2e8f0;
		border-top: 2px solid #47b408;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		opacity: 0.8;
	}

	@keyframes spin {
		0% { transform: translateY(-50%) rotate(0deg); }
		100% { transform: translateY(-50%) rotate(360deg); }
	}

	.result-section {
		margin-top: 30px;
	}

	.result-card {
		background: linear-gradient(135deg, #1a5d1a 0%, #0f3d0f 100%);
		color: white;
		padding: 35px 30px;
		border-radius: 15px;
		box-shadow: 0 10px 30px rgba(71, 180, 8, 0.3), 0 0 20px rgba(71, 180, 8, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.1);
		position: relative;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.result-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 15px 35px rgba(71, 180, 8, 0.4), 0 0 25px rgba(71, 180, 8, 0.25);
	}

	.result-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
		pointer-events: none;
	}

	.result-card h2 {
		font-size: 1.5rem;
		margin-bottom: 25px;
		font-weight: 600;
		color: #ffffff;
		position: relative;
		z-index: 1;
	}

	.age-display {
		display: flex;
		align-items: baseline;
		justify-content: center;
		margin-bottom: 20px;
		position: relative;
		z-index: 1;
	}

	.age-number {
		font-size: 4rem;
		font-weight: 700;
		line-height: 1;
		color: #ffffff;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.age-label {
		font-size: 1.5rem;
		margin-left: 10px;
		font-weight: 300;
		color: #ffffff;
	}

	.name-display {
		font-size: 1.1rem;
		margin-bottom: 15px;
		position: relative;
		z-index: 1;
		color: #ffffff;
	}

	.count-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		font-size: 0.9rem;
		opacity: 0.95;
		font-style: italic;
		position: relative;
		z-index: 1;
		color: #ffffff;
	}

	.stats-icon {
		width: 16px;
		height: 16px;
		opacity: 0.9;
	}

	.no-result {
		background: #fed7d7;
		color: #c53030;
		padding: 20px;
		border-radius: 10px;
		border: 1px solid #feb2b2;
		margin-top: 30px;
	}

	.welcome-message {
		background: #e6fffa;
		color: #2c7a7b;
		padding: 20px;
		border-radius: 10px;
		border: 1px solid #9ae6b4;
		margin-top: 30px;
	}

	@media (max-width: 600px) {
		.container {
			padding: 25px 20px;
			margin: 15px;
		}

		h1 {
			font-size: 2rem;
			gap: 10px;
		}

		.logo {
			width: 32px;
			height: 32px;
		}

		.age-number {
			font-size: 3.2rem;
		}

		.name-input {
			font-size: 1rem;
			padding: 12px 16px;
		}

		.result-card {
			padding: 25px 20px;
		}

		.search-section {
			margin-bottom: 30px;
		}

		.result-section {
			margin-top: 25px;
		}

		header {
			margin-bottom: 30px;
		}
	}
</style>
