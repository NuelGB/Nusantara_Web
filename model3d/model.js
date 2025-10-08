function tampilkanmodel3d() {
    $('#hasil').empty();
    $('#judul').html('<h1>Daftar Model 3D Rumah Adat di Indonesia</h1>');

    model3d.forEach((r) => {
        const row = $('<div class="item"></div>');

        const modelFrame = $(`
      <iframe
        title="${r.name}"
        frameborder="0"
        allowfullscreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        width="100%"
        height="300"
        src="${r.model3d}/embed"
      ></iframe>
    `);
    row.append(modelFrame);

        const name = $(`<b class="namerumahadat">${r.name}</b><br>`);
        row.append(name);

        const provinsi = $(`<p class="provinsi">${r.province}</p>`);
        row.append(provinsi);

        

      

        $('#hasil').append(row);
    });
}

tampilkanmodel3d();

$('#Submit').click((e) => {
    e.preventDefault(); 

    $('#Submit')
        .empty()
        .attr('disabled', 'disabled')
        .append(' Loading...');

    $('#hasil').empty();
    $('#judul').empty();

    const kata =  $('#input').val().toLowerCase();
    const provinsi =  $('#province-filter').val().toLowerCase();

    const results = model3d.filter(r => 
        r.name.toLowerCase().includes(kata) &&
        r.province.toLowerCase().includes(provinsi)
    );

    if(kata === "" && provinsi === ""){
        $('#judul').append('<h1> Daftar Model3D Rumah Adat di Indonesia</h1> ');
    }
    else{
        $('#judul').append('<h1> Hasil Pencarian</h1> ');
    }

    if (results.length === 0) {
        $('#hasil').append("<p>Tidak ditemukan hasil.</p>");
    } else {
        results.forEach(r => {
            const row = $('<div class="item"></div>');

              const modelFrame = $(`
      <iframe
        title="${r.name}"
        frameborder="0"
        allowfullscreen
        mozallowfullscreen="true"
        webkitallowfullscreen="true"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        width="100%"
        height="300"
        src="${r.model3d}/embed"
      ></iframe>
    `);
    row.append(modelFrame);

        const name = $(`<b class="namerumahadat">${r.name}</b><br>`);
        row.append(name);

        const provinsi = $(`<p class="provinsi">${r.province}</p>`);
        row.append(provinsi);

            $('#hasil').append(row);
        });
    }

    $('#Submit')
        .empty()
        .removeAttr('disabled')
        .append('Cari');
});


  document.getElementById("menu-toggle").addEventListener("click", function () {
      const navLinks = document.getElementById("nav-links");
      this.classList.toggle("active"); 
      navLinks.classList.toggle("active");
    });

