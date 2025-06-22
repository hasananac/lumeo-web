import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Language } from '../types';

export interface Country {
  code: string;
  name: string;
  nameTr: string;
  flag: string;
  dialCode: string;
}

interface CountryCodeSelectorProps {
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
  disabled?: boolean;
  language: Language;
}

export const countries: Country[] = [
  // Europe
  { code: 'TR', name: 'Turkey', nameTr: 'Türkiye', flag: '🇹🇷', dialCode: '+90' },
  { code: 'DE', name: 'Germany', nameTr: 'Almanya', flag: '🇩🇪', dialCode: '+49' },
  { code: 'FR', name: 'France', nameTr: 'Fransa', flag: '🇫🇷', dialCode: '+33' },
  { code: 'GB', name: 'United Kingdom', nameTr: 'Birleşik Krallık', flag: '🇬🇧', dialCode: '+44' },
  { code: 'IT', name: 'Italy', nameTr: 'İtalya', flag: '🇮🇹', dialCode: '+39' },
  { code: 'ES', name: 'Spain', nameTr: 'İspanya', flag: '🇪🇸', dialCode: '+34' },
  { code: 'NL', name: 'Netherlands', nameTr: 'Hollanda', flag: '🇳🇱', dialCode: '+31' },
  { code: 'BE', name: 'Belgium', nameTr: 'Belçika', flag: '🇧🇪', dialCode: '+32' },
  { code: 'CH', name: 'Switzerland', nameTr: 'İsviçre', flag: '🇨🇭', dialCode: '+41' },
  { code: 'AT', name: 'Austria', nameTr: 'Avusturya', flag: '🇦🇹', dialCode: '+43' },
  { code: 'SE', name: 'Sweden', nameTr: 'İsveç', flag: '🇸🇪', dialCode: '+46' },
  { code: 'NO', name: 'Norway', nameTr: 'Norveç', flag: '🇳🇴', dialCode: '+47' },
  { code: 'DK', name: 'Denmark', nameTr: 'Danimarka', flag: '🇩🇰', dialCode: '+45' },
  { code: 'FI', name: 'Finland', nameTr: 'Finlandiya', flag: '🇫🇮', dialCode: '+358' },
  { code: 'PL', name: 'Poland', nameTr: 'Polonya', flag: '🇵🇱', dialCode: '+48' },
  { code: 'CZ', name: 'Czech Republic', nameTr: 'Çek Cumhuriyeti', flag: '🇨🇿', dialCode: '+420' },
  { code: 'HU', name: 'Hungary', nameTr: 'Macaristan', flag: '🇭🇺', dialCode: '+36' },
  { code: 'GR', name: 'Greece', nameTr: 'Yunanistan', flag: '🇬🇷', dialCode: '+30' },
  { code: 'PT', name: 'Portugal', nameTr: 'Portekiz', flag: '🇵🇹', dialCode: '+351' },
  { code: 'RU', name: 'Russia', nameTr: 'Rusya', flag: '🇷🇺', dialCode: '+7' },
  { code: 'UA', name: 'Ukraine', nameTr: 'Ukrayna', flag: '🇺🇦', dialCode: '+380' },
  { code: 'RO', name: 'Romania', nameTr: 'Romanya', flag: '🇷🇴', dialCode: '+40' },
  { code: 'BG', name: 'Bulgaria', nameTr: 'Bulgaristan', flag: '🇧🇬', dialCode: '+359' },
  { code: 'HR', name: 'Croatia', nameTr: 'Hırvatistan', flag: '🇭🇷', dialCode: '+385' },
  { code: 'RS', name: 'Serbia', nameTr: 'Sırbistan', flag: '🇷🇸', dialCode: '+381' },
  { code: 'SI', name: 'Slovenia', nameTr: 'Slovenya', flag: '🇸🇮', dialCode: '+386' },
  { code: 'SK', name: 'Slovakia', nameTr: 'Slovakya', flag: '🇸🇰', dialCode: '+421' },
  { code: 'LT', name: 'Lithuania', nameTr: 'Litvanya', flag: '🇱🇹', dialCode: '+370' },
  { code: 'LV', name: 'Latvia', nameTr: 'Letonya', flag: '🇱🇻', dialCode: '+371' },
  { code: 'EE', name: 'Estonia', nameTr: 'Estonya', flag: '🇪🇪', dialCode: '+372' },
  { code: 'IE', name: 'Ireland', nameTr: 'İrlanda', flag: '🇮🇪', dialCode: '+353' },
  { code: 'IS', name: 'Iceland', nameTr: 'İzlanda', flag: '🇮🇸', dialCode: '+354' },
  { code: 'LU', name: 'Luxembourg', nameTr: 'Lüksemburg', flag: '🇱🇺', dialCode: '+352' },
  { code: 'MT', name: 'Malta', nameTr: 'Malta', flag: '🇲🇹', dialCode: '+356' },
  { code: 'CY', name: 'Cyprus', nameTr: 'Kıbrıs', flag: '🇨🇾', dialCode: '+357' },
  { code: 'AL', name: 'Albania', nameTr: 'Arnavutluk', flag: '🇦🇱', dialCode: '+355' },
  { code: 'BA', name: 'Bosnia and Herzegovina', nameTr: 'Bosna Hersek', flag: '🇧🇦', dialCode: '+387' },
  { code: 'ME', name: 'Montenegro', nameTr: 'Karadağ', flag: '🇲🇪', dialCode: '+382' },
  { code: 'MK', name: 'North Macedonia', nameTr: 'Kuzey Makedonya', flag: '🇲🇰', dialCode: '+389' },
  { code: 'MD', name: 'Moldova', nameTr: 'Moldova', flag: '🇲🇩', dialCode: '+373' },
  { code: 'BY', name: 'Belarus', nameTr: 'Belarus', flag: '🇧🇾', dialCode: '+375' },

  // North America
  { code: 'US', name: 'United States', nameTr: 'Amerika Birleşik Devletleri', flag: '🇺🇸', dialCode: '+1' },
  { code: 'CA', name: 'Canada', nameTr: 'Kanada', flag: '🇨🇦', dialCode: '+1' },
  { code: 'MX', name: 'Mexico', nameTr: 'Meksika', flag: '🇲🇽', dialCode: '+52' },
  { code: 'GT', name: 'Guatemala', nameTr: 'Guatemala', flag: '🇬🇹', dialCode: '+502' },
  { code: 'BZ', name: 'Belize', nameTr: 'Belize', flag: '🇧🇿', dialCode: '+501' },
  { code: 'SV', name: 'El Salvador', nameTr: 'El Salvador', flag: '🇸🇻', dialCode: '+503' },
  { code: 'HN', name: 'Honduras', nameTr: 'Honduras', flag: '🇭🇳', dialCode: '+504' },
  { code: 'NI', name: 'Nicaragua', nameTr: 'Nikaragua', flag: '🇳🇮', dialCode: '+505' },
  { code: 'CR', name: 'Costa Rica', nameTr: 'Kosta Rika', flag: '🇨🇷', dialCode: '+506' },
  { code: 'PA', name: 'Panama', nameTr: 'Panama', flag: '🇵🇦', dialCode: '+507' },

  // South America
  { code: 'BR', name: 'Brazil', nameTr: 'Brezilya', flag: '🇧🇷', dialCode: '+55' },
  { code: 'AR', name: 'Argentina', nameTr: 'Arjantin', flag: '🇦🇷', dialCode: '+54' },
  { code: 'CL', name: 'Chile', nameTr: 'Şili', flag: '🇨🇱', dialCode: '+56' },
  { code: 'CO', name: 'Colombia', nameTr: 'Kolombiya', flag: '🇨🇴', dialCode: '+57' },
  { code: 'PE', name: 'Peru', nameTr: 'Peru', flag: '🇵🇪', dialCode: '+51' },
  { code: 'VE', name: 'Venezuela', nameTr: 'Venezuela', flag: '🇻🇪', dialCode: '+58' },
  { code: 'EC', name: 'Ecuador', nameTr: 'Ekvador', flag: '🇪🇨', dialCode: '+593' },
  { code: 'BO', name: 'Bolivia', nameTr: 'Bolivya', flag: '🇧🇴', dialCode: '+591' },
  { code: 'PY', name: 'Paraguay', nameTr: 'Paraguay', flag: '🇵🇾', dialCode: '+595' },
  { code: 'UY', name: 'Uruguay', nameTr: 'Uruguay', flag: '🇺🇾', dialCode: '+598' },
  { code: 'GY', name: 'Guyana', nameTr: 'Guyana', flag: '🇬🇾', dialCode: '+592' },
  { code: 'SR', name: 'Suriname', nameTr: 'Surinam', flag: '🇸🇷', dialCode: '+597' },

  // Asia
  { code: 'CN', name: 'China', nameTr: 'Çin', flag: '🇨🇳', dialCode: '+86' },
  { code: 'JP', name: 'Japan', nameTr: 'Japonya', flag: '🇯🇵', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', nameTr: 'Güney Kore', flag: '🇰🇷', dialCode: '+82' },
  { code: 'IN', name: 'India', nameTr: 'Hindistan', flag: '🇮🇳', dialCode: '+91' },
  { code: 'ID', name: 'Indonesia', nameTr: 'Endonezya', flag: '🇮🇩', dialCode: '+62' },
  { code: 'TH', name: 'Thailand', nameTr: 'Tayland', flag: '🇹🇭', dialCode: '+66' },
  { code: 'VN', name: 'Vietnam', nameTr: 'Vietnam', flag: '🇻🇳', dialCode: '+84' },
  { code: 'PH', name: 'Philippines', nameTr: 'Filipinler', flag: '🇵🇭', dialCode: '+63' },
  { code: 'MY', name: 'Malaysia', nameTr: 'Malezya', flag: '🇲🇾', dialCode: '+60' },
  { code: 'SG', name: 'Singapore', nameTr: 'Singapur', flag: '🇸🇬', dialCode: '+65' },
  { code: 'TW', name: 'Taiwan', nameTr: 'Tayvan', flag: '🇹🇼', dialCode: '+886' },
  { code: 'HK', name: 'Hong Kong', nameTr: 'Hong Kong', flag: '🇭🇰', dialCode: '+852' },
  { code: 'MO', name: 'Macau', nameTr: 'Makao', flag: '🇲🇴', dialCode: '+853' },
  { code: 'KH', name: 'Cambodia', nameTr: 'Kamboçya', flag: '🇰🇭', dialCode: '+855' },
  { code: 'LA', name: 'Laos', nameTr: 'Laos', flag: '🇱🇦', dialCode: '+856' },
  { code: 'MM', name: 'Myanmar', nameTr: 'Myanmar', flag: '🇲🇲', dialCode: '+95' },
  { code: 'BD', name: 'Bangladesh', nameTr: 'Bangladeş', flag: '🇧🇩', dialCode: '+880' },
  { code: 'LK', name: 'Sri Lanka', nameTr: 'Sri Lanka', flag: '🇱🇰', dialCode: '+94' },
  { code: 'NP', name: 'Nepal', nameTr: 'Nepal', flag: '🇳🇵', dialCode: '+977' },
  { code: 'BT', name: 'Bhutan', nameTr: 'Butan', flag: '🇧🇹', dialCode: '+975' },
  { code: 'MV', name: 'Maldives', nameTr: 'Maldivler', flag: '🇲🇻', dialCode: '+960' },
  { code: 'PK', name: 'Pakistan', nameTr: 'Pakistan', flag: '🇵🇰', dialCode: '+92' },
  { code: 'AF', name: 'Afghanistan', nameTr: 'Afganistan', flag: '🇦🇫', dialCode: '+93' },
  { code: 'UZ', name: 'Uzbekistan', nameTr: 'Özbekistan', flag: '🇺🇿', dialCode: '+998' },
  { code: 'KZ', name: 'Kazakhstan', nameTr: 'Kazakistan', flag: '🇰🇿', dialCode: '+7' },
  { code: 'KG', name: 'Kyrgyzstan', nameTr: 'Kırgızistan', flag: '🇰🇬', dialCode: '+996' },
  { code: 'TJ', name: 'Tajikistan', nameTr: 'Tacikistan', flag: '🇹🇯', dialCode: '+992' },
  { code: 'TM', name: 'Turkmenistan', nameTr: 'Türkmenistan', flag: '🇹🇲', dialCode: '+993' },
  { code: 'MN', name: 'Mongolia', nameTr: 'Moğolistan', flag: '🇲🇳', dialCode: '+976' },
  { code: 'KP', name: 'North Korea', nameTr: 'Kuzey Kore', flag: '🇰🇵', dialCode: '+850' },

  // Middle East
  { code: 'AE', name: 'United Arab Emirates', nameTr: 'Birleşik Arap Emirlikleri', flag: '🇦🇪', dialCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', nameTr: 'Suudi Arabistan', flag: '🇸🇦', dialCode: '+966' },
  { code: 'IL', name: 'Israel', nameTr: 'İsrail', flag: '🇮🇱', dialCode: '+972' },
  { code: 'PS', name: 'Palestine', nameTr: 'Filistin', flag: '🇵🇸', dialCode: '+970' },
  { code: 'JO', name: 'Jordan', nameTr: 'Ürdün', flag: '🇯🇴', dialCode: '+962' },
  { code: 'LB', name: 'Lebanon', nameTr: 'Lübnan', flag: '🇱🇧', dialCode: '+961' },
  { code: 'SY', name: 'Syria', nameTr: 'Suriye', flag: '🇸🇾', dialCode: '+963' },
  { code: 'IQ', name: 'Iraq', nameTr: 'Irak', flag: '🇮🇶', dialCode: '+964' },
  { code: 'IR', name: 'Iran', nameTr: 'İran', flag: '🇮🇷', dialCode: '+98' },
  { code: 'KW', name: 'Kuwait', nameTr: 'Kuveyt', flag: '🇰🇼', dialCode: '+965' },
  { code: 'QA', name: 'Qatar', nameTr: 'Katar', flag: '🇶🇦', dialCode: '+974' },
  { code: 'BH', name: 'Bahrain', nameTr: 'Bahreyn', flag: '🇧🇭', dialCode: '+973' },
  { code: 'OM', name: 'Oman', nameTr: 'Umman', flag: '🇴🇲', dialCode: '+968' },
  { code: 'YE', name: 'Yemen', nameTr: 'Yemen', flag: '🇾🇪', dialCode: '+967' },
  { code: 'AM', name: 'Armenia', nameTr: 'Ermenistan', flag: '🇦🇲', dialCode: '+374' },
  { code: 'AZ', name: 'Azerbaijan', nameTr: 'Azerbaycan', flag: '🇦🇿', dialCode: '+994' },
  { code: 'GE', name: 'Georgia', nameTr: 'Gürcistan', flag: '🇬🇪', dialCode: '+995' },

  // Africa
  { code: 'ZA', name: 'South Africa', nameTr: 'Güney Afrika', flag: '🇿🇦', dialCode: '+27' },
  { code: 'EG', name: 'Egypt', nameTr: 'Mısır', flag: '🇪🇬', dialCode: '+20' },
  { code: 'NG', name: 'Nigeria', nameTr: 'Nijerya', flag: '🇳🇬', dialCode: '+234' },
  { code: 'KE', name: 'Kenya', nameTr: 'Kenya', flag: '🇰🇪', dialCode: '+254' },
  { code: 'ET', name: 'Ethiopia', nameTr: 'Etiyopya', flag: '🇪🇹', dialCode: '+251' },
  { code: 'GH', name: 'Ghana', nameTr: 'Gana', flag: '🇬🇭', dialCode: '+233' },
  { code: 'TZ', name: 'Tanzania', nameTr: 'Tanzanya', flag: '🇹🇿', dialCode: '+255' },
  { code: 'UG', name: 'Uganda', nameTr: 'Uganda', flag: '🇺🇬', dialCode: '+256' },
  { code: 'DZ', name: 'Algeria', nameTr: 'Cezayir', flag: '🇩🇿', dialCode: '+213' },
  { code: 'MA', name: 'Morocco', nameTr: 'Fas', flag: '🇲🇦', dialCode: '+212' },
  { code: 'TN', name: 'Tunisia', nameTr: 'Tunus', flag: '🇹🇳', dialCode: '+216' },
  { code: 'LY', name: 'Libya', nameTr: 'Libya', flag: '🇱🇾', dialCode: '+218' },
  { code: 'SD', name: 'Sudan', nameTr: 'Sudan', flag: '🇸🇩', dialCode: '+249' },
  { code: 'SS', name: 'South Sudan', nameTr: 'Güney Sudan', flag: '🇸🇸', dialCode: '+211' },
  { code: 'CD', name: 'Democratic Republic of Congo', nameTr: 'Demokratik Kongo Cumhuriyeti', flag: '🇨🇩', dialCode: '+243' },
  { code: 'CG', name: 'Republic of Congo', nameTr: 'Kongo Cumhuriyeti', flag: '🇨🇬', dialCode: '+242' },
  { code: 'CM', name: 'Cameroon', nameTr: 'Kamerun', flag: '🇨🇲', dialCode: '+237' },
  { code: 'CI', name: 'Ivory Coast', nameTr: 'Fildişi Sahili', flag: '🇨🇮', dialCode: '+225' },
  { code: 'BF', name: 'Burkina Faso', nameTr: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226' },
  { code: 'ML', name: 'Mali', nameTr: 'Mali', flag: '🇲🇱', dialCode: '+223' },
  { code: 'NE', name: 'Niger', nameTr: 'Nijer', flag: '🇳🇪', dialCode: '+227' },
  { code: 'TD', name: 'Chad', nameTr: 'Çad', flag: '🇹🇩', dialCode: '+235' },
  { code: 'SN', name: 'Senegal', nameTr: 'Senegal', flag: '🇸🇳', dialCode: '+221' },
  { code: 'GN', name: 'Guinea', nameTr: 'Gine', flag: '🇬🇳', dialCode: '+224' },
  { code: 'SL', name: 'Sierra Leone', nameTr: 'Sierra Leone', flag: '🇸🇱', dialCode: '+232' },
  { code: 'LR', name: 'Liberia', nameTr: 'Liberya', flag: '🇱🇷', dialCode: '+231' },
  { code: 'MR', name: 'Mauritania', nameTr: 'Moritanya', flag: '🇲🇷', dialCode: '+222' },
  { code: 'GM', name: 'Gambia', nameTr: 'Gambiya', flag: '🇬🇲', dialCode: '+220' },
  { code: 'GW', name: 'Guinea-Bissau', nameTr: 'Gine-Bissau', flag: '🇬🇼', dialCode: '+245' },
  { code: 'CV', name: 'Cape Verde', nameTr: 'Yeşil Burun Adaları', flag: '🇨🇻', dialCode: '+238' },
  { code: 'ST', name: 'São Tomé and Príncipe', nameTr: 'São Tomé ve Príncipe', flag: '🇸🇹', dialCode: '+239' },
  { code: 'GQ', name: 'Equatorial Guinea', nameTr: 'Ekvator Ginesi', flag: '🇬🇶', dialCode: '+240' },
  { code: 'GA', name: 'Gabon', nameTr: 'Gabon', flag: '🇬🇦', dialCode: '+241' },
  { code: 'CF', name: 'Central African Republic', nameTr: 'Orta Afrika Cumhuriyeti', flag: '🇨🇫', dialCode: '+236' },
  { code: 'RW', name: 'Rwanda', nameTr: 'Ruanda', flag: '🇷🇼', dialCode: '+250' },
  { code: 'BI', name: 'Burundi', nameTr: 'Burundi', flag: '🇧🇮', dialCode: '+257' },
  { code: 'DJ', name: 'Djibouti', nameTr: 'Cibuti', flag: '🇩🇯', dialCode: '+253' },
  { code: 'SO', name: 'Somalia', nameTr: 'Somali', flag: '🇸🇴', dialCode: '+252' },
  { code: 'ER', name: 'Eritrea', nameTr: 'Eritre', flag: '🇪🇷', dialCode: '+291' },
  { code: 'MZ', name: 'Mozambique', nameTr: 'Mozambik', flag: '🇲🇿', dialCode: '+258' },
  { code: 'MG', name: 'Madagascar', nameTr: 'Madagaskar', flag: '🇲🇬', dialCode: '+261' },
  { code: 'MU', name: 'Mauritius', nameTr: 'Mauritius', flag: '🇲🇺', dialCode: '+230' },
  { code: 'SC', name: 'Seychelles', nameTr: 'Seyşeller', flag: '🇸🇨', dialCode: '+248' },
  { code: 'KM', name: 'Comoros', nameTr: 'Komorlar', flag: '🇰🇲', dialCode: '+269' },
  { code: 'MW', name: 'Malawi', nameTr: 'Malavi', flag: '🇲🇼', dialCode: '+265' },
  { code: 'ZM', name: 'Zambia', nameTr: 'Zambiya', flag: '🇿🇲', dialCode: '+260' },
  { code: 'ZW', name: 'Zimbabwe', nameTr: 'Zimbabve', flag: '🇿🇼', dialCode: '+263' },
  { code: 'BW', name: 'Botswana', nameTr: 'Botsvana', flag: '🇧🇼', dialCode: '+267' },
  { code: 'NA', name: 'Namibia', nameTr: 'Namibya', flag: '🇳🇦', dialCode: '+264' },
  { code: 'SZ', name: 'Eswatini', nameTr: 'Esvatini', flag: '🇸🇿', dialCode: '+268' },
  { code: 'LS', name: 'Lesotho', nameTr: 'Lesotho', flag: '🇱🇸', dialCode: '+266' },
  { code: 'AO', name: 'Angola', nameTr: 'Angola', flag: '🇦🇴', dialCode: '+244' },

  // Oceania
  { code: 'AU', name: 'Australia', nameTr: 'Avustralya', flag: '🇦🇺', dialCode: '+61' },
  { code: 'NZ', name: 'New Zealand', nameTr: 'Yeni Zelanda', flag: '🇳🇿', dialCode: '+64' },
  { code: 'FJ', name: 'Fiji', nameTr: 'Fiji', flag: '🇫🇯', dialCode: '+679' },
  { code: 'PG', name: 'Papua New Guinea', nameTr: 'Papua Yeni Gine', flag: '🇵🇬', dialCode: '+675' },
  { code: 'NC', name: 'New Caledonia', nameTr: 'Yeni Kaledonya', flag: '🇳🇨', dialCode: '+687' },
  { code: 'VU', name: 'Vanuatu', nameTr: 'Vanuatu', flag: '🇻🇺', dialCode: '+678' },
  { code: 'SB', name: 'Solomon Islands', nameTr: 'Solomon Adaları', flag: '🇸🇧', dialCode: '+677' },
  { code: 'TO', name: 'Tonga', nameTr: 'Tonga', flag: '🇹🇴', dialCode: '+676' },
  { code: 'WS', name: 'Samoa', nameTr: 'Samoa', flag: '🇼🇸', dialCode: '+685' },
  { code: 'KI', name: 'Kiribati', nameTr: 'Kiribati', flag: '🇰🇮', dialCode: '+686' },
  { code: 'PW', name: 'Palau', nameTr: 'Palau', flag: '🇵🇼', dialCode: '+680' },
  { code: 'MH', name: 'Marshall Islands', nameTr: 'Marshall Adaları', flag: '🇲🇭', dialCode: '+692' },
  { code: 'FM', name: 'Micronesia', nameTr: 'Mikronezya', flag: '🇫🇲', dialCode: '+691' },
  { code: 'NR', name: 'Nauru', nameTr: 'Nauru', flag: '🇳🇷', dialCode: '+674' },
  { code: 'TV', name: 'Tuvalu', nameTr: 'Tuvalu', flag: '🇹🇻', dialCode: '+688' },

  // Caribbean
  { code: 'JM', name: 'Jamaica', nameTr: 'Jamaika', flag: '🇯🇲', dialCode: '+1876' },
  { code: 'CU', name: 'Cuba', nameTr: 'Küba', flag: '🇨🇺', dialCode: '+53' },
  { code: 'DO', name: 'Dominican Republic', nameTr: 'Dominik Cumhuriyeti', flag: '🇩🇴', dialCode: '+1809' },
  { code: 'HT', name: 'Haiti', nameTr: 'Haiti', flag: '🇭🇹', dialCode: '+509' },
  { code: 'PR', name: 'Puerto Rico', nameTr: 'Porto Riko', flag: '🇵🇷', dialCode: '+1787' },
  { code: 'TT', name: 'Trinidad and Tobago', nameTr: 'Trinidad ve Tobago', flag: '🇹🇹', dialCode: '+1868' },
  { code: 'BB', name: 'Barbados', nameTr: 'Barbados', flag: '🇧🇧', dialCode: '+1246' },
  { code: 'GD', name: 'Grenada', nameTr: 'Grenada', flag: '🇬🇩', dialCode: '+1473' },
  { code: 'LC', name: 'Saint Lucia', nameTr: 'Saint Lucia', flag: '🇱🇨', dialCode: '+1758' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', nameTr: 'Saint Vincent ve Grenadinler', flag: '🇻🇨', dialCode: '+1784' },
  { code: 'AG', name: 'Antigua and Barbuda', nameTr: 'Antigua ve Barbuda', flag: '🇦🇬', dialCode: '+1268' },
  { code: 'DM', name: 'Dominica', nameTr: 'Dominika', flag: '🇩🇲', dialCode: '+1767' },
  { code: 'KN', name: 'Saint Kitts and Nevis', nameTr: 'Saint Kitts ve Nevis', flag: '🇰🇳', dialCode: '+1869' },
  { code: 'BS', name: 'Bahamas', nameTr: 'Bahamalar', flag: '🇧🇸', dialCode: '+1242' },
];

const CountryCodeSelector: React.FC<CountryCodeSelectorProps> = ({
  selectedCountry,
  onCountrySelect,
  disabled = false,
  language
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getCountryName = (country: Country) => {
    return language === 'tr' ? country.nameTr : country.name;
  };

  const filteredCountries = countries.filter(country => {
    const countryName = getCountryName(country);
    return countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           country.dialCode.includes(searchTerm) ||
           country.code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  const searchPlaceholder = language === 'tr' ? 'Ülke ara...' : 'Search countries...';
  const noCountriesText = language === 'tr' ? 'Ülke bulunamadı' : 'No countries found';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`flex items-center space-x-2 px-3 py-3 glass-input rounded-xl transition-all duration-300 min-w-[120px] ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-teal-300'
        } ${isOpen ? 'border-teal-300' : ''}`}
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-slate-700">{selectedCountry.dialCode}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-card rounded-xl shadow-xl z-50 max-h-64 overflow-hidden animate-fade-in-up min-w-[320px]">
          {/* Search */}
          <div className="p-3 border-b border-slate-200/50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white/50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-300 transition-colors duration-200"
              />
            </div>
          </div>

          {/* Countries List */}
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <button
                  key={country.code}
                  onClick={() => handleCountrySelect(country)}
                  className={`w-full px-4 py-3 text-left hover:bg-teal-50/50 transition-all duration-200 flex items-center space-x-3 ${
                    selectedCountry.code === country.code ? 'bg-teal-50/50 text-teal-700' : 'text-slate-700'
                  }`}
                >
                  <span className="text-lg flex-shrink-0">{country.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{getCountryName(country)}</span>
                      <span className="text-sm text-slate-500 ml-2 font-mono flex-shrink-0">{country.dialCode}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{country.code}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-slate-500 text-sm">
                {noCountriesText}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CountryCodeSelector;