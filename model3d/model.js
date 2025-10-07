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


