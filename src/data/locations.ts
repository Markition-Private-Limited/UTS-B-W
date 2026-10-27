export const LOCATIONS: string[] = [
  "London Heathrow Airport (LHR), Terminal 2",
  "London Heathrow Airport (LHR), Terminal 3",
  "London Heathrow Airport (LHR), Terminal 4",
  "London Heathrow Airport (LHR), Terminal 5",
  "London Gatwick Airport (LGW), North Terminal",
  "London Gatwick Airport (LGW), South Terminal",
  "London Stansted Airport (STN)",
  "London Luton Airport (LTN)",
  "London City Airport (LCY)",
  "Southampton Cruise Terminal, Ocean Way",
  "Dover Cruise Terminal, Eastern Docks",
  "Tilbury Cruise Terminal, Essex",
  "St Pancras International Station, London",
  "King's Cross Station, London",
  "Euston Station, London",
  "Paddington Station, London",
  "Victoria Station, London",
  "Waterloo Station, London",
  "Liverpool Street Station, London",
  "Marylebone Station, London",
  "The Ritz London, 150 Piccadilly",
  "The Savoy Hotel, Strand, London",
  "The Langham, 1c Portland Place, London",
  "Claridge's, Brook Street, Mayfair",
  "The Dorchester, Park Lane, Mayfair",
  "The Connaught, Carlos Place, Mayfair",
  "Corinthia London, Whitehall Place",
  "The Berkeley, Wilton Place, Knightsbridge",
  "Mandarin Oriental Hyde Park, Knightsbridge",
  "The Lanesborough, Hyde Park Corner",
  "Shangri-La The Shard, London Bridge",
  "The Ned, 27 Poultry, London",
  "Harrods, Brompton Road, Knightsbridge",
  "Selfridges, Oxford Street, London",
  "Canary Wharf Financial District, London",
  "1 Canada Square, Canary Wharf, London",
  "The City of London, Bank, London",
  "Mayfair, London",
  "Knightsbridge, London",
  "Kensington, London",
  "Chelsea, London",
  "Westminster, London",
  "Covent Garden, London",
  "Soho, London",
  "Shoreditch, London",
  "Buckingham Palace, London",
  "The Tower of London",
  "Wembley Stadium, London",
  "The O2 Arena, Greenwich, London",
  "Royal Albert Hall, Kensington, London",
  "Windsor Castle, Windsor",
  "Oxford City Centre",
  "Cambridge City Centre",
  "Brighton Seafront",
  "Birmingham New Street Station",
  "Manchester Piccadilly Station",
  "Manchester Airport (MAN)",
  "Edinburgh Waverley Station",
];

export function suggestLocations(query: string, limit = 6): string[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  const starts: string[] = [];
  const word: string[] = [];
  const contains: string[] = [];
  for (const l of LOCATIONS) {
    const low = l.toLowerCase();
    if (low === q) continue;
    if (low.startsWith(q)) starts.push(l);
    else if (low.split(/[\s,()'’]+/).some((w) => w.startsWith(q))) word.push(l);
    else if (low.includes(q)) contains.push(l);
  }
  return [...starts, ...word, ...contains].slice(0, limit);
}
