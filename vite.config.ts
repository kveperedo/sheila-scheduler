import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { rootRoute, route, index } from '@tanstack/virtual-file-routes';

export const routes = rootRoute('root.route.tsx', [
	index('schedule/schedule.route.tsx'),
	route('/employees', 'employees/employees.route.tsx'),
]);

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		TanStackRouterVite({
			virtualRouteConfig: routes,
		}),
		react(),
		tsconfigPaths(),
	],
});
