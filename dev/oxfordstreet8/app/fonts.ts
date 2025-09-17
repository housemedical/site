import { Inter } from 'next/font/google';
import { Cormorant_Garamond, Libre_Caslon_Display } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
export const cormorant = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-serif', weight: ['500','600','700'], display: 'swap' });
export const libreCaslon = Libre_Caslon_Display({ subsets: ['latin'], variable: '--font-serif', weight: '700', display: 'swap' });
