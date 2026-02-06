// Initialize storage
let schoolResults = [];
let competitiveResults = [];

// Load data from localStorage
function loadData() {
    const savedSchool = localStorage.getItem('schoolResults');
    const savedCompetitive = localStorage.getItem('competitiveResults');
    
    if (savedSchool) schoolResults = JSON.parse(savedSchool);
    if (savedCompetitive) competitiveResults = JSON.parse(savedCompetitive);
    
    displayResults();
    updateStats();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('schoolResults', JSON.stringify(schoolResults));
    localStorage.setItem('competitiveResults', JSON.stringify(competitiveResults));
}

// Switch tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(tabName).classList.add('active');
    
    if (tabName === 'view') {
        displayResults();
        updateStats();
    }
}

// Add subject field
function addSubjectField() {
    const container = document.getElementById('subjectsContainer');
    const div = document.createElement('div');
    div.className = 'subject-input';
    div.innerHTML = `
        <input type="text" placeholder="Subject name" class="subject-name">
        <input type="text" placeholder="Marks/Grade" class="subject-marks">
    `;
    container.appendChild(div);
}

// Add section field
function addSectionField() {
    const container = document.getElementById('sectionsContainer');
    const div = document.createElement('div');
    div.className = 'subject-input';
    div.innerHTML = `
        <input type="text" placeholder="Section name" class="section-name">
        <input type="text" placeholder="Score" class="section-score">
    `;
    container.appendChild(div);
}

// School form submission
document.getElementById('schoolForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const subjects = [];
    document.querySelectorAll('#subjectsContainer .subject-input').forEach(input => {
        const name = input.querySelector('.subject-name').value;
        const marks = input.querySelector('.subject-marks').value;
        if (name && marks) {
            subjects.push({ name, marks });
        }
    });

    const result = {
        id: Date.now(),
        grade: document.getElementById('grade').value,
        year: document.getElementById('schoolYear').value,
        score: document.getElementById('overallScore').value,
        subjects: subjects,
        notes: document.getElementById('schoolNotes').value,
        timestamp: new Date().toISOString()
    };

    schoolResults.push(result);
    saveData();
    
    alert('School result saved successfully!');
    this.reset();
    document.getElementById('subjectsContainer').innerHTML = `
        <div class="subject-input">
            <input type="text" placeholder="Subject name" class="subject-name">
            <input type="text" placeholder="Marks/Grade" class="subject-marks">
        </div>
    `;
});

// Competitive exam form submission
document.getElementById('competitiveForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const sections = [];
    document.querySelectorAll('#sectionsContainer .subject-input').forEach(input => {
        const name = input.querySelector('.section-name').value;
        const score = input.querySelector('.section-score').value;
        if (name && score) {
            sections.push({ name, score });
        }
    });

    const result = {
        id: Date.now(),
        examName: document.getElementById('examName').value,
        year: document.getElementById('examYear').value,
        score: document.getElementById('examScore').value,
        percentile: document.getElementById('percentile').value,
        sections: sections,
        notes: document.getElementById('examNotes').value,
        timestamp: new Date().toISOString()
    };

    competitiveResults.push(result);
    saveData();
    
    alert('Competitive exam result saved successfully!');
    this.reset();
    document.getElementById('sectionsContainer').innerHTML = `
        <div class="subject-input">
            <input type="text" placeholder="Section name" class="section-name">
            <input type="text" placeholder="Score" class="section-score">
        </div>
    `;
});

// Display results
function displayResults() {
    const schoolDiv = document.getElementById('schoolResults');
    const competitiveDiv = document.getElementById('competitiveResults');

    if (schoolResults.length === 0) {
        schoolDiv.innerHTML = `
            <div class="empty-state">
                <p>📝 No school results added yet</p>
            </div>
        `;
    } else {
        // Sort by grade (descending)
        const sortedSchool = [...schoolResults].sort((a, b) => {
            const gradeA = parseInt(a.grade);
            const gradeB = parseInt(b.grade);
            return gradeB - gradeA;
        });

        schoolDiv.innerHTML = sortedSchool.map(result => `
            <div class="result-card">
                <button class="delete-btn" onclick="deleteResult('school', ${result.id})">Delete</button>
                <h3>${result.grade} Grade - ${result.year}</h3>
                <div class="result-details">
                    <div class="result-detail">
                        <strong>Overall Score:</strong><br>${result.score}
                    </div>
                    ${result.subjects.map(s => `
                        <div class="result-detail">
                            <strong>${s.name}:</strong><br>${s.marks}
                        </div>
                    `).join('')}
                </div>
                ${result.notes ? `<p style="margin-top: 15px;"><strong>Notes:</strong> ${result.notes}</p>` : ''}
            </div>
        `).join('');
    }

    if (competitiveResults.length === 0) {
        competitiveDiv.innerHTML = `
            <div class="empty-state">
                <p>🎯 No competitive exam results added yet</p>
            </div>
        `;
    } else {
        // Sort by year (descending)
        const sortedCompetitive = [...competitiveResults].sort((a, b) => {
            return b.year.localeCompare(a.year);
        });

        competitiveDiv.innerHTML = sortedCompetitive.map(result => `
            <div class="result-card">
                <button class="delete-btn" onclick="deleteResult('competitive', ${result.id})">Delete</button>
                <h3>${result.examName} - ${result.year}</h3>
                <div class="result-details">
                    <div class="result-detail">
                        <strong>Score/Rank:</strong><br>${result.score}
                    </div>
                    ${result.percentile ? `
                        <div class="result-detail">
                            <strong>Percentile:</strong><br>${result.percentile}
                        </div>
                    ` : ''}
                    ${result.sections.map(s => `
                        <div class="result-detail">
                            <strong>${s.name}:</strong><br>${s.score}
                        </div>
                    `).join('')}
                </div>
                ${result.notes ? `<p style="margin-top: 15px;"><strong>Details:</strong> ${result.notes}</p>` : ''}
            </div>
        `).join('');
    }
}

// Delete result
function deleteResult(type, id) {
    if (confirm('Are you sure you want to delete this result?')) {
        if (type === 'school') {
            schoolResults = schoolResults.filter(r => r.id !== id);
        } else {
            competitiveResults = competitiveResults.filter(r => r.id !== id);
        }
        saveData();
        displayResults();
        updateStats();
    }
}

// Update statistics
function updateStats() {
    document.getElementById('schoolCount').textContent = schoolResults.length;
    document.getElementById('examCount').textContent = competitiveResults.length;
    document.getElementById('totalCount').textContent = schoolResults.length + competitiveResults.length;
}

// Export data as JSON
function exportData() {
    const data = {
        schoolResults,
        competitiveResults,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'academic-results-backup.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Import data from JSON
function importData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.schoolResults) schoolResults = data.schoolResults;
                if (data.competitiveResults) competitiveResults = data.competitiveResults;
                saveData();
                displayResults();
                updateStats();
                alert('Data imported successfully!');
            } catch (error) {
                alert('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
}

// Load data on page load
loadData();
