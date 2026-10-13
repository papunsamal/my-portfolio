const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('./models/Project');

const projects = [
  {
    title: 'Orivana Restaurant',
    description:
      'Built and deployed a full-stack restaurant website with React + Express featuring cart-to-WhatsApp ordering, table booking, and a cinematic video hero. Live on Vercel + Render with 100% SEO score.',
    features: [
      'Cart-to-WhatsApp ordering',
      'Table booking',
      'Responsive design',
      'Cinematic video hero',
      'Search & filters',
      'SEO optimized',
      'Zero hosting cost',
    ],
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js ', 'Express', 'Vercel', 'Render'],
    images: [
      '/projects/orivana-1.webp',
      '/projects/orivana-2.webp',
      '/projects/orivana-3.webp',
      '/projects/orivana-4.webp',
      'projects/orivana-5.webp',
      'projects/orivana-6.webp',
    ],
    githubLink: '',
    liveLink: 'https://orivana-restaurant.vercel.app/',
    isPrivate: true,
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
