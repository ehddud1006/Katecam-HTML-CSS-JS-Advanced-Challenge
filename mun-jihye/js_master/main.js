const page1 = /* html */ `
  <section class="page1">
    <h1>Page 1</h1>
  </section>`;

const page2 = /* html */ `
  <section class="page2">
    <h1>Page 2</h1>
  </section>`;

const page3 = /* html */ `
  <section class="page3">
    <h1>Page 3</h1>
  </section>`;

const pageNotFound = /* html */ `
  <section>
    <h1>404 Page Not Found</h1>
  </section>`;

const pages = [
  { path: '#/page1', template: page1 },
  { path: '#/page2', template: page2 },
  { path: '#/page3', template: page3 },
];

const app = document.querySelector('#app');

const render = () => {
  const page = pages.find(page => page.path === location.hash);
  app.innerHTML = page ? page.template : pageNotFound;
};

window.addEventListener('popstate', render);
render(); //초기화 

const changePage = num => {
  history.pushState(`${num}`, '', `#/page${num}`);
  render();  // addEventListener 로 연결되지 않으므로 render를 해줘야함 
};

const input = document.querySelector('input');
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    changePage(e.target.value);
  }
});