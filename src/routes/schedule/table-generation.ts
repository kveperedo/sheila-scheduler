import { toast } from 'sonner';
import { Schedule } from './types';
import dayjs from 'dayjs';

const generateHtmlTable = (data: string[][]): string => {
	const rows = data
		.map(
			(row) =>
				`<tr>${row
					.map((cell) => `<td style="border: 1px solid black; border-collapse: collapse">${cell}</td>`)
					.join('')}</tr>`
		)
		.join('');

	return `
        <table style="width: 100%">
            <thead>
                <tr>
                    <th style="width: 5%; text-align: left; border: 1px solid black; border-collapse: collapse">Date</th>
                    <th style="width: 11%; text-align: left; border: 1px solid black; border-collapse: collapse">Day</th>
                    <th style="width: 28%; border: 1px solid black; border-collapse: collapse">AM</th>
                    <th style="width: 28%; border: 1px solid black; border-collapse: collapse">PM</th>
                    <th style="width: 28%; border: 1px solid black; border-collapse: collapse">Night</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
    `;
};

export const copyHtmlTableToClipboard = async (data: string[][]): Promise<void> => {
	const htmlTable = generateHtmlTable(data);

	if (!navigator.clipboard) {
		throw new Error('Clipboard API is not available in this browser.');
	}

	try {
		await navigator.clipboard.write([
			new ClipboardItem({
				'text/html': new Blob([htmlTable], { type: 'text/html' }),
			}),
		]);
		toast.info('Table copied to clipboard');
	} catch (error) {
		toast.error('Failed to copy table');
		console.error('Failed to copy HTML table:', error);
		throw error;
	}
};

type GenerateDataParams = {
	employeeMap: Record<string, string>;
	schedule: Schedule;
	month: number;
	year: number;
};

export const generateData = ({ schedule, employeeMap, month, year }: GenerateDataParams): string[][] => {
	const initialDate = dayjs().month(month).year(year);
	const daysInMonth = initialDate.daysInMonth();
	const getEmployees = (employeeIds: Array<string> = []) =>
		employeeIds
			.filter((id) => Boolean(employeeMap[id]))
			.map((id) => employeeMap[id])
			.join(' + ');

	const rows = Array(daysInMonth)
		.fill(1)
		.map((_, index) => {
			const day = index + 1;
			const selectedDaySchedule = schedule[day] ?? { am: [], pm: [], night: [] };
			const currentDate = initialDate.date(day);

			return [
				currentDate.format('DD'),
				currentDate.format('ddd'),
				getEmployees(selectedDaySchedule['am']),
				getEmployees(selectedDaySchedule['pm']),
				getEmployees(selectedDaySchedule['night']),
			];
		});

	return rows;
};
