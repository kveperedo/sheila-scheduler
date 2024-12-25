import { NavigateOptions, Outlet, ToOptions, createRootRoute, useLocation, useRouter } from '@tanstack/react-router';
import { Tabs } from '@/components/ui';
import { RouterProvider } from 'react-aria';

declare module 'react-aria-components' {
	interface RouterConfig {
		href: ToOptions['to'];
		routerOptions: Omit<NavigateOptions, keyof ToOptions>;
	}
}

const TAB_IDS = {
	SCHEDULE: '/',
	EMPLOYEES: '/employees',
};

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	const router = useRouter();
	const { pathname } = useLocation();

	return (
		<RouterProvider
			navigate={(to, options) => router.navigate({ to, ...options })}
			useHref={(to) => router.buildLocation({ to }).href}
		>
			<Tabs className='h-full mx-auto p-8' selectedKey={pathname}>
				<Tabs.List>
					<Tabs.Tab id={TAB_IDS.SCHEDULE} href='/'>
						Schedule
					</Tabs.Tab>
					<Tabs.Tab id={TAB_IDS.EMPLOYEES} href='/employees'>
						Employees
					</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel id={TAB_IDS.SCHEDULE} className='overflow-hidden'>
					<Outlet />
				</Tabs.Panel>
				<Tabs.Panel id={TAB_IDS.EMPLOYEES} className='overflow-auto'>
					<Outlet />
				</Tabs.Panel>
			</Tabs>
		</RouterProvider>
	);
}
