import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {
  constructor() { }

  getCountries() {
    return [
      'USA', 'India', 'Canada', 'Afghanistan', 'France'
    ];
  }

  getStates() {
    return [
      { country: 'USA', name: 'Alabama' },
      { country: 'USA', name: 'Alaska' },
      { country: 'USA', name: 'Arizona' },
      { country: 'USA', name: 'Arkansas' },
      { country: 'USA', name: 'California' },
      { country: 'USA', name: 'Colorado' },
      { country: 'USA', name: 'Connecticut' },
      { country: 'USA', name: 'Delaware' },
      { country: 'USA', name: 'District of Columbia' },
      { country: 'USA', name: 'Florida' },
      { country: 'USA', name: 'Georgia' },
      { country: 'USA', name: 'Hawaii' },
      { country: 'USA', name: 'Idaho' },
      { country: 'USA', name: 'Illinois' },
      { country: 'USA', name: 'Indiana' },
      { country: 'USA', name: 'Iowa' },
      { country: 'USA', name: 'Kansas' },
      { country: 'USA', name: 'Kentucky' },
      { country: 'USA', name: 'Louisiana' },
      { country: 'USA', name: 'Maine' },
      { country: 'USA', name: 'Maryland' },
      { country: 'USA', name: 'Massachusetts' },
      { country: 'USA', name: 'Michigan' },
      { country: 'USA', name: 'Minnesota' },
      { country: 'USA', name: 'Mississippi' },
      { country: 'USA', name: 'Missouri' },
      { country: 'USA', name: 'Montana' },
      { country: 'USA', name: 'Nebraska' },
      { country: 'USA', name: 'Nevada' },
      { country: 'USA', name: 'New Hampshire' },
      { country: 'USA', name: 'New Jersey' },
      { country: 'USA', name: 'New Mexico' },
      { country: 'USA', name: 'New York' },
      { country: 'USA', name: 'North Carolina' },
      { country: 'USA', name: 'North Dakota' },
      { country: 'USA', name: 'Ohio' },
      { country: 'USA', name: 'Oklahoma' },
      { country: 'USA', name: 'Oregon' },
      { country: 'USA', name: 'Pennsylvania' },
      { country: 'USA', name: 'Rhode Island' },
      { country: 'USA', name: 'South Carolina' },
      { country: 'USA', name: 'South Dakota' },
      { country: 'USA', name: 'Tennessee' },
      { country: 'USA', name: 'Texas' },
      { country: 'USA', name: 'Utah' },
      { country: 'USA', name: 'Vermont' },
      { country: 'USA', name: 'Virginia' },
      { country: 'USA', name: 'Washington' },
      { country: 'USA', name: 'West Virginia' },
      { country: 'USA', name: 'Wisconsin' },
      { country: 'USA', name: 'Wyoming' },
      { country: 'India', name: 'Andhra Pradesh' },
      { country: 'India', name: 'Arunachal Pradesh' },
      { country: 'India', name: 'Assam' },
      { country: 'India', name: 'Bihar' },
      { country: 'India', name: 'Chandigarh' },
      { country: 'India', name: 'Chhattisgarh' },
      { country: 'India', name: 'Dadra and Nagar Haveli' },
      { country: 'India', name: 'Daman and Diu' },
      { country: 'India', name: 'Delhi' },
      { country: 'India', name: 'Goa' },
      { country: 'India', name: 'Gujarat' },
      { country: 'India', name: 'Haryana' },
      { country: 'India', name: 'Himachal Pradesh' },
      { country: 'India', name: 'Jammu and Kashmir' },
      { country: 'India', name: 'Jharkhand' },
      { country: 'India', name: 'Karnataka' },
      { country: 'India', name: 'Kerala' },
      { country: 'India', name: 'Lakshadweep' },
      { country: 'India', name: 'Madhya Pradesh' },
      { country: 'India', name: 'Maharashtra' },
      { country: 'India', name: 'Manipur' },
      { country: 'India', name: 'Meghalaya' },
      { country: 'India', name: 'Mizoram' },
      { country: 'India', name: 'Nagaland' },
      { country: 'India', name: 'Orissa' },
      { country: 'India', name: 'Pondicherry' },
      { country: 'India', name: 'Punjab' },
      { country: 'India', name: 'Rajasthan' },
      { country: 'India', name: 'Sikkim' },
      { country: 'India', name: 'Tamil Nadu' },
      { country: 'India', name: 'Tripura' },
      { country: 'India', name: 'Uttaranchal' },
      { country: 'India', name: 'Uttar Pradesh' },
      { country: 'India', name: 'West Bengal' },
      { country: 'Canada', name: 'Alberta' },
      { country: 'Canada', name: 'British Columbia' },
      { country: 'Canada', name: 'Manitoba' },
      { country: 'Canada', name: 'New Brunswick' },
      { country: 'Canada', name: 'Newfoundland and Labrador' },
      { country: 'Canada', name: 'Nova Scotia' },
      { country: 'Canada', name: 'Northwest Territories' },
      { country: 'Canada', name: 'Nunavut' },
      { country: 'Afghanistan', name: 'Badakhshan' },
      { country: 'Afghanistan', name: 'Badghis' },
      { country: 'Afghanistan', name: 'Baghlan' },
      { country: 'Afghanistan', name: 'Balkh' },
      { country: 'Afghanistan', name: 'Bamian' },
      { country: 'Afghanistan', name: 'Daykondi' },
      { country: 'Afghanistan', name: 'Farah' },
      { country: 'Afghanistan', name: 'Faryab' },
      { country: 'Afghanistan', name: 'Ghazni' },
      { country: 'Afghanistan', name: 'Ghowr' },
      { country: 'Afghanistan', name: 'Helmand' },
      { country: 'Afghanistan', name: 'Herat' },
      { country: 'Afghanistan', name: 'Jowzjan' },
      { country: 'Afghanistan', name: 'Kabul' },
      { country: 'Afghanistan', name: 'Kandahar' },
      { country: 'Afghanistan', name: 'Kapisa' },
      { country: 'Afghanistan', name: 'Khost' },
      { country: 'Afghanistan', name: 'Konar' },
      { country: 'Afghanistan', name: 'Kondoz' },
      { country: 'Afghanistan', name: 'Laghman' },
      { country: 'Afghanistan', name: 'Lowgar' },
      { country: 'Afghanistan', name: 'Nangarhar' },
      { country: 'Afghanistan', name: 'Nimruz' },
      { country: 'Afghanistan', name: 'Nurestan' },
      { country: 'Afghanistan', name: 'Oruzgan' },
      { country: 'Afghanistan', name: 'Paktia' },
      { country: 'Afghanistan', name: 'Paktika' },
      { country: 'Afghanistan', name: 'Panjshir' },
      { country: 'Afghanistan', name: 'Parvan' },
      { country: 'Afghanistan', name: 'Samangan' },
      { country: 'Afghanistan', name: 'Sar-e Pol' },
      { country: 'Afghanistan', name: 'Takhar' },
      { country: 'Afghanistan', name: 'Vardak' },
      { country: 'Afghanistan', name: 'Zabol' },
      { country: 'France', name: 'Alsace' },
      { country: 'France', name: 'Aquitaine' },
      { country: 'France', name: 'Auvergne' },
      { country: 'France', name: 'Basse-Normandie' },
      { country: 'France', name: 'Bourgogne' },
      { country: 'France', name: 'Bretagne' },
      { country: 'France', name: 'Centre' },
      { country: 'France', name: 'Champagne-Ardenne' },
      { country: 'France', name: 'Corse' },
      { country: 'France', name: 'Franche-Comte' },
      { country: 'France', name: 'Haute-Normandie' },
      { country: 'France', name: 'Ile-de-France' },
      { country: 'France', name: 'Languedoc-Roussillon' },
      { country: 'France', name: 'Limousin' },
      { country: 'France', name: 'Lorraine' },
      { country: 'France', name: 'Midi-Pyrenees' },
      { country: 'France', name: 'Nord-Pas-de-Calais' },
      { country: 'France', name: 'Pays de la Loire' },
      { country: 'France', name: 'Picardie' },
      { country: 'France', name: 'Poitou-Charentes' },
      { country: 'France', name: 'Provence-Alpes-Cote d' },
      { country: 'France', name: 'Rhone-Alpes' },
    ];
  }
}
