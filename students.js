const gradeMap = { A:4.0, 'A+':3.7, 'B+':3.3, B:3.0, 'B-':2.7, 'C+':2.3, C:2.0, D:1.0, F:0.0 };

const load = key => JSON.parse(localStorage.getItem(key)) || [];
const save = (key, arr) => localStorage.setItem(key, JSON.stringify(arr));

function calculateCGPA(grades, subjects) {
  let totalPts = 0, totalCred = 0;
  subjects.forEach(s => {
    const g = grades[s.code];
    if (g && gradeMap[g] != null) {
      totalPts += gradeMap[g] * s.credit;
      totalCred += s.credit;
    }
  });
  return totalCred ? (totalPts / totalCred).toFixed(2) : '0.00';
}

function renderStudents() {
  const container = document.getElementById('studentList');
  const students = load('students');
  const subjects = load('subjects');
  container.innerHTML = '';

  students.forEach(st => {
    const div = document.createElement('div');
div.classList.add('student-card');
div.innerHTML = `
  <img src="${st.image}" alt="Student Image" />
  <div class="student-details">
    <p><strong>${st.name}</strong> (Roll: ${st.roll}, Dept: ${st.department})</p>
    <p><strong>CGPA:</strong> ${calculateCGPA(st.grades, subjects)}</p>
    <div class="grades-section"></div>
  </div>
`;

    const gs = div.querySelector('.grades-section');
    subjects.forEach(sub => {
      const select = document.createElement('select');
      select.innerHTML = `<option value="">${sub.code}</option>` +
        Object.keys(gradeMap).map(g =>
          `<option value="${g}" ${st.grades[sub.code] === g ? 'selected' : ''}>${g}</option>`
        ).join('');

      select.addEventListener('change', () => {
        st.grades[sub.code] = select.value;
        save('students', students);
        renderStudents();
      });

      gs.appendChild(select);
    });

    container.appendChild(div);
  });
}

// initial load
renderStudents();
