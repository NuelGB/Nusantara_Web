//fungsi untuk menampilkan semua rumah adat
function tampilkanrumah_adat(rumah_adat) {
$('#hasil').empty();
$('#judul').append('<h1> Daftar Rumah Adat di Indonesia</h1> ')
  rumah_adat.forEach((r) => {
 const row = $('<div class="item"></div>');

 const gambar = $(`<img src="${r.gambar}" alt="${r.nama}">`);
 row.append(gambar);

 const nama = $(`<b class ="namarumahadat">${r.nama}</b><br>`);
 row.append(nama);

 const provinsi = $(`<p class="provinsi">${r.provinsi}</p>`);
 row.append(provinsi);

 const Detail = $(`<button>Lihat Detail</button>`);

 Detail.click(() => {
 DetailRumahAdat(r);
 });
  row.append(Detail);

 const Favorit = $(`<button>Tambah Favorit</button>`);
 row.append(Favorit);

    $('#hasil').append(row);
  });
}

$(function () {
  tampilkanrumah_adat(rumah_adat);
});


//fungsi search 
$('#Submit').click((e) => {
  e.preventDefault(); 

  $('#error').text(""); 

   $('#Submit')
    .empty()
    .attr('disabled', 'disabled')
    .append(' Loading...');

  $('#hasil').empty();
  $('#judul').empty();

  const kata =  $('#input').val().toLowerCase();
  const provinsi =  $('#province-filter').val().toLowerCase();


  const results = rumah_adat.filter(r => 
    r.nama.toLowerCase().includes(kata) &&
    r.provinsi.toLowerCase().includes(provinsi)
  );

  if(kata === "" && provinsi === ""){
    $('#judul').append('<h1> Daftar Rumah Adat di Indonesia</h1> ')
  }
  else{
    $('#judul').append('<h1> Hasil Pencarian</h1> ')
  }

  if (results.length === 0) {
    $('#hasil').append("<p>Tidak ditemukan hasil.</p>");
  } else {
    results.forEach(r => {
    const row = $('<div class="item"></div>');

    const gambar = $(`<img src="${r.gambar}" alt="${r.nama}">`);
    row.append(gambar);

    const nama = $(`<b class ="namarumahadat">${r.nama}</b><br>`);
    row.append(nama);

    const provinsi = $(`<p class="provinsi">${r.provinsi}</p>`);
    row.append(provinsi);

    const Detail = $(`<button>Lihat Detail</button>`);
    Detail.click(() => {
    DetailRumahAdat(r);
    });
    row.append(Detail);

    const Favorit = $(`<button>Tambah Favorit</button>`);
    row.append(Favorit);

    $('#hasil').append(row);
    });
  }

  $('#Submit')
    .empty()
    .removeAttr('disabled')
    .append('Cari');
});

// fungsi menampilkan detail konten rumah adat
function DetailRumahAdat(rumah) {
  const popup = $("#detail");
  const body = $("#popupBody");

  // kosongkan isi sebelumnya
  body.empty();

  // judul
  const nama = $(`<h2>🛖 ${rumah.nama}</h2>`);
  body.append(nama);

  // provinsi
  const prov = $(`<p><strong>📍 Provinsi:</strong> ${rumah.provinsi}</p><br>`);
  body.append(prov);

  // gambar
  const gambar = $(`<img src="${rumah.gambar}" alt="${rumah.nama}" 
    style="width:100%;border-radius:10px;margin:10px;height:250px;object-fit:cover;">`);
  body.append(gambar);

  // ciri arsitektur
  const arsitektur = $(`<p><strong>🧱 Ciri Arsitektur:</strong> ${rumah.ciriArsitektur}</p><br>`);
  body.append(arsitektur);

  // fungsi ruang
  const fungsi = $(`<p><strong>🛖 Fungsi Ruang:</strong> ${rumah.fungsiRuang}</p><br>`);
  body.append(fungsi);

  // filosofi
  const filosofi = $(`<p><strong>🍂 Filosofi:</strong> ${rumah.filosofi}</p><br>`);
  body.append(filosofi);

  // penggunaan
  const penggunaan = $(`<p><strong>🛠️ Penggunaan:</strong> ${rumah.penggunaan}</p><br>`);
  body.append(penggunaan);

  // referensi
  const refTitle = $(`<p><strong>📚 Referensi:</strong></p><br>`);
  body.append(refTitle);

  const Refrensi = $(`<ul style="margin-left:20px;"></ul>`);
  rumah.referensi.forEach(ref => {
    Refrensi.append(`<li>${ref}</li>`);
  });
  body.append(Refrensi);

  // tampilkan konten
  popup.addClass("show");

  // tombol close
  $(".close").off("click").on("click", function() {
    popup.removeClass("show");
  });
}
