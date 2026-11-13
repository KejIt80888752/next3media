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

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
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
