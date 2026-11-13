// ✏️ Edit your business details here — everything on the site reads from this file.
import {
  Megaphone, Presentation, Heart, Camera, TrendingUp, Users, Sparkles, Clapperboard, Newspaper,
} from 'lucide-react';

export const contact = {
  email: 'info@next3media.com',
  locations: ['Bengaluru', 'Hyderabad'],
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  linkedin: 'https://linkedin.com/',
  youtube: 'https://youtube.com/',
};

// Google Analytics 4 — paste your Measurement ID (looks like 'G-XXXXXXXXXX') to turn tracking on.
export const analytics = { gaId: '' };

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'locations', label: 'Locations' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export const cities = [
  {
    name: 'Bengaluru',
    state: 'Karnataka',
    mapQuery: 'Bengaluru, Karnataka, India',
    text: 'Corporate launches, tech conferences, brand activations and startup PR in India\'s Silicon Valley.',
    focus: ['Corporate Events', 'Startup PR', 'Brand Activations', 'Influencer Campaigns'],
  },
  {
    name: 'Hyderabad',
    state: 'Telangana',
    mapQuery: 'Hyderabad, Telangana, India',
    text: 'Grand weddings, film and ad productions, media coverage and corporate events in the City of Pearls.',
    focus: ['Weddings', 'Film & Ad Production', 'Media Coverage', 'Corporate Events'],
  },
];

// ✏️ Review these answers and adjust to match how you actually work.
export const faqs = [
  {
    q: 'Which cities do you work in?',
    a: 'We are based in Bengaluru and Hyderabad. For events, shoots and campaigns in other cities, write to us — we travel with our team wherever the project needs us.',
  },
  {
    q: 'What services does NEXT3 Media offer?',
    a: 'PR & corporate communications, corporate events & conferences, weddings & special events, photography & videography, digital & social media marketing, influencer marketing, brand activations, film & ad production, and media coverage.',
  },
  {
    q: 'Can you handle a project end-to-end?',
    a: 'Yes. You can pick a single service, or let us run everything — from planning and production to PR, promotion and coverage — with one team and one point of contact.',
  },
  {
    q: 'How early should I book?',
    a: 'The earlier the better, especially for weddings and large corporate events. Reach out as soon as you have a date in mind and we\'ll tell you what\'s possible on your timeline.',
  },
  {
    q: 'How is pricing decided?',
    a: 'Every project is quoted based on its scope, scale, location and deliverables. Share your requirement at info@next3media.com and we\'ll send a tailored proposal.',
  },
  {
    q: 'How do I get started?',
    a: 'Fill the enquiry form below or email info@next3media.com with your event, brand or campaign details. We\'ll get back within 24 hours.',
  },
];

export const pillars = [
  { no: '01', title: 'Innovate', text: 'Fresh ideas, bold concepts and creative storytelling that make your brand impossible to ignore.' },
  { no: '02', title: 'Automate', text: 'Smart digital workflows, data-driven campaigns and seamless execution — every single time.' },
  { no: '03', title: 'Elevate', text: 'We take your brand, your event and your story to the next level of visibility and impact.' },
];

export const services = [
  { icon: Megaphone, title: 'Public Relations & Corporate PR', text: 'Reputation building, press releases, media relations and crisis communication for brands and leaders.' },
  { icon: Presentation, title: 'Corporate Events & Conferences', text: 'End-to-end planning for launches, summits, conferences, award nights and corporate gatherings.' },
  { icon: Heart, title: 'Wedding & Special Events', text: 'Elegant weddings, receptions and milestone celebrations crafted with detail and emotion.' },
  { icon: Camera, title: 'Photography & Videography', text: 'Cinematic photo and video coverage — candid, commercial, product and event shoots.' },
  { icon: TrendingUp, title: 'Digital Marketing & Social Media', text: 'Strategy, content, ads and community management that grow reach and real results.' },
  { icon: Users, title: 'Influencer Marketing', text: 'The right creators for your brand — campaign planning, collaborations and performance tracking.' },
  { icon: Sparkles, title: 'Brand Promotions & Activations', text: 'On-ground activations, mall promotions, roadshows and experiential campaigns.' },
  { icon: Clapperboard, title: 'Film & Advertising Production', text: 'TV commercials, corporate films, ad films and branded content from script to screen.' },
  { icon: Newspaper, title: 'Media Coverage & Communications', text: 'Print, TV and online coverage with powerful communication strategies that get you noticed.' },
];

export const process = [
  { title: 'Discover', text: 'We listen, research your brand, audience and goals.' },
  { title: 'Strategize', text: 'A clear creative and media plan with timelines and budgets.' },
  { title: 'Create', text: 'Our team produces, plans and executes with precision.' },
  { title: 'Amplify', text: 'We push it across media, digital and influencer channels.' },
  { title: 'Measure', text: 'Transparent reporting and insights to keep growing.' },
];

export const work = [
  { tag: 'Corporate Event', title: 'Annual Leadership Summit', size: 'tall' },
  { tag: 'Wedding', title: 'Royal Heritage Wedding', size: 'wide' },
  { tag: 'Ad Film', title: 'Product Launch Commercial', size: 'normal' },
  { tag: 'Influencer', title: 'Festive Creator Campaign', size: 'normal' },
  { tag: 'Activation', title: 'Mall Brand Roadshow', size: 'wide' },
  { tag: 'PR', title: 'Startup Media Launch', size: 'normal' },
];
