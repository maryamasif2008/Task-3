const load = key => JSON.parse(localStorage.getItem(key)) || [];
const save = (key, arr) => localStorage.setItem(key, JSON.stringify(arr));

// Image preview
document.getElementById('studentImage').addEventListener('change', e => {
  const file = e.target.files[0];
  const img = document.getElementById('studentImgPreview');
  if (file) {
    const reader = new FileReader();
    reader.onload = e => {
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    img.style.display = 'none';
  }
});

document.getElementById('studentForm').addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const file = form.image.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const students = load('students');
    students.push({
      id: Date.now(),
      name: form.name.value.trim(),
      roll: form.roll.value.trim(),
      department: form.department.value.trim(),
      image: reader.result,
      grades: {}
    });
    save('students', students);
    form.reset();
    document.getElementById('studentImgPreview').style.display = 'none';
    alert('Student added!');
  };
  if (file) reader.readAsDataURL(file);
});
