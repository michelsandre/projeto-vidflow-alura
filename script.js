/*Layout Figma
https://www.figma.com/file/a0crwitCtGmNIQW0RVIs5H/VidFlow?type=design&node-id=0%3A1&mode=design&t=HckrRrpDXQAFt0LX-1
*/

/* 
Necessário instalar JSON Server
npm install -g json-server
json-sever --watch backend/videos.json
 */

const containerVideos = document.querySelector(".videos__container");

async function buscarEMostrarVideos() {
  try {
    const busca = await fetch("http://localhost:3000/videos");
    const videos = await busca.json();

    videos.forEach((video) => {
      if (video.descricao == "") {
        throw new Error("Video sem descrição");
      }
      containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="Logo do Canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>`;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Erro ao carregar os vídeos: ${error}</p>`;
  }
}

buscarEMostrarVideos();

const barraPesquisa = document.querySelector(".pesquisar__input");
barraPesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");
  const valorFiltro = barraPesquisa.value.toLowerCase();

  videos.forEach((video) => {
    const titulo = video
      .querySelector(".titulo-video")
      .textContent.toLowerCase();

    video.style.display = valorFiltro
      ? titulo.includes(valorFiltro)
        ? "block"
        : "none"
      : "block";
  });
}
