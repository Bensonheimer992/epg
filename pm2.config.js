const grab = process.env.SITE
  ? `npx tsx scripts/commands/epg/grab.ts --site=${process.env.SITE} ${process.env.CLANG ? `--lang=${process.env.CLANG}` : ''
  } --output=public/guide.xml`
  : 'npx tsx scripts/commands/epg/grab.ts --channels=channels.xml --output=public/guide.xml'

const cron = 'npx tsx scripts/commands/epg/cron.ts'


const apps = [
  {
    name: 'serve',
    script: 'npx serve -- public',
    instances: 1,
    watch: false,
    autorestart: true
  },
  {
    name: 'cron',
    script: cron,
    instances: 1,
    watch: false,
    autorestart: true,
    env: {
      CRON_SCHEDULE: process.env.CRON_SCHEDULE,
      GRAB: grab,
      TZ: process.env.TZ
    }
  }
];

if (process.env.RUN_AT_STARTUP === 'true') {
  apps.push({
    name: 'grab-at-startup',
    script: grab,
    instances: 1,
    autorestart: false,
    watch: false,
    max_restarts: 1
  });
}

module.exports = { apps };