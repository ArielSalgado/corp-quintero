<script lang="ts">
	import Table from '$src/lib/components/dashboard/EventosTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { eventos } = data;

	const cols: string[] = ['Nombre', 'Fecha', 'Direccion', 'Cupos', 'Disponibles', 'Opciones'];
</script>

<section>
	<Table
		tableTitle="Eventos Historicos"
		tableDescription="Lista completa de los eventos deportivos ofrecidos por la corporación, incluyendo los eventos que ya han finalizado"
		{cols}
		rows={eventos}
	/>
</section>
