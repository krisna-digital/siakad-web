// template.js
function loadTemplate() {
    // Load Navbar
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Navbar tidak ditemukan');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Re-initialize Bootstrap dropdown setelah navbar di-load
            if (typeof bootstrap !== 'undefined') {
                // Inisialisasi ulang semua dropdown
                var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
                var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                    return new bootstrap.Dropdown(dropdownToggleEl);
                });
                
                console.log('Dropdown diinisialisasi:', dropdownList.length);
            } else {
                console.error('Bootstrap JS tidak ditemukan');
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            document.getElementById('navbar-placeholder').innerHTML = '<div class="alert alert-danger">Gagal memuat navbar</div>';
        });

    // Load Footer
    fetch('footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Footer tidak ditemukan');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            document.getElementById('footer-placeholder').innerHTML = '<div class="alert alert-danger">Gagal memuat footer</div>';
        });
}

// Fungsi untuk memuat ulang Bootstrap (jika diperlukan)
function reloadBootstrapComponents() {
    if (typeof bootstrap !== 'undefined') {
        // Re-inisialisasi semua dropdown
        document.querySelectorAll('.dropdown-toggle').forEach(element => {
            try {
                new bootstrap.Dropdown(element);
            } catch (e) {
                console.log('Dropdown error:', e);
            }
        });
        
        // Re-inisialisasi semua tooltips
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(element => {
            try {
                new bootstrap.Tooltip(element);
            } catch (e) {
                console.log('Tooltip error:', e);
            }
        });
    }
}

// Panggil fungsi reload setelah beberapa saat (untuk memastikan DOM sudah siap)
setTimeout(reloadBootstrapComponents, 500);

// Load template ketika halaman siap
document.addEventListener('DOMContentLoaded', loadTemplate);

// Jika ada perubahan URL (single page app), reload komponen
window.addEventListener('popstate', function() {
    setTimeout(reloadBootstrapComponents, 500);
});