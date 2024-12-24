import dayjs from 'dayjs';
import './App.css';
import localeData from 'dayjs/plugin/localeData';
import { useState } from 'react';

dayjs.extend(localeData);

function App() {
	const [currentMonth, setCurrentMonth] = useState(() => dayjs().month());
	const daysInMonth = dayjs().month(currentMonth).daysInMonth();
	// console.log(dayjs().daysInMonth());

	return (
		<div>
			<label htmlFor='name'>Month</label>
			<select value={currentMonth} onChange={(event) => setCurrentMonth(+event.target.value)}>
				<option value='0'>January</option>
				<option value='1'>February</option>
				<option value='2'>March</option>
				<option value='3'>April</option>
				<option value='4'>May</option>
				<option value='5'>June</option>
				<option value='6'>July</option>
				<option value='7'>August</option>
				<option value='8'>September</option>
				<option value='9'>October</option>
				<option value='10'>November</option>
				<option value='11'>December</option>
			</select>

			<div>
				<div className='flex items-center justify-between'>
					<div>Date</div>
					<div>Day</div>
					<div>AM</div>
					<div>PM</div>
					<div>Night</div>
				</div>
				{Array(daysInMonth)
					.fill(1)
					.map((_, index) => {
						const day = index + 1;
						const date = dayjs().month(currentMonth).date(day);

						return (
							<div key={day} className='flex items-center justify-between'>
								<div>{day}</div>
								<div>{date.format('ddd')}</div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default App;
