export const prerender = false;

import type { Actions } from './$types';
import { LoginSchema } from '$src/utils/zod/validations';
import { ZodError } from 'zod';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const result = LoginSchema.parse(formData);
		} catch (err: unknown) {
			if (err instanceof ZodError) {
				const { fieldErrors: errors } = err.flatten();
				const { username, password, ...rest } = formData;
				return {
					data: rest,
					errors
				};
			}
		}
	}
};
