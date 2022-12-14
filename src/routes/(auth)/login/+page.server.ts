import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { LoginSchemaParser } from '$src/utils/zod/validations';
import { ZodError } from 'zod';
import trpc from '$lib/trpc';

export const load: PageServerLoad = async ({ cookies }) => {
	if (cookies.get('session') === 'authenticated') {
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	login: async ({ cookies, request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const parse = LoginSchemaParser.parse(formData);
			const result = await trpc(fetch).query('log:in', parse);

			if (!result) return { credentials: true };

			cookies.set('session', 'authenticated', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7
			});

			throw redirect(302, '/dashboard');
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				const { ...rest } = formData;
				return {
					data: rest,
					errors
				};
			}
		}
	}
};
