<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import Badges from '$lib/components/Badges.svelte';
	import EventoDetails from '$src/lib/components/EventoDetails.svelte';

	export let data: PageData;
	const { evento } = data;
</script>

<svelte:head>
	<title>Corporación Municipal de Deportes Quintero</title>
	<meta name="description" content="Eventos de la Corporación Municipal de Deportes Quintero" />
</svelte:head>

<section>
	<div>
		{#if evento.id > 5}
			<img src={`/not-found.webp`} alt={evento.nombre} />
		{:else}
			<img src={`/eventos/${evento?.id}.webp`} alt={evento?.nombre} />
		{/if}

		<div>
			<Badges categorias={evento?.categoria_evento} />
			<h1>{evento?.nombre}</h1>
			<EventoDetails
				fecha_termino={evento.fecha_termino}
				hora_inicio={evento.hora_inicio}
				hora_termino={evento.hora_termino}
				cupo={evento?.cupo}
				direccion={evento?.direccion}
			/>
			<p>{@html evento?.descripcion}</p>
			<p>{@html evento?.requisitos}</p>
			<div>
				{#if evento?.tipo === 'Abierto' && evento?.estado === 'Activo'}
					<Button to={`/inscripcion/${evento?.id}`} text="Inscribirse" />
				{/if}
				<Button to="/" text="Volver" />
			</div>
		</div>
	</div>
</section>

<style lang="postcss" scoped>
	section {
		@apply p-6 lg:py-12 lg:px-16;
	}

	section > div {
		@apply w-full flex flex-col bg-lightsecondary rounded-lg shadow-lg;
	}

	img {
		@apply w-full h-80 object-cover rounded-t-lg;
	}

	section div > div {
		@apply p-6;
	}

	h1 {
		@apply text-2xl my-4;
	}

	p {
		@apply text-sm mb-4;
	}

	section div div div {
		@apply flex flex-col md:flex-row-reverse p-0 gap-y-4 md:gap-x-4 mt-6;
	}
</style>
