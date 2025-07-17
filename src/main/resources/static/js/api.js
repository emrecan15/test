// status kontrol

document.addEventListener('DOMContentLoaded', async () => {
    checkAuthStatus();
    ensureGuestId();
    
});



async function checkAuthStatus() {
    try {
        const res = await fetch('http://localhost:8080/api/auth/status', {
            method: 'GET',
            credentials: 'include'
        });

        const data = await res.json();

        if (data.authenticated) {
            console.log("✅ Giriş yapılmış, kullanıcı:", data.username);
            buildNavbar(data); // 👈 Navbar'ı güncelle
        } else {
            console.log("🚫 Giriş yapılmamış");
            buildNavbar({ authenticated: false }); // 👈 Çıkış yapılmış UI
        }
        
    } catch (err) {
        console.error("Kullanıcı durumu alınamadı", err);
        buildNavbar({ authenticated: false }); // Hata durumunda
    }
}

function buildNavbar(user) {
  const authDiv = document.getElementById('authButtons');
  if (user.username) {
    authDiv.innerHTML = `
      <span class="text-white me-3">Hoşgeldin, <strong>${user.username}</strong></span>
      <button id="logoutBtn" class="btn btn-outline-light">Çıkış Yap</button>
    `;

    document.getElementById('logoutBtn').addEventListener('click', async () => {
      await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Çıkış sonrası navbarı güncelle
      buildNavbar({ }); 
    });
  } else {
    authDiv.innerHTML = `
      <button class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#authModal" data-tab="login">Giriş Yap</button>
      <button class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#authModal" data-tab="register">Üye Ol</button>
    `;
  }
}

// LOGIN

document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email && password) {
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',  
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Giriş başarılı
                alert('Giriş başarılı! Hoşgeldiniz, ' + data.username);
                console.log('giriş başarılı');
                bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();

                buildNavbar(data)
                


            } else {
                const errorText = await response.text();
                alert('Giriş başarısız: ' + errorText);
            }
        } catch (error) {
            console.error('Login hatası:', error);
            alert('Giriş sırasında hata oluştu.');
        }
    } else {
        alert('Lütfen e-posta ve şifreyi doldurun.');
    }
});

document.getElementById('registerForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
            
            if (password !== passwordConfirm) {
                alert('Şifreler eşleşmiyor!');
                return;
            }
            
            if (name && email && password) {
                // Burada kayıt işlemi yapılır
                alert('Kayıt başarılı! (Demo)');
                bootstrap.Modal.getInstance(document.getElementById('authModal')).hide();
            }
        });

        // Modal açıldığında login tab'ına odaklan
     
        document.getElementById('authModal').addEventListener('shown.bs.modal', function() {
            document.getElementById('loginEmail').focus();
        });

        

        // Tab değiştiğinde ilgili input'a odaklan
        document.getElementById('login-tab').addEventListener('shown.bs.tab', function() {
            document.getElementById('loginEmail').focus();
        });

        document.getElementById('register-tab').addEventListener('shown.bs.tab', function() {
            document.getElementById('registerName').focus();
        });

        // Social login butonları
        document.querySelectorAll('.social-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                let provider = 'Social Media';
                
                if (icon.classList.contains('fa-google')) provider = 'Google';
                else if (icon.classList.contains('fa-facebook-f')) provider = 'Facebook';
                else if (icon.classList.contains('fa-twitter')) provider = 'Twitter';
                
                alert(`${provider} ile giriş yapılacak (Demo)`);
            });
        });







// Film öneri butonu kodu
document.getElementById('filmOnerBtn').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:8080/api/auth/status', {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      }
    });


     if (!response.ok) {
      console.log("Kullanıcı authenticated değil, auth modal açılıyor");
      new bootstrap.Modal(document.getElementById('authModal')).show();
      return;
    }


    const data = await response.json();
    console.log("API Yanıtı:", data); // Yanıtı konsolda kontrol edin
    
    if (data.authenticated) {
      new bootstrap.Modal(document.getElementById('filmOneriModal')).show();
    } else {
      new bootstrap.Modal(document.getElementById('authModal')).show();
    }
  } catch (err) {
    console.error('Hata:', err);
  }
});


function ensureGuestId() {
        // Eğer daha önce cookie'ye yazıldıysa onu kullan
        const getCookie = (name) => {
            const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            return match ? match[2] : null;
        };

        let guestId = getCookie("guestId");

        // Cookie'de yoksa yeni üret
        if (!guestId) {
            guestId = crypto.randomUUID(); // Modern tarayıcılarda çalışır
            //document.cookie = "guestId=" + guestId + "; path=/; max-age=" + (60 * 60 * 24 * 365);
            document.cookie = "guestId=" + guestId + "; path=/; max-age=31536000; SameSite=Lax";

        }

        return guestId;
    }