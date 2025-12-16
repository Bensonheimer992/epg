import { CronJob } from 'cron';
import { exec } from 'child_process';

const job = new CronJob(
	`${process.env.CRON_SCHEDULE}`,
	function () {
		exec(`${process.env.GRAB}`, (error, stdout, stderr) => {
			if (error) {
				console.error(`Error executing EPG grab: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`EPG grab stderr: ${stderr}`);
				return;
			}
			console.log(`${stdout}`);
		});
	},
	null,
	true,
	`${process.env.TZ}`,
);