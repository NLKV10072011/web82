// Chế độ tối
document.getElementById('darkModeToggle')?.addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Đăng nhập
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user.role === 'teacher') {
            window.location.href = 'teacher.html';
        } else {
            window.location.href = 'student.html';
        }
    } else {
        alert('Sai email hoặc mật khẩu');
    }
});

// Đăng ký tài khoản
document.getElementById('registerForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    const teacherPassword = document.getElementById('teacherPassword').value;

    if (password !== confirmPassword) {
        alert('Mật khẩu không khớp!');
        return;
    }

    if (role === 'teacher' && teacherPassword !== '1234') {
        alert('Mật mã giáo viên không chính xác!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    alert('Đăng ký thành công!');
    window.location.href = 'login.html';
});

// Gửi lời chúc cho học sinh
document.getElementById('wishForm')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const wishText = document.getElementById('wish').value;
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

    const wish = {
        name: currentUser.name,
        wish: wishText,
        date: new Date().toLocaleString()
    };

    let wishes = JSON.parse(localStorage.getItem('wishes')) || [];
    wishes.push(wish);
    localStorage.setItem('wishes', JSON.stringify(wishes));

    alert('Lời chúc của bạn đã được gửi!');
    window.location.reload();
});

// Hiển thị lời chúc cho giáo viên
function loadWishesForTeacher() {
    const wishList = document.getElementById('wishList');
    const wishes = JSON.parse(localStorage.getItem('wishes')) || [];

    wishes.forEach(wish => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${wish.name}</strong>: ${wish.wish} <br><small>${wish.date}</small>`;
        wishList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', loadWishesForTeacher);

document.getElementById('searchInput').addEventListener('keyup', function () {
    const searchValue = this.value.toLowerCase();
    const members = document.querySelectorAll('.member-card');
  
    members.forEach(member => {
      const name = member.querySelector('h3').textContent.toLowerCase();
      const hobby = member.querySelector('p').textContent.toLowerCase();
  
      if (name.includes(searchValue) || hobby.includes(searchValue)) {
        member.style.display = '';
      } else {
        member.style.display = 'none';
      }
    });
  });
  