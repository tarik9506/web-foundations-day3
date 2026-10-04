let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter(note => note.text.toLowerCase().includes(searchTerm));
}

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// 3. countByCategory()
function countByCategory() {
  const counts = { personal: 0, work: 0, study: 0 };
  for (let note of notes) {
    if (counts[note.category] !== undefined) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }
  return counts;
}

// 4. getSummary()
function getSummary() {
  const counts = countByCategory();
  const totalNotes = notes.length;
  const noteWord = totalNotes === 1 ? "note" : "notes";
  
  let parts = [];
  for (const cat in counts) {
    if (counts[cat] > 0) {
      parts.push(`${counts[cat]} ${cat}`);
    }
  }
  return `${totalNotes} ${noteWord}: ${parts.join(", ")}.`;
}

// 5. isDuplicate(text)
function isDuplicate(text) {
  const normalizedInput = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === normalizedInput);
}

// 6. addNote(text, category)
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  
  if (typeof text !== "string" || text.length < 1 || text.length > 200) {
    console.log(`Failed to add note: Text must be between 1 and 200 characters.`);
    return false;
  }
  
  if (!validCategories.includes(category)) {
    console.log(`Failed to add note: Invalid category "${category}". Must be personal, work, or study.`);
    return false;
  }
  
  if (isDuplicate(text)) {
    console.log(`Failed to add note: Duplicate text found.`);
    return false;
  }
  
  const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  notes.push({ id: newId, text: text.trim(), category: category });
  console.log(`Successfully added note: "${text.trim()}"`);
  return true;
}



// Test 1: searchNotes
console.log(searchNotes("study")); 
// Expected: [{ id: 2, text: "Finish the Day 3 assignment", category: "study" }, { id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("xyz")); 
// Expected: []


// Test 2: longestNote
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }


// Test 3: countByCategory
console.log(countByCategory()); 
// Expected: { personal: 2, work: 1, study: 2 }


// Test 4: getSummary
console.log(getSummary()); 
// Expected: "5 notes: 2 personal, 1 work, 2 study."


// Test 5: isDuplicate
console.log(isDuplicate("call mum")); 
// Expected: true

console.log(isDuplicate("Buy a new laptop")); 
// Expected: false


// Test 6: addNote
console.log(addNote("Buy a new laptop", "work")); 
// Expected: Successfully added note... true

console.log(addNote("", "work")); 
// Expected: Failed to add note: Text must be between... false

console.log(addNote("Call mum", "personal")); 
// Expected: Failed to add note: Duplicate text found. false