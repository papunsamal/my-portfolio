const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'Project One',
    description: '.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/papunsamal/project-one',
    liveLink: '',
  },
  {
    title: 'Project Two',
    description: '.',
    techStack: ['Python', 'SQL'],
    githubLink: 'https://github.com/papunsamal/project-two',
    liveLink: '',
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Project.deleteMany();
    await Project.insertMany(projects);
    console.log('Projects added!');
    process.exit();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
