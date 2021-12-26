#!/usr/bin/env node

// imports
const {Command} = require('commander')
const {exec} = require('child_process')
const program = new Command()

// run commands
const RABBITMQ = 'sudo docker run -d --hostname my-rabbit --name some-rabbit -p 8080:15672 rabbitmq:3-management'
const POSTGRES = 'sudo docker run -d --name some-postgres ' +
	'-e POSTGRES_USER=root ' +
	'-e POSTGRES_PASSWORD=root ' +
	'postgres'

// version
program.version('0.1.0', 'v, --version', 'output the current version');

program
	.command('docker <container>')
	.alias('d')
	.description('Boots up a docker container\nAvailable: [\'rabbitmq\', \'postgres\']')
	.action(container => {
		if (container === "rabbitmq" || container === "rabbit") {
			exec(RABBITMQ)
			console.log('Running \'rabbitmq\' container')
		} else if (container === "postgres") {
			exec(POSTGRES)
			console.log('Running \'postgres\' container')
		}
	})

program
	.command('info <container>')
	.description('Gets info about a container')
	.action(container => {
		if (container === "rabbitmq" || container === "rabbit") {
			exec('sudo docker logs some-rabbit', ((error, stdout, stderr) => {
				if (!!stdout) console.log(stdout)
			}))
		}
	})

program
	.command('ls')
	.description('Shows docker containers')
	.action(() => {
		exec('sudo docker container ls', ((error, stdout, stderr) => {
			if (!!stdout) console.log(stdout)
		}))
	})

// end
program.parse()