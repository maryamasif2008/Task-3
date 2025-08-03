const load = key => JSON.parse(localStorage.getItem(key)) || [];
const save = (key, arr) => localStorage.setItem(key, JSON.stringify(arr));

function renderSubjects() {
  const container = document.getElementById('subjectList');
  const subjects = load('subjects');
  container.innerHTML = '';
  subjects.forEach(s => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${s.name}</strong> (${s.code}) — ${s.credit} cr — ${s.instructor}
      <button data-id="${s.id}" class="edit-sub">Edit</button>
      <button data-id="${s.id}" class="del-sub">Delete</button>
    `;
    container.appendChild(div);
  });
}

document.getElementById('subjectForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const subjects = load('subjects');
  subjects.push({
    id: Date.now(),
    name: form.subName.value.trim(),
    code: form.subCode.value.trim(),
    credit: Number(form.credit.value),
    instructor: form.instructor.value.trim()
  });
  save('subjects', subjects);
  form.reset();
  renderSubjects();
});

document.getElementById('subjectList').addEventListener('click', e => {
  if (!e.target.dataset.id) return;
  const id = Number(e.target.dataset.id);
  let subjects = load('subjects');
  if (e.target.classList.contains('del-sub')) {
    subjects = subjects.filter(s => s.id !== id);
  } else if (e.target.classList.contains('edit-sub')) {
    const s = subjects.find(s => s.id === id);
    if (!s) return;
    const name = prompt('New Name:', s.name);
    const code = prompt('New Code:', s.code);
    const credit = prompt('New Credits:', s.credit);
    const instr = prompt('New Instructor:', s.instructor);
    if (name && code && credit && instr) {
      s.name = name;
      s.code = code;
      s.credit = Number(credit);
      s.instructor = instr;
    }
  }
  save('subjects', subjects);
  renderSubjects();
});

// initial load
renderSubjects();
